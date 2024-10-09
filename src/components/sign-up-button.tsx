import WalletWrapper from "./wallet-wrapper";

export default function SignUpButton() {
  return (
    <WalletWrapper
      className="min-w-[90px] font-normal rounded-full px-6 py-2 border border-[#66BB6A] text-[white]  transition-colors duration-300"
      text="Create Account"
      withWalletAggregator={true}
    />
  );
}
