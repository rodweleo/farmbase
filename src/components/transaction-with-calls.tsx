"use client"


import { contracts } from '@/contracts';
import { Transaction, TransactionButton, TransactionSponsor, TransactionStatus, TransactionStatusAction, TransactionStatusLabel, TransactionToast, TransactionToastIcon } from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';

export default function TransactionWithCalls() {

    return (
        <>
            <Transaction
                chainId={baseSepolia.id}
                contracts={contracts}
                capabilities={{
                    paymasterService: {
                        url: process.env.NEXT_PAYMASTER_AND_BUNDLER_ENDPOINT!,
                    },
                }}
                onStatus={(status) => console.log('Transaction status:', status)}
            >
                <TransactionButton />
                <TransactionSponsor />
                <TransactionStatus >
                    <TransactionStatusLabel />
                    <TransactionStatusAction />
                </TransactionStatus>
                <TransactionToast>
                    <TransactionStatusLabel />
                    <TransactionToastIcon />
                </TransactionToast>


            </Transaction>
            <div>
                Total Products: {data ? data.toString() : 'No data'}
            </div>
            </>
    );
}