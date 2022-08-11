from typing import Union
from pydantic import BaseModel
  
class FileBody(BaseModel):
  title: str
  description: Union[str, None] = None
  data: list[list[str, float]]
  
  class Config:
    schema_extra = { 
      "example": {
        "title": 'Vendas',
        "description": "25 de Agosto 2022, dia da grande promoção",
        "data": [ 
          ["Name Cliente","Email","Id da Fatura","Plano/Pacode","Valor","Estado"],
          ["Derek","derek@gmail.com","001A","Unipessoal","2500","Pago"],
          ["Tomas","derek@gmail.com","002A","Unipessoal","2500","Pago"],
          ["Piter","derek@gmail.com","003A","Unipessoal","2500","Pago"]
        ]
      }
    }