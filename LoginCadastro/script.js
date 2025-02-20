// CADASTRAR USUÁRIO
function register() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (name && email && password) {
        const user = { name, email, password };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html"; 
    } else {
        alert("Preencha todos os campos!");
    }
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem("loggedIn", JSON.stringify(storedUser));
        window.location.href = "../ProjetoHome/index.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
}

// CHECAR SE O USUÁRIO ESTÁ LOGADO
window.onload = function () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));
    if (loggedInUser) {
        window.location.href = "../ProjetoHome/index.html"; 
    }
};
