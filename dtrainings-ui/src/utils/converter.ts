import { decodeBytes32String, encodeBytes32String } from 'ethers';

export const stringToBytes32 = (value: string): string => {
    return encodeBytes32String(value);
}

export const bytes32ToString = (value: string): string => {
    return decodeBytes32String(value);
}