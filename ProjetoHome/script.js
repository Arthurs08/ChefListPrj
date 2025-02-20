document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("recipe-form");
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const searchButton = document.getElementById("search-button");
    const logoutButton  = document.getElementById("LogoutBt");

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            searchButton.disabled = !document.querySelector("input[type='checkbox']:checked");
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedIngredients = [...document.querySelectorAll("input[type='checkbox']:checked")].map(checkbox => checkbox.value).join(",");

        if (selectedIngredients) {
            window.location.href = `../ProjetoReceitas/index.html?ingredients=${encodeURIComponent(selectedIngredients)}`;
        } else {
            alert("Please select at least one ingredient.");
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
});
