// Login simples: guarda o nome do usuário no navegador (sem servidor)

document.getElementById("form-entrar").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const aviso = document.getElementById("email").parentElement.querySelector("small");
  if (email.includes("@") === false || senha.length < 6) {
    aviso.textContent = "Informe um e-mail válido e a senha com 6 ou mais caracteres.";
    return;
  }
  const nome = email.split("@")[0];
  localStorage.setItem("usuario", JSON.stringify({ nome: nome, email: email }));
  window.location.href = "minha-conta.html";
});
