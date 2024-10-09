import WalletWrapper from "./wallet-wrapper";

export default function SignInButton() {
    return (
        <WalletWrapper
            text="Log in"
            className="min-w-[90px] font-normal rounded-full px-6 py-2 bg-[#4CAF50] border border-[#4CAF50] text-white hover:bg-[#388E3C] hover:border-[#388E3C] transition-colors duration-300"
            withWalletAggregator={true}
        />
    );
}
