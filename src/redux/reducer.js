import * as actions from './actionTypes';

const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.USER_ADDED:
            return {
                ...state,
                user: action.payload.user

            }
        default:
            return state;
    }
}