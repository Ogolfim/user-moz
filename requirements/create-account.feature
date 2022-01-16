Feature: Como cliente quero criar conta do usuário usando OAuth2 

  Scenario: Autorizar acesso
    Given: Estou na endpoint criar conta usando servidores de autorização
    When: Solicitar criar conta do usuário 
    Then: Sistema deve me direcionar o usuário para a pagina de autorização de acesso

  Scenario: Salvar name e email
    Given: Sistema tem acesso aos servidores dados do usuário
    Then: Sistema deve solicitar nome e email do usuário
    And: Sitema deve salvar o nome email do usuário
  
  Scenario: Dados de login
    Given: Sistema tem acesso aos servidores dados do usuário
    Then: Sistema deve criar ID Token
    And: Sitema deve me retornar ID Token, nome e permições do usuário


Feature: Como cliente quero criar conta do usuário usando dados do formulário

  Scenario: Validar dados do usuário
    Given: Estou na endpoint de criar conta
    When: Solicitar criar conta do usuário
    Then: Sistema deve validar parâmentros da requisição
    And: Sistema deve salvar os dados do usuário

  Scenario: Dados de login
    Given: Dados foram salvos com sucesso
    Then: Sistema deve criar ID Token
    And: Sitema deve retornar ID Token, nome e permições do usuário
  
  Scenario: Usuário já tem conta
    Given: Foi encontrado uma conta ja existente do usuário
    Then: Sistema interrompe o processo
    And: Sitema deve retornar o erro com mensagem "Oops!, já existe uma conta com este email."

  Scenario: Erro de validação
    Given: Foi encontrado erros na validação
    Then: Sistema deve interromper o processo
    And: Sitema deve retornar o erro


Feature: Como cliente quero salvar tags das informações que o usuário gosta no website

  Scenario: Validar e autenticar o usuário
    Given: Estou na endpoint de salvar tags
    When: Solicitar salvar tags
    Then: Sistema deve validar parâmentros da requisição
    And: Sistema deve autenticar usuário

  Scenario: Salvar tags das informações
    Given: Usuário concorda em receber atualizações das informações
    Then: Sistema deve enviar as tags, nome e o email para o EmailService

    Scenario: Erro de validação e autenticação
    Given: Foi encontrado erros na validação ou autenticação
    Then: Sistema deve interromper o processo
    And: Sitema deve retornar o erro