from pydantic import BaseModel

class FileBody(BaseModel):
  data: list[list[str, float]]
  
  class Config:
    schema_extra = { 
      "example": {
        "data": [ 
          ['Name', 'Profession', 'Class'],
          ['Derek', 'Software Developer', 'A'],
          ['Steve', 'Software Developer', 'B'],
          [7674, 8849, 99]
        ]
      }
    }