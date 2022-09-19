import { BreakingChangeType } from "graphql";

// buttonId: 453
// line: -200
// wager: 3
// win: 1.5

// submit

// A class with the same interface as a Map, but uses a paired array as the underlying data structure
class ArrayMap {
    constructor() {
        this.arr = [];
    }

    constructor(list) {
        this.arr = list;
    }

    has(key) {
        for (let i = 0; i < this.arr.length; i++)
        {
            if (this.arr[i].key == key)
                return true;
        }
        return false;
    }

    set(key, value) {
        for (let i = 0; i < this.arr.length; i++)
        {
            if (this.arr[i].key == key)
            {
                this.arr[i].value = value;
                return;
            }
        }
        this.arr.push({key: key, value: value});
    }

    delete(key) {
        for (let i = 0; i < this.arr.length; i++)
        {
            if (this.arr[i].key == key)
            {
                this.arr.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    getAsList() {
        return this.arr;
    }
}

const toggledBetsReducer = (state = [], action) => {
    let newState = new ArrayMap(state);
    if (!action.payload)
        return newState;

    const buttonId = action.payload.buttonId;
    switch (action.type) {
        case 'MY_BUTTON_CLICKED':
            if (newState.has(buttonId))
                newState.delete(buttonId);
            else
                newState.set(buttonId, { betInfo: action.payload.betInfo, wager: 0 });
            break;
        case 'DELETE_BET':
            newState.delete(buttonId);
            break;
        case 'WAGER_CHANGED':
            break;
    }
    return newState.getAsList();
};

export default toggledBetsReducer;
