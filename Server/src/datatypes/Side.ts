export enum Side {
    Bid = 1,
    Ask = -1
}

export function sideFlip(side: Side): Side {
    return side == Side.Bid ? Side.Ask : Side.Bid;
}
