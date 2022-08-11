import csv
from src.texts.domain.requiredFields.csv import FileBody

def createCsvFile(body: FileBody, path: str): 
    title = body['title']
    description = body['description']
    data = body['data']
    
    with open(path, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer.writerow([title])
        writer.writerow([description])
        
        for line in data:
            writer.writerow(line)
            
    return path