import xlsxwriter

def createExcelFile(fileData: list[list[str, float]], path: str): 
    workbook = xlsxwriter.Workbook(path)
    worksheet = workbook.add_worksheet('data')

    headerFormat = workbook.add_format({
        'bold': True,
        'bg_color': '#0c4a6e',
        'border': 1,
        'border_color': '#0f172a',
        'font_color': '#ffffff',
        'center_across': True,
    })
    
    #                   row, column, Data, Format
    worksheet.write_row(0, 1, fileData[0], headerFormat)
    
    index = 0
    for line in fileData: 
        if (index != 0):
            worksheet.write_row(index, 1, line)
            
        index = index + 1


    worksheet.set_row(0, 25)
    workbook.close()   
    
    return path