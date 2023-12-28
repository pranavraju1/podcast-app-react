// we are creating this component bc we cannot style the chode file button

import React, { useState } from "react";
const FileInput = ({ accept, id, fileHandleFnc,text }) => {

  const [fileSelected,setFileSelected] = useState(false);
  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name)
    // e.target.files[0] this gives the name of the file
    fileHandleFnc(e.target.files[0]);
  };

  return (
    <>
      <label htmlFor={id} className={`custum-input ${!fileSelected ? "label-input":"active"}`}>
        {fileSelected ? `The File ${fileSelected} was Selected`:text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
    // when i will click on the label file browser will automatically open to upload the file
  );
};

export default FileInput;
