import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({ email: "", password: "" });
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      email.trim() === "" &&
        setErrorMessage((prev) => {
          return { ...prev, email: "Required" };
        });
      password.trim() === "" &&
        setErrorMessage((prev) => {
          return { ...prev, password: "Required" };
        });
      return;
    }
    const emailRegEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegEx.test(email)) {
      setErrorMessage((prev) => {
        return { ...prev, email: "Invalid email address" };
      });
      return;
    }
    if (password.length < 6) {
      setErrorMessage((prev) => {
        return {
          ...prev,
          password: "Minimum 6 characters required",
        };
      });
      return;
    }
    await login({ email, password });

    console.log({ loading, error: error.response.data.error });
    if (error) {
      return;
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (email.trim() !== "") {
      setErrorMessage((prev) => {
        return { ...prev, email: "" };
      });
    }
    if (password.trim() !== "") {
      setErrorMessage((prev) => {
        return { ...prev, password: "" };
      });
    }
  }, [email, password]);

  useEffect(() => {
    if (error && error.response.data.error === "Incorrect email") {
      setErrorMessage((prev) => {
        return { ...prev, email: error.response.data.error };
      });
      return;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, email: "" };
      });
    }
    if (error && error.response.data.error === "Incorrect password") {
      setErrorMessage((prev) => {
        return { ...prev, password: error.response.data.error };
      });
      return;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, password: "" };
      });
    }
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-12 py-16 shadow-lg rounded-xl mt-8 w-full md:w-2/3 sm:mx-auto flex flex-col gap-4"
    >
      <h4 className="text-lg text-center font-bold mb-2">Log in</h4>

      <div className="w-full flex flex-col gap-2">
        <label>Email :</label>
        <FormInput
          type="text"
          // required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p className="text-red-400 text-sm ml-4">{errorMessage.email}</p>
      </div>

      <div className="w-full flex flex-col gap-2">
        <label>Password :</label>
        <FormInput
          type="password"
          // required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-400 text-sm ml-4">{errorMessage.password}</p>
      </div>

      <input
        type="submit"
        value="Login"
        disabled={loading}
        className={`mt-4 bg-white/60 hover:bg-gray-100 hover:border-gray-400 text-sm px-3 py-2 border-2 border-gray-400/50 rounded-full cursor-pointer focus:border-gray-500/80 transition-colors ease-in-out duration-300 font-semibold ${
          loading && "text-gray-300 hover:border-gray-300"
        }`}
      />
    </form>
  );
};

export default Login;
