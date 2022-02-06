Feature: Como cliente quero logar o usuário usando servidores de autorização

  Scenario: Autorizar acesso
    Dado que estou na endpoint criar conta usando servidores de autorização
    Quando eu solicitar criar conta do usuário 
    Então o sistema deve me direcionar o usuário para a pagina de autorização de acesso

  Scenario: Usuário tem conta?
    Dado que o sistema tem acesso aos servidores dados do usuário
    Então o sistema deve solicitar nome e email do usuário
      E o sistema deve confirmar a existencia do nome e o email do usuário no armazenamento de dados

  Scenario: Usuário não tem conta
    Dado que não tem nome e email salvo do usuário
    Então o sitema deve salvar o nome email do usuário
  
  Scenario: Dados de login
    Dado que o sistema tem acesso aos servidores dados do usuário
    Então o sistema deve criar Access Token com 10 minutos de validade
      E o sitema deve criar um refresh Token com 2 dias de validade
      E o sistema deve me retornar Access Token, nome e permições do usuário



Feature: Como cliente quero logar o usando dados do formulário

  Scenario: Validação e autenticação do usuário
    Dado que estou na endpoint de login
    Quando eu solicitar logar o usuário
    Então o sistema deve validar parâmentros da requisição
      E o sisstema deve autenticar usuário
  
  Scenario: Dados de login
    Dado que estou na endpoint de login
    Então o sistema deve criar Access Token com 10 minutos de validade
      E o sistema deve retornar Access Token, nome e permições do usuário


  Scenario: Erro de validação e autenticação
    Dado que foi encontrado erro na validação ou autenticação
    Então o sistema deve interromper o processo
      E o sistema deve retornar o erro