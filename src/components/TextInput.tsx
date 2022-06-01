import React, { FC } from 'react';

const TextInput: FC<{
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  placeholder: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
}> = ({ onChange, onBlur, value, placeholder, name, label }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={name}
        className="text-xs uppercase tracking-wide font-medium"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className="h-10 border-moss border rounded-md text-sm px-2 outline-none focus:outline-moss"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
