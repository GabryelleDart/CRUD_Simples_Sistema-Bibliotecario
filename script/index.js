// Função para alternar a visibilidade do menu do administrador
function toggleAdminMenu() {
  const menu = document.getElementById("adminMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Função para carregar e exibir os alunos armazenados no localStorage na tabela
function loadStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const table = document.querySelector(".content table");

  // Define o cabeçalho da tabela
  table.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Nome</th>
      <th>Data de nascimento</th>
      <th>Telefone</th>
      <th>Email</th>
      <th>Ações</th>
    </tr>
  `;

  // Adiciona cada aluno como uma linha na tabela com botão para editar e excluir
  students.forEach(student => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.nome}</td>
      <td>${formatarData(student.dataNascimento)}</td>
      <td>${student.telefone}</td>
      <td>${student.email}</td>
      <td>
        <button onclick="editStudent(${student.id})">Editar</button>
        <button onclick="deleteStudent(${student.id})">Excluir</button>
      </td>
    `;
  });
}
//Formatação de data
function formatarData(data){
  const[ano,mes,dia]=data.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Função para redirecionar para a página de edição com os dados do aluno selecionado
function editStudent(id) {
  localStorage.setItem("editingStudentId", id);  // Armazena o ID do aluno a ser editado
  window.location.href = "htmls/editar.html";    // Redireciona para a página de edição
}

// Função para carregar os dados do aluno a ser editado na página de edição
function loadStudentData() {
  const studentId = localStorage.getItem("editingStudentId");  // Obtém o ID do aluno em edição
  if (!studentId) return;  // Se nenhum ID estiver armazenado, interrompe a função

  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students.find(s => s.id == studentId);  // Encontra o aluno correspondente ao ID

  if (student) {
    document.getElementById("id").value = student.id;               // Exibe o ID (imutável)
    document.getElementById("nome").value = student.nome;           // Preenche o nome do aluno
    document.getElementById("data-nascimento").value = student.dataNascimento;  // Preenche a data de nascimento
    document.getElementById("telefone").value = student.telefone;   // Preenche o telefone
    document.getElementById("email").value = student.email;         // Preenche o email
  }
}

// Função para salvar alterações feitas no aluno na página de edição
function saveEditedStudent() {
  const studentId = localStorage.getItem("editingStudentId");
  if (!studentId) return;

  let students = JSON.parse(localStorage.getItem("students")) || [];
  const updatedStudent = {
    id: studentId,  // ID permanece inalterado
    nome: document.getElementById("nome").value,
    dataNascimento: document.getElementById("data-nascimento").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value
  };

  // Atualiza os dados do aluno no localStorage
  students = students.map(student => student.id == studentId ? updatedStudent : student);
  localStorage.setItem("students", JSON.stringify(students));
  localStorage.removeItem("editingStudentId");  // Limpa o ID do aluno em edição
  window.location.href = "../index.html";       // Redireciona de volta para a lista de alunos
}

// Função para pesquisar alunos na tabela com base no valor da barra de pesquisa
function searchStudents() {
  const query = document.querySelector(".search-bar input").value.toLowerCase();
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const table = document.querySelector(".content table");

  // Redefine o cabeçalho da tabela
  table.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Nome</th>
      <th>Data de nascimento</th>
      <th>Telefone</th>
      <th>Email</th>
      <th>Ações</th>
    </tr>
  `;

  // Filtra alunos com base no texto da pesquisa e adiciona as linhas correspondentes à tabela
  students
    .filter(student => 
      student.nome.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.id.toString().includes(query) ||
      student.dataNascimento.includes(query) ||
      student.telefone.includes(query)
    )
    .forEach(student => {
      const row = table.insertRow();
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.nome}</td>
        <td>${student.dataNascimento}</td>
        <td>${student.telefone}</td>
        <td>${student.email}</td>
        <td>
          <button onclick="editStudent(${student.id})">Editar</button>
          <button onclick="deleteStudent(${student.id})">Excluir</button>
        </td>
      `;
    });
}

// Função para excluir um aluno específico pelo ID
function deleteStudent(id) {
  if (confirm("Deseja realmente excluir este aluno?")) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(student => student.id !== id);  // Filtra os alunos, removendo o com o ID especificado
    localStorage.setItem("students", JSON.stringify(students));  // Atualiza o localStorage com a nova lista
    loadStudents();  // Recarrega a tabela
  }
}

// Evento para pesquisa automática enquanto o usuário digita
document.querySelector(".search-bar input").addEventListener("input", searchStudents);

// Carrega os alunos ao iniciar a página
window.onload = loadStudents;
