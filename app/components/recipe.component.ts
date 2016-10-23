import { Component, OnInit } from '@angular/core';

import { RecipeModel } from '../models/recipe.model';
import { LogModel } from '../models/log.model';
import { RecipeService } from '../services/recipe.service'; 

@Component({
   moduleId: module.id,
   selector: 'recipe',
   templateUrl: 'recipe.component.html',
   providers: [ RecipeService ]
})

export class RecipeComponent implements OnInit{

    recipes : RecipeModel[];
    recipe = new RecipeModel();
    logModel = new LogModel();

    alert : string;
    action : string;
    msg : string;
    
    constructor(private _recipeService: RecipeService){}

    ngOnInit(){
      this.findAll();    
    }

    findAll(){
        this._recipeService.findAll()
                     .subscribe(
                       recipes  => this.recipes = recipes,
                       err =>  {
                             this.logModel.id = 0
                             this.logModel.body = (err == 'Response with status: 0  for URL: null') ? 'Serviço REST fora do ar.' : err._body;
                             this.alert = 'alert-danger'
                            });
    }

    setObjects(_value: string){
        if(_value != undefined )
           this.recipe = new RecipeModel();

        this.logModel = new LogModel();
        this.alert = undefined;
        this.action = undefined;
        this.msg = undefined;
    }


    save(event: any){
        event.preventDefault();
        this.setObjects(undefined);
        var id = this.recipe.id;
        this._recipeService.save(this.recipe)
                     .subscribe(
                       recipe  => {
                           this.recipe = <RecipeModel> JSON.parse(JSON.stringify(recipe));   
                           if(id == undefined){
                              this.recipes.push(this.recipe)
                              this.msg = 'Receita cadastrada com sucesso.'; 
                              this.action = 'save';  
                           }else{   
                               for(var i=0; i<this.recipes.length; i++)
                                  if(this.recipe.id == this.recipes[i].id)
                                      this.recipes[i]= this.recipe;

                              this.msg = 'Receita alterada com sucesso.';
                              this.action = 'update';  
                           }
                           this.recipe = recipe 
                           this.alert = 'alert-success'                 
                        },
                       err => {
                             this.logModel.id = 1
                             this.logModel.body = err._body
                             this.alert = 'alert-danger'
                            });
                             
    }

   delete(_receita: RecipeModel){
        this.setObjects(undefined);
        this._recipeService.delete(_receita)
                     .subscribe(
                       recipe  => {
                           this.removeRecipe(_receita);
                           this.recipe = _receita;
                           this.alert = 'alert-success';
                           this.action = 'delete';
                           this.msg = 'Receita removida com sucesso.';
                        },
                       err => {
                             this.logModel.id = 1
                             this.logModel.body = err._body
                             this.alert = 'alert-danger'
                            });
    }

    load(_recipe: RecipeModel){
        this.setObjects(undefined);
        this.recipe =  <RecipeModel> JSON.parse(JSON.stringify(_recipe));
    }

    removeRecipe(_recipeModel:RecipeModel){
       var index = this.recipes.indexOf(_recipeModel);
       var auxRecipe :Array<RecipeModel>=[];
       for(var i=0; i<this.recipes.length; i++){
          if(index != i)
             auxRecipe.push(this.recipes[i]);
          
       }
      this.recipes = auxRecipe;
    }
}