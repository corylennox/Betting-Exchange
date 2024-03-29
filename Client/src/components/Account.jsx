import rts from "../MyRoutes";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSportpaneAction,
  changeNavbarTabAction,
  setAvailableBalanceAction,
} from "../Actions";
import { useAuth0 } from "@auth0/auth0-react";
import PromptButton from "./PromptButton";
import { useMutation } from "@apollo/client";
import { convertToPriceString } from "./BetslipUtils";
import { ADD_FUNDS_MUTATION } from "../GraphQL/Mutations";

function AccountSection(props) {
  return (
    <div className="my-6 h-full w-full overflow-hidden rounded-md bg-skin-overlay shadow-lg drop-shadow-md">
      {" "}
      {/* overflow-hidden to allow rounded to show */}
      <div className="h-30 w-full border-b border-skin-divider">
        <h1 className="w-full py-3 px-4 text-left text-xl text-skin-body">
          {props.title}
        </h1>
      </div>
      <div className="h-fit w-full">{props.children}</div>
    </div>
  );
}

function AccountSectionDetail(props) {
  return (
    <div className="my-6 flex h-fit w-full">
      <h1 className="text-m w-fit pl-8 text-left text-skin-body">
        {props.name}
      </h1>
      <span className="w-full pr-8 text-right text-sm text-skin-body">
        {props.value}
      </span>
    </div>
  );
}

function AccountSectionDivider() {
  return (
    <div className="px-8">
      <div className="h-px w-full bg-skin-sidebarDivider" />
    </div>
  );
}

function AccountSectionActions(props) {
  if (props.buttons.length === 0) return Error;

  const buttonWidthCss =
    props.buttons.length === 1
      ? "w-full"
      : `w-1/${props.buttons.length.toString()}`;

  return (
    <div className="border-skin-divier flex h-20 w-full border-t px-6 py-4">
      {props.buttons.map((button) => (
        <div className={`${buttonWidthCss} mx-2`}> {button} </div>
      ))}
    </div>
  );
}

export default function Account() {
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    user,
    isLoading: isAuthLoading,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const [addFundsMutation] = useMutation(ADD_FUNDS_MUTATION);
  const availableBalance = useSelector((state) => state.availableBalance);

  if (isAuthLoading) return <h1>Loading</h1>;

  dispatch(changeSportpaneAction(rts.account));
  dispatch(changeNavbarTabAction(rts.account));

  const addFunds = async (fundsToAdd) => {
    const addFundsResult = await addFundsMutation({
      variables: {
        input: {
          fundsToAdd: fundsToAdd,
        },
      },
    });
    const newAvailableBalance = addFundsResult.data.addFunds.availableBalance;
    dispatch(setAvailableBalanceAction(newAvailableBalance));
  };

  return (
    <div className="ml-8 mr-8 pt-4">
      <h1 className="mb-3 font-sans text-2xl font-semibold text-skin-body">
        Account
      </h1>
      {isAuthenticated ? (
        <div className="contents">
          <AccountSection title="Overview">
            <AccountSectionDetail name="Email" value={user["email"]} />
            <AccountSectionDivider />
            <AccountSectionDetail name="Nickname" value={user["nickname"]} />
            <AccountSectionActions
              buttons={[
                <PromptButton
                  onClick={() => logout({ returnTo: window.location.origin })}
                  text="Log out"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonAccentGradientStart"
                  gradientColorEnd="to-skin-buttonAccentGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonAccentPressed"
                  gradientColorPressedEnd="active:to-skin-buttonAccentPressed"
                />,
              ]}
            />
          </AccountSection>
          <AccountSection title="Balance">
            <AccountSectionDetail
              name="Balance"
              value={`$${convertToPriceString(availableBalance)}`}
            />
            <AccountSectionActions
              buttons={[
                <PromptButton
                  text="Deposit Funds"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonAccentGradientStart"
                  gradientColorEnd="to-skin-buttonAccentGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonAccentPressed"
                  gradientColorPressedEnd="active:to-skin-buttonAccentPressed"
                  onClick={() => addFunds(1000 /* $10.00 */)}
                />,
                <PromptButton
                  text="Withdraw Funds"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonMutedGradientStart"
                  gradientColorEnd="to-skin-buttonMutedGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonMutedPressed"
                  gradientColorPressedEnd="active:to-skin-buttonMutedPressed"
                />,
              ]}
            />
          </AccountSection>
        </div>
      ) : (
        <div className="contents">
          <AccountSection title="Overview">
            <AccountSectionActions
              buttons={[
                <PromptButton
                  onClick={() => loginWithRedirect({ screen_hint: "login" })}
                  text="Log in"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonAccentGradientStart"
                  gradientColorEnd="to-skin-buttonAccentGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonAccentPressed"
                  gradientColorPressedEnd="active:to-skin-buttonAccentPressed"
                />,
                <PromptButton
                  onClick={() => loginWithRedirect({ screen_hint: "signup" })}
                  text="Sign up"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonMutedGradientStart"
                  gradientColorEnd="to-skin-buttonMutedGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonMutedPressed"
                  gradientColorPressedEnd="active:to-skin-buttonMutedPressed"
                />,
              ]}
            />
          </AccountSection>
        </div>
      )}
    </div>
  );
}
