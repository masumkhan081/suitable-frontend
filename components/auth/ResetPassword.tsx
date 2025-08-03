"use client";
import React, { useState } from "react";
import EnhanceText from "../custom/EnhanceText";
import CustomInput from "../custom/CustomInput";
import CustomRadioGroup from "../custom/CustomRadioGroup";


import CustomButton from "../custom/CustomButton";
import { getSchemaValidation } from "@/0.lib/getSchemaValidation";
import { signupSchema } from "@/0.schema/auth.schema";
import { IErrorSignup } from "@/0.types/auth.type";
import CustomDatePicker from "../custom/CustomDatePicker";
//
export default function ResetPassword() {
  // states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  const initErrors = {
    username: "",
    email: "",
    password: "",
  };
  const [errors, setErrors] = useState(initErrors);
  //

  const handleSubmit = () => {
    const data = {
      username,
      email,
      password,
    };

    // send schema key, type key, initerror key

    const result = getSchemaValidation({
      schema: signupSchema,
      data,
    });

    if (result.success) {
      alert("ok................");
    } else {
      alert(JSON.stringify(result.error));
      setErrors((prevErrors) => ({ ...prevErrors, ...result.error }));
    }
  };

  return (
    <div className="h-full md:w-full lg:w-2/3 mx-auto flex flex-col gap-4  py-4 px-6">

      <div className=" flex-grow flex flex-col gap-5 justify-center items-center">
        <div className="w-full flex flex-col gap-1 items-center px-4 ">
          <EnhanceText txt="Suitable" styleKey="appTitle" />
          <EnhanceText
            txt="Start your soulmate search with world's most trusted matchmaking app: suitable .........."
            styleKey="subText"
          />
        </div>

        <form className="w-full flex flex-col gap-6">
          {/* name, email, password,gender (radiobutton), dob */}
          <EnhanceText txt="Create New Account" styleKey="formTitle" />
          <div className="flex flex-col gap-4">
            <CustomInput
              styleKey="authForm"
              label="Username"
              id="username"
              name="username"
              type="text"
              required
              ph="Username"
              value={username}
              error={errors.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <CustomInput
              styleKey="authForm"
              label="Email"
              id="email"
              name="email"
              type="email"
              required
              ph="Email"
              value={email}
              error={errors.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              styleKey="authForm"
              label="Password"
              id="password"
              name="password"
              type="password"
              required
              ph="Password"
              value={password}
              error={errors.password}
              onChange={(e) => setPassword(e.target.value)}
            />



          </div>

          <CustomButton
            styleKey="authForm"
            txt="Sign Up"
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleSubmit();
            }}
          />
        </form>
      </div>
    </div>
  );
}
