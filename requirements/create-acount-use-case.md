# Criar Conta do Usuário

> ## Caso de sucesso
1. Sistema valida os dados do usuário
2. Sistema verifica se o usuário não conta
3. Sistema salva os dados pessoais do usuário
4. Sistema Cria uma ID Token
5. Sistema retorna uma ID Token do usuário


> ## Exceção - Atualizações por email
1. Sistema verifica se o usuário selecionou tags de informação
2. Sistema verifica se o usuário escolheu ser atualizado 
3. Sistema envia as tags junto com o nome e o email do usuário

> ## Exceção - Usuário já tem conta
1. Sistema interrompe o processo
2. Sistema retorna o erro

> ## Excepção - Validação dos  dados
1. Sistema interrompe o processo
2. Sistema retorna o erro