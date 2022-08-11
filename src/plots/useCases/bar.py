from pathlib import Path
from src.plots.domain.requiredFields.bar import PlotBody
from src.plots.services.bar import createBarPlot


async def barUseCase(extension: str, body: PlotBody):
    path = str(Path(__file__).parent.joinpath(f'static/mozeconomia-info-grafico.{extension}'))
    
    createBarPlot(body, path)

    return path

