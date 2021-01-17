import React, { useCallback, useReducer } from "react";
import { Button } from "@material-ui/core";

import "../assets/css/RegisterScreen.css";
import "../assets/css/LoginScreen.css";
import FormImage from "../assets/images/form-image.png";
import FormInput from "../components/FormInput";

const UPDATE_FORM = "UPDATE_FORM";

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

function LoginScreen() {
  const [formData, dispatchFormState] = useReducer(formReducer, {
    values: {
      email: "",
      password: "",
    },
    validities: {
      email: false,
      password: false,
    },
    isFormValid: false,
  });

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
      console.log(formData);
    },
    [formData]
  );

  return (
    <div className="register__screen">
      <div className="form__container">
        <div className="form__left login__formLeft">
          <img src={FormImage} alt="" className="form__image" />
        </div>
        <div className="form__right">
          <div className="signup__heading">
            <h1>Sign In</h1>
          </div>
          <form action="" method="POST">
            <FormInput
              onInputChange={onInputChange}
              label="email"
              inputType="email"
              id="email"
              email
              required
            />
            <FormInput
              id="password"
              onInputChange={onInputChange}
              label="password"
              inputType="password"
              required
            />
          </form>
          <Button className="submit__button" onClick={formSubmitHandler}>
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
