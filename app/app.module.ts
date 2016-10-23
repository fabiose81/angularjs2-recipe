import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule}    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { RecipeComponent } from './components/recipe.component';

import { EmptyValidator } from './directives/validators/empty.validator';

@NgModule({
  imports: [ BrowserModule, HttpModule, JsonpModule, FormsModule , ReactiveFormsModule ],
  declarations: [ AppComponent, RecipeComponent,  EmptyValidator ],
  bootstrap: [ AppComponent ],
  entryComponents: [ RecipeComponent ]
})
export class AppModule { }
