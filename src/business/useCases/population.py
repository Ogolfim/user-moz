from pathlib import Path
import re
from src.plots.doubleBar import createDoubleBarPlot
import aiohttp

path = str(Path(__file__).parent.joinpath('static/figure.svg'))

api_url = f'http://localhost:3002/v1/demography/country?oderBy=estado-civil'

async def maritalStatusUseCase():
    async with aiohttp.ClientSession() as session:
        result = await session.get(api_url)
        parsed = await result.json()
        genders_marital_status: dict = parsed['byGender']
        
        plotData = []
        
        for gender_marital_status in genders_marital_status: 
            
            for status in gender_marital_status['status']:
                name = status['name']
                
                singleRegex = re.match(r'solteir', name)
                marriedRegex = re.match(r'casad/', name)
                maritalUnionRegex = re.match(r'união marital', name)
                divorcedRegex = re.match(r'divorciad', name)
                widowerRegex = re.match(r'viúv', name)

                if (singleRegex): 
                    plotData.append({
                        'y': status['value'],
                        'x': 'solteiros',
                        'color': gender_marital_status['gender']
                    })
                elif(marriedRegex):
                    plotData.append({
                        'y': status['value'],
                        'x': 'casados',
                        'color': gender_marital_status['gender']
                    })
                elif(maritalUnionRegex): 
                    plotData.append({
                        'y': status['value'],
                        'x': 'união marital',
                        'color': gender_marital_status['gender']
                    })
                elif (divorcedRegex) :
                    plotData.append({
                        'y': status['value'],
                        'x': 'divorciados/separados',
                        'color': gender_marital_status['gender']
                    })
                elif (widowerRegex):
                    plotData.append({
                        'y': status['value'],
                        'x': 'viúvos',
                        'color': gender_marital_status['gender']
                    })
        
        createDoubleBarPlot(plotData, path)

        return path