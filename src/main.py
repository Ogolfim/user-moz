from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.plots.infra.router.area import areaRouter
from src.plots.infra.router.line import lineRouter
from src.plots.infra.router.bar import barRouter
from src.plots.infra.router.doubleBar import doubleBarRouter
from src.plots.infra.router.funnel import funnelRouter
from src.plots.infra.router.indicator import indicatorRouter


app = FastAPI()

origins = [
    "https://www.mozeconomia.co.mz",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(areaRouter)
app.include_router(lineRouter)
app.include_router(barRouter)
app.include_router(doubleBarRouter)
app.include_router(funnelRouter)
app.include_router(indicatorRouter)