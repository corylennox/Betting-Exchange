import { RedisPubSub } from 'graphql-redis-subscriptions'; // followed https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries for production pubsub
const { SportsBets } = require('./Data');
const { LinesContainer } = require('./Lines');
import { Redis } from 'ioredis';
import { getEnvironmentVariable } from "../bettingexchangecommon/environmentVariable";

const publisherOptions = new Redis({
    port: Number(getEnvironmentVariable("REDIS_PORT")),
    host: getEnvironmentVariable('REDIS_HOST'),
    password: getEnvironmentVariable('REDIS_PASSWORD'),
});
const subscriberOptions = new Redis({
    port: Number(getEnvironmentVariable("REDIS_PORT")),
    host: getEnvironmentVariable('REDIS_HOST'),
    password: getEnvironmentVariable('REDIS_PASSWORD'),
});
export const pubsub = new RedisPubSub({
    publisher: publisherOptions,
    subscriber: subscriberOptions,
});

function shouldUpdateLine() {
    const updateProbability = .2;
    return Math.random() < updateProbability;
}

function publish(buttonId, newValue) {
    //console.log(`Publishing buttonId ${buttonId} with value ${newValue}`);
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

export function updateLines() {
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
