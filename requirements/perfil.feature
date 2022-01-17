Feature: Como cliente quero dados de perfil do usuário

  Scenario: Validar e autenticar usuário
    Dado que estou na endpoint de consulta de perfil
    Quando eu solicitar perfil do usuário
    Então o sistema deve validar parâmentros da requisição
      E o sistema deve autenticar usuário
  
  Scenario: Dados de perfil
    Dados que autenticação teve sucesso
    Então o sistema deve caregar os dados no banco de dados
      E o sitema deve retorna os dados para o cliente

  Scenario: Erro de validação e autenticação
    Dado que foi encontrado erros na validação ou autenticação
    Então o sistema interrompe o processo
      E o sistema retorna o erro