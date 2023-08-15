const { LineContainer, convertLineToProbability, convertProbabilityToLine } = require('./lineUtils');
const { determineWager, determineWin } = require('./wagerWinUtils');

test('Test adding a single item to a lineContainer', () => {
    const lineContainer = new LineContainer()
    const buttonId = 42;
    expect(lineContainer.has(buttonId)).toBe(false)
    lineContainer.addLine({ buttonId, value: 2 })
    expect(lineContainer.has(buttonId)).toBe(true)
    expect(lineContainer.get(buttonId).value).toBe(2)
})

test('Test non-empty constructor', () => {
    const lines = [
        { buttonId: 24, value: 3 },
        { buttonId: 2, value: 1 },
        { buttonId: 89, value: 5 },
    ];

    const lineContainer = new LineContainer(lines)

    expect(lineContainer.has(23)).toBe(false)
    expect(lineContainer.has(24)).toBe(true)
    expect(lineContainer.has(25)).toBe(false)

    expect(lineContainer.has(54)).toBe(false)
    lineContainer.addLine({ buttonId: 54, value: 4 })
    expect(lineContainer.has(54)).toBe(true)

    expect(lineContainer.get(24).value).toBe(3)
    expect(lineContainer.get(2).value).toBe(1)
    expect(lineContainer.get(89).value).toBe(5)
    expect(lineContainer.get(54).value).toBe(4)
})

test('Test adding a big range of items after construction', () => {
    const lineContainer = new LineContainer()
    lineContainer.addLine({ buttonId: 50, value: 1 })
    lineContainer.addLine({ buttonId: 500, value: 2 })
    lineContainer.addLine({ buttonId: 1000, value: 3 })
    lineContainer.addLine({ buttonId: 1, value: 4 })
    lineContainer.addLine({ buttonId: 400, value: 5 })

    expect(lineContainer.get(50).value).toBe(1)
    expect(lineContainer.get(500).value).toBe(2)
    expect(lineContainer.get(1000).value).toBe(3)
    expect(lineContainer.get(1).value).toBe(4)
    expect(lineContainer.get(400).value).toBe(5)

    expect(lineContainer.has(0)).toBe(false)
    expect(lineContainer.has(1001)).toBe(false)
})

test('Test setNewValue', () => {
    const lineContainer = new LineContainer()
    lineContainer.addLine({ buttonId: 50, value: 1 })
    lineContainer.addLine({ buttonId: 500, value: 2 })
    lineContainer.addLine({ buttonId: 1000, value: 3 })
    lineContainer.addLine({ buttonId: 1, value: 4 })
    lineContainer.addLine({ buttonId: 400, value: 5 })

    expect(lineContainer.get(50).value).toBe(1)
    expect(lineContainer.get(500).value).toBe(2)
    expect(lineContainer.get(1000).value).toBe(3)
    expect(lineContainer.get(1).value).toBe(4)
    expect(lineContainer.get(400).value).toBe(5)

    lineContainer.setNewValue(50, 20)
    lineContainer.setNewValue(500, 25)
    expect(lineContainer.get(50).value).toBe(20)
    expect(lineContainer.get(500).value).toBe(25)
})

test('Test convertLineToProbability', () => {
    expect(convertLineToProbability(-300)).toBe(0.75)
    expect(convertLineToProbability(100)).toBe(0.5)
    expect(convertLineToProbability(300)).toBe(0.25)
})

test('Test convertProbabilityToLine', () => {
    expect(convertProbabilityToLine(0.75)).toBe(-300)
    expect(convertProbabilityToLine(0.5)).toBe(100)
    expect(convertProbabilityToLine(0.25)).toBe(300)
})

test('Test asdf', () => {
    // const p1 = convertLineToProbability(840)
    // const p2 = convertLineToProbability(-150)
    // const p3 = convertLineToProbability(405)
    // console.log(1 - (p1 + p2 + p3))
    // expect(determineWin({type: "MoneyLine", value: -340}, 17)).toBe(5)
    // expect(determineWin({type: "MoneyLine", value: -278}, 3)).toBe(1)
    // expect(determineWin({type: "MoneyLine", value: +278}, 201)).toBe(558)
})
