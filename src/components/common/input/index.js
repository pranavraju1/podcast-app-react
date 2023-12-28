import React from "react";
import "./style.css"
function InputComponent({type, state,setState,placeholder,required}) {
  return (
    <input
      type={type}
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="custum-input"
    />
  );
}

export default InputComponent;
