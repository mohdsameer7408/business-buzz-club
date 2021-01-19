import React, { useCallback, useReducer } from "react";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import "../assets/css/RegisterScreen.css";
import "../assets/css/LoginScreen.css";
import FormImage from "../assets/images/form-login.png";
import FormInput from "../components/FormInput";
import { auth } from "../features/firebase";

const UPDATE_FORM = "UPDATE_FORM";
const RESET_FORM = "RESET_FORM";
const initialState = {
  values: {
    email: "",
    password: "",
  },
  validities: {
    email: false,
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

function LoginScreen() {
  const history = useHistory();
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
        await auth.signInWithEmailAndPassword(
          formData.values.email,
          formData.values.password
        );
        dispatchFormState({ type: RESET_FORM });
        history.replace("/");
      } catch (error) {
        alert(error.message);
      }
    },
    [formData, dispatchFormState, history]
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
              errorText="Invalid Email!"
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
            >
              Log In
            </Button>
          </form>
          <span className="form__link">
            Don't have an account? <Link to="/register">Register Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
