/**
 * Created by haita on 2018/1/8 0008.
 */

import { createStore,applyMiddleware,compose  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f=>f
    )

);
export default store
