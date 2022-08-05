from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.encoders import jsonable_encoder
from src.plots.domain.requiredFields.bar import PlotBody
from src.plots.domain.requiredFields.is_img_extension import is_img_extension
from src.plots.useCases.bar import barUseCase

barRouter = APIRouter(
    prefix='/plots',
    tags=['Plots']
)

@barRouter.post('/bar/{extension}/', response_class=FileResponse)
async def controller(
  extension: str,
  body: PlotBody = Body(embed=True)
):
  if (is_img_extension(extension)):
    body = jsonable_encoder(body)
    return await barUseCase(extension, body)

  raise HTTPException(
    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
    detail='Extension must be svg, png, webp, or pdf.'
  )
  
  
  