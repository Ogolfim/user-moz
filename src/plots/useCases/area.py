from pathlib import Path
from src.plots.domain.requiredFields.area import PlotBody
from src.plots.services.area import createAreaPlot


async def areaUseCase(extension: str, body: PlotBody):
    path = str(Path(__file__).parent.joinpath(f'static/figure.{extension}'))
    data = body['data']
    
    createAreaPlot(data, path)

    return path
