from datetime import date
from pydantic import BaseModel


class PlotData(BaseModel):
  x: date
  y: float

class PlotBody(BaseModel):
  data: list[PlotData]
  
  class Config:
    schema_extra = { 
      "example": {
        "data": [
          {
            "x": "2022-02-01",
            "y": 0
          },
          {
            "x": "2022-03-01",
            "y": 4
          },
          {
            "x": "2022-04-01",
            "y": 2
          }
        ]
      }
    }