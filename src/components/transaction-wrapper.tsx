"use client"

import { Transaction, TransactionButton, TransactionError, TransactionResponse, TransactionStatus, TransactionStatusAction, TransactionStatusLabel } from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';
import {toast} from "react-hot-toast";
import { ContractFunctionParameters } from 'viem';
import { Call } from '@/utils/types';
export default function TransactionWrapper({contracts, text, calls}: {
    contracts?: ContractFunctionParameters[],
    text: string,
    calls?: Call[]
}) {


    const handleError = (err: TransactionError) => {
        toast.error('Something went wrong: '+ err);
    };

    const handleSuccess = (response: TransactionResponse) => {
        toast.success('Transaction successful: ' + response.transactionReceipts);
    };
    return (
        <Transaction
            chainId={baseSepolia.id}
            contracts={contracts}
            calls={calls}
            onSuccess={handleSuccess}
            onError={handleError}
            capabilities={{
                paymasterService: {
                    url: process.env.NEXT_PAYMASTER_AND_BUNDLER_BASE_SEPOLIA_ENDPOINT!,
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