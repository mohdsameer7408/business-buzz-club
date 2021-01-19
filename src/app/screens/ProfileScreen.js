import React, { useReducer, useCallback } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import "../assets/css/ProfileScreen.css";
import FormInput from "../components/FormInput";
import { selectUser, signOutAsync } from "../features/authSlice";
import { db } from "../features/firebase";

const UPDATE_FORM = "UPDATE_FORM";
const initialState = {
  values: {
    name: "",
    email: "",
    course: "",
    year: "",
    phone: "",
    whatsappPhone: "",
  },
  validities: {
    name: false,
    email: false,
    course: false,
    year: false,
    phone: false,
    whatsappPhone: false,
  },
  isFormValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
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

function ProfileScreen() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [formData, dispatchFormState] = useReducer(formReducer, initialState);

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
        const updatedData = {
          ...user,
          name: formData.values.name,
          email: user.email,
          course: formData.values.course,
          year: formData.values.year,
          phone: formData.values.phone,
          whatsappPhone: formData.values.whatsappPhone,
        };
        await db.collection("users").doc(user.uid).update(updatedData);
      } catch (error) {
        alert(error.message);
      }
    },
    [formData, user]
  );

  const signOutUser = async () => {
    try {
      await dispatch(signOutAsync());
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="profile__screen">
      <div className="profile__left">
        <img
          className="profile__image"
          src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
          alt="profile"
        />

        <h2>{user.name}</h2>
        <Button className="button__logout" onClick={signOutUser}>
          Log out
        </Button>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          blanditiis beatae, quod quibusdam corporis ipsa, saepe iure itaque
          dolorem cumque perferendis nesciunt voluptatem inventore quae
          mollitia. Neque totam omnis saepe.
        </p>
      </div>
      <div className="profile__right">
        <h1>Profile Information</h1>
        <form action="" className="profile__details" method="POST">
          <FormInput
            label="Name"
            id="name"
            required
            minLength={3}
            initialValue={user.name}
            initiallyValid={true}
            onInputChange={onInputChange}
          />
          <FormInput
            label="Email"
            id="email"
            email
            initialValue={user.email}
            initiallyValid={true}
            onInputChange={onInputChange}
          />
          <FormInput
            label="Course"
            id="course"
            required
            initialValue={user.course}
            initiallyValid={true}
            onInputChange={onInputChange}
          />
          <FormInput
            label="Year"
            id="year"
            required
            initialValue={user.year}
            initiallyValid={true}
            onInputChange={onInputChange}
          />
          <FormInput
            label="Phone"
            id="phone"
            required
            minLength={10}
            initialValue={user.phone}
            initiallyValid={true}
            onInputChange={onInputChange}
          />
          <FormInput
            label="Whatsapp Contact"
            id="whatsappPhone"
            required
            minLength={10}
            initialValue={user.phone}
            initiallyValid={true}
            onInputChange={onInputChange}
          />
        </form>
        <Button className="save__button" onClick={formSubmitHandler}>
          Save changes
        </Button>
      </div>
    </div>
  );
}

export default ProfileScreen;
