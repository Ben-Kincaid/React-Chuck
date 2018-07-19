import { createStore } from "redux";
import reducers from '../reducers';

const initialState = { 
    joke: 'Loading...',
    category: 'all',
    loadStatus: 'loading'
};

export const store = createStore(reducers, initialState,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());