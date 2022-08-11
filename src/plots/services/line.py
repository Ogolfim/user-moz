import plotly.graph_objects as go
from src.plots.domain.requiredFields.area import PlotBody

fig = go.Figure()

def createLinePlot(body: PlotBody, path: str):
    tickformat = body['tickformat']
    ticksuffixY = body['ticksuffixY']
    
    y = [d['y'] for d in body['data']]
    x = [d['x'] for d in body['data']]
  
    fig.add_trace(go.Scatter(
        x=x,
        y=y,
        line = dict(color='#0369a1', width=2)
    ))
    
    fig.update_layout(
        width = 840,
        height = 400,
        showlegend = False,
        plot_bgcolor ='#f1f5f9',
        margin = dict(
          l = 35,
          r = 20,
          t = 10
        ),
        xaxis = dict(
          tickformat = tickformat,
          griddash = 'dot',
          gridcolor = '#94a3b8',
          showline = True,
          showticklabels = True,
          linecolor = '#0f172a',
          linewidth = 2,
          ticks = 'outside',
          tickfont = dict(
            family = 'Arial',
            size = 12,
            color = '#0f172a'
          )
        ),
        yaxis = dict(
          ticksuffix = ticksuffixY,
          griddash = 'dot',
          gridcolor = '#94a3b8',
          showline = False,
          showticklabels = True,
          linecolor = '#0f172a',
          linewidth = 2,
          tickfont = dict(
            family = 'Arial',
            size = 13,
            color = '#0f172a'
          )
        )
    )

    fig.write_image(path)
    
    return path 