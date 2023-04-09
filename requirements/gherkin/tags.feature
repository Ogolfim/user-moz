Feature: Como cliente quero salvar tags das informações que o usuário gosta no Mozeconomia

  Scenario: Validar e autenticar o usuário
    Dado que estou na endpoint de salvar tags
    Quando eu solicitar salvar tags
    Então o sistema deve validar parâmentros da requisição
      E o sistema deve autenticar usuário

  Scenario: Salvar tags das informações
    Dado que estou na endpoint de criação de tags
    Então o sistema deve conectar o usuário as tags
      E o sistema deve enviar as tags, nome e o email para o EmailService

  Scenario: Erro de validação e autenticação
    Dado que foi encontrado erro na validação ou autenticação
    Então o sistema deve interromper o processo
      E o sitema deve retornar o erro


Feature: Como cliente quero remover tags das informações que o usuário gosta na Mozeconomia

  Scenario: Validar e autenticar o usuário
    Dado que estou na endpoint de remoção de tags
    Quando eu solicitar remover tags
    Então o sistema deve validar parâmentros da requisição
      E o sistema deve autenticar usuário

  Scenario: Remover tags das informações
    Dado que as tags existem no sitema
    Então o sistema deve desconectar o usuário das tags
      E o sistema deve enviar um evento de remoção das tags para o EmailService

  Scenario: Erro de validação e autenticação
    Dado que foi encontrado erro na validação ou autenticação
    Então o sistema deve interromper o processo
      E o sitema deve retornar o erro
