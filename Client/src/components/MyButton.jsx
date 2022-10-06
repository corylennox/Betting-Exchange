import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { myButtonClickedAction } from "../Actions";
import { parseMap } from "../utils";
import { getDisplayStr } from "../utils";

export default function MyButton(props) {
  const dispatch = useDispatch();

  const onCSS =
    "w-16 bg-skin-buttonActionSelected text-skin-actionSelected font-semibold border border-skin-buttonActionSelected rounded placeholder-shown:bg-red-500";
  const offCSS =
    "w-16 bg-skin-buttonActionUnselected hover:bg-skin-buttonActionHover text-skin-actionUnselected font-semibold hover:text-skin-actionHover border border-skin-buttonActionUnselected rounded placeholder-shown:bg-red-500";

  const betInfo = {
    line: props.line,
    contenderName: props.contenderName,
    contenderImage: props.contenderImage,
    buttonId: props.buttonId,
    type: props.type,
    title: props.title,
  };

  const toggledBets = parseMap(useSelector((state) => state.toggledBets));

  return (
    <button
      onClick={() => {
        dispatch(myButtonClickedAction(props.buttonId, betInfo));
      }}
      className={toggledBets.has(props.buttonId) ? onCSS : offCSS}
    >
      {getDisplayStr(props.line)}
    </button>
  );
}
