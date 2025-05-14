import { connectAccount, updateBlockchain, onLogout } from './user';

import {
    APP_INIT_STARTED,
    PUBLIC_INIT_FINISHED,
    APP_AUTH_INIT_FINISHED,
} from '../actionTypes/init'

export const appInitStarted = () => ({ type: APP_INIT_STARTED })
export const publicInitFinished = () => ({ type: PUBLIC_INIT_FINISHED })
export const appAuthInitFinished = () => ({ type: APP_AUTH_INIT_FINISHED })

export const _appInitStarted = () => async (dispatch) => {
  dispatch(appInitStarted());
};

export const _appAuthInitFinished = () => async (dispatch) => {
  dispatch(appAuthInitFinished());
};

export const _publicInitFinished = () => async (dispatch) => {
  dispatch(publicInitFinished());
};

export const _appInitializer = () => async (dispatch) => {
 

  dispatch(connectAccount(true));

  const blockchain = localStorage.getItem('blockchain')
  if(blockchain)
    dispatch(updateBlockchain(blockchain))
};

