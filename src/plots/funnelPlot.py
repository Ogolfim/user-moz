from datetime import date
from plotly import graph_objects as go

class PlotData:
  x: date
  y: float

def percent_calculator(value: float, total: float):
    return round((float(value) / float(total)) * 100, 2)

def createFunnelPlot(plotData: list[PlotData], path: str):
    total = 50
    x = [39, 27.4, 20.6, 11, 2]

    percents = [f'{percent_calculator(value, total)}%' for value in x]
    
    fig = go.Figure(go.Funnel(
        y = ["Website visit", "Downloads", "Potential customers", "Requested price", "invoice sent"],
        x = x,
        textposition = "inside",
        text = percents,
        marker = {"color": '#064e3b'}
    ))

    fig.write_image(path)
    
    return path 