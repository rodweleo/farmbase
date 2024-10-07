import WalletWrapper from "./wallet-wrapper";

export default function SignUpButton(){
    return (
        <WalletWrapper 
            className="min-w-[90px] bg-slate-400 border text-black hover:bg-slate-500"
            text="Sign Up"
            withWalletAggregator={true}
        />
    )
}