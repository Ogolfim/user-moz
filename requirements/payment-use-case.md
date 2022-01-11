# Pagamento

> ## Caso de sucesso
1. Sistema valida se os dados pagamento
2. Sistema salva os dados de pagamento
3. Sistema envia cria uma fatura e envia para o usuário
4. Sistema retorna com um estado de pagamento pendente ao cliente
5. Sistema inicia o processo de pagamento, será diferente dependo da forma de pagamento escolhida
6. Sistema salva o relatório do processo de pagamento
7. Sistema enviar um email com fatura paga e as instruções de como ter o serviço

> ## Excepção - Uso API economicExpert
1. Sistema cria uma API Key para o usuário
2. Sistema salva a API Key
3. Sistema envia API Key para o microserviço EconomicExpert

> ## Excepção - Baixar arquivos no website
1. Sistema sempre cria ID Token observando se o usuário tem ou não a permissão para baixar arquivos no website

> ## Excepção - Pagamento não concluído
1. Sistema notifica o usuário do erro de pagamento por email
2. Sistema salva o erro

> ## Excepção - Validação dos dados
1. Sistema interrompe o processo
2. Sistema retorna o erro