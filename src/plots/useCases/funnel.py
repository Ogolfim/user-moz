from pathlib import Path
from src.plots.domain.requiredFields.funnel import PlotBody
from src.plots.services.funnel import createFunnelPlot


async def funnelUseCase(extension: str, body: PlotBody):
    path = str(Path(__file__).parent.joinpath(f'static/figure.{extension}'))
    
    createFunnelPlot(body, path)

    return path
