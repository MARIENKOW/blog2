export const MAIN_ROUTE = (token) => "/" + token;
export const REPORT_ROUTE = (token) => MAIN_ROUTE(token) + "/report";

export const ADMIN_ROUTE = "/admin";
export const ADMIN_PHONE_ROUTE = ADMIN_ROUTE + "/phone";
export const ADMIN_LIST_ROUTE = ADMIN_ROUTE + "/list";
export const ADMIN_ACCESS_ROUTE = ADMIN_ROUTE + "/access";
