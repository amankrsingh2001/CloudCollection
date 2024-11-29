import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

interface SignupValue {
  type: string;
  id: string;
  placeholder: string;
  label: string;
  name: string;
  value: string;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

export function InputBox({
  value,
  type,
  id,
  placeholder,
  label,
  name,
  changeHandler,
}: SignupValue) {
  const [showPassword, setShowPassword] = useState(type);

  return (
    <div
      className={`grid w-full  items-center gap-2 ${
        id === "password" ? "relative" : ""
      }`}
    >
      <Label className="text-mood-blue" htmlFor={id}>{label}</Label>
      {id === "password" && (
        <div
          onClick={() =>
            showPassword === "password"
              ? setShowPassword("text")
              : setShowPassword("password")
          }
          className="absolute right-3 bottom-2.5"
        >
          {showPassword === "password" ? <FaEyeSlash /> : <FaEye />}
        </div>
      )}

      <Input
        value={value}
        type={showPassword}
        id={id}
        placeholder={placeholder}
        name={name}
        onChange={changeHandler}
      />
    </div>
  );
}
