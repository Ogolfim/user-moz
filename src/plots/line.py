from datetime import date
from mimetypes import init
import plotly.express as px

class PlotData:
  x: date
  y: float

def createLinePlot(plotData: list[PlotData], path: str):
    fig = px.area(plotData, x='x', y='y')
    fig.update_xaxes(
      dtick="M6",
      tickformat="%b\n%Y",
      ticklabelmode="period",
      griddash='dot', 
      gridcolor='white'
    )
    fig.to_html(path)
    
    return path 