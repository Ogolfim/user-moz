# BDD Specs

## Narrativa 1

```
  Como cliente com um usuário que não tenha conta Mozeconomia
Quero que o sistema crie uma conta para o usuário
```

### Cenários 
```
  Dado que o cliente esta usando a endpoint de criar conta
Quando o cliente solicitar criar conta do usuário
  Então o sistema deve criar conta para do usuário
    E o sistema deve criar uma ID Token, com as permissões do usuário
    E o sistema deve retornar com os dados de logIn do usuário

  Dado que o usuário selecionou as categorias das informações que gosta de ver no website e escolheu receber atualizações dessas
Quando o cliente solicitar criar conta do usuário
  Então o sistema deve criar conta para do usuário
    E o sistema deve enviar as tags das categorias das informações, nome do usuário e email para o EmailService
    E o sistema deve criar uma ID Token, com as permissões do usuário
    E o sistema deve retornar com os dados de logIn do usuário
```




## Narrativa 2

```
  Como cliente com um usuário que tenha uma conta Mozeconomia e não tenha ainda se autenticado
Quero que o sistema me retorne os dados de logIn do usuário
```

### Cenários 
```
  Dado que o cliente esta usando a endpoint de logIn
Quando o cliente solicitar os dados de logIn do usuário
  Então o sistema deve fazer a devida autenticação
    E o sistema deve criar uma ID Token, com as permissões do usuário
    E o sistema deve retornar com os dados de logIn
```




## Narrativa 3

```
  Como cliente, com um usuário que tenha uma conta Mozeconomia e autenticado
Quero que o sistema me retorne um ID Token novo
```

### Cenários 
```
  Dado que o cliente esta usando a endpoint refresh token
Quando o cliente solicitar um novo ID token
  Então o sistema deve criar um novo ID Token com todas a permissões do usuário
    E o sistema deve retornar com ID Token
```




## Narrativa 4

```
  Como cliente, com um usuário que tenha uma conta Mozeconomia e autenticado
Quero que o sistema atualize os dados do usuário
```

### Cenários 
```
  Dado que o cliente esta usando a endpoint de atualizar dados pessoais do usuário
Quando o cliente solicitar atualizar os dados pessoais do usuário
  Então o sistema deve atualizar dados pessoais do usuário

  Dado que o cliente esta atualizando as categorias das informações que usuário gosta de ver no website e escolheu receber atualizações dessas
Quando o cliente solicitar atualizar os dados pessoais do usuário
  Então o sistema deve dados pessoais do usuário
    E o sistema deve enviar as tags das categorias das informações, nome do usuário e email para o EmailService
```




## Narrativa 5

```
  Como cliente com um usuário que tenha uma conta Mozeconomia e autenticado
Quero que o sistema processe o pagamento do plano pago que o usuário deseja usar 
```

### Cenários 
```
  Dado que o cliente esta usando a endpoint de pagamento de planos pagos
    E o cliente tem a forma de pagamento que deve ser usada
    E o cliente tem os dados necessários para forma de pagamento selecionada
Quando o cliente solicitar fazer o pagamento do plano do usuário
  Então o sistema deve salvar a forma de pagamento escolhida
    E o sistema deve salvar os dados da forma de pagamento
    E o sistema deve criar e enviar uma fatura por email para o usuário
    E o sistema deve retornar ao cliente um estado de pagamento pendente
  
  Dado que o plano escolhido incluí uso da API
Quando o processo de pagamento for concluído
  E tendo tido sucesso
  Então o sistema deve salvar o relatório do processo de pagamento
    E o sistema deve criar uma APIkey para o usuário 
    E o sistema deve salvar APIkey
    E o sistema deve enviar APIKey para o microserviço EconomicExpert
    E o sistema deve enviar um email com a fatura paga para o usuário

  Dado que o plano escolhido não incluí uso da API
Quando o processo de pagamento for concluído
  E tendo tido sucesso
  Então o sistema deve salvar o relatório do processo de pagamento
    E o sistema deve enviar um email de fatura paga para o usuário

Quando o processo de pagamento for concluído
  Não tendo tido sucesso
  Então o sistema deve salvar o relatório do processo de pagamento
    E o sistema deve enviar um email para notificar o usuário do erro
```





## Narrativa 6

```
  Como cliente com um usuário que tenha uma conta Mozeconomia e autenticado
Quero que o sistema me retorne os dados do perfil do usuário
```

### Cenários 
```
  Dado que o cliente esta usando a endpoint de consulta de dados de perfil do usuário
    E parâmetros de consulta corretos
Quando o cliente solicitar os dados de perfil do usuário
  Então o sistema deve retornar os dados de perfil do usuário

  Dado que o usuário esta usando um plano pago ou já usou no passado
    Então o sistema deve retornar os dados do plano
```




## Narrativa 7

```
  Como cliente com um usuário que tenha uma conta Mozeconomia e autenticado
Quero que o sistema me retorne os dados de pagamento do usuário
```

### Cenários 
```
  Dado que o usuário esta usando um plano pago ou já usou no passado
    E o cliente esta usando a endpoint de consulta de dados de pagamento 
    E parâmetros de consulta corretos
Quando o cliente solicitar os dados de pagamento do usuário
  Então o sistema deve retornar os dados de pagamento do usuário
```