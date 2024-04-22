import { assert } from "console";
import { Side } from "./Side";
import { roundUp, roundDown } from "@openbook/common";

export enum LineType {
  None, // only used in error cases
  Money,
  Spread,
  Total,
}

export abstract class Line {
  value: number;

  static Scale(): number {
    return 10;
  }

  constructor(value: number) {
    this.value = value;
    assert(this.isValid(), `Line invalid: ${this}`);
  }

  toString(): string {
    return `${this.getType()}(${(this.value / Line.Scale()).toString()})`;
  }

  abstract tickSize(): number;

  // To be called by child class implementations
  canMatchAgainst(aggressingSide: Side, aggressingLine: Line): boolean {
    if (this.getType() == aggressingLine.getType()) {
      return true;
    }

    assert(
      false,
      `${this.getType()} cannot be matched against ${aggressingLine.getType()}`
    );
    return false;
  }

  isValid(): boolean {
    return Number.isInteger(this.value) && this.value % this.tickSize() == 0;
  }

  getType(): LineType {
    return this instanceof MoneyLine
      ? LineType.Money
      : this instanceof SpreadLine
      ? LineType.Spread
      : this instanceof TotalLine
      ? LineType.Total
      : LineType.None;
  }

  getAsUnscaledFloat(): number {
    return this.value / Line.Scale();
  }

  getAsLegacyLine() {
    return this.getType() == LineType.Money
      ? { type: "MoneyLine", value: this.getAsUnscaledFloat() }
      : this.getType() == LineType.Spread
      ? { type: "SpreadLine", value: this.getAsUnscaledFloat() }
      : this.getType() == LineType.Total
      ? { type: "TotalLine", value: this.getAsUnscaledFloat() }
      : {};
  }

  // always returns false if lines are different types
  isEqual(other: Line): boolean {
    return this.getType() == other.getType() && this.value == other.value;
  }

  // always returns false if lines are different types
  isMoreAggressive(side: Side, other: Line): boolean {
    return this.getType() == other.getType() && side == Side.Bid
      ? this.value > 0 && other.value > 0
        ? this.value < other.value
        : this.value < 0 && other.value < 0
        ? this.value < other.value
        : this.value < 0 && other.value > 0
      : this.value > 0 && other.value > 0
      ? this.value > other.value
      : this.value < 0 && other.value < 0
      ? this.value > other.value
      : this.value > 0 && other.value < 0;
  }

  // always returns false if lines are different types
  isLessAggressive(side: Side, other: Line): boolean {
    return (
      this.getType() == other.getType() &&
      !this.isEqual(other) &&
      !this.isMoreAggressive(side, other)
    );
  }
}

export class MoneyLine extends Line {
  static RoundToLessAggressive(unscaledLine: number, side: Side) {
    let scaledLine = (unscaledLine *= MoneyLine.Scale());
    if (scaledLine < 0)
      scaledLine =
        side == Side.Bid
          ? roundUp(scaledLine, MoneyLine.TickSize())
          : roundDown(scaledLine, MoneyLine.TickSize());
    else
      scaledLine =
        side == Side.Bid
          ? roundDown(scaledLine, MoneyLine.TickSize())
          : roundUp(scaledLine, MoneyLine.TickSize());
    return new MoneyLine(scaledLine);
  }

  // Tick size of $1
  static TickSize(): number {
    return Line.Scale();
  }

  tickSize(): number {
    return MoneyLine.TickSize();
  }

  isValid(): boolean {
    return (
      (this.getAsUnscaledFloat() < -100 || this.getAsUnscaledFloat() >= 100) &&
      super.isValid()
    );
  }

  canMatchAgainst(aggressingSide: Side, aggressingLine: Line): boolean {
    if (!super.canMatchAgainst(aggressingSide, aggressingLine)) {
      return false;
    }

    let canMatch =
      (this.getAsUnscaledFloat() <= -100 &&
        aggressingLine.getAsUnscaledFloat() <= -100) ||
      (this.getAsUnscaledFloat() == 100 &&
        aggressingLine.getAsUnscaledFloat() == 100) ||
      (this.getAsUnscaledFloat() == -100 &&
        aggressingLine.getAsUnscaledFloat() == 100) ||
      (this.getAsUnscaledFloat() == 100 &&
        aggressingLine.getAsUnscaledFloat() == -100) ||
      (this.value < 0 &&
        aggressingLine.value > 0 &&
        -1 * this.value >= aggressingLine.value) ||
      (this.value > 0 &&
        aggressingLine.value < 0 &&
        -1 * aggressingLine.value >= this.value);
    return canMatch;
  }
}

export class SpreadLine extends Line {
  // Tick size of $0.5
  static TickSize(): number {
    const tickSize = Line.Scale() * 0.5;
    assert(Number.isInteger(tickSize));
    return tickSize;
  }

  tickSize(): number {
    return SpreadLine.TickSize();
  }

  canMatchAgainst(aggressingSide: Side, aggressingLine: Line): boolean {
    if (!super.canMatchAgainst(aggressingSide, aggressingLine)) {
      return false;
    }

    let canMatch =
      (this.value <= 0 && aggressingLine.value <= 0) ||
      (this.value == 0 && aggressingLine.value == 0) ||
      (this.value < 0 &&
        aggressingLine.value > 0 &&
        -1 * this.value >= aggressingLine.value) ||
      (this.value > 0 &&
        aggressingLine.value < 0 &&
        -1 * aggressingLine.value >= this.value);
    return canMatch;
  }
}

export class TotalLine extends Line {
  // Tick size of $0.5
  static TickSize(): number {
    const tickSize = Line.Scale() * 0.5;
    assert(Number.isInteger(tickSize));
    return tickSize;
  }

  tickSize(): number {
    return TotalLine.TickSize();
  }

  isValid(): boolean {
    return this.value > 0 && super.isValid();
  }

  // always returns false if lines are different types
  isMoreAggressive(side: Side, other: Line): boolean {
    return this.getType() == other.getType() && side == Side.Bid
      ? this.value > other.value
      : this.value < other.value;
  }

  canMatchAgainst(aggressingSide: Side, aggressingLine: Line): boolean {
    if (!super.canMatchAgainst(aggressingSide, aggressingLine)) {
      return false;
    }

    // Ask for TotalLine is always under, Bid is always over
    let canMatch =
      (aggressingSide == Side.Ask && aggressingLine.value <= this.value) ||
      (aggressingSide == Side.Bid && aggressingLine.value >= this.value);
    return canMatch;
  }
}
