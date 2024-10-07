"use client"

import { WagmiConfig } from "../../wagmi-config";
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { WagmiProvider, deserialize, serialize } from 'wagmi'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1_000 * 60 * 60 * 24, // 24 hours
        },
    },
})

const persister = createSyncStoragePersister({
    serialize,
    storage: window.localStorage,
    deserialize,
})

export {
    queryClient,
    persister
}
export default function WagmiProviderClient({children}){
    return <WagmiProvider
        config={WagmiConfig}
        reconnectOnMount={false}
    >
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
        >
            {children}
        </PersistQueryClientProvider>
    </WagmiProvider>
}