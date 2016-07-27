
export function fitStep(value, step) {
    const float = value.toString().split('.')[1];
    const pow = float && float.length || 0;
    const mult = Math.pow(10, pow);
    return Math.round(value / step) * (step * mult) / mult;
}

export function round(number, decimals) {
    if (!isNaN(parseFloat(number)) && isFinite(number)) {
        const decimalPower = Math.pow(10, decimals);
        return Math.round(parseFloat(number) * decimalPower) / decimalPower;
    }
    return NaN;
}

export function getMousePosition(event) {
    return {
        x: event.pageX,
        y: event.pageY
    };
}

export function getTouchPosition(event) {
    return {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
    };
}

export function pauseEvent(event) {
    event.stopPropagation();
    event.preventDefault();
}

export function addEventsToDocument(eventMap) {
    for (const key in eventMap) {
        if (!eventMap.hasOwnProperty(key)) continue;
        document.addEventListener(key, eventMap[key], false);
    }
}

export function removeEventsFromDocument(eventMap) {
    for (const key in eventMap) {
        if (!eventMap.hasOwnProperty(key)) continue;
        document.removeEventListener(key, eventMap[key], false);
    }
}

export function noop() {}
