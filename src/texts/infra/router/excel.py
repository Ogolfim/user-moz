from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.encoders import jsonable_encoder
from src.text.domain.requiredFields.excel import PlotBody
from src.text.domain.requiredFields.is_text_extension import is_text_extension
from src.text.useCases.excel import excelUseCase

excelRouter = APIRouter(
    prefix='/texts',
    tags=['Texts']
)

@excelRouter.post('/double-bar/{extension}/', response_class=FileResponse)
async def controller(
  extension: str,
  body: PlotBody = Body(embed=True)
):
  if (is_text_extension(extension)):
    body = jsonable_encoder(body)
    return await excelUseCase(extension, body)

  raise HTTPException(
    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
    detail='Extension must be csv, or excel.'
  )
  
  
  