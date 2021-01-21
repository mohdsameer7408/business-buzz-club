import React, { useEffect, useReducer, useState } from "react";
import { Visibility, VisibilityOff, CheckCircle } from "@material-ui/icons";

import "../assets/css/FormInput.css";

const INPUT_CHANGE = "INPUT_CHANGE";
const SET_INPUT = "SET_INPUT";

const inputReducer = (state, action) => {
  switch (action.type) {
    case SET_INPUT:
      return { ...state, ...action.payload };

    case INPUT_CHANGE:
      const { value, isValid } = action.payload;
      return {
        ...state,
        value,
        isValid,
        touched: true,
      };

    default:
      return state;
  }
};

function FormInput({
  inputType,
  label,
  id,
  required,
  min,
  max,
  minLength,
  email,
  initialValue,
  initiallyValid,
  onInputChange,
  errorText,
  ...rest
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [{ value, isValid, touched }, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : "",
    isValid: initiallyValid ? initiallyValid : false,
    touched: false,
  });

  useEffect(() => {
    dispatch({
      type: SET_INPUT,
      payload: {
        value: initialValue,
        isValid: initiallyValid,
        touched: false,
      },
    });
  }, [initialValue, initiallyValid]);

  useEffect(() => {
    onInputChange(id, value, isValid);
  }, [id, value, isValid, onInputChange]);

  const onValueChangeHandler = (event) => {
    const text = event.target.value;

    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;

    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min !== null && +text < min) {
      isValid = false;
    }
    if (max !== null && +text > max) {
      isValid = false;
    }
    if (minLength !== null && text.length < minLength) {
      isValid = false;
    }

    dispatch({
      type: INPUT_CHANGE,
      payload: {
        value: text,
        isValid,
      },
    });
  };

  return (
    <div className="input__container">
      <h3 className="label__field">{label.toUpperCase()}</h3>
      <div className="field__container">
        <input
          className={`input__field ${
            touched && !isValid && "input__fieldError"
          }`}
          required
          {...rest}
          type={
            inputType
              ? id.toLowerCase().includes("password")
                ? isPasswordVisible
                  ? "text"
                  : "password"
                : inputType
              : "text"
          }
          name={label}
          id={id}
          value={value}
          onChange={onValueChangeHandler}
        />
        {id.toLowerCase().includes("password") ? (
          <div
            className="right__icon"
            onClick={() => setIsPasswordVisible((prevState) => !prevState)}
          >
            {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
          </div>
        ) : (
          isValid && (
            <div className="right__icon">
              <CheckCircle className="right__iconCheck" />
            </div>
          )
        )}
      </div>
      {touched && !isValid && (
        <span className="input__error">
          {errorText ? errorText : "Invalid Input!"}
        </span>
      )}
    </div>
  );
}

export default FormInput;
