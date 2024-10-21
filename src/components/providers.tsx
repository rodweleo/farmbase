"use client"

import { OnchainKitProvider } from '@coinbase/onchainkit'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { baseSepolia } from 'wagmi/chains'; 
import { type ReactNode } from 'react';
import { type State, WagmiProvider } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useWagmiConfig } from '@/wagmi';


export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const wagmiConfig = useWagmiConfig()
  const queryClient = new QueryClient()
  
 
  return (
    <WagmiProvider config={wagmiConfig} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia}
          schemaId={process.env.NEXT_COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID! as `0x${string}`}
        >
          <RainbowKitProvider modalSize="compact">
            <Provider store={store}>
              {props.children}
            </Provider>
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}