const { PubSub } = require('graphql-subscriptions');
const { SportsBets } = require('./Data');

const pubsub = new PubSub();

function shouldUpdateLine() {
    const updateProbability = .01;
    return Math.random() < updateProbability;
}

function publish(buttonId, newValue) {
    console.log(`Publishing buttonId ${buttonId} with value ${newValue}`);
    pubsub.publish('LINE_UPDATE', {
        lineUpdate: {
            buttonId: buttonId,
            newValue: newValue,
        }
    });
}

function conditionalPublishSpreadLineUpdate(buttonId, spread) {
    if (shouldUpdateLine()) {
        const newValue = spread.value + Math.floor(Math.random() * 5) / 2 - 1; // modify line between -1, -.5, 0, +5 and +1
        publish(buttonId, newValue)
    }
}

function conditionalPublishMoneyLineUpdate(buttonId, moneyline) {
    if (shouldUpdateLine()) {
        const newValue = moneyline.value + Math.floor(Math.random() * 20) - 10; // modify line between -10 and +10
        publish(buttonId, newValue)
    }
}

function conditionalPublishTotalLineUpdate(buttonId, total) {
    if (shouldUpdateLine()) {
        const newValue = total.value + Math.floor(Math.random() * 5) / 2 - 1; // modify line between -1, -.5, 0, +5 and +1
        publish(buttonId, newValue)
    }
}

function conditionalPublishOutrightBetLineUpdate(outrightBet) {
    outrightBet.contendersData.forEach((contenderData) => {
        conditionalPublishMoneyLineUpdate(contenderData.buttonId, contenderData.line);
    })
}

function conditionalPublishGameBetLineUpdate(gameBet) {
    conditionalPublishSpreadLineUpdate(gameBet.contender1Data.spreadButtonId, gameBet.contender1Data.spread);
    conditionalPublishMoneyLineUpdate(gameBet.contender1Data.moneyButtonId, gameBet.contender1Data.money);
    conditionalPublishTotalLineUpdate(gameBet.contender1Data.totalButtonId, gameBet.contender1Data.total);
    conditionalPublishSpreadLineUpdate(gameBet.contender2Data.spreadButtonId, gameBet.contender2Data.spread);
    conditionalPublishMoneyLineUpdate(gameBet.contender2Data.moneyButtonId, gameBet.contender2Data.money);
    conditionalPublishTotalLineUpdate(gameBet.contender2Data.totalButtonId, gameBet.contender2Data.total);
}

function updateLines() {
    SportsBets.forEach((value, key, map) => {
        value.tabs.forEach((tab) => {
            tab.availableBets.forEach((bet) => {
                if (bet.type === "OutrightBet")
                    conditionalPublishOutrightBetLineUpdate(bet);
                else if (bet.type === "GameBet")
                    conditionalPublishGameBetLineUpdate(bet);
            })
        })
    })
}

module.exports = { pubsub, updateLines };
