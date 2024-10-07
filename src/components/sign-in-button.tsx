import WalletWrapper from "./wallet-wrapper";

export default function SignInButton() {
    return (
        <WalletWrapper 
            text="Log in" 
            className="min-w-[90px]"
            withWalletAggregator={true}
        />
    )
}