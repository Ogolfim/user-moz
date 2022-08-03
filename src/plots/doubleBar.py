from datetime import date
from turtle import color
import plotly.express as px

class PlotData:
  x: date
  y: float
  color: str

def createDoubleBarPlot(plotData: list[PlotData], path: str):
    fig = px.bar(
      plotData,
      x='x',
      y='y',
      barmode='group',
      color='color',
      labels={'x': 'x',  'y': 'y'},
    )

    fig.update_layout(
        xaxis=dict(
            dtick='M6',
            tickformat='%b\n%Y',
            ticklabelmode='period',
            griddash='dot', 
            gridcolor='#94a3b8',
            showline=True,
            showticklabels=True,
            linecolor='#0f172a',
            linewidth=2,
            ticks='outside',
            tickfont=dict(
                family='Arial',
                size=12,
                color='#0f172a',
            ),
        ),
        yaxis=dict(
            griddash='dot', 
            gridcolor='#94a3b8',
            showline=False,
            showticklabels=True,
            linecolor='#0f172a',
            linewidth=2,
            tickfont=dict(
                family='Arial',
                size=13,
                color='#0f172a',
            ),
        ),
        margin=dict(
            autoexpand=False,
            l=100,
            r=110,
            t=20,
        ),
        showlegend=True,
        plot_bgcolor='white'
    )

    fig.write_image(path)
    
    return path 