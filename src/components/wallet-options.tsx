"use client"

import * as React from 'react'
import { useConnect } from 'wagmi'
import { Button} from "./ui/button"

export default function WalletOptions() {
    const { connectors, connect } = useConnect()

    return (
        <ul className="w-full max-w-xs space-y-4">
            {
                connectors.map((connector) => (
                    <li key={connector.uid}>
                        <Button variant="outline" onClick={() => connect({ connector })} className="w-full">
                            {connector.name}
                        </Button>
                    </li>
                ))
            }
        </ul>
    )
}