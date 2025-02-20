document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    if (!recipeId) {
        document.getElementById("recipe-details").innerHTML = "<p>No recipes selected.</p>";
        return;
    }

    const API_KEY = "8ee457926cd8410bbe7b591f91771f6f";
    const API_URL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;

    try {
        const response = await fetch(API_URL);
        const recipe = await response.json();

        const detailsContainer = document.getElementById("recipe-details");
        detailsContainer.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}" width="300">
            <h3>Ingredients:</h3>
            <ul>${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join("")}</ul>
            <h3>Instructions:</h3>
            <p>${recipe.instructions || "Nenhuma instrução disponível."}</p>
        `;
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        document.getElementById("recipe-details").innerHTML = "<p>Error loading recipe details.</p>";
    }
});
