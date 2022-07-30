// import icons from '../img/icons.svg'; //Parcel 1
// import icons from 'url:../img/icons.svg'; //Parcel 2

//polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';

//views
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    //get id for url
    const id = window.location.hash.slice(1);

    //loading spinner
    if (!id) return;
    recipeView.renderSpinner();

    // 1.Loading the data
    await model.loadRecipe(id);

    //2. Rendering the data
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

controlRecipes();

// window.addEventListener('haschange', controlRecipes);
// window.addEventListener('load', controlRecipes);
['hashchange', 'load'].forEach(e => {
  window.addEventListener(e, controlRecipes);
});
