from pathlib import Path
from src.plots.domain.requiredFields.group.line import PlotBody
from src.plots.services.group.line import createLinePlot


async def lineUseCase(extension: str, body: PlotBody):
    path = str(Path(__file__).parent.joinpath(f'static/mozeconomia-info-grafico.{extension}'))
    
    createLinePlot(body, path)

    return path
