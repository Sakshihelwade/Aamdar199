import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import { v1 as uuidv1 } from 'uuid';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for eye and eye slash

// Validation schema using Yup
const schema = yup
  .object({
    userName: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [deviceId, setDeviceID] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue, 
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    let storedDeviceId = localStorage.getItem("deviceId");
    if (!storedDeviceId) {
      storedDeviceId = uuidv1();
      localStorage.setItem("deviceId", storedDeviceId);
    }
    setDeviceID(storedDeviceId);
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = {
        userName: data.userName,
        password: data.password,
        deviceId: deviceId,
      };
  
      const response = await axios.post(`${base_url}/api/Login`, payload);
      const { token, _id, userName, role } = response.data.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('_id', _id);
      localStorage.setItem('userName', userName);
      localStorage.setItem('role', role);
  
      if (response.status === 200) {
        if (role === 'Admin') {
          toast.success("Login successful!");
          dispatch(handleLogin(response.data));
          navigate("/dashboard");
        } else {
          toast.error("Access denied.");
          localStorage.clear();
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Username Input */}
      <Textinput
        name="userName"
        label="Username"
        placeholder="Enter your email as username"
        type="text"
        register={register}
        error={errors.userName}
        className="h-[48px]"
      />

      {/* Password Input */}
      <div className="relative">
        <Textinput
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"} // Toggle input type between text and password
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          className="h-[48px]"
        />
        {/* Eye button to toggle password visibility */}
        <div
          className="absolute inset-y-0 mt-8 right-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FaEyeSlash className="text-gray-500" /> // EyeSlash icon when password is visible
          ) : (
            <FaEye className="text-gray-500" /> // Eye icon when password is hidden
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
