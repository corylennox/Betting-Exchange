function replacer(key, value) {
    if(value instanceof Map) {
        return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
    };
    } else {
        return value;
    }
}

export function replaceMap(map) {
    return JSON.stringify(map, replacer);
}

function reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

export function reviveMap(json) {
    return JSON.parse(json, reviver);
}
