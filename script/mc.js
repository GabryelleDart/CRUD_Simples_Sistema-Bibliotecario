// Função Factory para criar objeto de perfil
function criarPerfil(nome, endereco, telefone, email, id, funcao, horario) {
    return {
      nome,
      endereco,
      telefone,
      email,
      id,
      funcao,
      horario
    };
  }
  
  // Função para carregar dados do perfil no HTML
  function carregarPerfil() {
    let perfil = JSON.parse(localStorage.getItem("perfilAdmin"));
    if (!perfil) {
      perfil = criarPerfil(
        "Maria Silva", 
        "Rua das Flores, 123", 
        "(11) 98765-4321", 
        "maria.silva@empresa.com", 
        "123456", 
        "Bibliotecária", 
        "08:00 - 12:00"
      );
      localStorage.setItem("perfilAdmin", JSON.stringify(perfil));
    }
  
    document.getElementById("nome").textContent = perfil.nome;
    document.getElementById("endereco").textContent = perfil.endereco;
    document.getElementById("telefone").textContent = perfil.telefone;
    document.getElementById("email").textContent = perfil.email;
    document.getElementById("id").textContent = perfil.id;
    document.getElementById("funcao").textContent = perfil.funcao;
    document.getElementById("horario").textContent = perfil.horario;
  }
  
  // Função para editar a foto ( a ser desenvolvida posteriormente)
  function editarFoto() {
    alert("Função para editar a foto ainda não implementada.");
  }
  
  // Função para editar os dados do perfil
  function editarDados() {
    let perfil = JSON.parse(localStorage.getItem("perfilAdmin"));
  
    perfil.nome = prompt("Digite o novo nome:", perfil.nome) || perfil.nome;
    perfil.endereco = prompt("Digite o novo endereço:", perfil.endereco) || perfil.endereco;
    perfil.telefone = prompt("Digite o novo telefone:", perfil.telefone) || perfil.telefone;
    perfil.email = prompt("Digite o novo email:", perfil.email) || perfil.email;
  
    localStorage.setItem("perfilAdmin", JSON.stringify(perfil));
    carregarPerfil();
  }
  
  // Carregar perfil ao abrir a página
  document.addEventListener("DOMContentLoaded", carregarPerfil);
  