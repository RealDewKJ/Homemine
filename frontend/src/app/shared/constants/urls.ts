import { HttpHeaders } from "@angular/common/http";

const BASE_URL = "http://localhost:5000";
const authToken = localStorage.getItem("User");
export const httpOptions = {
  headers: new HttpHeaders({})
};

export const FURNITURES_URL = BASE_URL + '/api/furnitures' ;
export const FURNITURE_CREATE = FURNITURES_URL + '/create' ;
export const FURNITURE_UPDATE = FURNITURES_URL + '/update' ;
export const FURNITURE_DELETE = FURNITURES_URL + '/delete' ;
export const FURNITURES_TAGS_URL = FURNITURES_URL + '/tags' ;
export const FURNITURES_BY_SEARCH_URL = FURNITURES_URL + '/search/' ;
export const FURNITURES_BY_TAG_URL = FURNITURES_URL + '/tag/' ;
export const FURNITURES_BY_ID_URL = FURNITURES_URL + '/' ;


export const USER_GET = BASE_URL + '/api/user'
export const USER_GET_BY_ID = USER_GET + '/'
export const USER_LOGIN_URL = BASE_URL + '/api/user/login' ;
export const USER_LOGIN_WITH_GOOGLE = BASE_URL + '/api/user/logingoogle';
export const USER_REGISTER_URL = BASE_URL + '/api/user/register';
export const USER_UPDATE_URL = USER_GET + '/update' ;

export const ORDER_URL = BASE_URL + '/api/orders';
export const ORDER_BY_ID_URL = ORDER_URL + '/' ;
export const ORDER_CRATE_URL = ORDER_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDER_URL + '/newOrderForCurrentUser'
export const PLACEORDER_URL = ORDER_URL + '/placeOrder'
export const GET_ORDER_BY_ID = ORDER_URL + '/getOrder'
