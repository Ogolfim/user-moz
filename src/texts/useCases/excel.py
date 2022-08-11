from pathlib import Path
from src.texts.domain.requiredFields.excel import FileBody
from src.texts.services.excel import createExcelFile


async def excelUseCase(extension: str, body: FileBody):
    path = str(Path(__file__).parent.joinpath(f'static/mozeconomia-dados.{extension}'))
    
    createExcelFile(body, path)

    return path
