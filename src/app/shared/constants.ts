export enum TransactionType {
    Income = 'Income',
    Optional = 'Optional',
    Mandatory = 'Mandatory',
    Transfer = 'Transfer'
}

export enum TransactionStatus {
    Success = 'success',
    Pending = 'pending',
    Error = 'error'
}

export const BACKSPACE = 8;
export const SPACE = 32;
export const KEY_LEFT = 37;
export const KEY_UP = 38;
export const KEY_RIGHT = 39;
export const KEY_DOWN = 40;

export const DELETE = 46;
export const SLASH = 47;
export const DIGIT_0 = 48;
export const DIGIT_9 = 57;
export const PERIOD = 190;

export function isDigitKey(keyCode: number) {
    return keyCode >= DIGIT_0 && keyCode <= DIGIT_9;
}

export namespace StorageKeys {
    export const viewDate = 'VIEW_DATE';
}
