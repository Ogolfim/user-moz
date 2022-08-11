import xlsxwriter
from src.texts.domain.requiredFields.excel import FileBody

def createExcelFile(body: FileBody, path: str): 
    title = body['title']
    description = body['description']
    data = body['data']
    
    workbook = xlsxwriter.Workbook(path)
    worksheet = workbook.add_worksheet('data')

    titleFormat = workbook.add_format({
        'bold': True,
        'font_size': 24
    })
    
    headerFormat = workbook.add_format({
        'bold': True,
        'bg_color': '#0c4a6e',
        'border': 1,
        'border_color': '#0f172a',
        'font_color': '#ffffff',
        'center_across': True,
    })
    
    #                   row, column, Data, Format
    worksheet.write_row(0, 1, [title], titleFormat)
    worksheet.write_row(1, 1, [description])
    worksheet.write_row(3, 1, data[0], headerFormat)
    
    index = 0
    for line in data: 
        if (index != 0):
            row = index + 3
            worksheet.write_row(row, 1, line)
            
        index = index + 1


    worksheet.set_row(0, 20)
    worksheet.set_row(1, 20)
    worksheet.set_row(3, 25)
    workbook.close()   
    
    return path