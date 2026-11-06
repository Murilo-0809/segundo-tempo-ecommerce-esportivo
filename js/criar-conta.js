// Cadastro simples: valida os campos e guarda o usuário no navegador

ligarMascara("cpf", "000.000.000-00");
ligarMascara("celular", "(00) 00000-0000");

function marcarErro(id, valido, mensagem) {
  const campo = document.getElementById(id);
  const aviso = campo.parentElement.querySelector("small");
  campo.classList.toggle("invalido", !valido);
  aviso.textContent = valido ? "" : mensagem;
  return valido;
}

document.getElementById("form-criar").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value;
  const celular = document.getElementById("celular").value;
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  let ok = true;
  ok = marcarErro("nome", nome.length >= 3 && nome.includes(" "), "Informe nome e sobrenome.") && ok;
  ok = marcarErro("cpf", cpf.length === 14, "Informe um CPF completo.") && ok;
  ok = marcarErro("celular", celular.length === 15, "Informe um celular completo.") && ok;
  ok = marcarErro("email", email.includes("@") && email.includes("."), "E-mail inválido.") && ok;
  ok = marcarErro("senha", senha.length >= 8, "A senha deve ter 8 caracteres ou mais.") && ok;
  if (!document.getElementById("termos").checked) {
    ok = false;
  }
  if (ok) {
    localStorage.setItem("usuario", JSON.stringify({ nome: nome, email: email, cpf: cpf, celular: celular }));
    window.location.href = "minha-conta.html";
  }
});
