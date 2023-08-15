const roundUp = (num, toNearest = 1) => {
    return Math.ceil(num / toNearest) * toNearest;
}

const roundDown = (num, toNearest = 1) => {
    return Math.floor(num / toNearest) * toNearest;
}

module.exports = { roundUp, roundDown }
