export default function validate(rules, target) {
    for (const rule of rules) {
        const [key, fn, message] = rule;
        const valid = fn(target[key]);
        if (!valid) return message;
    }
}

export const isNotUndefined = key => ([key,
    value => value !== undefined,
    `Property \`${key}\` must not be undefined`
]);

export const isOneOf = (key, list) => ([key,
    value => value && list.indexOf(value) > -1,
    `Property \`${key}\` must be one of ${list.join(', ')}`
]);

export const isNumber = (key) => ([key,
    value => typeof value === 'number',
    `Property \`${key}\` must be of type number`
]);

export const isBoolean = (key) => ([key,
    value => typeof value === 'boolean',
    `Property \`${key}\` must be of type boolean`
]);

export const isArray = (key) => ([key,
    value => Array.isArray(value),
    `Property \`${key}\` must be an array`
]);
