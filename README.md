# FarmBase

![FarmBase Logo](public/FarmBase.png);

**FarmBase** is a decentralized marketplace designed to connect farmers and buyers, allowing transactions using cryptocurrency. Our mission is to empower local farmers by providing a platform to showcase their products and facilitating seamless transactions on-chain.

## Table of Contents
- [FarmBase](#farmbase)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
  - [Deployed Contracts](#deployed-contracts)
  - [License](#license)

## Features
- **User Registration**: Farmers and buyers can create accounts and connect their wallets.
- **Product Listing**: Farmers can list their products with details such as price, description, and images.
- **Transaction System**: Secure transactions using cryptocurrency facilitated by smart contracts.
- **User Dashboards**: Manage listings of products and transactions through personalized dashboards.

## Technologies Used
- **Frontend**: NextJS
- **Blockchain**: Ethereum (Base network)
- **Smart Contracts**: Solidity
- **Wallet Integration**: MetaMask & Coinbase Smart Wallet

## Getting Started
To set up and run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/rodweleo/farmbase.git
   cd farmbase
2. Install dependencies:
   ```bash
   npm install
3. Set up the environment variables. Create a .env.local file based on the provided template below:
   ```bash
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=""
   NEXT_PUBLIC_WALLETCONNECT_PROJECTID= ""
   NEXT_PAYMASTER_AND_BUNDLER_BASE_MAINNET_ENDPOINT = ""
   NEXT_PAYMASTER_AND_BUNDLER_BASE_SEPOLIA_ENDPOINT = ""
   NEXT_BASENAME_L2_RESOLVER_ADDRESS = "";
   NEXT_COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID = ""
4. Start the application:
    ```bash
    npm run dev
## Deployed Contracts
 1. **Marketplace Contract**: 0x19C0E91f963D6a85E4BBB0c6b0b6A2ecC4Dcb184
 2. **Order Management Contract**: 0x9d5bc327cebbfcd945e20a81fa42a1d2157e8f5c
 3. **User Management Contract**: 0xBc9D4E4cbc8A162Ce7f1C01dd864a0d272B557c4
 4. **Payment Management Contract**: 0xd015b10d9dff563a393158e0765aef22d823f7c9

## License
This project is licensed under the MIT License. See the LICENSE file for details.
