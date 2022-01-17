Feature: Como cliente quero criar conta do usuário usando servidores de autorização

  Scenario: Autorizar acesso
    Dado que estou na endpoint criar conta usando servidores de autorização
    Quando solicitar criar conta do usuário 
    Então o sistema deve me direcionar o usuário para a pagina de autorização de acesso

  Scenario: Salvar name e email
    Given: Sistema tem acesso aos servidores dados do usuário
    Então o sistema deve solicitar nome e email do usuário
      E o sitema deve salvar o nome email do usuário
  
  Scenario: Dados de login
    Given: Sistema tem acesso aos servidores dados do usuário
    Então o sistema deve criar ID Token
      E o sitema deve me retornar ID Token, nome e permições do usuário


Feature: Como cliente quero criar conta do usuário usando dados do formulário

  Scenario: Validar dados do usuário
    Dado que estou na endpoint de criar conta
    Quando solicitar criar conta do usuário
    Então o sistema deve validar parâmentros da requisição
      E o sistema deve salvar os dados do usuário

  Scenario: Dados de login
    Given: Dados foram salvos com sucesso
    Então o sistema deve criar ID Token
      E o sitema deve retornar ID Token, nome e permições do usuário
  
  Scenario: Usuário já tem conta
    Given: Foi encontrado uma conta ja existente do usuário
    Então o sistema interrompe o processo
      E o sitema deve retornar o erro com mensagem "Oops!, já existe uma conta com este email."

  Scenario: Erro de validação
    Given: Foi encontrado erros na validação
    Então o sistema deve interromper o processo
      E o sitema deve retornar o erro


Feature: Como cliente quero salvar tags das informações que o usuário gosta no website

  Scenario: Validar e autenticar o usuário
    Dado que estou na endpoint de salvar tags
    Quando eu solicitar salvar tags
    Então o sistema deve validar parâmentros da requisição
      E o sistema deve autenticar usuário

  Scenario: Salvar tags das informações
    Dado que o usuário concorda em receber atualizações das informações
    Então o sistema deve enviar as tags, nome e o email para o EmailService

  Scenario: Erro de validação e autenticação
    Dado que foi encontrado erro na validação ou autenticação
    Então o sistema deve interromper o processo
      E o sitema deve retornar o erro