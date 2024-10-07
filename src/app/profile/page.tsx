"use client"

import Image from "next/image"
import {
    BasenameTextRecordKeys,
    getBasename,
    getBasenameAvatar,
    getBasenameTextRecord,
} from '@/apis/basenames';
import { useAccount } from 'wagmi';
import { Address } from "viem";
import { useEffect, useState } from "react";


async function fetchData(address: Address) {
    
    const basename = await getBasename(address);

    if (basename === undefined) throw Error('failed to resolve address to name');

    const avatar = await getBasenameAvatar(basename);

    const description = await getBasenameTextRecord(
        basename,
        BasenameTextRecordKeys.Description
    );

    const twitter = await getBasenameTextRecord(
        basename,
        BasenameTextRecordKeys.Twitter
    );

    return {
        basename,
        avatar,
        description,
        twitter,
    };
}

export default function Page() {
    const {address} = useAccount()
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchData(address as `0x${string}`).then((data) => {
            setData(data)
        })
    }, [address])

    return (
        <div>
            <main className='flex min-h-screen flex-col gap-12 p-24'>
                <div>
                    <ul className='flex flex-col gap-4'>
                        <li className='flex flex-col gap-2'>
                            <span>Address</span>
                            <strong>{address}</strong>
                        </li>
                        {
                            data ? <>
                                <li className='flex flex-col gap-2'>
                                    <span>Basename</span>
                                    <strong>{data.basename}</strong>
                                </li>
                                <li className='flex flex-col gap-2'>
                                    <span>Avatar</span>
                                    {/* <strong>
                                        <Image
                                            src={data.avatar}
                                            alt={data.basename}
                                            width={100}
                                            height={100}
                                            unoptimized
                                        />
                                    </strong> */}
                                </li>
                                <li className='flex flex-col gap-2'>
                                    <span>Description</span>
                                    <strong>{data.description}</strong>
                                </li>
                                <li className='flex flex-col gap-2'>
                                    <span>Twitter</span>
                                    <strong>{data.twitter}</strong>
                                </li>
                            </> : null
                        }
                    </ul>
                </div>
            </main>
        </div>
    )
}