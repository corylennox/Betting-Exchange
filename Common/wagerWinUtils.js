export function determineWin(line, wager) {
    let ratio = 0.0;
    if (line.type === "SpreadLine" || line.type === "TotalLine")
        ratio = 1.0;
    else if (line.type == "MoneyLine")
        ratio = line.value < 0 ? (100.0 / Math.abs(line.value)) : (line.value / 100.0);
    return Math.floor(wager * ratio);
}

export function determineWager(line, win) {
    let ratio = 0.0;
    if (line.type === "SpreadLine" || line.type === "TotalLine")
        ratio = 1.0;
    else if (line.type === "MoneyLine")
        ratio = line.value < 0 ? (Math.abs(line.value) / 100.0) : (100.0 / line.value);
    return Math.ceil(win * ratio);
}

export function getCommission() {
    return 0;
}
