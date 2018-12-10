
const FROM_NUMBER = {
    1: 'open',
    2: 'pending',
    3: 'close',
};

const FROM_TEXT = {
    'open': 1,
    'pending': 2,
    'close': 3,
};

export function transformFromText(state) {
    return FROM_TEXT[state] ? FROM_TEXT[state] : null;
}

export function transformFromValue(value) {
    return FROM_NUMBER[value] ? FROM_NUMBER[value] : null;
}