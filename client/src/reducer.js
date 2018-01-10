/**
 * Created by haita on 2018/1/8 0008.
 */
import { combineReducers } from 'redux';
import { music } from './redux/player.redux';
import { repertoire } from './redux/repertoire.redux';
const rootReducer = combineReducers({
    music,
    repertoire
});
export default rootReducer