from pathlib import Path
from src.plots.domain.requiredFields.line import PlotBody
from src.plots.services.line import createLinePlot


async def lineUseCase(extension: str, body: PlotBody):
    path = str(Path(__file__).parent.joinpath(f'static/mozeconomia-info-grafico.{extension}'))
    data = body['data']
    
    createLinePlot(data, path)

    return path
