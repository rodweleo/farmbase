"use client"

import { http } from 'wagmi';
import { base } from 'wagmi/chains'; 
import {
  connectorsForWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
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
    appName: 'onchainkit',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID!,
  },
);

export function getConfig() {
  return getDefaultConfig({
    appName: "BaseApp",
    chains: [base],
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID!,
    ssr: true,
    transports: {
      [base.id]: http(), 
    },
  });
}
 
declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}