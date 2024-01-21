import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FURNITURES_BY_ID_URL, FURNITURES_BY_SEARCH_URL, FURNITURES_BY_TAG_URL, FURNITURES_TAGS_URL, FURNITURES_URL,httpOptions } from '../shared/constants/urls';
import { Furniture } from '../shared/models/Furniture';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Furniture[]>{
    return this.http.get<Furniture[]>(FURNITURES_URL,httpOptions);
  }

  getAllFurnitureBySearchTerm(searchTerm:string){
    return this.http.get<Furniture[]>(FURNITURES_BY_SEARCH_URL + searchTerm,httpOptions);
  }

  getAllTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(FURNITURES_TAGS_URL,httpOptions);
  }

  getAllFurnitureByTag(tag:string): Observable<Furniture[]>{
    return tag == "All"?
    this.getAll():
    this.http.get<Furniture[]>(FURNITURES_BY_TAG_URL + tag,httpOptions);
  }

  getFurnitureById(furnitureId:string): Observable<Furniture>{
  return this.http.get<Furniture>(FURNITURES_BY_ID_URL + furnitureId,httpOptions);
}
}
