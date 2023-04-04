import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { useDispatch } from "react-redux";

const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
export default store;
