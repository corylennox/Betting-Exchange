const { PubSub } = require('graphql-subscriptions');
const { SportsBets } = require('./Data');
const { LinesContainer } = require('./Lines');

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

function updateLines() {
    LinesContainer.forEach((line) => {
        if (line.type == "MoneyLine") {
            conditionalPublishMoneyLineUpdate(line.buttonId, line);
        }
        else if (line.type == "SpreadLine") {
            conditionalPublishSpreadLineUpdate(line.buttonId, line);
        }
        else if (line.type == "TotalLine") {
            conditionalPublishTotalLineUpdate(line.buttonId, line);
        }
    });
}

module.exports = { pubsub, updateLines };
