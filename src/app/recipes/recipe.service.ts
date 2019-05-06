import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged= new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe("testRecipe", "test", "https://images.pexels.com/photos/1187438/pexels-photo-1187438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        [new Ingredient('Meat', 1), new Ingredient('Butter', 3)]),
        new Recipe("testRecipe 1", "test 1", "https://images.pexels.com/photos/1187438/pexels-photo-1187438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        [new Ingredient('Meat', 1), new Ingredient('Butter', 3)]),
        new Recipe("testRecipe 2", "test 2", "https://images.pexels.com/photos/1187438/pexels-photo-1187438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        [new Ingredient('Meat', 1), new Ingredient('Butter', 3)])
      ];
    

    constructor(private slService: ShoppingListService) {

    }
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
    
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}