import React, { useCallback, useReducer, useState } from "react";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import "../assets/css/RegisterScreen.css";
import FormImage from "../assets/images/form-image.png";
import FormInput from "../components/FormInput";
import { auth, db } from "../features/firebase";

const UPDATE_FORM = "UPDATE_FORM";
const RESET_FORM = "RESET_FORM";
const initialState = {
  values: {
    name: "",
    email: "",
    course: "",
    year: "",
    phone: "",
    whatsappPhone: "",
    password: "",
  },
  validities: {
    name: false,
    email: false,
    course: false,
    year: false,
    phone: false,
    whatsappPhone: false,
    password: false,
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

function RegisterScreen() {
  const history = useHistory();
  const [formData, dispatchFormState] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

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
        const { user } = await auth.createUserWithEmailAndPassword(
          formData.values.email,
          formData.values.password
        );
        const registrationData = {
          uid: user.uid,
          type: "user",
          name: formData.values.name,
          email: user.email,
          course: formData.values.course,
          year: formData.values.year,
          phone: formData.values.phone,
          whatsappPhone: formData.values.whatsappPhone,
        };
        await db.collection("users").doc(user.uid).set(registrationData);
        // dispatch(signIn(formData.values));
        dispatchFormState({ type: RESET_FORM });
        setIsLoading(false);
        history.replace("/");
      } catch (error) {
        setIsLoading(false);
        alert(error.message);
      }
    },
    [formData, history]
  );

  return (
    <div className="register__screen">
      <div className="form__container">
        <div className="form__left">
          <img src={FormImage} alt="" className="form__image" />
        </div>
        <div className="form__right">
          <div className="signup__heading">
            <h1>Sign Up</h1>
          </div>
          <form action="" method="POST">
            <FormInput
              onInputChange={onInputChange}
              label="Name"
              id="name"
              required
              minLength={3}
              errorText="Please enter a valid name!"
            />
            <FormInput
              onInputChange={onInputChange}
              label="email"
              inputType="email"
              id="email"
              email
              required
              errorText="Invalid Email!"
            />
            <FormInput
              onInputChange={onInputChange}
              label="course"
              id="course"
              required
              errorText="Course is required!"
            />
            <FormInput
              onInputChange={onInputChange}
              label="year"
              id="year"
              required
              errorText="Year is required!"
            />
            <FormInput
              onInputChange={onInputChange}
              label="Phone"
              id="phone"
              required
              minLength={10}
              errorText="Invalid Phone Number!"
            />
            <FormInput
              onInputChange={onInputChange}
              label="whatsapp Phone"
              id="whatsappPhone"
              required
              minLength={10}
              errorText="Invalid WhatsApp Contact!"
            />
            <FormInput
              id="password"
              onInputChange={onInputChange}
              label="password"
              inputType="password"
              required
              minLength={6}
              errorText="Password must be atleast 6 characters long!"
            />
            <Button
              type="submit"
              className="submit__button"
              onClick={formSubmitHandler}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
          <span className="form__link">
            Already have an account? <Link to="/login">Login Here</Link>
          </span>
        </div>
      </div>
      {/* <div className="circle1"></div>
      <div className="circle2"></div> */}
    </div>
  );
}

export default RegisterScreen;
