import { Hex } from 'viem';

interface FarmProduct {
    name: string;
    description: string;
    price: number;
}

type Call = {
    to: Hex;
    data?: Hex;
    value?: bigint;
};