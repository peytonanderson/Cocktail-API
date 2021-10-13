const userDrinks = {};
const cocktails = {
  '7 & 7': '1 2/3 Whiskey, 5 oz 7-Up, 1 Lemon Wedge',
  ABC: '1/2 oz Amaretto, 1/2 oz Baileys, 1/2 oz Cognac',
  'Alabama Slammer': '2/3 oz Amaretto, 2/3 oz Southern Comfort, 2/3 oz Sloe Gin, 1 2/3 oz Orange Juice',
  'Alien Brain Hemmorrhage': '1 oz Peach Schnapps, 1/2 oz Baileys, 1 dash Blue Curacao, 1 dash Grenadine',
  'Bay Breeze': '1 1/3 oz Vodka, 3 oz Cranberry Juice, 1 oz Pineapple Juice, 1 wedge Lime',
  Bellini: '3 1/3 oz Sparking Wine, 1 2/3 oz Peach Puree',
  'Black Russian': '1 2/3 oz Vodka, 2/3 oz Coffee Liqueur',
  'Blue Hawaii': '2/3 oz White Rum, 2/3 oz Vodka, 1/2 oz Blue Curacao, 3 oz Pineapple Juice, 1 oz Sour Mix, 1 Maraschino Cherry, 1 wedge Pineapple',
  Chococherry: '1 mug Hot Chocolate, 1 oz Dark Rum, 1/2 oz Coffee Liqueur, 1 oz Cherry Syrup',
  Chupacabra: '1 2/3 oz Tequila Blanco, 3 drops Tabasco',
  'Corpse Reviver': '2 oz Cognac, 1 oz Calvados, 1 oz White Vermouth',
  'Crime and Punish-mint': '1 1/2 oz Vodka, 1/2 oz Coffee Liqueur, 1/2 oz Creme de Menthe Green, 1 oz Light Cream',
  "Dark 'N' Stormy": '2 oz Dark Rum, 3 1/3 oz Ginger Beer, 1 wedge Lime',
  'El Presidente': '1 1/2 oz White Rum, 1 oz Dry Vermouth, 1 oz Orange Curacao or Triple Sec, 1 dash Grenadine, 1 Orange Peel',
  'Flaming Volcano': '1 oz White Rum, 1 oz Brandy or Cognac, 1 oz Dark Rum, 4 oz Orange Juice, 2 Lemon, 2 oz Almond Syrup',
  'Gin and Sin': '1 oz Gin, 1 oz Orange Juice, 1 Lemon, 1 dash Grenadine',
  Grasshopper: '1 oz Creme de Menthe Green, 1 oz Creme de Menthe White, 1 oz Cream',
  'Hairy Navel': '1 2/3 oz Peach Schnapps, 1 oz Vodka, 2 1/3 Orange Juice, 1 Orange Slice',
  Hellboy: '1 2/3 oz Whiskey, 1/3 Frangelico, 1 Chili, 1 dash Honey',
  'Irish Coffee': '1 1/3 oz Whiskey, 2 2/3 oz Coffee, 1 oz Cream, 1 ts Sugar',
  Jagertee: '6 3/4 oz Black Tea, 1 1/3 oz Overproof Rum or Dark Rum, Sugar to taste',
  'Jolly Rancher': '1 oz Vodka, 1 oz Midori, 3 oz Cranberry Juice',
  'Liquid Marijuana': '1/2 oz Dark Rum, 1/2 oz Blue Curacao, 1/2 Malibu Coconut Rum, 1/2 oz Midori, 2 oz Pineapple Juice, 1/2 oz Sour Mix',
  'Love in the Time of Kahlua': '2 oz Dark Rum, 1 oz Coffee Liqueur, 4 oz Light Cream or Vanilla Coffee Creamer, 1 dash Nutmeg, 1 dash Cinnamon',
  Margarita: '1 2/3 oz Tequila Blanco, 1 oz Cointreau or Triple Sec, 1 Lime, 2 gr Salt',
  'Melon Ball': '1 oz Vodka, 2 oz Midori, 3 oz Orange Juice',
  'Oatmeal Cookie': '1 oz Goldschlager, 1 oz Butterscotch Liqueur, 1 oz Baileys, optional 1 oz Jagermeister',
  Screwdriver: '1 2/3 oz Vodka, 3 1/3 oz Orange Juice, 1 slice Orange',
  'Tootsie Roll': '1 1/2 oz Coffee Liqueur, 1 1/2 oz Orange Juice, optional 1 1/2 oz Vodka',
  'Vegas Bomb': '3/4 oz Rye Whiskey, 3/4 oz Peach Schnapps, half can Red Bull',
};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getDrink = (request, response, params) => {
  const responseJSON = {
    id: 'getDrink',
    message: 'No drinks found',
    text: params.name,
    names: [],
    ingredients: [],
  };

  if (params.drink == undefined) {
    respondJSON(request, response, 200, responseJSON);
    return;
  }

  const text = params.drink.toLowerCase();
  const cocktailNames = Object.keys(cocktails);

  for (let i = 0; i < cocktailNames.length; i++) {
    if (cocktailNames[i].toLowerCase().includes(text)) {
      responseJSON.names.push(cocktailNames[i]);
      responseJSON.ingredients.push(cocktails[cocktailNames[i]]);
      responseJSON.message = 'Drinks found';
    }
  }

  respondJSON(request, response, 200, responseJSON);
};

const getUserDrink = (request, response, params) => {
  const text = params.drink.toLowerCase();
  const cocktailNames = Object.keys(userDrinks);

  const responseJSON = {
    id: 'getUserDrink',
    message: 'No drinks found',
    text: params.name,
    names: [],
    ingredients: [],
  };

  for (let i = 0; i < cocktailNames.length; i++) {
    if (cocktailNames[i].toLowerCase().includes(text)) {
      responseJSON.names.push(cocktailNames[i]);
      responseJSON.ingredients.push(userDrinks[cocktailNames[i]]);
      responseJSON.message = 'Drinks found';
    }
  }

  respondJSON(request, response, 200, responseJSON);
};

const getRandomDrink = (request, response) => {
  const responseJSON = {
    id: 'getRandomDrink',
    message: 'Success',
    name: '',
    ingredients: '',
  };

  const cocktailNames = Object.keys(cocktails);
  responseJSON.name = cocktailNames[Math.floor((Math.random() * (cocktailNames.length - 1)))];
  responseJSON.ingredients = cocktails[responseJSON.name];

  respondJSON(request, response, 200, responseJSON);
};

const getNotReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const getDrinkMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const getUserDrinkMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const getRandomDrinkMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const getNotRealMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

const addUserDrink = (request, response, body) => {
  const responseJSON = {
    message: 'Name and ingredients are both required.',
    drinksList: [],
  };

  if (!body.name || !body.ingredients) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (userDrinks[body.name]) {
    responseCode = 204;
  } else {
    userDrinks[body.name] = body.ingredients;
  }

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    responseJSON.drinksList = userDrinks;
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  getDrink,
  getUserDrink,
  getRandomDrink,
  getNotReal,
  getDrinkMeta,
  getUserDrinkMeta,
  getRandomDrinkMeta,
  getNotRealMeta,
  addUserDrink,
};
