Feature: Como cliente quero logar o usuário usando servidores de autorização

  Scenario: Autorizar acesso
    Given: Estou na endpoint criar conta usando servidores de autorização
    When: Solicitar criar conta do usuário 
    Then: Sistema deve me direcionar o usuário para a pagina de autorização de acesso

  Scenario: Usuário tem conta?
    Given: Sistema tem acesso aos servidores dados do usuário
    Then: Sistema deve solicitar nome e email do usuário
    And: Sitema deve confirmar a existencia do nome e o email do usuário no armazenamento de dados

  Scenario: Usuário não tem conta
    Given: Não tem nome e email salvo do usuário
    Then: Sitema deve salvar o nome email do usuário
  
  Scenario: Dados de login
    Given: Sistema tem acesso aos servidores dados do usuário
    Then: Sistema deve criar ID Token
    And: Sitema deve me retornar ID Token, nome e permições do usuário



Feature: Como cliente quero logar o usando dados do formulário

  Scenario: Validação e autenticação do usuário
    Given: Estou na endpoint de login
    When: Cliente solicitar logar o usuário
    Then: Sistema deve validar parâmentros da requisição
    And: Sistema deve autenticar usuário
  
  Scenario: Dados de login
    Given: Estou na endpoint de login
    Then: Sistema deve criar ID Token
    And: Sitema deve retornar ID Token, nome e permições do usuário


  Scenario: Erro de validação e autenticação
    Given: Foi encontrado erros na validação ou autenticação
    Then: Sistema deve interromper o processo
    And: Sitema deve retornar o erro