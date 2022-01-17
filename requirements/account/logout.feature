Feature: Logout

  Scenario: Logout do usuário no cliente
    Dado que estou na endpoint de logout
    Quando eu solicitar logout do usuário
    Então o sistema deve validar parâmentros da requisição
    And: Sistema deve autenticar usuário
  
  Scenario: Dados de perfil
    Dado que validação e autenticação teve sucesso
    Então o sistema deve Remover o ID Token no cliente

  Scenario: Erro de validação e autenticação
    Dado que foi encontrado erro na validação ou autenticação
    Então o sistema interrompe o processo
      E o sistema retorna o erro