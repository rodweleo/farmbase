import { Hex } from 'viem';

export type ProductProps = {
    id: bigint,
    name: string,
    description: string,
    price: bigint,
    image: string,
    farmer: `0x${string}`,
    stock: bigint
}

export type Call = {
    to: Hex;
    data?: Hex;
    value?: bigint;
};

