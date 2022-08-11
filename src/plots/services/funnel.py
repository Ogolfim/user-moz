from plotly import graph_objects as go
from src.plots.domain.requiredFields.funnel import PlotBody

def percent_calculator(value: float, total: float):
    return round((float(value) / float(total)) * 100, 2)

def createFunnelPlot(body: PlotBody, path: str):    
    data: list = sorted(body['data'], key = lambda d: d['y'])
    data.reverse()
    
    total = body['total']
    
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
    
    fig.update_layout(
        width = 840,
        height = 400,
        showlegend = False,
        plot_bgcolor ='white',
        margin = dict(
          l = 35,
          r = 20,
          t = 10
        )
    )

    fig.write_image(path)
    
    return path 