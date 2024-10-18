import { Cocktail } from '../types';

export const mapCocktails = (drinks: any[]): Cocktail[] => {
  return drinks.map((drink: any) => ({
    name: drink.strDrink,
    instructions: drink.strInstructions,
    ingredients: Object.keys(drink)
      .filter((key) => key.startsWith('strIngredient') && drink[key])
      .map((key) => drink[key]),
    thumbnailUrl: drink.strDrinkThumb,
  }));
};
