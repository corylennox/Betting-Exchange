import rts from "../MyRoutes";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
import { useQuery } from "@apollo/client";
import { MY_BETS_QUERY } from "../GraphQL/Queries";
import Tooltip from "./Tooltip";
import {
  ClockIcon,
  CubeIcon,
  CubeTransparentIcon,
} from "@heroicons/react/outline";

const paidSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    class="h-3 w-3"
  >
    <path
      fill-rule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clip-rule="evenodd"
    />
  </svg>
);

const lostSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    class="h-3 w-3"
  >
    <path d="M14.707 5.293a1 1 0 010 1.414L11.414 10l3.293 3.293a1 1 0 11-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 011.414-1.414L10 8.586l3.293-3.293a1 1 0 011.414 0z" />
  </svg>
);

const noFillCancelSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    class="h-3 w-3"
  >
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 110-20 10 10 0 010 20zm-1-15a1 1 0 112 0v8a1 1 0 11-2 0V5zm1 11a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

const partiallyCancelledSVG = <CubeTransparentIcon className="h-8 w-8" />;

const pendingSVG = <ClockIcon className="h-5 w-5" />;

const fullFillSVG = <CubeIcon className="h-5 w-5" />;

function printBetStatus(status) {
  let ret;
  switch (status) {
    case "paid":
      ret = (
        <span class="inline-flex items-center gap-1 rounded-full bg-green-300 px-2 py-1 text-xs font-semibold text-green-700">
          {paidSVG}
          Paid
        </span>
      );
      break;
    case "lost":
      ret = (
        <span class="inline-flex items-center gap-1 rounded-full bg-red-300 px-2 py-1 text-xs font-semibold text-red-700">
          {lostSVG}
          Lost
        </span>
      );
      break;
    case "cancelled":
      ret = (
        <span class="inline-flex items-center gap-1 rounded-full bg-gray-300 px-2 py-1 text-xs font-semibold text-gray-700">
          {noFillCancelSVG}
          Cancelled
        </span>
      );
      break;
    default:
      ret = "Unknown";
  }

  return ret;
}

function printOrderStatus(status) {
  let ret;
  switch (status) {
    case "fully_filled":
      ret = (
        <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold">
          {fullFillSVG}
          Confirmed
        </span>
      );
      break;
    case "cancelled_by_user":
    case "cancelled_by_exchange":
      ret = (
        <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold">
          {partiallyCancelledSVG}
          Partially Cancelled
        </span>
      );
      break;
    case "received_by_backend":
    case "submitted_to_matching_engine":
    case "resting_on_matching_engine":
      ret = (
        <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold">
          {pendingSVG}
          Pending
        </span>
      );
      break;
    default:
      ret = "Unknown";
  }

  return ret;
}

function MyBets() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  dispatch(changeSportpaneAction(rts.myBets));
  dispatch(changeNavbarTabAction(rts.myBets));

  const { loading, error, data } = useQuery(MY_BETS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sortedMyBetsArray = data.myBets.slice();
  sortedMyBetsArray.sort((a, b) => b.timePlaced - a.timePlaced);

  const openBetsArray = sortedMyBetsArray.filter(
    (bet) => bet.betStatus === "pending"
  );

  const settledBetsArray = sortedMyBetsArray.filter(
    (bet) => bet.betStatus !== "pending"
  );

  return (
    <div>
      <div className="mx-auto mt-5 max-w-min overflow-hidden rounded-xl border border-gray-100 bg-skin-header p-1">
        <ul className="flex items-center justify-center gap-2 text-sm font-medium">
          <li>
            <button
              onClick={() => setActiveTab(0)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-gray-700 hover:shadow ${
                activeTab === 0
                  ? "bg-skin-mybetsselected text-gray-700 shadow"
                  : ""
              }`}
            >
              Open
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab(1)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-gray-700 hover:shadow ${
                activeTab === 1
                  ? "bg-skin-mybetsselected text-gray-700 shadow"
                  : ""
              }`}
            >
              Settled
            </button>
          </li>
        </ul>
      </div>
      <div className="py-5">
        {/* Open Bets */}
        <div className={`${activeTab === 0 ? "block" : "hidden"}`}>
          <div class="ml-10 mr-10 overflow-hidden rounded-lg border border-gray-200 bg-skin-overlay shadow-md">
            <table class="w-full border-collapse text-center text-sm text-skin-body">
              <thead class="bg-skin-header">
                <tr>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Bet ID
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Date Placed
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Time Placed
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Wager
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Total Payout
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Button ID
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Order Status
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {openBetsArray.map((bet) => (
                  <tr class="">
                    <td class="px-6 py-4">{bet.id}</td>
                    <td class="px-6 py-4 text-skin-body">
                      {new Date(
                        parseInt(bet.timePlaced) / 1000000
                      ).toLocaleDateString()}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      {new Date(
                        parseInt(bet.timePlaced) / 1000000
                      ).toLocaleTimeString()}
                    </td>
                    <td class="px-6 py-4">
                      {bet.orderStatus.includes("cancelled") ? (
                        <span class="flex items-center">
                          <span class="text-gray-400">$#.##/&nbsp;</span>
                          <span class="mr-1">
                            ${(bet.wager / 100).toFixed(2)}
                          </span>
                          <Tooltip type={bet.orderStatus} />
                        </span>
                      ) : (
                        <span>${(bet.wager / 100).toFixed(2)}</span>
                      )}
                    </td>
                    <td class="px-6 py-4">
                      ${(bet.totalPayout / 100).toFixed(2)}
                    </td>
                    <td class="px-6 py-4">{bet.buttonId}</td>
                    <td class="px-6 py-4 text-left">
                      {printOrderStatus(bet.orderStatus)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Settled Bets */}
        <div className={`${activeTab === 1 ? "block" : "hidden"}`}>
          <div class="ml-10 mr-10 overflow-hidden rounded-lg border border-gray-200 bg-skin-overlay shadow-md">
            <table class="w-full border-collapse text-center text-sm text-skin-body">
              <thead class="bg-skin-header">
                <tr>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Bet ID
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Date Placed
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Time Placed
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Wager
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Total Payout
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Button ID
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {settledBetsArray.map((bet) => (
                  <tr class="">
                    <td class="px-6 py-4">{bet.id}</td>
                    <td class="px-6 py-4 text-skin-body">
                      {new Date(
                        parseInt(bet.timePlaced) / 1000000
                      ).toLocaleDateString()}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      {new Date(
                        parseInt(bet.timePlaced) / 1000000
                      ).toLocaleTimeString()}
                    </td>
                    <td class="px-6 py-4">
                      {bet.orderStatus.includes("cancelled") ? (
                        <span class="flex items-center">
                          <span class="text-gray-400">$#.##/&nbsp;</span>
                          <span class="mr-1">
                            ${(bet.wager / 100).toFixed(2)}
                          </span>
                          <Tooltip type={bet.orderStatus} />
                        </span>
                      ) : (
                        <span>${(bet.wager / 100).toFixed(2)}</span>
                      )}
                    </td>
                    <td class="px-6 py-4">
                      ${(bet.totalPayout / 100).toFixed(2)}
                    </td>
                    <td class="px-6 py-4">{bet.buttonId}</td>
                    <td class="px-6 py-4">{printBetStatus(bet.betStatus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBets;
