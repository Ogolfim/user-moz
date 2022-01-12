Feature: Logout

  Scenario: Logout do usuário no cliente
    Given: Cliente esta usar a endpoint de logout
    When: Cliente solicitar logout do usuário
    Then: Sistema deve validar parâmentros da requisição
    And: Sistema deve autenticar usuário
  
  Scenario: Dados de perfil
    Given: Validação e autenticação teve sucesso
    Then: Sistema deve Remover o ID Token no cliente

  Scenario: Erro de validação e autenticação
    Given: Foi encontrado erros na validação ou autenticação
    Then: Sistema interrompe o processo
    And: Sitema retorna o erro