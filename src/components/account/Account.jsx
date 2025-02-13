import { useState } from "react";
import style from "./Account.module.css";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form"; // Import react-hook-form
import * as Yup from "yup"; // Import Yup for validation
import { yupResolver } from "@hookform/resolvers/yup"; // Import resolver for Yup

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
});

const Account = ({ onEmailSubmit, isLoading }) => {
  const [inputEmailValue, setInputEmailValue] = useState("");

  // Use react-hook-form to handle form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Pass Yup schema to the resolver
  });

  const handleOnSubmit = (data) => {
    onEmailSubmit(data.email); // Pass the email to the parent component
  };

  return (
    <form
      className={`${style.container} ${isLoading ? style.isLoading : null}`}
      onSubmit={handleSubmit(handleOnSubmit)} // Use handleSubmit from react-hook-form
    >
      <h2>Subscribe</h2>
      <label htmlFor="inputField">Enter Your Email Address</label>
      <input
        type="email" // Change to 'email' for better validation
        id="inputField"
        maxLength="30"
        placeholder="Enter Your Email Address"
        {...register("email")} // Register the email input with react-hook-form
        value={inputEmailValue}
        onChange={(e) => {
          setInputEmailValue(e.target.value);
        }}
        required
      />
      <input
        type="submit"
        value={isLoading ? "Sending..." : "Send OTP"}
        disabled={isLoading}
      />
      {/* Display validation error message if present */}
      {errors.email && <p className={style.error}>{errors.email.message}</p>}
    </form>
  );
};

// Define the PropTypes for the component
Account.propTypes = {
  onEmailSubmit: PropTypes.func.isRequired, // Ensure onEmailSubmit is a required function
  isLoading: PropTypes.bool.isRequired,
};

export default Account;
