// import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Account from "./components/account/Account";
import Verify from "./components/verification/Verification";
import Profile from "./components/profile/Profile";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [emailInput, setEmailInput] = useState();
  const navigate = useNavigate();

  // This effect runs when emailInput is set and redirects if necessary
  useEffect(() => {
    if (!emailInput) {
      navigate("/"); // Redirect to the home page if the email is not set
    }
  }, [emailInput, navigate]); // Depend on emailInput to run effect when it changes

  const onEmailSubmit = async (email) => {
    setEmailInput(email);
    setIsLoading(true);

    try {
      const response = await axios.post("https://otp-server-smpm.onrender.com/email-service", {
        to: email, // Sending email in the request body
      });

      if (response.status === 200) {
        const { otpKey, expire } = response.data;
        navigate("/verify", { state: { email, otpKey, expire } }); // Navigate on success
      } else {
        console.error("Unexpected response:", response);
        navigate("/"); // Navigate to home if the response is not OK
      }
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response?.data || error.message
      );
      navigate("/"); // Navigate to home if there's an error
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Account onEmailSubmit={onEmailSubmit} isLoading={isLoading} />
        }
      ></Route>
      <Route path="/verify" element={<Verify />} />
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  );
};

export default App;
