"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var recipe_model_1 = require('../models/recipe.model');
var log_model_1 = require('../models/log.model');
var recipe_service_1 = require('../services/recipe.service');
var RecipeComponent = (function () {
    function RecipeComponent(_recipeService) {
        this._recipeService = _recipeService;
        this.recipe = new recipe_model_1.RecipeModel();
        this.logModel = new log_model_1.LogModel();
    }
    RecipeComponent.prototype.ngOnInit = function () {
        this.findAll();
    };
    RecipeComponent.prototype.findAll = function () {
        var _this = this;
        this._recipeService.findAll()
            .subscribe(function (recipes) { return _this.recipes = recipes; }, function (err) {
            _this.logModel.id = 0;
            _this.logModel.body = (err == 'Response with status: 0  for URL: null') ? 'Serviço REST fora do ar.' : err._body;
            _this.alert = 'alert-danger';
        });
    };
    RecipeComponent.prototype.setObjects = function (_value) {
        if (_value != undefined)
            this.recipe = new recipe_model_1.RecipeModel();
        this.logModel = new log_model_1.LogModel();
        this.alert = undefined;
        this.action = undefined;
        this.msg = undefined;
    };
    RecipeComponent.prototype.save = function (event) {
        var _this = this;
        event.preventDefault();
        this.setObjects(undefined);
        var id = this.recipe.id;
        this._recipeService.save(this.recipe)
            .subscribe(function (recipe) {
            _this.recipe = JSON.parse(JSON.stringify(recipe));
            if (id == undefined) {
                _this.recipes.push(_this.recipe);
                _this.msg = 'Receita cadastrada com sucesso.';
                _this.action = 'save';
            }
            else {
                for (var i = 0; i < _this.recipes.length; i++)
                    if (_this.recipe.id == _this.recipes[i].id)
                        _this.recipes[i] = _this.recipe;
                _this.msg = 'Receita alterada com sucesso.';
                _this.action = 'update';
            }
            _this.recipe = recipe;
            _this.alert = 'alert-success';
        }, function (err) {
            _this.logModel.id = 1;
            _this.logModel.body = err._body;
            _this.alert = 'alert-danger';
        });
    };
    RecipeComponent.prototype.delete = function (_receita) {
        var _this = this;
        this.setObjects(undefined);
        this._recipeService.delete(_receita)
            .subscribe(function (recipe) {
            _this.removeRecipe(_receita);
            _this.recipe = _receita;
            _this.alert = 'alert-success';
            _this.action = 'delete';
            _this.msg = 'Receita removida com sucesso.';
        }, function (err) {
            _this.logModel.id = 1;
            _this.logModel.body = err._body;
            _this.alert = 'alert-danger';
        });
    };
    RecipeComponent.prototype.load = function (_recipe) {
        this.setObjects(undefined);
        this.recipe = JSON.parse(JSON.stringify(_recipe));
    };
    RecipeComponent.prototype.removeRecipe = function (_recipeModel) {
        var index = this.recipes.indexOf(_recipeModel);
        var auxRecipe = [];
        for (var i = 0; i < this.recipes.length; i++) {
            if (index != i)
                auxRecipe.push(this.recipes[i]);
        }
        this.recipes = auxRecipe;
    };
    RecipeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'recipe',
            templateUrl: 'recipe.component.html',
            providers: [recipe_service_1.RecipeService]
        }), 
        __metadata('design:paramtypes', [recipe_service_1.RecipeService])
    ], RecipeComponent);
    return RecipeComponent;
}());
exports.RecipeComponent = RecipeComponent;
//# sourceMappingURL=recipe.component.js.map