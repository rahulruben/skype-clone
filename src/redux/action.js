import * as actions from './actionTypes';
export const setUser = (user) => (
    {
        type: actions.USER_ADDED,
        payload: {
            user
        }
    }
)

export const setSidebarVisibilitiy = (isSideBarHidden) => (
    {
        type: actions.SIDEBAR_HIDDEN,
        payload: {
            sideBarHidden: isSideBarHidden
        }
    }
)