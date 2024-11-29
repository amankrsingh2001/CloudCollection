import { useState } from "react";
import { InputBox } from "../components/authComponents/InputBox";
import AuthButton from "../components/authComponents/AuthButton";
import { SigninInput } from "@a0xdev/medi-common";

const Signin = () =>{
    const [formValue, setFormValue] = useState<SigninInput>({
        email:'',
        password:'',
    })




    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };



      const submitHandler = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        console.log(formValue)

      }

  return (
    <div className="w-[80%] lg:max-w-sm px-8 shadow-lg rounded-xl ">
      <form
        onSubmit={submitHandler}
       className="flex w-full py-4 flex-col gap-4 "
      >
        <InputBox
          value = {formValue.email}
          label={"Email"}
          type={"text"}
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          changeHandler = {changeHandler}
        />
        <InputBox
         value = {formValue.password}
          label={"Password"}
          type={"password"}
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          changeHandler={changeHandler}
        />
 
        <AuthButton text={'Sign In'}/>
      </form>
    </div>
  );
}

export default Signin