"use client"

// import { http, createConfig } from 'wagmi';
// import {
//   connectorsForWallets,
// } from '@rainbow-me/rainbowkit';
// import {
//   metaMaskWallet,
//   rainbowWallet,
//   coinbaseWallet,
// } from '@rainbow-me/rainbowkit/wallets';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  baseSepolia
} from 'wagmi/chains';
import { useMemo } from 'react';

// export function useWagmiConfig() {
//   const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID!
//   return useMemo(() => {
//     const connectors = connectorsForWallets(
//       [
//         {
//           groupName: 'Recommended Wallet',
//           wallets: [coinbaseWallet],
//         },
//         {
//           groupName: 'Other Wallets',
//           wallets: [rainbowWallet, metaMaskWallet],
//         },
//       ],
//       {
//         appName: 'FarmBase',
//         projectId,
//       },
//     );

//     const wagmiConfig = createConfig({
//       chains: [baseSepolia],
//       multiInjectedProviderDiscovery: false,
//       connectors,
//       ssr: true,
//       transports: {
//         [baseSepolia.id]: http(),
//       },
//     });

//     return wagmiConfig;
//   }, [projectId]);
// }

export function useWagmiConfig() {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID!
  return useMemo(() => {
    const wagmiConfig = getDefaultConfig({
      appName: "FarmBase",
      projectId: projectId,
      chains: [baseSepolia],
      ssr: true,
    });

  
    return wagmiConfig;
  }, [projectId]);
}
