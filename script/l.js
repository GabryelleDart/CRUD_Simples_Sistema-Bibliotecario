//realizar o login
function login() {
    const colaboradoraId = document.getElementById('colaboradoraId').value;
    const senha = document.getElementById('senha').value;
    const errorMessage = document.getElementById('errorMessage');

    if (colaboradoraId === '123456' && senha === '123456') {
      localStorage.setItem('colaboradoraId', colaboradoraId);
      localStorage.setItem('senha', senha);
      errorMessage.textContent = ''; // Limpar mensagem de erro
      alert('Login realizado com sucesso!');
      // Redirecionar para a página principal da aplicação:
      window.location.href = "../index.html";
    } else {
      errorMessage.textContent = 'ID de colaboradora ou senha incorretos.';
    }
  }