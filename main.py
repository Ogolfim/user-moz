from typing import List, Union
from fastapi import FastAPI, Header
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: Union[str, None] = None
    price: float
    tax: Union[float, None] = None

@app.get("/")
async def read_items(x_token: Union[List[str], None] = Header(default=None)):
    return {"X-Token values": x_token}
  
@app.get("/items/{item_id}")
async def read_item(item_id: str, q: str or None = None):
    if q:
      return {"item_id": item_id, "q": q}
    return {"item_id": item_id}

fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


@app.get("/items/")
async def read_item(skip: int, limit: int):
    return fake_items_db[skip : skip + limit]

@app.post("/items/")
async def create_item(item: Item):
    return item

class Image(BaseModel):
    url: str
    name: str


class Item(BaseModel):
    name: str
    description: Union[str, None] = None
    price: float
    tax: Union[float, None] = None
    tags: set[str] = set()
    image: Union[Image, None] = None


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    results = {"item_id": item_id, "item": item}
    return results

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

path = 'figure.svg'

@app.get("/", response_class=FileResponse)
async def read_items(response: FileResponse):
    fig = px.bar(x=["a", "b", "c"], y=[1, 3, 2])
    fig.write_image(path)
    response.headers["Content-Disposition"] = f"attachment;filename={path}"
    return path
 