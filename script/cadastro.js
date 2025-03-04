// Factory para criar um aluno com ID aleatório
function createStudent(nome, dataNascimento, telefone, email) {
  return {
    id: Math.floor(Math.random() * 100000), // ID aleatório
    nome,
    dataNascimento,
    telefone,
    email,
  };
}

// Função para salvar aluno no localStorage
function saveStudent(student) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
}

// Evento de submissão do formulário
document.getElementById("formCadastro").addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const dataNascimento = document.getElementById("dataNascimento").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;

  const student = createStudent(nome, dataNascimento, telefone, email);
  saveStudent(student);

  alert("Aluno cadastrado com sucesso!");
  document.getElementById("formCadastro").reset();
});
