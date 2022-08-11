from pathlib import Path
from src.plots.domain.requiredFields.group.area import PlotBody
from src.plots.services.group.area import createAreaPlot


async def areaUseCase(extension: str, body: PlotBody):
    path = str(Path(__file__).parent.joinpath(f'static/mozeconomia-info-grafico.{extension}'))
    
    createAreaPlot(body, path)

    return path
