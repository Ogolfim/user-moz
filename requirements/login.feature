Feature: Faz entrar na conta

  Scenario: Validar e autenticar o usuário
    Given: Cliente esta usando a endpoint de login
    When: Cliente solicitar ID Token para logar o usuário
    Then: Sistema deve validar parâmentros da requisição
    And: Sistema deve autenticar usuário
  
  Scenario: Criar ID Token
    Given: A validação teve sucesso
    Then: Sistema deve criar ID Token, com dados e permições do usuário
    And: Sitema deve retornar o ID Token

  Scenario: Erro de validação e autenticação
    Given: Foi encontrado erros na validação ou autenticação
    Then: Sistema deve interromper o processo
    And: Sitema deve retornar o erro