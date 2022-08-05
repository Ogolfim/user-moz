from datetime import date
from pydantic import BaseModel

class PlotData(BaseModel):
  x: str
  y: float
  color: str

class PlotBody(BaseModel):
  data: list[PlotData]

  class Config:
    schema_extra = { 
      "example": {
        "data": [
          {
            "x": "solteiros",
            "y": 3196633,
            "color": "Maculino"
          },
          {
            "x": "casados",
            "y": 1080161,
            "color": "Maculino"
          },
          {
            "x": "solteiros",
            "y": 2843826,
            "color": "Mulheres"
          },
          {
            "x": "casados",
            "y": 1177972,
            "color": "Mulheres"
          }
        ]
      }
    }