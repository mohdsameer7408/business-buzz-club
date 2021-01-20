import React, { useCallback, useState, useReducer } from "react";
import { Button } from "@material-ui/core";
import DateTime from "react-datetime";
import { useHistory } from "react-router-dom";
import "react-datetime/css/react-datetime.css";

import "../assets/css/AddEvent.css";
import FormInput from "../components/FormInput";
import { db, storage } from "../features/firebase";

const UPDATE_FORM = "UPDATE_FORM";
const RESET_FORM = "RESET_FORM";

const initialState = {
  values: {
    title: "",
    description: "",
    meetUrl: "",
    dateTime: "",
  },
  validities: {
    title: false,
    description: false,
    meetUrl: false,
    dateTime: false,
  },
  isFormValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case RESET_FORM:
      return initialState;

    case UPDATE_FORM:
      const { id, value, isValid } = action.payload;
      const values = { ...state.values, [id]: value };
      const validities = { ...state.validities, [id]: isValid };
      let isFormValid = true;

      for (let key in validities) {
        isFormValid = isFormValid && validities[key];
      }

      return {
        ...state,
        values,
        validities,
        isFormValid,
      };
    default:
      return state;
  }
};

function AddEvent() {
  const history = useHistory();
  const [formData, dispatchFormState] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [poster, setPoster] = useState(null);

  const selectPoster = (event) => {
    if (event.target.files) {
      setPoster(event.target.files[0]);
    }
  };

  const onInputChange = useCallback(
    (id, value, isValid) => {
      dispatchFormState({
        type: UPDATE_FORM,
        payload: {
          id,
          value,
          isValid,
        },
      });
    },
    [dispatchFormState]
  );

  const formSubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();

      if (!formData.isFormValid) {
        alert("Check form for errors!");
        return;
      }

      try {
        setIsLoading(true);
        const imageType = poster.name.split(".").pop();
        const imageName = `IMG-${Date.now()}.${imageType}`;

        const uploadTask = storage.ref(`posters/${imageName}`).put(poster);
        uploadTask.on(
          "state_changed",
          (_) => {},
          (error) => {
            alert(error.message);
          },
          () => {
            storage
              .ref("posters")
              .child(imageName)
              .getDownloadURL()
              .then(async (url) => {
                await db
                  .collection("events")
                  .add({ ...formData.values, poster: url });
                dispatchFormState({ type: RESET_FORM });
                setIsLoading(false);
                history.replace("/events");
              });
          }
        );
      } catch (error) {
        setIsLoading(false);
        alert(error.message);
      }
    },
    [formData, dispatchFormState, history, poster]
  );

  return (
    <div className="add__event">
      <div className="event__card">
        <div className="event_heading">
          <h1>Create an Event</h1>
        </div>
        <form method="POST">
          <FormInput
            label="title"
            onInputChange={onInputChange}
            inputType="text"
            id="title"
            required
          />
          <div className="input__container">
            <h3 className="label__field">Description</h3>
            <textarea
              className="input__field"
              name="Event Description"
              id="description"
              cols="30"
              rows="10"
              required
              value={formData.values.description}
              onChange={(event) =>
                onInputChange(
                  "description",
                  event.target.value,
                  event.target.value.length ? true : false
                )
              }
            />
          </div>
          <div className="input__container">
            <h3 className="label__field">Choose Poster</h3>
            <input
              type="file"
              name="poster"
              id="poster"
              required
              onChange={selectPoster}
              accept="image/*"
            />
          </div>
          <FormInput
            label="Meet url"
            inputType="text"
            onInputChange={onInputChange}
            id="meetUrl"
            required
          />
          <div className="input__container">
            <h3 className="label__field">Date/Time</h3>
            <DateTime
              className="input__field"
              onChange={(event) =>
                onInputChange("dateTime", event._d?.toString(), true)
              }
            />
          </div>
          <Button
            className="submit__button"
            onClick={formSubmitHandler}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
