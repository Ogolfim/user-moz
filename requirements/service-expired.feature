Feature: Procura por planos Expirados

  Scenario: Plano Expirado
    Given: Sistema duas vezes ao dia procura pelos planos pagos a mais 30 dias
    When: Sistema encontra planos pagos a mais 30 dias
    Then: Sistema deve salvar um estado de expirado nos planos
    And: Sistema deve notificar o usuário do plano expirado
  