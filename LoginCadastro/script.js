function register() {
    const username = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (username && email && password) {
        const user = { username, email, password };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html"; 
    } else {
        alert("Preencha todos os campos!");
    }
}

function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        localStorage.setItem("loggedIn", JSON.stringify(storedUser));
        window.location.href = "../ProjetoHome/index.html";
    } else {
        alert("Username ou senha incorretos!");
    }
}

window.onload = function () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));
    if (loggedInUser) {
        window.location.href = "../ProjetoHome/index.html"; 
    }
};
