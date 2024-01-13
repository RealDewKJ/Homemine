import { HttpHeaders } from "@angular/common/http";

const BASE_URL = "http://localhost:5000";
const authToken = localStorage.getItem("User");
export const httpOptions = {
  headers: new HttpHeaders({})
};

export const FURNITURES_URL = BASE_URL + '/api/furnitures' ;
export const FURNITURES_TAGS_URL = FURNITURES_URL + '/tags' ;
export const FURNITURES_BY_SEARCH_URL = FURNITURES_URL + '/search/' ;
export const FURNITURES_BY_TAG_URL = FURNITURES_URL + '/tag/' ;
export const FURNITURES_BY_ID_URL = FURNITURES_URL + '/' ;
export const USER_LOGIN_URL = BASE_URL + '/api/user/login' ;


export const USER_REGISTER_URL = BASE_URL + '/api/user/register';
