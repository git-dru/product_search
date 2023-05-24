import { Action } from 'redux';

export enum ActionTypes {
    AUTH_USER = 'auth/authUser',
    LOGOUT = 'auth/logout'
}

interface AuthUserAction extends Action {
    type: ActionTypes.AUTH_USER,
    payload: string
}

export interface LogoutAction extends Action {
  type: ActionTypes.LOGOUT;
}

export const authUser = (email: string): AuthUserAction => ({
    type: ActionTypes.AUTH_USER,
    payload: email
});

export const logout = (): LogoutAction => ({
  type: ActionTypes.LOGOUT,
});

export type AppActions = AuthUserAction | LogoutAction;