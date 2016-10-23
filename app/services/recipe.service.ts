import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { RecipeModel } from '../models/recipe.model';


@Injectable()
export class RecipeService{

   constructor(private _http: Http){}

   findAll(){
       return this._http.get('http://localhost:8080/recipe/findAll')
              .map(res => res.json());
   }

   save(_recipeModel: RecipeModel){
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       return this._http.post('http://localhost:8080/recipe',_recipeModel, {headers : headers})
              .map(res => res.json());
   }

   delete(_recipeModel: RecipeModel){
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       return this._http.post('http://localhost:8080/recipe/delete',_recipeModel, {headers : headers})
              .map(res => res.json());
   }
}