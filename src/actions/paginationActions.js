export const CHANGE_QTY_IN_TABLE = 'CHANGE_QTY_IN_TABLE';
export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';

export const changeQty = (qty) => ({
    type:    CHANGE_QTY_IN_TABLE,
    payload: { qty }
});

export const changePage = (page) => ({
    type:    CHANGE_CURRENT_PAGE,
    payload: { page }
});
