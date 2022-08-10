from pathlib import Path
from src.plots.domain.requiredFields.pie import PlotBody
from src.plots.services.pie import createPiePlot


async def pieUseCase(extension: str, body: PlotBody):
    path = str(Path(__file__).parent.joinpath(f'static/mozeconomia-info-grafico.{extension}'))
    data = body['data']
    
    createPiePlot(data, path)

    return path
