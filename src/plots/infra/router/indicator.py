from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.encoders import jsonable_encoder
from src.plots.domain.requiredFields.indicator import PlotBody
from src.plots.domain.requiredFields.is_img_extension import is_img_extension
from src.plots.useCases.indicator import indicatorUseCase

indicatorRouter = APIRouter(
    prefix='/plots',
    tags=['Plots']
)

@indicatorRouter.post('/indicator/{extension}/', response_class=FileResponse)
async def controller(
  extension: str,
  body: PlotBody = Body(embed=False)
):
  if (is_img_extension(extension)):
    body = jsonable_encoder(body)
    return await indicatorUseCase(extension, body)

  raise HTTPException(
    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
    detail='Extension must be svg, png, webp, or pdf.'
  )
  
  
  