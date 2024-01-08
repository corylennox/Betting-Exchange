import rts from "../MyRoutes";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
import { useQuery } from "@apollo/client";
import { MY_BETS_QUERY } from "../GraphQL/Queries";
import Tooltip from "./Tooltip";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  CubeIcon,
  CubeTransparentIcon,
} from "@heroicons/react/outline";
import PromptButton from "./PromptButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useSpring, animated, config } from "react-spring";

const paidSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-3 w-3"
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
);

const lostSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-3 w-3"
  >
    <path d="M14.707 5.293a1 1 0 010 1.414L11.414 10l3.293 3.293a1 1 0 11-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 011.414-1.414L10 8.586l3.293-3.293a1 1 0 011.414 0z" />
  </svg>
);

const noFillCancelSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-3 w-3"
  >
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 110-20 10 10 0 010 20zm-1-15a1 1 0 112 0v8a1 1 0 11-2 0V5zm1 11a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

const partiallyCancelledSVG = <CubeTransparentIcon className="h-4 w-4" />;

const pendingSVG = <ClockIcon className="h-4 w-4" />;

const fullFillSVG = <CubeIcon className="h-4 w-4" />;

function printStatus(betStatus, orderStatus) {
  let ret;

  //Open Bets
  if (betStatus === "pending") {
    switch (orderStatus) {
      case "fully_filled":
        ret = (
          <span className="inline-flex items-center gap-1 py-1 text-xs font-semibold">
            {fullFillSVG}
            Confirmed
          </span>
        );
        break;
      case "cancelled_by_user":
      case "cancelled_by_exchange":
        ret = (
          <span className="inline-flex items-center gap-1 py-1 text-xs font-semibold">
            {partiallyCancelledSVG}
            Partially Cancelled
          </span>
        );
        break;
      case "received_by_backend":
      case "submitted_to_matching_engine":
      case "resting_on_matching_engine":
        ret = (
          <span className="inline-flex items-center gap-1 py-1 text-xs font-semibold">
            {pendingSVG}
            Pending
          </span>
        );
        break;
      default:
        ret =
          "An error occured. Bet status: " +
          betStatus +
          ", Order status: " +
          orderStatus;
    }
  }

  //Settled Bets
  else {
    if (orderStatus.includes("cancelled")) {
      switch (betStatus) {
        case "paid":
          ret = (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-300 px-2 py-1 text-xs font-semibold text-green-700">
              {paidSVG}
              Paid &#40;Partially Cancelled&#41;
            </span>
          );
          break;
        case "lost":
          ret = (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-300 px-2 py-1 text-xs font-semibold text-red-700">
              {lostSVG}
              Lost &#40;Partially Cancelled&#41;
            </span>
          );
          break;
        case "cancelled":
          ret = (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-300 px-2 py-1 text-xs font-semibold text-gray-700">
              {noFillCancelSVG}
              Fully Cancelled
            </span>
          );
          break;
        default:
          ret =
            "An error occured. Bet status: " +
            betStatus +
            ", Order status: " +
            orderStatus;
      }
    } else {
      switch (betStatus) {
        case "paid":
          ret = (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-300 px-2 py-1 text-xs font-semibold text-green-700">
              {paidSVG}
              Paid
            </span>
          );
          break;
        case "lost":
          ret = (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-300 px-2 py-1 text-xs font-semibold text-red-700">
              {lostSVG}
              Lost
            </span>
          );
          break;
        default:
          ret =
            "An error occured. Bet status: " +
            betStatus +
            ", Order status: " +
            orderStatus;
      }
    }
  }

  return ret;
}

