import React from "react";

interface Props {
  name: string;
  label: string;
  type: "text" | "number";
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
}

const Input = (props: Props) => {
  return (
    <div className="flex flex-col drop-shadow bg-lime-100 p-5 m-5 rounded-lg">
      <label>{props.label}</label>
      {props.helperText && (
        <p className="text-sm italic text-lime-600 mb-2">{props.helperText}</p>
      )}
      <input
        name={props.name}
        onChange={props.onChange}
        type={props.type}
        value={props.value}
        className="border-2 border-lime-600 p-2 rounded-lg"
      />
      {props.error && <p>{props.error}</p>}
    </div>
  );
};

export default Input;
