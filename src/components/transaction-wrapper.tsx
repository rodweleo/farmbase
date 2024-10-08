"use client"

import { Transaction, TransactionButton, TransactionError, TransactionResponse, TransactionStatus, TransactionStatusAction, TransactionStatusLabel } from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';
import {toast} from "react-hot-toast";
import { ContractFunctionParameters } from 'viem';
export default function TransactionWrapper({contracts, text, calls}: {
    contracts?: ContractFunctionParameters[],
    text: string,
    calls?: any
}) {


    const handleError = (err: TransactionError) => {
        // const error = JSON.parse(err.error)
        // toast.error(error.details);
        console.log(err)
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
                className="text-[white]"
                text={text} />
            <TransactionStatus >
                <TransactionStatusLabel />
                <TransactionStatusAction />
            </TransactionStatus>
        </Transaction>
    );
}