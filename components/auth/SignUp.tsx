// @ts-nocheck
"use client";
import React, { useState } from "react";
import EnhanceText from "../custom/EnhanceText";
import CustomInput from "../custom/CustomInput";
import CustomRadioGroup from "../custom/CustomRadioGroup";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import CustomButton from "../custom/CustomButton";
import { getSchemaValidation } from "@/lib/getSchemaValidation";
import { signupSchema } from "@/schema/auth.schema";
import { IErrorSignup } from "@/types/auth.type";
import CustomDatePicker from "../custom/CustomDatePicker";
//
export default function SignUp() {
  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState<Date | null>(null);
  //
  const initErrors: IErrorSignup = {
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
  };
  const [errors, setErrors] = useState(initErrors);
  //

  const handleSubmit = () => {
    const data = {
      name,
      email,
      password,
      gender,
      dob,
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
              label="Name"
              id="name"
              name="name"
              type="text"
              required
              ph="Full Name"
              value={name}
              error={errors.name}
              onChange={(e) => setName(e.target.value)}
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

            <CustomRadioGroup
              label="Gender"
              styleKey="authForm"
              options={["Male", "Female"]}
              name="gender"
              value={gender}
              onChange={setGender}
            />

            <CustomDatePicker label="Date of Birth" value={dob} onChange={(e) => setDob(e)} />

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
