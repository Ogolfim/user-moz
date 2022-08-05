from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.encoders import jsonable_encoder
from src.texts.domain.requiredFields.csv import FileBody
from src.texts.domain.requiredFields.is_text_extension import is_text_extension
from src.texts.useCases.csv import csvUseCase

csvRouter = APIRouter(
    prefix='/texts',
    tags=['Texts']
)

@csvRouter.post('/csv/{extension}/', response_class=FileResponse)
async def controller(
  extension: str,
  body: FileBody = Body(embed=True)
):
  if (is_text_extension(extension)):
    body = jsonable_encoder(body)
    
    return await csvUseCase(extension, body)

  raise HTTPException(
    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
    detail='Extension must be csv, or excel.'
  )
  
  
  