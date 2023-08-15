import random

buttonIdMoneyline = {}
buttonIdMoneylineStrStart = '", buttonId:'
buttonIdMoneylineStrEnd = '}'

spreadButtonIdLine = {}
spreadStrStart = 'spread: '
spreadStrEnd = ','

moneyButtonIdLine = {}
moneyStrStart = 'money: '
moneyStrEnd = ','

totalButtonIdLine = {}
totalStrStart = 'total: '
totalStrEnd = ','

totalRandSet = False
totalRandVal = 0

a = open('Server/src/Data.js')
rows = a.readlines()
for i in range(len(rows)):
    row = rows[i]

    # outright moneyline
    start = row.find(buttonIdMoneylineStrStart)
    if start >= 0:
        end = row.find(buttonIdMoneylineStrEnd, start)
        buttonId = int(row[start+len(buttonIdMoneylineStrStart):end])
        if buttonId not in buttonIdMoneyline:
            buttonIdMoneyline[buttonId] = (-1 if random.randint(0, 1) == 0 else 1) * random.randint(1, 100) * 10
        prevStr = buttonIdMoneylineStrStart + str(buttonId)
        newStr = prevStr + ', line: {type: "MoneyLine", value: ' + str(buttonIdMoneyline[buttonId]) + '}'
        rows[i] = row.replace(prevStr, newStr)

    # gamebet spread
    start = row.find(spreadStrStart)
    if start >= 0:
        end = row.find(spreadStrEnd, start)
        prevLineStr = row[start+len(spreadStrStart):end]
        lineButtonId = int(rows[i+1][rows[i+1].index(": ") + len(": ") : rows[i+1].index(",")])
        print(lineButtonId)
        if lineButtonId not in spreadButtonIdLine:
            spreadButtonIdLine[lineButtonId] = float((-1 if random.randint(0, 1) == 0 else 1) * random.randint(1, 30) * 0.5)
        print(spreadButtonIdLine[lineButtonId])
        newLineStr = '{type: "SpreadLine", value: ' + str(spreadButtonIdLine[lineButtonId]) + '}'
        rows[i] = row.replace(prevLineStr, newLineStr)

    # gamebet moneyline
    start = row.find(moneyStrStart)
    if start >= 0:
        end = row.find(moneyStrEnd, start)
        prevLineStr = row[start+len(moneyStrStart):end]
        lineButtonId = int(rows[i+1][rows[i+1].index(": ") + len(": ") : rows[i+1].index(",")])
        print(lineButtonId)
        if lineButtonId not in moneyButtonIdLine:
            moneyButtonIdLine[lineButtonId] = (-1 if random.randint(0, 1) == 0 else 1) * random.randint(1, 100) * 10
        print(moneyButtonIdLine[lineButtonId])
        newLineStr = '{type: "MoneyLine", value: ' + str(moneyButtonIdLine[lineButtonId]) + '}'
        rows[i] = row.replace(prevLineStr, newLineStr)

    # gamebet totalline
    start = row.find(totalStrStart)
    if start >= 0:
        end = row.find(totalStrEnd, start)
        prevLineStr = row[start+len(totalStrStart):end]
        lineButtonId = int(rows[i+1][rows[i+1].index(": ") + len(": ") : rows[i+1].index(",")])
        print(lineButtonId)
        if lineButtonId not in totalButtonIdLine:
            if not totalRandSet:
                totalRandVal = random.randint(2, 100) * 0.5
                print('setting total rand val to ' + str(totalRandVal))
                totalButtonIdLine[lineButtonId] = -1 * totalRandVal # the "over" for the same game
                totalRandSet = True
            else:
                totalButtonIdLine[lineButtonId] = totalRandVal - 0.5 # the "under" for the same game
                print('using total rand val of ' + str(totalRandVal))
                totalRandSet = False
        print(totalButtonIdLine[lineButtonId])
        newLineStr = '{type: "TotalLine", value: ' + str(totalButtonIdLine[lineButtonId]) + '}'
        rows[i] = row.replace(prevLineStr, newLineStr, 1)
a.close()

newFile = open('out.js', 'w')
for row in rows:
    newFile.write(row)
newFile.close()
