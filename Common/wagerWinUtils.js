function determineWin(line, wager) {
    let ratio = 0.0;
    if (line.type === "SpreadLine" || line.type === "TotalLine")
        ratio = 1.0;
    else if (line.type == "MoneyLine")
        ratio = line.value < 0 ? (100.0 / Math.abs(line.value)) : (line.value / 100.0);
    return Math.floor(wager * ratio);
}

function determineWager(line, win) {
    let ratio = 0.0;
    if (line.type === "SpreadLine" || line.type === "TotalLine")
        ratio = 1.0;
    else if (line.type === "MoneyLine")
        ratio = line.value < 0 ? (Math.abs(line.value) / 100.0) : (100.0 / line.value);
    return Math.ceil(win * ratio);
}

function getCommissionPct() {
    return 0.01;
}

function getWinAfterCommission(win) {
    const winAfterCommission = Math.floor(win * (1.0 - getCommissionPct()));
    return winAfterCommission;
}

function getCommissionFromWager(wager) {
    const commission = Math.ceil(wager * getCommissionPct());
    console.log(`From wager ${wager} returning commission ${commission}`)
    return commission;
}

module.exports = { determineWin, determineWager, getWinAfterCommission, getCommissionFromWager }
