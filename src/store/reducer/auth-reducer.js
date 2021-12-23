// Note: All authentication cases are defined here...!

import {
    SIGN_UP_USER,
    CHECK_USER,
    LOGOUT_USER,
    LOG_IN_USER_WITH_FACEBOOK
}
    from "../constant/action-types";

const INIT_STATE = {
    authenticatedUser: null
}

const authReducer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case LOG_IN_USER_WITH_FACEBOOK:
            return {
                ...state,
                authenticatedUser: action.payload
            }

        case LOGOUT_USER:
            return {
                ...state,
                authenticatedUser: null
            }

        case CHECK_USER:
            return {
                ...state,
                authenticatedUser: action.payload
            }

        default:
            return state;
    }
}

export default authReducer;