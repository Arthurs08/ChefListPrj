document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedIngredients = urlParams.get('ingredients');

    if (selectedIngredients) {
        const API_KEY = "8ee457926cd8410bbe7b591f91771f6f";
        const API_URL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${selectedIngredients}&number=21&ranking=1&apiKey=${API_KEY}`;

        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const recipeContainer = document.getElementById("recipes");
                recipeContainer.innerHTML = "";
                if (data && data.length > 0) {
                    data.forEach(recipe => {
                        const foodItemDiv = document.createElement("div");
                        foodItemDiv.classList.add("food-items");

                        // Acessar os ingredientes usados ou faltando
                        const usedIngredients = recipe.usedIngredients ? recipe.usedIngredients.map(ingredient => ingredient.name).join(", ") : "Ingredients not available";

                        foodItemDiv.innerHTML = `
                            <img src="${recipe.image}" alt="${recipe.title}">
                            <div class="details">
                                <h3>${recipe.title}</h3>
                                <p><strong>Ingredients:</strong> ${usedIngredients}</p>
                                <div class="price">
                                    <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
                                </div>
                            </div>
                        `;
                        recipeContainer.appendChild(foodItemDiv);
                    });
                } else {
                    recipeContainer.innerHTML = "<p>No recipes found with the selected ingredients.</p>";
                }
            })
            .catch(error => {
                console.error("Error when searching for recipes:", error);
                document.getElementById("recipes").innerHTML = "<p>Error fetching recipes. Please try again..</p>";
            });
    } else {
        document.getElementById("recipes").innerHTML = "<p>No ingredients selected.</p>";
    }
});

// Função para redirecionar para a página de detalhes
function viewRecipe(recipeId) {
    window.location.href = `../ProjetoDetalhes/index.html?id=${recipeId}`;
}
