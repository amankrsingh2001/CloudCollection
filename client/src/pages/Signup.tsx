import React, { useEffect } from "react";
import { useState } from "react";
import { InputBox } from "../components/authComponents/InputBox";
import AuthButton from "../components/authComponents/AuthButton";
import { DatePickerDemo } from "../components/authComponents/DatePicker";
import axios from "axios";

const Signup = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);


  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateofBirth: "",
  });

  useEffect(() => {
    if (date) {
      setFormValue((prev) => ({
        ...prev,
        dateofBirth: date.toISOString().split("T")[0],
      }));
    }
  }, [date]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValue)
    const createUser = await axios.post('http://localhost:3000/api/v1/user/signup',{formValue})
    console.log(createUser,"This is the create user")
    
  };

  return (
    <div className=" lg:max-w-sm px-8 shadow-lg rounded-xl ">
      {/* <h1>{token}</h1> */}
      <form
        onSubmit={submitHandler}
        className="flex  w-full py-4 flex-col gap-4 "
      >
        <div className="flex gap-4 max-md:flex-wrap">
          <InputBox
            value={formValue.firstName}
            label={"First Name"}
            type={"text"}
            placeholder={"First Name"}
            name={"firstName"}
            id={"firstName"}
            changeHandler={changeHandler}
          />

          <InputBox
            value={formValue.lastName}
            label={"Last Name"}
            type={"text"}
            placeholder={"Last Name"}
            name={"lastName"}
            id={"lastName"}
            changeHandler={changeHandler}
          />
        </div>

        <InputBox
          value={formValue.username}
          label={"Username"}
          type={"text"}
          placeholder={"Choose a username"}
          name={"username"}
          id={"username"}
          changeHandler={changeHandler}
        />

        <InputBox
          value={formValue.email}
          label={"Email"}
          type={"text"}
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          changeHandler={changeHandler}
        />

        <InputBox
          value={formValue.password}
          label={"Password"}
          type={"password"}
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          changeHandler={changeHandler}
        />
        <div>
          <DatePickerDemo date={date} setDate={setDate} />
        </div>

        <AuthButton text={"Sign Up"} />
      </form>
    </div>
  );
};

export default Signup;
