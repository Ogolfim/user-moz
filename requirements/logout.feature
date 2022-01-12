Feature: Consulta de dados de perfil

  Scenario: Validar e autenticar usuário
    Given: Cliente esta usando a endpoint de consulta de perfil
    When: Cliente solicitar perfil do usuário
    Then: Sistema deve validar parâmentros da requisição
    And: Sistema deve autenticar usuário
  
  Scenario: Dados de perfil
  
    Then: Sistema deve caregar os dados no banco de dados
    And: Sitema deve retorna os dados para o cliente

  Scenario: Erro de validação e autenticação
    Given: Foi encontrado erros na validação ou autenticação
    Then: Sistema interrompe o processo
    And: Sitema retorna o erro