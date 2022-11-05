import rts from "../MyRoutes";
import { useDispatch } from "react-redux";
import { changeSportpaneAction, changeNavbarTabAction } from "../Actions";
import { useAuth0 } from "@auth0/auth0-react";
import PromptButton from "./PromptButton";

function AccountSection(props) {
  return (
      <div className="h-full w-full my-6 bg-skin-overlay drop-shadow-md shadow-lg rounded-md overflow-hidden"> { /* overflow-hidden to allow rounded to show */ }
          <div className="h-30 w-full border-b border-skin-divier">
              <h1 className="text-skin-body text-xl text-left py-3 px-4 w-full">{props.title}</h1>
          </div>
          <div className="h-fit w-full">
              {props.children}
          </div>
      </div>
  )
}

function AccountSectionDetail(props) {
  return (
    <div className="flex h-fit w-full my-6">
      <h1 className="w-fit pl-8 text-m text-left text-skin-body">{props.name}</h1>
      <span className="w-full pr-8 text-sm text-right text-skin-body">{props.value}</span>
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
  if (props.buttons.length === 0)
    return (Error)

  const buttonWidthCss = props.buttons.length === 1 ? "w-full" : `w-1/${props.buttons.length.toString()}`

  return (
    <div className="flex h-20 px-6 py-4 w-full border-t border-skin-divier">
      {
        props.buttons.map((button) => (
          <div className={`${buttonWidthCss} mx-2`}> {button} </div>
          )) 
      }
    </div>
  );
}

export default function Account() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading: isAuthLoading, loginWithRedirect, logout } = useAuth0();

  if (isAuthLoading)
    return <h1>Loading</h1>;
  
  dispatch(changeSportpaneAction(rts.account));
  dispatch(changeNavbarTabAction(rts.account));

  return (
    <div className="ml-8 pt-4 mr-8">
      <h1 className="mb-3 font-semibold font-sans text-2xl text-skin-body">
        Account
      </h1>
      {
        isAuthenticated
        ?
          <div className="contents">
            <AccountSection title="Overview">
              <AccountSectionDetail name="Email" value={user["email"]}/>
              <AccountSectionDivider />
              <AccountSectionDetail name="Nickname" value={user["nickname"]}/>
              <AccountSectionActions buttons={[
                <PromptButton onClick={() => logout({ returnTo: window.location.origin })}
                  text="Log out"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonAccentGradientStart"
                  gradientColorEnd="to-skin-buttonAccentGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonAccentPressed"
                  gradientColorPressedEnd="active:to-skin-buttonAccentPressed"
                />
              ]} />
            </AccountSection>
            <AccountSection title="Balance">
              <AccountSectionDetail name="Balance" value="$0.00"/>
              <AccountSectionActions buttons={[
                <PromptButton
                  text="Deposit Funds"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonAccentGradientStart"
                  gradientColorEnd="to-skin-buttonAccentGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonAccentPressed"
                  gradientColorPressedEnd="active:to-skin-buttonAccentPressed"
                />,
                <PromptButton
                  text="Withdraw Funds"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonMutedGradientStart"
                  gradientColorEnd="to-skin-buttonMutedGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonMutedPressed"
                  gradientColorPressedEnd="active:to-skin-buttonMutedPressed"
                />,
              ]} />
            </AccountSection>
          </div>
        :
          <div className="contents">
            <AccountSection title="Overview">
              <AccountSectionActions buttons={[
                <PromptButton onClick={() => loginWithRedirect({screen_hint:'login'})}
                  text="Log in"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonAccentGradientStart"
                  gradientColorEnd="to-skin-buttonAccentGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonAccentPressed"
                  gradientColorPressedEnd="active:to-skin-buttonAccentPressed"
                />,
                <PromptButton onClick={() => loginWithRedirect({screen_hint:'signup'})}
                  text="Sign up"
                  textSize="text-m"
                  gradientColorStart="from-skin-buttonMutedGradientStart"
                  gradientColorEnd="to-skin-buttonMutedGradientEnd"
                  gradientColorPressedStart="active:from-skin-buttonMutedPressed"
                  gradientColorPressedEnd="active:to-skin-buttonMutedPressed"
                />,
              ]} />
            </AccountSection>
          </div>
      }
    </div>
);
}