function OpenBetAccordionItem({ bet, isOpen, onClick }) {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const springProps = useSpring({
    to: { height: isOpen ? contentHeight : 0 },
    from: { height: 0 },
    config: {
      ...config.default,
      duration: 300,
      easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    }, // Custom ease-in-out cubic function
  });

  return (
    <div
      onClick={onClick}
      key={bet.id}
      className="relative cursor-pointer select-none border-b border-gray-400 pt-2"
    >
      <h3 className="flex w-full justify-between text-lg font-semibold">
        <span>{bet.betTitle}</span>
        <span className="ml-3 text-right font-bold">
          {bet.line > 0 ? `+${bet.line / 10}` : bet.line / 10}
        </span>
      </h3>
      <div className="inline-flex w-full justify-between text-sm">
        <span>
          Wagered{" "}
          {bet.orderStatus.includes("cancelled") ? (
            <span className=" inline-flex items-center">
              <span className="text-gray-400">$#.##/&nbsp;</span>
              <span className="mr-1">${(bet.wager / 100).toFixed(2)}</span>
              <Tooltip type={bet.orderStatus} />
            </span>
          ) : (
            <span>${(bet.wager / 100).toFixed(2)}</span>
          )}
        </span>
        <span className="inline-flex items-center text-right text-sm">
          Returned ${(bet.totalPayout / 100).toFixed(2)}
        </span>
      </div>
      <div className="flex flex-col"></div>
      <animated.div
        style={{ ...springProps, overflow: "hidden" }}
        ref={contentRef}
        className={"mt-2"}
      >
        <div className="flex w-full items-center">
          <span className=" w-1/12 border-t border-gray-200"></span>
          <span className="bg-white px-2 text-gray-600">Event Information</span>
          <span className="flex-grow border-t border-gray-200"></span>
        </div>
        <p className="text-xs"> {bet.gameTitle} </p>
        <p className="text-xs"> {bet.gameStartTime} </p>
        <div className="flex w-full items-center">
          <span className=" w-1/12 border-t border-gray-200"></span>
          <span className="bg-white px-2 text-gray-600">Bet Information</span>
          <span className="flex-grow border-t border-gray-200"></span>
        </div>
        <p className="text-xs">
          Placed{" "}
          {new Date(parseInt(bet.timePlaced) / 1000000).toLocaleString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              timeZoneName: "short",
            }
          )}
        </p>
        <div className="flex items-end justify-between ">
          <div className="text-xs uppercase tracking-wide">
            {printStatus(bet.betStatus, bet.orderStatus)}
          </div>
        </div>
        <p className="h-2 w-full text-right text-xs text-gray-300">
          Bet ID{" " + bet.id}
        </p>
      </animated.div>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 transform text-gray-400">
        {!isOpen ? (
          <ChevronDownIcon className="h-3 w-3" />
        ) : (
          <ChevronUpIcon className="h-3 w-3" />
        )}
      </span>
    </div>
  );
}

