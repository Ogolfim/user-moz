from pydantic import BaseModel

class FileBody(BaseModel):
  data: list[list[str, float]]
  
  class Config:
    schema_extra = { 
      "example": {
        "data": [ 
          ["Name Cliente","Email","Id da Fatura","Plano/Pacode","Valor","Estado"],
          ["Derek","derek@gmail.com","001A","Unipessoal","2500","Pago"],
          ["Tomas","derek@gmail.com","002A","Unipessoal","2500","Pago"],
          ["Piter","derek@gmail.com","003A","Unipessoal","2500","Pago"]
        ]
      }
    }