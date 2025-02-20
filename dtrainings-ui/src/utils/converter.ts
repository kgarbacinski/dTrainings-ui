import { encodeBytes32String } from 'ethers';

export const stringToBytes32 = (value: string): string => {
    return encodeBytes32String(value);
}