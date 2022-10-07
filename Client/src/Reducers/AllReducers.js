import toggledBetsReducer from "./ToggledBetsReducer";
import activeSportPaneReducer from "./ActiveSportPaneReducer";
import activeNavbarTabReducer from "./ActiveNavbarTabReducer";
import activeThemeReducer from "./ActiveThemeReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  toggledBets: toggledBetsReducer,
  activeSportPane: activeSportPaneReducer,
  activeNavbarTab: activeNavbarTabReducer,
  activeTheme: activeThemeReducer,
});

export default allReducers;
