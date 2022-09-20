import toggledBetsReducer from './ToggledBetsReducer'
import activeSportPaneReducer from './ActiveSportPaneReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    toggledBets: toggledBetsReducer,
    activeSportPane: activeSportPaneReducer,
})

export default allReducers;
