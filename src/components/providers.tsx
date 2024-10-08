"use client"

import { OnchainKitProvider } from '@coinbase/onchainkit'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { baseSepolia } from 'wagmi/chains'; 
import { type ReactNode } from 'react';
import { CreateConnectorFn, type State, WagmiProvider } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';

const connectors: CreateConnectorFn[] = connectorsForWallets(
  [
    {
      groupName: 'Recommended Wallet',
      wallets: [coinbaseWallet],
    },
    {
      groupName: 'Other Wallets',
      wallets: [rainbowWallet, metaMaskWallet],
    },
  ],
  {
    appName: 'FarmBase',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID!,
  },
);

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const queryClient = new QueryClient()

  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID!
  const wagmiConfig = getDefaultConfig({
    connectors: connectors,
    projectId: projectId,
    chains: [baseSepolia],
    ssr: true, 
  }); 
 
  return (
    <WagmiProvider config={wagmiConfig} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia}
          schemaId={process.env.NEXT_COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID! as `0x${string}`}
        >
          <RainbowKitProvider modalSize="compact">
            {props.children}
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}