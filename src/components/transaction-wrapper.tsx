"use client"

import { Transaction, TransactionButton, TransactionStatus, TransactionStatusAction, TransactionStatusLabel } from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';
import {toast} from "react-hot-toast";
import { ContractFunctionParameters } from 'viem';
import { Call } from '@/utils/types';
export default function TransactionWrapper({contracts, text, calls, handleSuccess, handleError}: {
    contracts?: ContractFunctionParameters[],
    text: string,
    calls?: Call[],
    handleSuccess?: () => void,
    handleError?: () => void
}) {

    const NEXT_PAYMASTER_AND_BUNDLER_BASE_SEPOLIA_ENDPOINT = process.env.NEXT_PAYMASTER_AND_BUNDLER_BASE_SEPOLIA_ENDPOINT! || "https://api.developer.coinbase.com/rpc/v1/base-sepolia/Y08nYtO-2Kj8G-s_LTGFrx0nnZGSeexD"

    return (
        <Transaction
            chainId={baseSepolia.id}
            contracts={contracts}
            calls={calls}
            onSuccess={handleSuccess ? handleSuccess : () => {
                toast.success('Transaction was successful');
            }}
            onError={handleError ? handleError : () => {
                toast.error("Something went wrong.")
            }}
            capabilities={{
                paymasterService: {
                    url: NEXT_PAYMASTER_AND_BUNDLER_BASE_SEPOLIA_ENDPOINT,
                },
            }}
        >
            <TransactionButton
                className="text-white bg-[#4caf50] border-[#4caf50] hover:bg-[#388e3c] hover:border-[#388e3c] transition-colors duration-300 cursor rounded-full px-6 py-2"
                text={text} />
            <TransactionStatus >
                <TransactionStatusLabel />
                <TransactionStatusAction />
            </TransactionStatus>
        </Transaction>
    );
}