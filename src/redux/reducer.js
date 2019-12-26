import {SET_USER_NAME, SWITCH_MENU} from "./actionType";

/**
 * Reducer 数据处理
 * 相当于react中的setState()的功能
 * 如果有多个reducer:
 * export const finalReducer = combineReducers({
       reducer1,reducer2,reducer3...
   })
 */

const initialState = {
    menuName: '首页',
    userName: 'jayce'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_MENU:
            return {
                ...state,
                menuName: action.menuName
            };
        case SET_USER_NAME:
            return {
                ...state,
                userName: action.userName
            };
        default:
            return state;
    }
}