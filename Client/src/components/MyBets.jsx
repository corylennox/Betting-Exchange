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
      <div className="bg-skin-accent p-4">
        <div className="grid grid-cols-1 gap-4">
          {data.myBets.map((bet) => (
            <div
              key={bet.id}
              className="bg-skin-overlay rounded-2xl p-3 drop-shadow-md shadow-lg mb-3"
            >
              <div className="text-lg font-medium text-skin-header">
                Bet ID: {bet.id}
              </div>
              <div className="mt-2">
                <span className="font-medium text-skin-header">Wager:</span>{" "}
                {bet.wager}
              </div>
              <div className="mt-2">
                <span className="font-medium text-skin-header">
                  Time Placed:
                </span>{" "}
                {bet.timePlaced}
              </div>
              <div className="mt-2">
                <span className="font-medium text-skin-header">
                  Total Payout:
                </span>{" "}
                {bet.totalPayout}
              </div>
              <div className="mt-2">
                <span className="font-medium text-skin-header">Button ID:</span>{" "}
                {bet.buttonId}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  //return (
  //  <h1 className=" text-skin-overlay text-center text-2xl pt-28">My bets</h1>
  //);
}
