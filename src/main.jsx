import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store"; // Import your store
import { Provider } from "react-redux"; // Import the Provider component

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router basename="/otp-client/">
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
