"use client"


import { contracts } from '@/contracts';
import { Transaction, TransactionButton, TransactionError, TransactionResponse, TransactionSponsor, TransactionStatus, TransactionStatusAction, TransactionStatusLabel, TransactionToast, TransactionToastIcon } from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';
import {toast} from "react-hot-toast";
export default function TransactionWrapper() {


    const handleError = (err: TransactionError) => {
        toast.error('Transaction error:', err.message);
    };

    const handleSuccess = (response: TransactionResponse) => {
        toast.success('Transaction successful: '+ JSON.stringify(response.transactionReceipts));
    };
    return (
        <Transaction
            chainId={baseSepolia.id}
            contracts={contracts}
            className="w-[150px]"
            onSuccess={handleSuccess}
            onError={handleError}
            capabilities={{
                paymasterService: {
                    url: process.env.NEXT_PAYMASTER_AND_BUNDLER_BASE_SEPOLIA_ENDPOINT!,
                },
            }}
            onStatus={(status) => console.log('Transaction status:', status)}
        >
            <TransactionButton
                className="text-[white] w-full max-w-[150px]"
                text="Buy Now" />
            <TransactionStatus >
                <TransactionStatusLabel />
                <TransactionStatusAction />
            </TransactionStatus>
        </Transaction>
    );
}