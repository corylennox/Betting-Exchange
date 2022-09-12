import React, { useState } from "react";


export default function MyButton(props) {
  const onCSS =
    "w-16 bg-blue-600 text-white font-semibold border border-gray-800 border rounded placeholder-shown:bg-red-500";
  const offCSS =
    "w-16 bg-transparent hover:bg-gray-200 text-blue-600 font-semibold hover:text-blue-800 border border-blue-600 rounded placeholder-shown:bg-red-500";

  const [isToggleOn, setIsToggleOn] = useState(false);

  const betInfo = {
    line: props.line,
    contenderName: props.contenderName,
    contenderImage: props.contenderImage,
    buttonId: props.buttonId,
    type: props.type,
    title: props.title,
  };

  return (
    <button
      onClick={() => setIsToggleOn(!isToggleOn)}
      className={isToggleOn ? onCSS : offCSS}
    >
      {props.line}
    </button>
  );
}
