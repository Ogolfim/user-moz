Feature: Como cliente quero Pagar um plano do usuário

  Scenario: Validar e autenticar usuário
    Dados que estou na endpoint de pagamento de serviços
    Quando eu solicitar pagar um serviço para o usuário
    Então o sistema deve validar parâmentros da requisição
      E o sistema deve autenticar usuário
  
  Scenario: Salvar dados
    Dado que autenticação e validação teve sucesso
    Então o sistema deve salvar forma de pagamento escolhida
      E o sitema deve salvar dados de pagamento fornecidos
  
  Scenario: Pagamento por mês
    Dado que o usuário está pagar um número menor 12 de meses
    Então o sistema deve multiplicar o valor do plano pelo número de meses
      E o sistema deve salva o valor

  Scenario: Pagamento por ano
    Dado que o usuário está pagar o plano por 12
    Então o sistema deve multiplicar o valor do plano por 12
      E o sitema deve deve subtrair a percentagem de desconto
      E o sistema deve salva o valor

  Scenario: Criar e enviar fatura
    Dado que os dados estão salvos no banco de dados
    Então o sistema deve criar fatura
      E o sitema deve enviar fatura o usuário por email
      E o sitema deve retornar cliente um estado de pagamento pendente, com os dados para proceguir o pagamento se for necessário
      E o sistema faz o pagamento

  Scenario: Fatura paga
    Dado que a fatura foi paga com sucesso
    Então o sistema deve o sucesso da fatura paga
      E o sistema deve criar fatura
      E o sitema deve enviar fatura paga ao usuário por email com as instruções do serviço pago
  
  Scenario: Fatura não paga
    Dado que erro no pagamento da fatura
    Então o sistema salva o erro
      E o sistema deve criar fatura
      E o sitema deve enviar fatura paga ao usuário por email com as informações do erro

  Scenario: Criar, salvar e enviar APIKey
    Dado que a fatura foi paga com sucesso
      Elano escolhido incluí uso da API
    Então o sistema deve criar uma APIkey
      E o sitema deve salvar APIKey no banco de dados
      E o sitema deve enviar APIKey para o microserviço EconomicExpert
  

  Scenario: Erro de validação e autenticação
    Dado que a foi encontrado erros na validação ou autenticação
    Então o sistema interrompe o processo
      E o sitema retorna o erro


Feature: Procura por planos Expirados

  Scenario: Plano Expirado
    Dado que o sistema duas vezes ao dia procura pelos planos pagos a mais 30 dias
    Quando o sistema encontra planos pagos a mais 30 dias
    Então o sistema deve salvar um estado de expirado nos planos
      E o sistema deve notificar o usuário do plano expirado
  