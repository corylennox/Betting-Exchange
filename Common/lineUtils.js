const assert = require("assert");

class LineContainer {
    constructor(lines) {
        this.minButtonId = Number.MAX_SAFE_INTEGER;
        let maxButtonId = Number.MIN_SAFE_INTEGER;
        lines.forEach((line) => {
            this.minButtonId = Math.min(this.minButtonId, line.buttonId);
            maxButtonId = Math.min(maxButtonId, line.buttonId);
        });
        this.lines = Array.from({ length: maxButtonId - this.minButtonId });
        lines.forEach((line) => {
            this.lines[this.#getIndex(line.buttonId)] = line;
        });
    }

    #getIndex(buttonId) {
        return buttonId - this.minButtonId;
    }

    #getMaxIndex() {
        return this.minButtonId + this.lines.length - 1
    }

    #isInBounds(buttonId) {
        return buttonId >= this.minButtonId && buttonId <= this.#getMaxIndex()
    }

    has(buttonId) {
        return this.#isInBounds(buttonId) && this.lines[this.#getIndex(buttonId)]
    }

    get(buttonId) {
        assert(this.has(buttonId));
        return this.lines[this.#getIndex(buttonId)];
    }

    set(buttonId, line) {
        assert(this.#isInBounds(buttonId))
        this.lines[this.#getIndex(buttonId)] = line
    }
}

module.exports = { LineContainer }
