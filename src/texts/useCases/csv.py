from pathlib import Path
from src.texts.domain.requiredFields.csv import FileBody
from src.texts.services.csv import createCsvFile


async def csvUseCase(extension: str, body: FileBody):
    path = str(Path(__file__).parent.joinpath(f'static/mozeconomia-dados.{extension}'))
    data = body['data']
    
    createCsvFile(data, path)

    return path
