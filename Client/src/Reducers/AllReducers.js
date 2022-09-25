import toggledBetsReducer from './ToggledBetsReducer'
import activeSportPaneReducer from './ActiveSportPaneReducer'
import activeNavbarTabReducer from './ActiveNavbarTabReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    toggledBets: toggledBetsReducer,
    activeSportPane: activeSportPaneReducer,
    activeNavbarTab : activeNavbarTabReducer,
})

export default allReducers;
