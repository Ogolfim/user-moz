from pathlib import Path
from src.plots.domain.requiredFields.doubleBar import PlotBody
from src.plots.services.doubleBar import createDoubleBarPlot


async def doubleBarUseCase(extension: str, body: PlotBody):
    path = str(Path(__file__).parent.joinpath(f'static/figure.{extension}'))
    data = body['data']
    
    createDoubleBarPlot(data, path)

    return path
