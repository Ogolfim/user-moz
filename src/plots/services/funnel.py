from plotly import graph_objects as go
from src.plots.domain.requiredFields.funnel import PlotBody

def percent_calculator(value: float, total: float):
    return round((float(value) / float(total)) * 100, 2)

def createFunnelPlot(plotData: PlotBody, path: str):    
    data: list = sorted(plotData['data'], key = lambda d: d['y'])
    data.reverse()
    
    total = plotData['total']
    
    y = [d['x'] for d in data]
    x = [d['y'] for d in data]

    percents = [f'{percent_calculator(value, total)}%' for value in x]
    
    fig = go.Figure(go.Funnel(
        y = y,
        x = x,
        textposition = "inside",
        text = percents,
        marker = {"color": '#064e3b'}
    ))

    fig.write_image(path)
    
    return path 