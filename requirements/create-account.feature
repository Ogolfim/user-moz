Feature: Criar conta

  Scenario: Validar dados do usuário
    Given: Cliente esta user a endpoint de criar conta
    When: Cliente solicitar criar conta do usuário
    Then: Sistema deve validar parâmentros da requisição

  Scenario: Salvar dados do usuário
    Given: Validação teve sucesso
    Then: Sistema deve salvar os dados do usuário

  Scenario: Salvar Tags
    Given: Usuário selecionou tags de informações que gosta no website e concorda em receber atualizações
    Then: Sistema deve salvar tags selecionadas
    And: Sistema deve enviar tags selecionadas, nome e email para o EmailService

  Scenario: Criar ID Token
    Given: Dados foram salvos com sucesso
    Then: Sistema deve criar ID Token, com dados e perrmições do usuário
    And: Sitema deve retornar o ID Token
  
  Scenario: Usuário já tem conta
    Given: Foi encontrado uma conta ja existente do usuário
    Then: Sistema interrompe o processo
    And: Sitema deve retornar o erro com mensagem "Oops!, já existe uma conta com este email."

  Scenario: Erro de validação
    Given: Foi encontrado erros na validação
    Then: Sistema deve interromper o processo
    And: Sitema deve retornar o erro