import plotly.graph_objects as go
from src.plots.domain.requiredFields.indicator import PlotBody

def createIndicatorPlot(body: PlotBody, path: str):    
    tickformat = body['tickformat']
    ticksuffixY = body['ticksuffixY']
    
    y = [d['y'] for d in body['data']]
    x = [d['x'] for d in body['data']]
    
    reference = y[-2]
    value = y[-1]
    
    fig = go.Figure(go.Indicator(
        mode = "number+delta",
        value = value,
        delta = {"reference": reference, "valueformat": ".0f"},
        domain = {'y': [0, 1], 'x': [0.25, 0.75]})
    )

    fig.add_trace(go.Scatter(
        y = y,
        x=x,
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