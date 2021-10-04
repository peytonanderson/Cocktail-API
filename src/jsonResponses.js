const userDrinks = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getDrink = (request, response) => {
  const responseJSON = {
    id: 'getDrink',
  };

  respondJSON(request, response, 200, responseJSON);
};

const getUserDrink = (request, response, body) => {
  const drinks = [];
  const text = body.userDrinkSearchText.innerHTML.toLowerCase();
  for (let i = 0; i < userDrinks.length; i++) {
    if (userDrinks[i].name.toLowerCase().contains(text)) {
      drinks.push(userDrinks[i]);
    }
  }
  const responseJSON = {
    id: 'getUserDrink',
    drinks,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getRandomDrink = (request, response) => {
  const responseJSON = {
    id: 'getRandomDrink',
  };

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
    console.log(responseJSON);
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
