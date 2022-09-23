function replacer(_key, value) {
    if(value instanceof Map) {
        return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
    };
    } else {
        return value;
    }
}

export function stringifyMap(map) {
    return JSON.stringify(map, replacer);
}

function reviver(_key, value) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

export function parseMap(json) {
    return JSON.parse(json, reviver);
}

export function getDisplayStr(line) {
    if (line.type == "MoneyLine" || line.type == "SpreadLine")
        if (line.value == 0)
            return "EVEN"
        else if (line.value > 0)
            return "+" + line.value.toString()
        else
            return line.value.toString()
    if (line.type == "TotalLine")
        if (line.value < 0)
            return "U " + Math.abs(line.value).toString();
        else if (line.value > 0)
            return "O " + line.value.toString();

    return 'nan';
}
