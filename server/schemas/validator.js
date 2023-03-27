'use strict';

const checkIfKeyExist = (objectName, keyName) => {
    let keyExist = Object.keys(objectName).some(key => key === keyName);
    return keyExist;
};

export function validateSchema(data, schema) {
    const keys = Object.keys(schema.properties);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = data[key];
        const propSchema = schema.properties[key];
        
        if (propSchema.type === 'number' && isNaN(value) === true) {
            return false
        }

        if (propSchema.required && !value) {
            return false;
        }

        if (propSchema.type === 'string' && typeof value !== 'string' && (propSchema.maxLength < value.length || propSchema.maxLength === undefined)) {
            return false;
        }

        if (propSchema.type === 'address' && !isValidAddress(value)) {
            return false;
        }

        if (propSchema.type === 'array' && !Array.isArray(value)) {
            return false;
        }
    }

    return true;
}

const addressRegex = /^0x([A-Fa-f0-9]{40})$/;

function isValidAddress(address) {
    return addressRegex.test(address);
}