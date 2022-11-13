import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { myButtonClickedAction } from "../Actions";
import { parseMap } from "../utils";
import { getDisplayStr } from "../utils";

export default function MyButton(props) {
  const dispatch = useDispatch();
  let width = "w-16"

  if(props.type === "GameBet")
  width = "w-full mx-1 min-w-16";

  const onCSS =
    `bg-skin-buttonActionSelected text-skin-actionSelected font-semibold border border-skin-buttonActionSelected rounded placeholder-shown:bg-red-500 ${width}`;
  const offCSS =
    `bg-skin-buttonActionUnselected hover:bg-skin-buttonActionHover text-skin-actionUnselected font-semibold hover:text-skin-actionHover border border-skin-buttonActionUnselected rounded placeholder-shown:bg-red-500 ${width}`;

  const betInfo = {
    contenderName: props.contenderName,
    contenderImage: props.contenderImage,
    buttonId: props.buttonId,
    type: props.type,
    title: props.title,
  };

  const toggledBets = parseMap(useSelector((state) => state.toggledBets));
  const linesContainer = parseMap(useSelector((state) => state.lines));

  return (
    <button
      onClick={() => {
        dispatch(myButtonClickedAction(props.buttonId, betInfo));
      }}
      className={toggledBets.has(props.buttonId) ? onCSS : offCSS}
    >
      {getDisplayStr(linesContainer.get(props.buttonId))}
    </button>
  );
}
