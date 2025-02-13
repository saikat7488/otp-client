import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Verification.module.css";
import Success from "../success/Success";
import Failed from "../failed/Failed";
import PropTypes from "prop-types";
import { PiEnvelopeThin } from "react-icons/pi";
import CountdownTimer from "../countdownTimer/CountdownTimer";

const Verification = ({ length = 6 }) => {
  const location = useLocation();
  const email = location.state?.email;
  // otpKey, expire
  const otpKey = location.state?.otpKey;
  const expire = location.state?.expire;

  const navigate = useNavigate();

  const [otp, setOTP] = useState(new Array(length).fill("")); // update RealTime
  const [isVerified, setIsVerified] = useState(null); // null for loading, true for success, false for failed
  const inputRefs = useRef([]);

  const onVerificationHandler = (otp) => {
    console.log(otp);

    const otpFormat = Number(otp);
    const otpKeyFormat = Number(otpKey);

    // Check if OTP matches and is not expired
    const isOtpMatched = otpFormat === otpKeyFormat;
    const isNotExpired = Date.now() < expire;

    if (isOtpMatched && isNotExpired) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  const onTimeout = () => {
    setIsVerified(false);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const cloneOTP = [...otp];
    cloneOTP[index] = value.substring(value.length - 1);
    setOTP(cloneOTP);

    const combinedOTP = cloneOTP.join("");
    if (combinedOTP.length === length) {
      onVerificationHandler(combinedOTP);
    }

    // Focus Forward
    // if (value && index < length - 1 && inputRefs.current[index + 1]) {
    //   inputRefs.current[index + 1].focus();
    // }

    // Focus Forward logic with skip validation
    if (value) {
      let nextIndex = index + 1;

      // Skip non-empty fields and find the next empty field
      while (nextIndex < length && inputRefs.current[nextIndex].value !== "") {
        nextIndex++;
      }

      // If the next field is empty, focus it
      if (nextIndex < length && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  const handleOnClick = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].setSelectionRange(1, 1);
    }

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      !/^[0-9]$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }

    if (e.key === "Backspace") {
      if (index > 0 && inputRefs.current[index - 1] && !otp[index]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowLeft") {
      inputRefs.current[index].setSelectionRange(1, 1);
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowRight") {
      inputRefs.current[index].setSelectionRange(1, 1);
      if (index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const combinedOTP = otp.join(""); // Join OTP fields into a single string
    onVerificationHandler(combinedOTP);
  };

  // Conditional rendering based on OTP verification result
  if (isVerified === null) {
    // Show OTP input form while the status is loading
    return (
      <div className={style.verificationContainer}>
        <form className={style.container} onSubmit={onSubmitHandler}>
          <div className={style.info}>
            <div className={style.message}>
              We are sending an OTP to your email at
            </div>
            <div className={style.email}>
              <PiEnvelopeThin className={style.envelopIcon} />
              <span className={style.text}>{email}</span>
            </div>
            <div>
              <CountdownTimer onTimeout={onTimeout} />
            </div>
          </div>
          <div className={style.inputLabel}>Enter Verification Code</div>
          <div className={style.inputs}>
            {otp.map((ifield, index) => {
              return (
                <input
                  type="text"
                  ref={(el) => (inputRefs.current[index] = el)}
                  key={index}
                  value={ifield}
                  onChange={(e) => handleInputChange(e, index)}
                  onClick={() => handleOnClick(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  id={`inputField_${index}`}
                />
              );
            })}
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

  // After OTP is verified, show success or failure based on isVerified state
  return isVerified ? <Success /> : <Failed />;
};

// Define prop types
Verification.propTypes = {
  email: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
};

export default Verification;
