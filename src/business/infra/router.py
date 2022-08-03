from fastapi import APIRouter
from fastapi.responses import FileResponse
from src.business.useCases.population import maritalStatusUseCase
from src.business.useCases.economic_climate import economicClimateUseCase

businessRouter = APIRouter( 
    prefix="/business",
    tags=['Business']
)

@businessRouter.get("/", response_class=FileResponse)
async def controller():
  return await economicClimateUseCase()

@businessRouter.get("/marital", response_class=FileResponse)
async def controller():
  return await maritalStatusUseCase()