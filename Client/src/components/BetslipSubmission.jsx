import { parseMap } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { deleteBetsAction } from "../Actions";
import PromptButton from "./PromptButton";
import { convertToPriceString } from "./BetslipUtils";
import { getWinAfterCommission } from "bettingexchangecommon";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@apollo/client";
import { SUBMIT_BETSLIP_MUTATION } from "../GraphQL/Mutations";


export default function BetslipSubmission() {
  const [submitBetslip] = useMutation(SUBMIT_BETSLIP_MUTATION);
  const dispatch = useDispatch();
  const toggledBets = parseMap(useSelector((state) => state.toggledBets));
  const linesContainer = parseMap(useSelector((state) => state.lines));
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  if (isAuthLoading) return <h1>Loading</h1>;

  let wagerSum = 0;
  let winSum = 0;
  let numValidBets = 0;
  toggledBets.forEach((toggledBet) => {
    wagerSum += toggledBet.wagerInteger;
    winSum += toggledBet.winInteger;
    numValidBets += toggledBet.wagerStr !== "" ? 1 : 0;
  });
  const winAfterCommission = getWinAfterCommission(winSum);
  const comissionAmt = winSum - winAfterCommission;

  const submitAndDeleteBets = async () => {
    let submittedBetsToDelete = [];
    let input = [];
    toggledBets.forEach((toggledBet) => {

      if(toggledBets.get(toggledBet.betInfo.buttonId).wagerInteger > 0)
      {
        input.push({
          wagerAmount: toggledBets.get(toggledBet.betInfo.buttonId).wagerInteger,
          line: linesContainer.get(toggledBet.betInfo.buttonId).value * 10, 
          buttonId: toggledBet.betInfo.buttonId,
        });

        submittedBetsToDelete.push(toggledBet.betInfo.buttonId);
      }
      

      
    });

   let test = await submitBetslip({
      variables: {
        input: input,
      },
    });

    test.data.submitBetslip.returnedButtonIds.forEach(buttonId => {
      console.log(`Successfully submitted bet for buttonId: ${buttonId}`);
    })

    //TODO: verify bets were successfully placed before deleting
    dispatch(deleteBetsAction(submittedBetsToDelete));
  };

  return (
    <div className="relative h-full w-full">
      <div className="flex h-2/6 items-center justify-center">
        <span className="mr-4 border-gray-300 text-sm">
          Subtotal Win: ${convertToPriceString(winSum)}
        </span>
        <span className="ml-4 border-gray-300 text-sm">
          Commission: ${convertToPriceString(comissionAmt)}
        </span>
      </div>
      <div className="absolute bottom-0 h-4/6 w-full pb-2 pl-2 pr-2">
        {!isAuthenticated ? (
          <PromptButton
            onClick={() => loginWithRedirect({ screen_hint: "signup" })}
            text="Log in or sign up to place a bet"
            textSize="text-m"
            gradientColorStart="from-skin-buttonAccentGradientStart"
            gradientColorEnd="to-skin-buttonAccentGradientEnd"
            gradientColorPressedStart="active:from-skin-buttonAccentPressed"
            gradientColorPressedEnd="active:to-skin-buttonAccentPressed"
          />
        ) : toggledBets.size === 0 ? (
          <PromptButton
            text="Add an event to the betslip"
            textSize="text-m"
            gradientColorStart="from-skin-buttonAccentDeactivated"
            gradientColorEnd="to-skin-buttonAccentDeactivated"
            gradientColorPressedStart="active:from-skin-buttonAccentDeactivated"
            gradientColorPressedEnd="active:to-skin-buttonAccentDeactivated"
          />
        ) : numValidBets > 0 ? (
          <PromptButton
            onClick={submitAndDeleteBets}
            text={`Place ${numValidBets} bet${
              numValidBets !== 1 ? "s" : ""
            } for $${convertToPriceString(wagerSum)}`}
            textSize="text-m"
            subtext={`TO WIN $${convertToPriceString(winAfterCommission)}`}
            subtextSize="text-xs"
            gradientColorStart="from-skin-buttonAccentGradientStart"
            gradientColorEnd="to-skin-buttonAccentGradientEnd"
            gradientColorPressedStart="active:from-skin-buttonAccentPressed"
            gradientColorPressedEnd="active:to-skin-buttonAccentPressed"
          />
        ) : (
          <PromptButton
            text="Enter a wager to place a bet"
            textSize="text-m"
            gradientColorStart="from-skin-buttonAccentDeactivated"
            gradientColorEnd="to-skin-buttonAccentDeactivated"
            gradientColorPressedStart="active:from-skin-buttonAccentDeactivated"
            gradientColorPressedEnd="active:to-skin-buttonAccentDeactivated"
          />
        )}
      </div>
    </div>
  );
}
