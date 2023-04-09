Feature: Como cliente quero dados de perfil do usuário

  Scenario: Validar e autenticar usuário
    Dado que estou na endpoint de refresh Token
    Quando eu solicitar um novo Token
    Então o sistema deve validar parâmentros da requisição
      E o sistema deve autenticar usuário
  
  Scenario: Novo Token
    Dados que autenticação teve sucesso
    Então o sistema deve criar Access Token com 10 minutos de validade
      E o sitema deve remover qualquer refresh Token que tiver
      E o sitema deve criar um novo refresh Token com 1 dias de validade
      E o sitema deve retornar o novo refresh Token
      E o sistema deve retornar Access Token

  Scenario: Erro de validação e autenticação
    Dado que foi encontrado erros na validação ou autenticação
    Então o sistema interrompe o processo
      E o sistema retorna o erro