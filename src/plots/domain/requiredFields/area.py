from datetime import date
from typing import Union
from pydantic import BaseModel

class PlotData(BaseModel):
  x: date
  y: float

class PlotBody(BaseModel):
  data: list[PlotData]
  tickformat: Union[str, None] = None
  ticksuffixY: Union[str, None] = None
  
  class Config:
    schema_extra = { 
      'example': {
        'tickformat': '%b\n%Y',
        'ticksuffixY': '%',
        'data': [
          {
            'x': '2022-02-01',
            'y': 0
          },
          {
            'x': '2022-03-01',
            'y': 4
          },
          {
            'x': '2022-04-01',
            'y': 2
          }
        ]
      }
    }