from fastapi import APIRouter
from fastapi.responses import FileResponse
from ..useCases.economic_climate import economicClimateUseCase

businessRouter = APIRouter( 
    prefix="/business",
    tags=['Business']
)

@businessRouter.get("/", response_class=FileResponse)
async def controller():
  return await economicClimateUseCase()