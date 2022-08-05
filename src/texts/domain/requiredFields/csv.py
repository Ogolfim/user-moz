from pydantic import BaseModel
  
class FileBody(BaseModel):
  data: list[list[str, float]]
  
  class Config:
    schema_extra = { 
      "example": {
        "data": [ 
          ['Name', 'Profession'],
          ['Derek', 'Software Developer'],
          ['Steve', 'Software Developer'],
          [7674, 8849]
        ]
      }
    }