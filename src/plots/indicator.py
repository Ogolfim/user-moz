from datetime import date
import plotly.graph_objects as go

class PlotData:
  x: date
  y: float

def createIndicatorPlot(plotData: list[PlotData], path: str):
    reference = plotData[-2]['y']
    value = plotData[-1]['y']
    y = [d['y'] for d in plotData]
    x = [d['x'] for d in plotData]
    
    fig = go.Figure(go.Indicator(
        mode = "number+delta",
        value = value,
        delta = {"reference": reference, "valueformat": ".0f"},
        title = {"text": "Indicador de Confiança do Empresário"},
        domain = {'y': [0, 1], 'x': [0.25, 0.75]}))

    fig.add_trace(go.Scatter(y = y, x=x))
    
    fig.update_layout(
        xaxis=dict(
            dtick='M6',
            tickformat='%b\n%Y',
            ticklabelmode='period',
        ),
        autosize=False,
        margin=dict(
            autoexpand=False,
            l=100,
            r=20,
            t=110,
        ),
        showlegend=False,
    )

    fig.write_image(path)
    
    return path 