import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import { getLoginStatusAsync, loginAsync, getMeAsync, AccountStatus, AuthResponse } from '../utils/fbSdk';
import { loginFacebookAsync, logoutAsync } from '../api/accountApi';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export type Profile = {
    email: string,
    fbAccessToken: string,
};

export interface AccountState {
    isFetching: boolean,
    status: AccountStatus,
    profile: Profile | null,
    lastChanged: number | null,
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

type RequestStatusAction = {
    type: 'PROFILE:REQUEST_STATUS',
};

type ReceiveStatusAction = {
    type: 'PROFILE:RECEIVE_STATUS',
    status: AccountStatus,
    profile: Profile | null,
};

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =
    RequestStatusAction |
    ReceiveStatusAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestStatus: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({
            type: 'PROFILE:REQUEST_STATUS',
        });

        let dispatchFailed = (status: AccountStatus) => dispatch({
            type: 'PROFILE:RECEIVE_STATUS',
            status: status,
            profile: null,
        });

        let { status, authResponse } = await getLoginStatusAsync();
        if (status === 'connected') {
            let { accessToken } = authResponse as AuthResponse;
            let profile = await getMeAsync<Profile>(['email']);
            let success = await loginFacebookAsync(accessToken);
            if (success) {
                dispatch({
                    type: 'PROFILE:RECEIVE_STATUS',
                    status: status,
                    profile: {
                        email: profile.email,
                        fbAccessToken: accessToken,
                    },
                });
            } else {
                dispatchFailed(status);
            }
        } else {
            dispatchFailed(status);
        }
    },
    requestFacebookLogin: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({
            type: 'PROFILE:REQUEST_STATUS',
        });

        let dispatchFailed = (status: AccountStatus) => dispatch({
            type: 'PROFILE:RECEIVE_STATUS',
            status: status,
            profile: null,
        });

        let { status, authResponse } = await loginAsync(['email']);
        let { accessToken } = authResponse as AuthResponse;

        let profile = await getMeAsync<Profile>(['email']);
        let success = false;
        try {
            success = await loginFacebookAsync(accessToken);
        } catch (e) {
            success = false;
        }
        if (success) {
            dispatch({
                type: 'PROFILE:RECEIVE_STATUS',
                status: status,
                profile: {
                    email: profile.email,
                    fbAccessToken: accessToken,
                },
            });
        } else {
            dispatchFailed(status);
        }
    },
    requestLogout: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({
            type: 'PROFILE:REQUEST_STATUS',
        });

        try {
            await logoutAsync();
        } catch (e) {
            console.error('Couldn\'t logout!', e);
        }

        dispatch({
            type: 'PROFILE:RECEIVE_STATUS',
            status: 'not_authorized',
            profile: null,
        });
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const initialState: AccountState = {
    isFetching: false,
    status: 'unknown',
    profile: null,
    lastChanged: null
};

export const reducer: Reducer<AccountState> = (state: AccountState = initialState, incomingAction: Action): AccountState => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'PROFILE:REQUEST_STATUS':
            return {
                ...state,
                isFetching: true,
                lastChanged: Date.now(),
            };
        case 'PROFILE:RECEIVE_STATUS':
            return {
                ...state,
                isFetching: false,
                status: action.status,
                profile: action.profile,
                lastChanged: Date.now(),
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }
    return state;
};
