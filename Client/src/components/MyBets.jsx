import rts from "../MyRoutes";
import { useDispatch } from "react-redux";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";

export default function MyBets() {
  const dispatch = useDispatch();
  dispatch(changeSportpaneAction(rts.myBets));
  dispatch(changeNavbarTabAction(rts.myBets));

  return (
    <h1 className=" text-skin-overlay text-center text-2xl pt-28">My bets</h1>
  );
}
