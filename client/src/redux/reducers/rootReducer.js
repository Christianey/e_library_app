import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistRootConfig = {
  key: 'root', storage, whitelist: ['user'], stateReconciler: autoMergeLevel2
}

const rootReducer = 
  combineReducers({
    user: userReducer
  })

export default persistReducer(persistRootConfig, rootReducer);