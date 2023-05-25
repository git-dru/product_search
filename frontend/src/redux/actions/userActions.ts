import { Action } from 'redux';

export enum ActionTypes {
    AUTH_USER = 'auth/authUser',
    LOGOUT = 'auth/logout',
    AUTH_SESSION = 'auth/authSession'
}

interface AuthUserAction extends Action {
    type: ActionTypes.AUTH_USER,
    payload: string
}

interface AuthSessionAction extends Action {
  type: ActionTypes.AUTH_SESSION,
  payload: {searchTerm: string, sortBy: string, direction: string}
}

export interface LogoutAction extends Action {
  type: ActionTypes.LOGOUT;
}

export const authUser = (email: string): AuthUserAction => ({
    type: ActionTypes.AUTH_USER,
    payload: email
});

export const authSession = (searchTerm: string, sortBy: string, direction: string): AuthSessionAction => ({
  type: ActionTypes.AUTH_SESSION,
  payload: {searchTerm , sortBy, direction}
});

export const logout = (): LogoutAction => ({
  type: ActionTypes.LOGOUT,
});

export type AppActions = AuthUserAction | LogoutAction | AuthSessionAction;