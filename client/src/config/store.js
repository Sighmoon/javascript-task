import {createStore, combineReducers} from 'redux'
import cartReducer from "../features/cart/reducer";
import {loadState, saveState} from "../data/localStorage";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    cart: cartReducer,
    form: formReducer
});

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    saveState(store.getState())
});

export default store