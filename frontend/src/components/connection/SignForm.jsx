import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

import InputPassword from "./InputPassword";

import useAuth from "../../hooks/useAuth";
import * as User from "../../services/users";
import TOAST_DEFAULT_CONFIG from "../../settings/toastify.json";

const initialCredentials = { email: "", password: "" };

export default function SignForm({ isSignIn }) {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfVisible, setPasswordConfVisible] = useState(false);

  const { updateAccount } = useAuth();

  const passwordType = passwordVisible ? "text" : "password";
  const passwordConfType = passwordConfVisible ? "text" : "password";

  const handleChange = (e) =>
    setCredentials((c) => ({ ...c, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        const { data: userInfo } = await User.login(credentials);
        updateAccount(userInfo);
      }
      if (!isSignIn) {
        // make sure password and confirmation password match
        if (credentials.password !== confirmationPassword) {
          toast.warn(`Passwords do not match!`, TOAST_DEFAULT_CONFIG);
        } else {
          const res = await User.register(credentials);

          if (res?.status === 201) {
            toast.success("Account created. Welcome to Origins e-Sport!", {
              ...TOAST_DEFAULT_CONFIG,
              autoClose: 2000,
            });
            // re-direct to Sign In after waiting for toastify
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }

          // account with same email already existing
          if (res?.status === 200) {
            toast.warning(`${res.data}...`, TOAST_DEFAULT_CONFIG);
          }
        }
      }
    } catch (err) {
      console.error(err);
      const errorMessage = isSignIn ? err?.response?.data : err.message;
      toast.warn(`${errorMessage}`, TOAST_DEFAULT_CONFIG);
    }
  };

  return (
    <form
      className="flex h-full flex-col items-center justify-center gap-4 bg-neutralLightest px-12 text-center text-neutralDarkest dark:bg-primaryDark"
      onSubmit={handleSubmit}
    >
      <h2 className="font-header text-xl uppercase text-neutralDarkest dark:text-neutralLightest">
        {isSignIn ? "Sign In" : "Create Account"}
      </h2>

      <input
        type="email"
        placeholder="Email"
        className=" w-full rounded border-none bg-neutralLight p-3 outline-none dark:bg-neutralLightest"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        pattern="[A-z0-9._%+\-]+@[A-z0-9.\-]+\.[A-z]{2,4}$"
        required
        title="example@test.com"
        autoComplete="on"
      />

      <InputPassword
        type={passwordType}
        name="password"
        placeholder="Password"
        value={credentials.password}
        isVisible={passwordVisible}
        onInputChange={handleChange}
        onButtonClick={() => setPasswordVisible(!passwordVisible)}
      />

      {!isSignIn && (
        <InputPassword
          type={passwordConfType}
          placeholder="Confirm password"
          value={confirmationPassword}
          isVisible={passwordConfVisible}
          onInputChange={(e) => setConfirmationPassword(e.target.value)}
          onButtonClick={() => setPasswordConfVisible(!passwordConfVisible)}
        />
      )}
      <button type="submit" className="connect-button">
        {isSignIn ? "Sign In" : "Register"}
      </button>
    </form>
  );
}

SignForm.propTypes = {
  isSignIn: PropTypes.bool.isRequired,
};
