import * as actions from './actionTypes';
export const setUser = (user) => (
    {
        type: actions.USER_ADDED,
        payload: {
            user
        }
    }
)