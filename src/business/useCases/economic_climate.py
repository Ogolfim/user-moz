from pathlib import Path
from datetime import datetime
from src.plots.funnelPlot import createFunnelPlot
import aiohttp

path = str(Path(__file__).parent.joinpath('static/figure.svg'))

id = 'economic-climate'
fromDate = '2021-08-01'
toDate = '2024-01-01'
api_url = f'http://localhost:3002/v1/business/economic-climate/many/{id}?fromDate={fromDate}&toDate={toDate}'

async def economicClimateUseCase():
    async with aiohttp.ClientSession() as session:
        result = await session.get(api_url)
        parsed = await result.json()
        ECs: list = parsed['values']
        
        plotData = []
        
        for EC in ECs: 
            date = datetime(EC['date']['year'], EC['date']['fromMonth'], 1)
            value = round(float(EC['value']), 2)
            
            plotData.append({
                'x': date,
                'y': value
            })
            
        createFunnelPlot(plotData, path)

        return path