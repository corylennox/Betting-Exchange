import toggledBetsReducer from "./ToggledBetsReducer";
import activeSportPaneReducer from "./ActiveSportPaneReducer";
import activeNavbarTabReducer from "./ActiveNavbarTabReducer";
import activeThemeReducer from "./ActiveThemeReducer";
import linesReducer from "./LinesReducer";
import { combineReducers } from "redux";
import availableBalanceReducer from "./AvailableBalanceReducer";

const allReducers = combineReducers({
  toggledBets: toggledBetsReducer,
  activeSportPane: activeSportPaneReducer,
  activeNavbarTab: activeNavbarTabReducer,
  activeTheme: activeThemeReducer,
  lines: linesReducer,
  availableBalance: availableBalanceReducer,
});

export default allReducers;
