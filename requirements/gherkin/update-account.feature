Feature: Como cliente quero atualizar o nome do usuário 

  Scenario: Validar e autenticar o usuário
    Dado que estou na endpoint de atualizar nome
    Quando eu solicitar atualizar o nome
    Então o sistema deve validar parâmentros da requisição
      E o sistema deve autenticar usuário

  Scenario: Atualizar nome do usuário
    Dado que a autenticação teve sucesso
    Então o sistema deve atualizar o nome do usuário
      E o sistema deve enviar um evento de atualização de nome para o EmailService

  Scenario: Erro de validação e autenticação
    Dado que foi encontrado erro na validação ou autenticação
    Então o sistema deve interromper o processo
      E o sitema deve retornar o erro


Feature: Como cliente quero atualizar o email do usuário 

  Scenario: Validar e autenticar o usuário
    Dado que estou na endpoint de atualizar email
    Quando eu solicitar atualizar o email
    Então o sistema deve validar parâmentros da requisição
      E o sistema deve autenticar usuário

  Scenario: Atualizar email do usuário
    Dado que a autenticação teve sucesso
      E o email que pretende usar não existe no sistema
    Então o sistema deve atualizar o email do usuário
      E o sistema deve enviar um evento de atualização de email para o EmailService

  Scenario: Erro de validação e autenticação
    Dado que foi encontrado erro na validação ou autenticação
    Então o sistema deve interromper o processo
      E o sitema deve retornar o erro


