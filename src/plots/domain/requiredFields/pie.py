from pydantic import BaseModel

class PlotData(BaseModel):
  x: str
  y: float
  
class PlotBody(BaseModel):
  data: list[PlotData]
  
  class Config:
    schema_extra = { 
      "example": {
        "data": [
          {
            "x": "Agricultura, Produção Animal, Caça, Silvicultura e Pesca",
            "y": 74395.58725994006
          },
          {
            "x": "Indústrias Extractivas",
            "y": 3341.195719616515
          },
          {
            "x": "Construção",
            "y": 4445.7351683828465
          },
          {
            "x": "Transportes, Armazenagem",
            "y": 18952.55797516886
          }
        ]
      }
    }