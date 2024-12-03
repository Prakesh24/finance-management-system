import React from "react";
import { useState } from "react";
// import { useLogin } from "../../hook/useLogin";
import { Link, useNavigate } from "react-router-dom";
// import LoginFooter from "../Footer/LoginFooter";
// import { facebook, google, loginIcon, signup as J } from "../../utils/Icons";
// import { useSignup } from "../../hook/useSignup";
// import { auth, providerf } from "../../FirebaseConfig";
import { Eye, Lock, User } from 'lucide-react'
// import {
//   FacebookAuthProvider,
//   GoogleAuthProvider,
//   getAuth,
//   signInWithPopup,
// } from "firebase/auth";
import axios from "axios";
import authValidators from "../../validators/auth.validation";
import authServices from "../../services/auth.service";
import { useAuth } from "../../context/auth-context";
import { successToast } from "../toastNotifications";

const Login = () => {
  const [error, setError] = useState(false)
  const [user, setUser] = useState(null);


  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: ''
  })
  const { setIsAuth } = useAuth()
  const [errors, setErrors] = useState(null)

  console.log(initialValues);
  const navigate = useNavigate()
  const handleChange = (key, value) => {
    if (!key) return
    setInitialValues((prev) => {
      return {
        ...prev,
        [key]: value
      }
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  console.log(errors);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const { errors, isValid } = authValidators.loginValidator(initialValues)

      if (!isValid) {
        setErrors(errors)
        return
      }

      let res = await authServices.login(initialValues);

      if (res.data) {
        setLoading(false)
        setIsAuth(true)
        navigate('/dashboard')
        return
      }
    } catch (e) {
      console.log(e);
      successToast(e?.response?.data?.message)
    }
  };


  return (
    <div className="bg-gray-200 min-h-screen flex flex-col lg:grid lg:grid-cols-2 gap-8">
      <div className="flex-2 lg:relative mx-auto lg:mx-0 py-4 lg:py-0">
        <h1 className="lg:absolute top-8 left-24 right-20 text-green-950 text-2xl lg:text-8xl font-bold ">
          <span className="font-serif font-extrabold"> Welcome</span> to
          Personal Finance Tracker
        </h1>
      </div>

      <div className="max-w-md mx-auto px-8 py-4 shadow-black rounded-lg shadow-2xl my-4 bg-purple-600 h-[40em]">
        <form className="login" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-4xl font-bold text-white text-center mb-4">
              Log In
            </h3>
            <p className="text-lg font-light text-white text-center mb-4">
              Get started with Personal Finance Tracker
            </p>
          </div>
          <div className="flex flex-col gap-6 ">
            <div className="flex flex-col gap-4">
              {errors?.email && <span className="text-red-500">{errors.email}</span>}
              <label className=" text-white text-2xl">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full p-2 pl-10 border rounded-md text-black"
                  placeholder="Email"
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <User />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {errors?.password && <span className="text-red-500">{errors.password}</span>}
              <label className=" text-white text-2xl flex items-center gap-4">
                <span>Password</span>
                <Eye onClick={togglePasswordVisibility} className="cursor-pointer" />
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full p-2 pl-10 border rounded-md text-black"
                  placeholder="Password"
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Lock />
                </div>
              </div>
            </div>
          </div>

          {error && <div className=" text-red-500">{error}</div>}
          <button type="submit" className="w-full mb-4 mt-4 h-12 bg-blue-500 text-white font-bold rounded-md">
            Login
          </button>
        </form>

        <hr className="my-2" />
        <p className="text-white">or create new account</p>
        <Link to="/auth/signup">
          <button className="w-full mb-4 mt-4 h-12 bg-blue-500 text-white font-bold rounded-md " >
            Sign Up
          </button>
        </Link>

        {/* <div>
          <Link
            to="/GettingStarted"
            className="bg-blue-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded inline-block"
          >
            getting started
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
