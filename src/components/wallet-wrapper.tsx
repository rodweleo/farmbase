import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownDisconnect,
    WalletDropdownBasename,
    WalletDropdownFundLink,
    WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
import {
    Address,
    Avatar,
    Name,
    Identity,
    EthBalance,
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';

type WalletWrapperParams = {
    text?: string;
    className?: string;
    withWalletAggregator?: boolean;
};
export default function WalletWrapper({
    className,
    text,
    withWalletAggregator = false,
}: WalletWrapperParams) {
    
    return <Wallet>
        <ConnectWallet withWalletAggregator={withWalletAggregator} text={text} className={className}>
            <Avatar className="h-6 w-6" />
            <Name />
        </ConnectWallet>
        <WalletDropdown>
            <Identity 
                className="px-4 pt-3 pb-2" 
                hasCopyAddressOnClick>
                <Avatar/>
                <Name />
                <Address className={color.foregroundMuted} />
                <EthBalance />
            </Identity>
            <WalletDropdownBasename />
            <WalletDropdownLink
                icon="wallet"
                href="https://keys.coinbase.com"
            >
                Wallet
            </WalletDropdownLink>
            <WalletDropdownFundLink openIn="tab" target="_blank" />
            <WalletDropdownDisconnect />
        </WalletDropdown>
    </Wallet>
}