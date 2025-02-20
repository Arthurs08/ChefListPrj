document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    if (!recipeId) {
        document.getElementById("recipe-details").innerHTML = "<p>No recipe selected.</p>";
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
            <ol id="ingredients-list"></ol>
            <h3>Instructions:</h3>
            <div class="instructions" id="instructions"></div>
        `;

        // Preenche a lista de ingredientes em formato de "passos"
        const ingredientsList = document.getElementById("ingredients-list");
        recipe.extendedIngredients.forEach((ingredient) => {
            const li = document.createElement("li");
            li.textContent = `${ingredient.original}`;
            ingredientsList.appendChild(li);
        });

        // Preenche as instruções
        const instructionsContainer = document.getElementById("instructions");
        if (recipe.instructions) {
            const steps = recipe.instructions.split("\n").map(step => step.trim()).filter(Boolean);
            steps.forEach(step => {
                const p = document.createElement("p");
                p.textContent = step;
                instructionsContainer.appendChild(p);
            });
        } else {
            instructionsContainer.innerHTML = "<p>No instructions available.</p>";
        }
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        document.getElementById("recipe-details").innerHTML = "<p>Error loading recipe details.</p>";
    }
});
    // VERIFICAR SE O USUÁRIO ESTÁ LOGADO
    window.onload = function () {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));
        if (!loggedInUser) {
            alert("Você precisa estar logado para acessar esta página!");
            window.location.href = "../LoginCadastro/login.html"; 
        }
    };
    // FUNÇÃO PARA FAZER LOGOUT
    function logout() {
        localStorage.removeItem("loggedIn");
        alert("Você saiu da sua conta.");
        window.location.href = "../LoginCadastro/login.html";
    }
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
