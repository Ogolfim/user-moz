import plotly.graph_objects as go
from src.plots.domain.requiredFields.pie import PlotBody

fig = go.Figure()

def createPiePlot(body: PlotBody, path: str):    
    y = [d['y'] for d in body['data']]
    x = [d['x'] for d in body['data']]

    fig.add_trace(go.Pie(
        values = y,
        labels = x,
    ))
    
    fig.update_layout(
        width = 840,
        height = 400,
        plot_bgcolor ='#f1f5f9',
        margin = dict(
          l = 35,
          r = 20,
          t = 10
        )
    )

    fig.write_image(path)
    
    return path 