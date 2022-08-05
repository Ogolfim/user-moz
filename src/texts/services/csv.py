import csv

def createCsvFile(fileData: list[list[str, float]], path: str):  
    with open(path, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        for line in fileData:
            writer.writerow(line)
    return path