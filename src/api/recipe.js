import http from ".";
export const getRecipes = async () => {
  const res = await http.get("/recipe/");
  return res?.data;
};
export const createRecipe = async (data) => {
  console.log("rescipe data are hte here:",data);
  const res = await http.post("/recipe/", data);
  return res?.data;
}