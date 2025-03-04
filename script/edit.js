// Função para carregar os dados do aluno para edição
function loadStudentData() {
  // Recupera o ID do aluno em edição armazenado no localStorage
  const studentId = localStorage.getItem("editingStudentId");  
  if (!studentId) {
    alert("Nenhum aluno foi selecionado para edição.");
    return;
  }

  // Recupera a lista de alunos do localStorage
  const students = JSON.parse(localStorage.getItem("students")) || [];
  
  // Busca o aluno pelo ID armazenado
  const student = students.find(s => s.id == studentId);
  
  // Verifica se o aluno foi encontrado e exibe os dados nos campos correspondentes
  if (student) {
    document.getElementById("id").value = student.id;                   // ID imutável
    document.getElementById("nome").value = student.nome;               // Nome do aluno
    document.getElementById("data-nascimento").value = student.dataNascimento;  // Data de nascimento
    document.getElementById("telefone").value = student.telefone;       // Telefone
    document.getElementById("email").value = student.email;             // Email
  } else {
    alert("Aluno não encontrado.");
  }
}

// Função para salvar as edições feitas no aluno
function saveEditedStudent() {
  const studentId = localStorage.getItem("editingStudentId");
  if (!studentId) {
    alert("Nenhum aluno selecionado para edição.");
    return;
  }

  // Recupera a lista de alunos do localStorage
  let students = JSON.parse(localStorage.getItem("students")) || [];
  
  // Cria o objeto atualizado com os novos valores
  const updatedStudent = {
    id: studentId,  // ID permanece inalterado
    nome: document.getElementById("nome").value,
    dataNascimento: document.getElementById("data-nascimento").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value
  };

  // Atualiza o aluno correspondente na lista de alunos
  students = students.map(student => student.id == studentId ? updatedStudent : student);
  
  // Salva a lista atualizada no localStorage
  localStorage.setItem("students", JSON.stringify(students));
  localStorage.removeItem("editingStudentId");  // Remove o ID do localStorage após salvar
  
  // Alerta de confirmação e redirecionamento
  alert("Dados do aluno foram atualizados com sucesso!");
  window.location.href = "../index.html";  // Redireciona para a página principal
}

// Carrega os dados do aluno ao iniciar a página de edição
window.onload = loadStudentData;

// Adiciona o evento de clique ao botão de salvar
document.getElementById("saveButton").addEventListener("click", saveEditedStudent);
