/**
 * Created by haita on 2018/1/8 0008.
 */
import { combineReducers } from 'redux';
import { music } from './redux/player.redux';
const rootReducer = combineReducers({
    music
});
export default rootReducer