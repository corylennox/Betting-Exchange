import { Line } from './Line';
import { DollarAmount } from './DollarAmount';
import { RestingType } from './RestingType';
import { Match } from './Match';

export class UserSubmittedBet {
    userId: string
    buttonId: number
    line: Line
    wagerAmount: DollarAmount
    restingType: RestingType

    toString(): String {
        return `{ userId: ${this.userId}, buttonId: ${this.buttonId}, line: ${this.line}, wagerAmount: ${this.wagerAmount}, restingType: ${this.restingType} }`
    }
};

export class UserSubmittedBetResult {
    submittedBet: UserSubmittedBet
    betId: bigint
    success: boolean
    matches: Array<Match> // valid only if success is true
}