function SettledBetAccordionItem({ bet, isOpen, onClick }) {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const springProps = useSpring({
    to: { height: isOpen ? contentHeight : 0 },
    from: { height: 0 },
    config: {
      ...config.default,
      duration: 300,
      easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    }, // Custom ease-in-out cubic function
  });

  return (
    <div
      onClick={onClick}
      key={bet.id}
      className="relative cursor-pointer select-none border-b border-gray-400 pt-2"
    >
      <h3 className="flex w-full justify-between text-lg font-semibold">
        <span>{bet.betTitle}</span>
        <span className="ml-3 text-right font-bold">
          {bet.line > 0 ? `+${bet.line / 10}` : bet.line / 10}
        </span>
      </h3>
      <div className="inline-flex w-full justify-between text-sm">
        <span>
          Wagered{" "}
          {bet.orderStatus.includes("cancelled") ? (
            <span className=" inline-flex items-center">
              <span className="text-gray-400">$#.##/&nbsp;</span>
              <span className="mr-1">${(bet.wager / 100).toFixed(2)}</span>
              <Tooltip type={bet.orderStatus} />
            </span>
          ) : (
            <span>${(bet.wager / 100).toFixed(2)}</span>
          )}
        </span>
        <p className="inline-flex items-center text-right text-sm">
          Returned ${(bet.totalPayout / 100).toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col"></div>
      <animated.div
        style={{ ...springProps, overflow: "hidden" }}
        ref={contentRef}
        className={"mt-2"}
      >
        <div className="flex w-full items-center">
          <span className=" w-1/12 border-t border-gray-200"></span>
          <span className="bg-white px-2 text-gray-600">Event Information</span>
          <span className="flex-grow border-t border-gray-200"></span>
        </div>
        <p className="text-xs"> {bet.gameTitle} </p>
        <p className="text-xs"> {bet.gameStartTime} </p>
        <div className="flex w-full items-center">
          <span className=" w-1/12 border-t border-gray-200"></span>
          <span className="bg-white px-2 text-gray-600">Bet Information</span>
          <span className="flex-grow border-t border-gray-200"></span>
        </div>

        <p className="text-xs">
          Placed{" "}
          {new Date(parseInt(bet.timePlaced) / 1000000).toLocaleString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              timeZoneName: "short",
            }
          )}
        </p>
        <div className="text-xs uppercase tracking-wide">
          {printStatus(bet.betStatus, bet.orderStatus)}
        </div>
        <p className="h-2 w-full text-right text-xs text-gray-300">
          Bet ID{" " + bet.id}
        </p>
      </animated.div>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 transform text-gray-400">
        {!isOpen ? (
          <ChevronDownIcon className="h-3 w-3" />
        ) : (
          <ChevronUpIcon className="h-3 w-3" />
        )}
      </span>
    </div>
  );
}

function MyBets() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordionItems, setopenAccordionItems] = useState([]);

  const toggleBetDetails = (betId) => {
    setopenAccordionItems((ids) =>
      ids.includes(betId) ? ids.filter((id) => id !== betId) : [...ids, betId]
    );
  };

  useEffect(() => {
    dispatch(changeSportpaneAction(rts.myBets));
    dispatch(changeNavbarTabAction(rts.myBets));
  }, [dispatch]);

  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { loading, error, data } = useQuery(MY_BETS_QUERY);

  //TODO: handle errors better
  if (error && error.message !== "User is not authenticated")
    return <p>Error: {error.message}</p>;
  if (loading || isAuthLoading) return <p>Loading...</p>;
  if (isAuthenticated === false)
    return (
      <div className="mt-16 flex justify-center">
        <div className="mx-auto flex max-w-sm items-center space-x-4 rounded-xl bg-skin-overlay px-5 py-2 shadow-md">
          <div>
            <div className="mt-2 text-xl font-medium text-skin-overlay">
              Please Log In
            </div>
            <p className="mb-2">You need to log in to view your placed bets.</p>
            <div className="flex h-20 w-full border-t border-skin-divider py-4">
              <div className="mx-2 w-full">
                <PromptButton
                  onClick={() =>
                    loginWithRedirect({
                      screen_hint: "login",
                      redirectUri: `${window.location.origin}/my-bets`,
                    })
                  }
                  text="Log in"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonAccentGradientStart"
                  gradientColorEnd="to-skin-buttonAccentGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonAccentPressed"
                  gradientColorPressedEnd="active:to-skin-buttonAccentPressed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

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
          <div className=" mx-5 rounded-lg border border-gray-200 bg-white px-4 text-gray-800 shadow-md">
            {openBetsArray.map((bet) => (
              <OpenBetAccordionItem
                key={bet.id}
                bet={bet}
                isOpen={openAccordionItems.includes(bet.id)}
                onClick={() => toggleBetDetails(bet.id)}
              />
            ))}
          </div>
        </div>
        {/* Settled Bets */}
        <div className={`${activeTab === 1 ? "block" : "hidden"}`}>
          <div className=" mx-5 rounded-lg border border-gray-200 bg-white px-4 text-gray-800 shadow-md">
            {settledBetsArray.map((bet) => (
              <SettledBetAccordionItem
                key={bet.id}
                bet={bet}
                isOpen={openAccordionItems.includes(bet.id)}
                onClick={() => toggleBetDetails(bet.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBets;
