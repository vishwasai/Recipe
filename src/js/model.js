import { API_URL, RES_PER_PAGE } from './config';
import { getJson } from './helper';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}/${id}`);
    console.log(data);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      sourceUrl: recipe.source_url,
      publisher: recipe.publisher,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(err);
  }
};

export const loadResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        image: res.image_url,
        title: res.title,
        publisher: res.publisher,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(err);
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateservings = function (servings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * servings) / state.recipe.servings;
  });
  state.recipe.servings = servings;
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  console.log(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => (el.id = id));
  state.bookmarks.splice(index, 1);
  if ((id = state.recipe.id)) state.recipe.bookmarked = false;
};
