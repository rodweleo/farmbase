import { baseSepolia } from "wagmi/chains";
import { createPublicClient, http } from 'viem'

export const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http()
})
