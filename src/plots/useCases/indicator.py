from pathlib import Path
from src.plots.domain.requiredFields.indicator import PlotBody
from src.plots.services.indicator import createIndicatorPlot


async def indicatorUseCase(extension: str, body: PlotBody):
    path = str(Path(__file__).parent.joinpath(f'static/figure.{extension}'))
    data = body['data']
    
    createIndicatorPlot(data, path)

    return path
