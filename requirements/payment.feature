Feature: Pagar um plano

  Scenario: Validar e autenticar usuário
    Given: Cliente esta user a endpoint de pagamento de serviços
    When: Cliente solicitar pagar um serviço para o usuário
    Then: Sistema deve validar parâmentros da requisição
    And: Sistema deve autenticar usuário
  
  Scenario: Salvar dados
    Given: Autenticação e validação teve sucesso
    Then: Sistema deve salvar forma de pagamento escolhida
    And: Sitema deve salvar dados de pagamento fornecidos
  
  Scenario: Pagamento por mês
    Given: Usuário está pagar um número menor 12 de meses
    Then: Sistema deve multiplicar o valor do plano pelo número de meses
    And: Sistema deve salva o valor

  Scenario: Pagamento por ano
    Given: Usuário está pagar o plano por 12
    Then: Sistema deve multiplicar o valor do plano por 12
    And: Sitema deve deve subtrair a percentagem de desconto
    And: Sistema deve salva o valor

  Scenario: Criar e enviar fatura
    Given: Dados estão salvos no banco de dados
    Then: Sistema deve criar fatura
    And: Sitema deve enviar fatura o usuário por email
    And: Sitema deve retornar cliente um estado de pagamento pendente, com os dados para proceguir o pagamento se for necessário
    And: Sistema faz o pagamento

  Scenario: Fatura paga
    Given: Fatura foi paga com sucesso
    Then: Sistema deve o sucesso da fatura paga
    And: Sistema deve criar fatura
    And: Sitema deve enviar fatura paga ao usuário por email com as instruções do serviço pago
  
  Scenario: Fatura não paga
    Given: Erro no pagamento da fatura
    Then: Sistema salva o erro
    And: Sistema deve criar fatura
    And: Sitema deve enviar fatura paga ao usuário por email com as informações do erro

  Scenario: Criar, salvar e enviar APIKey
    Given: Fatura foi paga com sucesso
    And: Plano escolhido incluí uso da API
    Then: Sistema deve criar uma APIkey
    And: Sitema deve salvar APIKey no banco de dados
    And: Sitema deve enviar APIKey para o microserviço EconomicExpert
  

  Scenario: Erro de validação e autenticação
    Given: Foi encontrado erros na validação ou autenticação
    Then: Sistema interrompe o processo
    And: Sitema retorna o erro


Feature: Procura por planos Expirados

  Scenario: Plano Expirado
    Given: Sistema duas vezes ao dia procura pelos planos pagos a mais 30 dias
    When: Sistema encontra planos pagos a mais 30 dias
    Then: Sistema deve salvar um estado de expirado nos planos
    And: Sistema deve notificar o usuário do plano expirado
  