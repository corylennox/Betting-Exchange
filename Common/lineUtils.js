class LineContainer {
    constructor(lines = []) {
        this.lines = new Array();
        lines.forEach((line) => {
            this.addLine(line)
        });
    }

    #getIndex(buttonId) {
        return buttonId - this.#getMinButtonId();
    }

    #getMinButtonId() {
        console.assert(this.lines.length > 0)
        return this.lines[0].buttonId
    }

    #getMaxButtonId() {
        console.assert(this.lines.length > 0)
        return this.lines[this.lines.length - 1].buttonId
    }

    #isInBounds(buttonId) {
        return this.lines.length > 0 && buttonId >= this.#getMinButtonId() && buttonId <= this.#getMaxButtonId()
    }

    has(buttonId) {
        if (this.lines.length == 0)
            return false;

        return this.#isInBounds(buttonId) && this.lines[this.#getIndex(buttonId)] != undefined
    }

    get(buttonId) {
        console.assert(this.has(buttonId));
        return this.lines[this.#getIndex(buttonId)];
    }

    // Can also be called to replace an existing line, which can happen if a sport pane is loaded twice, for example
    addLine(line) {
        // if the array hasn't been populated yet, gotta allocate space for it
        if (this.lines.length == 0) {
            this.lines = Array.from({ length: 1 })
            this.lines[0] = line
        }

        // if the array is too small to contain this button id, expand the array
        else if (line.buttonId < this.#getMinButtonId())
        {
            const endLines = this.lines;
            let frontLines = Array.from({ length: this.#getMinButtonId() - line.buttonId })
            this.lines = frontLines.concat(endLines)
            this.lines[0] = line
        }

        // if the array is too small to contain this button id, expand the array
        else if (line.buttonId > this.#getMaxButtonId())
        {
            const endLines = Array.from({ length: line.buttonId - this.#getMaxButtonId() })
            const frontLines = this.lines;
            this.lines = frontLines.concat(endLines);
            this.lines[this.lines.length - 1] = line;
        }

        // normal insertion, no special case
        else
            this.lines[this.#getIndex(line.buttonId)] = line;
    }

    setNewValue(buttonId, newValue) {
        console.assert(this.has(buttonId))
        this.lines[this.#getIndex(buttonId)].value = newValue
    }

    forEach(func) {
        this.lines.forEach((line) => {
            if (line)
                func(line);
        });
    }
}

module.exports = { LineContainer }
