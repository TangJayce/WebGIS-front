import {SET_USER_NAME, SWITCH_MENU} from "./actionType";

export const switchMenu = (menuName) => ({
    type: SWITCH_MENU,
    menuName
});

export const setUserName = (userName) => ({
    type: SET_USER_NAME,
    userName
});