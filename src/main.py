from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .business.infra.router import businessRouter


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

app.include_router(businessRouter)