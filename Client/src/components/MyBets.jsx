import rts from "../MyRoutes";
import { useDispatch } from "react-redux";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
import { useQuery } from "@apollo/client";
import { MY_BETS_QUERY } from "../GraphQL/Queries";

export default function MyBets() {
  const dispatch = useDispatch();
  dispatch(changeSportpaneAction(rts.myBets));
  dispatch(changeNavbarTabAction(rts.myBets));

  const { loading, error, data } = useQuery(MY_BETS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {data.myBets.map((bet) => (
                <div key={bet.id}>
                    <p>Bet ID: {bet.id}</p>
                    <p>Wager: {bet.wager}</p>
                    <p>Time Placed: {bet.timePlaced}</p>
                    <p>Total Payout: {bet.totalPayout}</p>
                    <p>Button ID: {bet.buttonId}</p>
                </div>
            ))}
        </div>
    );

  //return (
  //  <h1 className=" text-skin-overlay text-center text-2xl pt-28">My bets</h1>
  //);
}
