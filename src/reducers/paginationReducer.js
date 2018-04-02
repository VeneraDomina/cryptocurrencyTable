import { CHANGE_QTY_IN_TABLE, CHANGE_CURRENT_PAGE } from '../actions/paginationActions';

const initialState = {
    qtyCryptosInTable: 15,
    currentPage:       1
};

export default function paginationReducer (state = initialState, action) {
    switch (action.type) {
        case CHANGE_QTY_IN_TABLE:
            return {
                ...state,
                qtyCryptosInTable: action.payload.qty,
                currentPage:       1
            };
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.page
            };
        default:
            return state;
    }
}
