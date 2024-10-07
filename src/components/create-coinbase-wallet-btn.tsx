"use client"

import React, { useCallback } from 'react';
import { useConnect } from 'wagmi';
import CoinbaseWalletLogo from './coinbase-wallet-logo';
import { Button} from './ui/button'

export default function CreateCoinbaseWalletBtn() {
    const { connectors, connect } = useConnect();

    const createWallet = useCallback(() => {
        const coinbaseWalletConnector = connectors.find(
            (connector) => connector.id === 'coinbaseWalletSDK'
        );
        if (coinbaseWalletConnector) {
            connect({ connector: coinbaseWalletConnector });
        }
    }, [connectors, connect]);
    return (
        <Button onClick={createWallet}>
            <CoinbaseWalletLogo />
            Create Wallet
        </Button>
    );
}