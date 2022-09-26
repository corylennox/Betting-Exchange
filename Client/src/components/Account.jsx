import rts from "../MyRoutes";
import { useDispatch } from "react-redux";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";

export default function Account() {
  const dispatch = useDispatch();
  dispatch(changeSportpaneAction(rts.account));
  dispatch(changeNavbarTabAction(rts.account));

  return (
    <h1 className=" text-slate-800 text-center text-2xl pt-28">Account</h1>
  );
}
