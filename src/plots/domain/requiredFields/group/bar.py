from datetime import date
from typing import Union
from pydantic import BaseModel

class Axis(BaseModel):
  x: Union[date, str]
  y: float
  
class PlotData(BaseModel):
  name: str
  color: str
  axis: list[Axis]

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
            'name': 'Income',
            'color': 'green',
            'axis': [
              {
                'x': '2022-02-01',
                'y': 3
              },
              {
                'x': '2022-03-01',
                'y': 8
              },
              {
                'x': '2022-04-01',
                'y': 12
              }
            ]
          },
          {
            'name': 'Expenses',
            'color': 'red',
            'axis': [
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
        ]
      }
    }