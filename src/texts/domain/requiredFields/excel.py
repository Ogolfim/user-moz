from datetime import date
from pydantic import BaseModel

class FileData(BaseModel):
  x: date
  y: float

class FileBody(BaseModel):
  data: list[FileData]
  
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