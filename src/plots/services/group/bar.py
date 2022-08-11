import plotly.graph_objects as go
from src.plots.domain.requiredFields.group.bar import PlotBody

fig = go.Figure()

def createBarPlot(body: PlotBody, path: str):
    tickformat = body['tickformat']
    ticksuffixY = body['ticksuffixY']
    
    for data in body['data']:
      y = [d['y'] for d in data['axis']]
      x = [d['x'] for d in data['axis']]
  
      fig.add_trace(go.Bar(
          x=x,
          y=y,
          name = data['name'],
          marker = dict(color=data['color'])
      ))
    
    fig.update_layout(
        width = 840,
        height = 400,
        showlegend = False,
        plot_bgcolor = 'white',
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