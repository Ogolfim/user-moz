Feature: Faz entrar na conta

  Scenario: Validar e autenticar o usuário
    Given: Cliente esta user a endpoint de login
    When: Cliente solicitar logar o usuário
    Then: Sistema deve validar parâmentros da requisição
    And: Sistema deve autenticar usuário
  
  Scenario: Dados de login
    Given: A validação teve sucesso
    Then: Sistema deve criar ID Token
    And: Sitema deve retornar ID Token, nome e permições do usuário


  Scenario: Erro de validação e autenticação
    Given: Foi encontrado erros na validação ou autenticação
    Then: Sistema deve interromper o processo
    And: Sitema deve retornar o erro