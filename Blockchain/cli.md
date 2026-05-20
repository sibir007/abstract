# CLI

## Solana CLI Basics

### Solana Config

```sh
$ solana config get
Config File: /Users/test/.config/solana/cli/config.yml
RPC URL: https://api.mainnet-beta.solana.com
WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
Keypair Path: /Users/test/.config/solana/id.json
Commitment: confirmed


$ solana config set --url mainnet-beta
$ solana config set --url devnet
$ solana config set --url localhost
$ solana config set --url testnet

$ solana config set -um    # For mainnet-beta
$ solana config set -ud    # For devnet
$ solana config set -ul    # For localhost
$ solana config set -ut    # For testnet
```

### Create Wallet

```sh

# To generate a keypair at the default Keypair Path, run the following command:

$ solana-keygen new

# f you already have a file system wallet saved at the default location, this command doesn't override it unless you explicitly force override using the --force flag.

#To view your wallet's address (public key), run:

$ solana address
```

### Airdrop SOL


Set your cluster to the devnet:

```sh 
$ solana config set -ud


# Then request an airdrop of devnet SOL:

$ solana airdrop 2

# Devnet airdrops limit requests to 5 SOL per request. If you hit rate limits or encounter errors, try using the Web Faucet instead.

# To check your wallet's SOL balance, run the following command:

$ solana balance
```

### Run Local Validator

```sh
solana-test-validator -r
```

Remember to also update your CLI to use localhost before running Solana CLI commands:

```sh
solana config set -ul
```

## Anchor CLI Basics

### Initialize Project

To create a new Anchor project, run the following command:
Terminal

```sh
anchor init <project-name>
cd <project-name>
```

### Build Program

```sh
anchor build
```

### Deploy Program

```sh
anchor deploy
```

### Test Program

```sh
anchor test
#When using localnet as the cluster in Anchor.toml, Anchor automatically starts a local validator, deploys your program, runs tests, and then stops the validator.
```