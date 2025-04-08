# SOLANA

## Installation

<https://solana.com/docs/intro/installation>

###### How install all dependancies?

```sh
curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash

Installed Versions:
Rust: rustc 1.85.0 (4d91de4e4 2025-02-17)
Solana CLI: solana-cli 2.1.14 (src:3ad46824; feat:3271415109, client:Agave)
Anchor CLI: anchor-cli 0.30.1
Node.js: v23.8.0
Yarn: 1.22.1
```

### Install Dependencies

###### How to install dependencies one by one?

1. install Anchor CLI dependencies

   ```sh
   sudo apt-get update
   sudo apt-get install -y \
       build-essential \
       pkg-config \
       libudev-dev llvm libclang-dev \
       protobuf-compiler libssl-dev
   ```

2. Install Rust

   ```sh
   # 1. Install Rust with rustup
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

   # 2. reload PATH environment variable to include Cargo s bin directory
   . "$HOME/.cargo/env"

   # 3. Verify the installation succeeded, check the Rust version.
   rustc --version
   ```

3. Install the Solana CLI

   ```sh
   # 1. Install the Solana CLI tool suite using the official install command
   sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"


   # You can replace stable with the release tag matching the software version of your desired release (i.e. v2.0.3), or use one of the three symbolic channel names: stable, beta, or edge

   # 2. add a PATH environment variable For Bash (bashrc):
   echo 'export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.bashrc
   source ~/.bashrc

   # 3. refresh the terminal session or restart your terminal
   source ~/.bashrc

   # 4. verify that the installation succeeded, check the Solana CLI version
   solana --version

   # You can view all available versions on the Agave Github repo

   # 5. To later update the Solana CLI to the latest version, you can use the following command
   agave-install update
   ```

4. Install Anchor CLI using Anchor Version Manager (AVM) - Recommended installation method

```sh
# 1. Install AVM with the following command:
cargo install --git https://github.com/coral-xyz/anchor avm --force

# 2. Confirm that AVM installed successfully:
avm --version

# 3. Install the latest version of Anchor CLI using AVM:
avm install latest
avm use latest

# You can install a specific version of Anchor CLI by specifying the version number:
avm install 0.30.1
avm use 0.30.1

# 4. verify that the installation succeeded, check the Anchor CLI version:
anchor --version
anchor-cli 0.30.1
```

5. Node.js and Yarn installation
The default Anchor project test file (TypeScript) created with the `anchor init` command requires Node.js and Yarn. (Rust test template is available using `anchor init --test-template rust`)

   1. Node Installation

      ```sh
      # Install nvm using the following command:
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

      # Restart your terminal and confirm that the nvm command runs successfully:
      command -v nvm

      # install node:
      nvm install node

      # To verify that the installation succeeded, check the Node version:
      node --version
      v23.7.0
      ```

   2. Yarn Installation

      ```sh
      # Install Yarn:
      npm install --global yarn

      # To verify that the installation succeeded, check the Yarn version:
      yarn --version
      1.22.1
      ```

## Solana CLI Basics

### Solana Config

###### How to get current config?

```sh
solana config get

Config File: /Users/test/.config/solana/cli/config.yml
RPC URL: https://api.mainnet-beta.solana.com
WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
Keypair Path: /Users/test/.config/solana/id.json
Commitment: confirmed
```

###### What specify the RPC URL and Websocket URL solana cli config?

The RPC URL and Websocket URL specify the Solana cluster the CLI makes requests to

###### What Solana Cli configs types exists?

- mainnet-beta
- devnet
- localhost
- testnet


###### How change Solana Cli type config?

```sh
solana config set --url mainnet-beta
solana config set --url devnet
solana config set --url localhost
solana config set --url testnet

# You can also use the following short options:
solana config set -um    # For mainnet-beta
solana config set -ud    # For devnet
solana config set -ul    # For localhost
solana config set -ut    # For testnet
```

###### What specify the Keypair Path solana cli config?

The Keypair Path points to the default Solana wallet (keypair) used by the Solana CLI to pay transaction fees and deploy programs. By default, this file is stored at ~/.config/solana/id.json.

### Create Wallet

######  What need To send transactions using the Solana CLI?

To send transactions using the Solana CLI, you need a Solana wallet funded with SOL.

###### How to generate a keypair at the default Keypair Path?

```sh
solana-keygen new

# If you already have a file system wallet saved at the default location, this command doesn't override it unless you explicitly force override using the --force flag.
```

```txt
Generating a new keypair

For added security, enter a BIP39 passphrase

NOTE! This passphrase improves security of the recovery seed phrase NOT the
keypair file itself, which is stored as insecure plain text

BIP39 Passphrase (empty for none):

Wrote new keypair to /Users/test/.config/solana/id.json
===========================================================================
pubkey: 8dBTPrjnkXyuQK3KDt9wrZBfizEZijmmUQXVHpFbVwGT
===========================================================================
Save this seed phrase and your BIP39 passphrase to recover your new keypair:
cream bleak tortoise ocean nasty game gift forget fancy salon mimic amazing
===========================================================================
```

###### How to To view your wallet's address (public key)?

```sh
solana address
```

###### How to Request an airdrop of SOL?

```sh
# Set your cluster to the devnet:
solana config set -ud

# Then request an airdrop of devnet SOL:
solana airdrop 2

# Devnet airdrops limit requests to 5 SOL per request. If you hit rate limits or encounter errors, try using the Web Faucet instead.

# To check your wallet's SOL balance, run the following command:
solana balance
```

###### How to Local Validator?

The Solana CLI includes a built-in test validator for local development.

```sh
# In a separate terminal, run the following command to start a local validator:
solana-test-validator

# update your CLI to use localhost before running Solana CLI commands:
solana config set -ul
```

###### What Advantages of Local Validator?

<https://docs.anza.xyz/cli/examples/test-validator>

- No RPC rate-limits
- No airdrop limits
- Direct on-chain program deployment (--bpf-program ...)
- Clone accounts from a public cluster, including programs (--clone ...)
- Load accounts from files
- Configurable transaction history retention (--limit-ledger-size ...)
- Configurable epoch length (--slots-per-epoch ...)
- Jump to an arbitrary slot (--warp-slot ...)

###### How install Local Validator?

The `solana-test-validator` binary ships with the Solana CLI Tool Suite. Install before continuing.

###### How Running Local Validator?

```sh
# First take a look at the configuration options

solana-test-validator --help

# Next start the test validator

solana-test-validator

# By default, basic status information is printed while the process is running. See Appendix I for details

Ledger location: test-ledger
Log: test-ledger/validator.log
Identity: EPhgPANa5Rh2wa4V2jxt7YbtWa3Uyw4sTeZ13cQjDDB8
Genesis Hash: 4754oPEMhAKy14CZc8GzQUP93CB4ouELyaTs4P8ittYn
Version: 1.6.7
Shred Version: 13286
Gossip Address: 127.0.0.1:1024
TPU Address: 127.0.0.1:1027
JSON RPC URL: http://127.0.0.1:8899
⠈ 00:36:02 | Processed Slot: 5142 | Confirmed Slot: 5142 | Finalized Slot: 5110 | Snapshot Slot: 5100 | Transactions: 5142 | ◎499.974295000


# Leave solana-test-validator running in its own terminal. When it is no longer needed, it can be stopped with ctrl-c.

# By default, the test validator runs with all runtime features activated.

# You can verify this using the Solana command-line tools:

solana feature status -ul

# Since this may not always be desired, especially when testing programs meant for deployment to mainnet, the CLI provides an option to deactivate specific features:

solana-test-validator --deactivate-feature <FEATURE_PUBKEY_1> --deactivate-feature <FEATURE_PUBKEY_2>
```

###### How Interacting whit Local Validator?

```sh
# Open a new terminal to interact with a running solana-test-validator instance using other binaries from the Solana CLI Tool Suite or your own client software.

# Configure the CLI Tool Suite to target a local cluster by default
solana config set --url http://127.0.0.1:8899

# Verify the CLI Tool Suite configuration
solana genesis-hash

# NOTE: The result should match the Genesis Hash: field in the solana-test-validator status output

# Check the wallet balance
solana balance

# NOTE: Error: No such file or directory (os error 2) means that the default wallet does not yet exist. Create it with solana-keygen new.
# NOTE: If the wallet has a zero SOL balance, airdrop some localnet SOL with solana airdrop 10

# Perform a basic transfer transaction
solana transfer EPhgPANa5Rh2wa4V2jxt7YbtWa3Uyw4sTeZ13cQjDDB8 1


# Monitor msg!() output from on-chain programs
solana logs

# NOTE: This command needs to be running when the target transaction is executed. Run it in its own terminal
```

## Core Concepts

### Solana Account Model

#### Key Points

###### Where contained all data on Solana?

On Solana, all data is contained in what we call "accounts".

###### How we can  think of data on Solana?

You can think of data on Solana as a public database with a single "Accounts" table, where each entry in this table is an individual account with the same base Account type.

```rust
/// An Account with data that is stored on chain
#[repr(C)]
#[cfg_attr(
    feature = "frozen-abi",
    derive(AbiExample),
    frozen_abi(digest = "2SUJNHbXMPWrsSXmDTFc4VHx2XQ85fT5Leabefh5Nwe7")
)]
#[cfg_attr(
    feature = "serde",
    derive(serde_derive::Deserialize),
    serde(rename_all = "camelCase")
)]
#[derive(PartialEq, Eq, Clone, Default)]
pub struct Account {
    /// lamports in the account
    pub lamports: u64,
    /// data held in this account
    #[cfg_attr(feature = "serde", serde(with = "serde_bytes"))]
    pub data: Vec<u8>,
    /// the program that owns this account. If executable, the program that loads this account.
    pub owner: Pubkey,
    /// this account's data contains a loaded program (and is now read-only)
    pub executable: bool,
    /// the epoch at which this account will next owe rent
    pub rent_epoch: Epoch,
}
```

###### How many the data can store Account?

Accounts can store up to 10MiB of data

###### What data store Account?

Accounts can store up to 10MiB of data, which contain either executable program code or program state.

###### ! What is Rent Deposit?

Accounts require a rent deposit in lamports (SOL) that is proportional to the amount of data stored, which is fully refundable when the account is closed.

###### ! What is Account Owner?

Every account has a program owner. Only the program that owns an account can modify its data or deduct its lamport balance. However, anyone can increase the balance.

###### What is Sysvar accounts?

Sysvar accounts are special accounts that store network cluster state.

###### What is Program accounts?

Program accounts store the executable code of smart contracts.

###### What is Data accounts?

Data accounts are created by programs to store and manage program state.

#### Account

###### How identified Account?

Every account on Solana is identifiable by a unique 32 byte address, which is generally displayed as a base58 encoded string (e.g 14grJpemFaf88c8tiVb77W7TYg2W3ir6pfkKz3YjhhZ5).

###### What is relationship between the account and its address?

The relationship between the account and its address can be thought of as a key-value pair, where the address serves as the key to locate the corresponding on-chain data of the account.

###### What Account use as their address?

- Most Solana accounts use an Ed25519 public key as their address.
- Some Accounts uses special addresses that are deterministically derived from a program ID and optional inputs (seeds). This address called PDA - Program Derived Address.

###### What is PDA?

PDAs is abbreviation from "Program Derived Addresses", are special addresses that are deterministically derived from a program ID and optional inputs (seeds).

##### Account Type

###### What field has every Account on Solana?

- `data`: A byte array that stores arbitrary data for an account. For non-executable accounts, this generally stores state that is meant to be read-only. For program accounts (smart contracts), this contains the executable program code. The data field is commonly referred to as "account data".
- `executable`: This boolean flag used to indicate if an account was a program.
- `lamports`: The account's balance in lamports, the smallest unit of SOL (1 SOL = 1 billion lamports).
- `owner`: The program ID (public key) of the program that owns this account. Only the owner program can modify the account's data or deduct its lamports balance.
- `rent_epoch`: A legacy field from when Solana had a mechanism that periodically deducted lamports from accounts. While this field still exists in the Account type, it is no longer used since rent collection was deprecated.

###### What is the `data` Account field used for?

`data`: A byte array that stores arbitrary data for an account. For non-executable accounts, this generally stores state that is meant to be read-only. For program accounts (smart contracts), this contains the executable program code. The data field is commonly referred to as "account data".

###### What is the `executable` Account field used for?

`executable`: This boolean flag used to indicate if an account was a program.

###### What is the `lamports` Account field used for?

`lamports`: The account's balance in lamports, the smallest unit of SOL (1 SOL = 1 billion lamports).

###### What is the the smallest unit of SOL?

lamports. 1 SOL = 1 billion lamports

###### What is the `owner` Account field used for?

`owner`: The program ID (public key) of the program that owns this account. Only the owner program can modify the account's data or deduct its lamports balance.

###### Who can modify the account's data or deduct its lamports balance?

Only the owner program can modify the account's data or deduct its lamports balance.

###### What is the `rent_epoch` Account field used for?

`rent_epoch`: A legacy field from when Solana had a mechanism that periodically deducted lamports from accounts. While this field still exists in the Account type, it is no longer used since rent collection was deprecated.

##### Rent

###### What is Rent?

Rent is minimum lamport (SOL) balance that must maintain accounts to store data on-chain.

###### What size of Rent must maintain accounts to store data on-chain.

Minimum lamport (SOL) balance (Rent) is proportional to amount of data stored on the account (in bytes).

###### What is function of Rent?

Rent is a deposit, full amount of which can be recovered when an account is closed.

###### How calculate Rent?

```rust
/// Default rental rate in lamports/byte-year.
///
/// This calculation is based on:
/// - 10^9 lamports per SOL
/// - $1 per SOL
/// - $0.01 per megabyte day
/// - $3.65 per megabyte year
pub const DEFAULT_LAMPORTS_PER_BYTE_YEAR: u64 = 1_000_000_000 / 100 * 365 / (1024 * 1024);

/// Default amount of time (in years) the balance has to include rent for the
/// account to be rent exempt.
pub const DEFAULT_EXEMPTION_THRESHOLD: f64 = 2.0;

/// Account storage overhead for calculation of base rent.
///
/// This is the number of bytes required to store an account with no data. It is
/// added to an accounts data length when calculating [`Rent::minimum_balance`].
pub const ACCOUNT_STORAGE_OVERHEAD: u64 = 128;

/// Minimum balance due for rent-exemption of a given account data size.
pub fn minimum_balance(&self, data_len: usize) -> u64 {
    let bytes = data_len as u64;
    (((ACCOUNT_STORAGE_OVERHEAD + bytes) * self.lamports_per_byte_year) as f64
        * self.exemption_threshold) as u64
}
```

##### Program Owner

###### What is the name of "Smart Contract" in Solana?

On Solana, "smart contracts" are referred to as "programs".

###### Who owns the Account?

Every account has a designated program as its owner.

###### What whit Account can do only the owner program?

- Modify the account's data field
- Deduct lamports from the account's balance

#### System Program

###### Who is owned new created accounts?

By default, all new accounts are owned by the "System Program"

###### Which key tacks perform System Program?

- New Account Creation: Only the System Program can create new accounts.
- Space Allocation: Sets the byte capacity for the data field of each account.
- Transfer / Assign Program Ownership: Once the System Program creates an account, it can reassign the designated program owner to a different program account. This is how custom programs take ownership of new accounts created by the System Program.

###### Who can create new accounts?

Only the System Program can create new accounts.

######  How custom programs take ownership of new accounts?

Once the System Program creates an account, it can reassign the designated program owner to a different program account. This is how custom programs take ownership of new accounts created by the System Program.

###### What is "Wallet" account?

All "wallet" accounts on Solana are simply accounts owned by the System Program.  The lamport balance stored in these accounts represents the amount of SOL owned by the wallet. Only accounts owned by the System Program can be used as transaction fee payers.

###### Which account can be used as transaction fee payers?

Only accounts owned by the System Program can be used as transaction fee payers, that is "Wallet" accounts.

#### Sysvar Accounts

###### What is Sysvar Accounts?

Sysvar accounts are special accounts located at predefined addresses that provide access to cluster state data. These accounts are dynamically updated with data about the network cluster.

#### Program Account

###### Where loaders store the executable code?

Except for loader-v3 all loaders store the executable code of the programs they manage in a so called program account

###### Who owns program accounts?

loaders

###### What is Buffer Account?

This is special account type that owned by Loader-v3 for temporarily staging the upload of a program during deployment or redeployment / upgrades

###### How works Loader-v3?

Loader-v3 works differently from all other loaders as it has one indirection for each program. The program account only contains the address of the programdata account which then in turn holds the actual executable code

```
Address
Program Account: Data:            -> point to -> Address
                 Owner: BPF Loader               Program Executable
                                                 Data Account: Data: Program Code
                                                               Owner: BPF Loader
```

#### Data Account

###### What is Data Account?

A Data Account is an account in which the program that owns it stores its state. To maintain state, programs define instructions to create separate accounts that are owned by the program. Each of these accounts has its own unique address and can store any arbitrary data defined by the program.

```
Address
-----------
BPF Loader 
-----------
     |     
     |
   owner
     |
     v
Address
----------- data: Program Code
Program     executable: True
----------- lamports: Number
     |      owner: BPF Loader
     |
   owner
     |
     v
Address
-----------  data: Program state
Data account executable: False
-----------  lamports: Number
             owner: Program
```

###### How Program become Account owner?

Only the System Program can create new accounts. Once the System Program creates an account, it can then transfer / assign ownership of the new account to another program.

###### How custom Program create Data account?

1. Invoke the System Program to create an account, which then transfers ownership to the custom program
2. Invoke the custom program, which now owns the account, to then initialize the account data as defined by the program's instruction

### Transactions and Instructions

###### How in Solana interacting whit Network?

On Solana, we send transactions to interact with the network.

###### What transactions consist of?

Transactions include one or more instructions that specify operations to be processed. The execution logic for instructions are stored on programs deployed to the Solana network, where each program defines its own set of instructions.

###### How transaction are processed?

- If a transaction includes multiple instructions, the instructions execute in the order they are added to the transaction
- Transactions are "atomic" - either all instructions process successfully, or the entire transaction fails and no changes are made.

###### What is maximum size of transaction?

The maximum size of a transaction is 1232 bytes.

###### What information requires a instruction?

- The address of the program to invoke
- The accounts the instruction will read from or write to
- Any additional data required by the instruction (e.g. function arguments)

#### Transaction

###### What consists Solana transaction?

A Solana transaction consists of:

- Signatures: An array of signatures included on the transaction.
- Message: List of instructions to be processed atomically.

```rust
pub struct Transaction {
    #[wasm_bindgen(skip)]
    #[serde(with = "short_vec")]
    pub signatures: Vec<Signature>,

    #[wasm_bindgen(skip)]
    pub message: Message,
}
```

###### What is structure of a transaction message?

The structure of a transaction message consists of:

- Message Header: Specifies the number of signer and read-only account.
- Account Addresses: An array of account addresses required by the instructions on the transaction.
- Recent Blockhash: Acts as a timestamp for the transaction.
- Instructions: An array of instructions to be executed.

```rust
pub struct Message {
    /// The message header, identifying signed and read-only `account_keys`.
    pub header: MessageHeader,

    /// All the account keys used by this transaction.
    #[serde(with = "short_vec")]
    pub account_keys: Vec<Pubkey>,

    /// The id of a recent ledger entry.
    pub recent_blockhash: Hash,

    /// Programs that will be executed in sequence and committed in
    /// one atomic transaction if all succeed.
    #[serde(with = "short_vec")]
    pub instructions: Vec<CompiledInstruction>,
}
```

###### What is structure and purpose of transaction message Header (header)?

The message header uses three bytes to define account privileges:

- Required signatures and message version (eg. legacy vs v0)
- Number of read-only signed accounts
- Number of read-only unsigned accounts

```rust
pub struct MessageHeader {
    /// The number of signatures required for this message to be considered
    /// valid. The signers of those signatures must match the first
    /// `num_required_signatures` of [`Message::account_keys`].
    pub num_required_signatures: u8,

    /// The last `num_readonly_signed_accounts` of the signed keys are read-only
    /// accounts.
    pub num_readonly_signed_accounts: u8,

    /// The last `num_readonly_unsigned_accounts` of the unsigned keys are
    /// read-only accounts.
    pub num_readonly_unsigned_accounts: u8,
}
```

###### What is "Compact-Array Format"?

Compact-Array Format is used to encode the lengths of the Account Addresses and Instructions arrays in transaction messages.

- The array length (encoded as compact-u16)
- The array items listed one after another

###### What is structure of Transaction Message Account Addresses Array (account_keys)?

Account Addresses Array contains an array of account addresses required by its instructions. The array begins with a compact-u16 number indicating how many addresses it contains. The addresses are then ordered based on their privileges, which is determined by the message header.

- Accounts that are writable and signers
- Accounts that are read-only and signers
- Accounts that are writable and not signers
- Accounts that are read-only and not signers

###### What purpose of Transaction Message Recent Blockhash (recent_blockhash)?

- Acts as a timestamp
- Prevents duplicate transactions

###### How fast expire a Recent Blockhash?

A blockhash expires after 150 blocks (about 1 minute assuming 400ms block times)

###### What happen whit transaction when blockhash expires?

after blockhash expires the transaction cannot be processed.


###### What RPC method to use to get the current blockhash and last block height at which the blockhash will be valid.

You can use the `getLatestBlockhash` RPC method.

###### What structure and purpose of Transaction Message Instructions Array (instructions)? 

Instructions Array  contains transaction instructions, it starts with a compact-u16 length followed by the instruction data - instructions in the CompiledInstruction type.

###### What type are the instructions in the transaction message instruction array (instructions)?

A transaction message contains an array of instructions in the CompiledInstruction type. Instructions are converted to this type when added to a transaction.

```rust
pub struct CompiledInstruction {
    /// Index into the transaction keys array indicating the program account that executes this instruction.
    pub program_id_index: u8,
    /// Ordered indices into the transaction keys array indicating which accounts to pass to the program.
    #[serde(with = "short_vec")]
    pub accounts: Vec<u8>,
    /// The program input data.
    #[serde(with = "short_vec")]
    pub data: Vec<u8>,
}
```

###### What structure of CompiledInstruction type?

Each CompiledInstruction type contains:

- `program_id_index`. Program ID Index: An u8 index that points to the program's address in the account addresses array. This specifies the program that will process the instruction.
- `accounts`. Account Indexes: An array of u8 indexes that point to the account addresses required for this instruction.
- `data`. Instruction Data: A byte array specifying which instruction to invoke on the program and any additional data required by the instruction (eg. function arguments).

#### Instruction

###### What is Instruction?

An instruction on a deployed program can be thought of as a public function that can be called by anyone using the Solana network.

###### what is required to provide instructions for the call?

Invoking a program's instruction requires providing three key pieces of information:

- Program ID: The program being invoked to execute the instruction
- Accounts: List of accounts the instruction requires
- Instruction Data: Byte array specifying the instruction on the program to invoke and any function arguments required by the instruction
  
```rust
pub struct Instruction {
    /// Pubkey of the program that executes this instruction.
    pub program_id: Pubkey,
    /// Metadata describing accounts that should be passed to the program.
    pub accounts: Vec<AccountMeta>,
    /// Opaque data passed to the program for its own interpretation.
    pub data: Vec<u8>,
}
```

example showing the structure of a SOL transfer instruction

```json
{
  "keys": [
    {
      "pubkey": "3z9vL1zjN6qyAFHhHQdWYRTFAcy69pJydkZmSFBKHg1R",
      "isSigner": true,
      "isWritable": true
    },
    {
      "pubkey": "BpvxsLYKQZTH42jjtWHZpsVSa7s6JVwLKwBptPSHXuZc",
      "isSigner": false,
      "isWritable": true
    }
  ],
  "programId": "11111111111111111111111111111111",
  "data": [2, 0, 0, 0, 128, 150, 152, 0, 0, 0, 0, 0]
}
```


###### In what form should accounts be submitted for instructions?

Each account required by an instruction must be provided as an AccountMeta that contains:

```rust
pub struct AccountMeta {
    /// An account's public key.
    pub pubkey: Pubkey,
    /// True if an `Instruction` requires a `Transaction` signature matching `pubkey`.
    pub is_signer: bool,
    /// True if the account data or metadata may be mutated during program execution.
    pub is_writable: bool,
}
```

### Transaction Fees

###### For what is used base fee?

Every Solana transaction requires a base fee (SOL) to compensate validators for processing the transaction.

###### For what is used prioritization fee?

An optional prioritization fee is available to increase the probability that the transaction is processed by the current leader (validator).

###### What is the size of base fee for a transaction?

The base fee for a transaction is a minimum of 5000 lamports per signature on the transaction.

###### How is calculated the prioritization fee?

The prioritization fee is calculated as: (compute unit limit * compute unit price).

###### What is compute unit limit?

The compute unit limit is the maximum number of compute units that the transaction can consume.

###### What is compute unit price?

The compute unit price is the price per compute unit, in micro-lamports.

###### What is micro lamports equal to? 

1,000,000 micro lamports = 1 lamport

###### Who can to pay fee?

The transaction fee payer must be an account owned by the System Program.

#### Base Transaction Fee

###### How base Fee is paid?

The base fee is automatically paid for by the transaction fee payer, which is the first signer on the transaction. The fee payer must be an account owned by the System Program.

###### How is base fee distributed?

- 50% Burned: Half of the base fee is burned.
- 50% Distribution: Half is paid to the validator that processed the transaction.

#### Prioritization Fee

###### How is Prioritization Fee distributed?

100% of the priority fee is paid directly to the validator processing the transaction.

##### Compute Units and Limits

For additional details into compute unit usage:

[ComputeBudget Type](https://github.com/anza-xyz/agave/blob/v2.1.13/compute-budget/src/compute_budget.rs#L22-L130)
[Compute Unit Consumption Defaults](https://github.com/anza-xyz/agave/blob/v2.1.13/compute-budget/src/compute_budget.rs#L149-L197)
Refer to the [How to Request Optimal Compute guide](https://solana.com/developers/guides/advanced/how-to-request-optimal-compute) for more details on compute unit usage.

###### What is Compute Units?

Compute Units (CU) is unit of measurement of computational resources that consumes a transaction when is executed.  Each instruction deducts from the transaction’s compute unit budget.

###### What is Maximum Limit of computational resources that can use transaction?

A transaction can use up to 1.4 million compute units.

###### What is Default Limit of computational resources that can use transaction?

By default, each instruction is limited to 200,000 compute units.

###### How request a specific compute unit limit?

You can request a specific compute unit limit by including a `SetComputeUnitLimit` instruction in your transaction

##### Compute Unit Price

Use the following resources to get real-time recommendations on the current compute unit price:

[Priority Fee API](https://docs.helius.dev/solana-apis/priority-fee-api) by Helius
[Global Priority Fee Tracker](https://triton.one/solana-prioritization-fees/) by Triton
Refer to the [How to Use Priority Fees guide](https://solana.com/developers/guides/advanced/how-to-use-priority-fees) for more details on priority fees.

##### Calculate Prioritization Fee

###### How to calculate Prioritization Fee?

Prioritization Fee = Compute Unit Limit × Compute Unit Price

###### How to set up a specific unit limit?

Use `SetComputeUnitLimit`

```rust
let limit_instruction = ComputeBudgetInstruction::set_compute_unit_limit(300_000);

```

###### How to define the price per compute unit?

use `SetComputeUnitPrice`

```rust
let price_instruction = ComputeBudgetInstruction::set_compute_unit_price(1);
```

### Programs

###### What is Programs on Solana?

- On Solana, "smart contracts" are called programs. 
- Programs are deployed on-chain to accounts that contain the program's compiled executable binary. 
- Users interact with programs by sending transactions containing instructions that tell the program what to do.
- Programs are accounts containing executable code, organized into functions called instructions.
- While programs are stateless, they can include instructions that create and update other accounts to store data.
- An upgrade authority can update programs. Once this authority is removed, the program becomes immutable.
- Users can verify an on-chain program account's data matches its public source code through verifiable builds.

#### Writing Solana Programs

###### In what language predominantly is written Programs?

Solana programs are predominantly written in the Rust programming language

###### What approaches used for Program development?

Anchor: A framework designed for Solana program development. It provides a faster and simpler way to write programs, using Rust macros to significantly reduce boilerplate code. For beginners, it is recommended to start with the Anchor framework.

Native Rust: This approach involves writing Solana programs in Rust without leveraging any frameworks. It offers more flexibility but comes with increased complexity.

###### What is "Anchor"?

A framework designed for Solana program development. It provides a faster and simpler way to write programs, using Rust macros to significantly reduce boilerplate code. For beginners, it is recommended to start with the Anchor framework.

#### Updating Solana Programs

###### Can we modify on-chain programs?

On-chain programs can be directly modified by an account designated as the "upgrade authority", which is typically the account that originally deployed the program. If the upgrade authority is revoked and set to None, the program becomes immutable and can no longer be updated.

#### Verifiable Programs

###### What are Verifiable builds used for?

Verifiable builds allow anyone to check if a program's on-chain code matches its public source code, making it possible to detect discrepancies between source and deployed versions.

###### How quickly check for verified programs?

To quickly check for verified programs, users can search for a program address on the SolanaFM Explorer and navigate to the "Verification" tab. View an example of a verified program here.

###### How there is Verification Tools?

The [Solana Verifiable Build CLI](https://github.com/Ellipsis-Labs/solana-verifiable-build) by Ellipsis Labs enables users to independently verify onchain programs against published source code.

###### There is support for verifiable builds in Anchor?

Anchor provides built-in support for verifiable builds. Details can be found in the [Anchor documentation](https://www.anchor-lang.com/docs/verifiable-builds).

#### Berkeley Packet Filter (BPF)

###### What is LLVM?

The LLVM Project is a collection of modular and reusable compiler and toolchain technologies. Solana uses LLVM to compile programs into ELF files.

###### What is ELF file format?

In computing, the Executable and Linkable Format(ELF, formerly named Extensible Linking Format) is a common standard file format for executable files, object code, shared libraries, and core dumps.
These files contain Solana's custom version of eBPF bytecode, called "Solana Bytecode Format" (sBPF). The ELF file contains the program's binary and is stored on-chain in an executable account when the program is deployed.

###### What is eBPF?

eBPF is a technology that can run programs in a privileged context such as the operating system kernel.[5] It is the successor to the Berkeley Packet Filter (BPF, with the "e" originally meaning "extended") filtering mechanism in Linux and is also used in non-networking parts of the Linux kernel as well.

It is used to safely and efficiently extend the capabilities of the kernel at runtime without requiring changes to kernel source code or loading kernel modules. Safety is provided through an in-kernel verifier which performs static code analysis and rejects programs which crash, hang or otherwise interfere with the kernel negatively.

#### Built-in Programs

##### Loader Programs

###### What are Loader Programs?

Every program itself is owned by another program, which is its loader.

###### What goals of loaders?

- Deploy a new program or buffer
- Close a program or buffer
- Redeploy / upgrade an existing program
- Transfer the authority over a program
- Finalize a program

###### Which loaders support modifications to programs after their initial deployment?

Loader-v3 and loader-v4 support modifications to programs after their initial deployment.

###### Which loaders are there?

- native loader:
    Program id: NativeLoader1111111111111111111111111111111
    Owns the other four loaders
- loader-v1:
    Program id: BPFLoader1111111111111111111111111111111111
    Management instructions are disabled, but programs still execute
- loader-v2:
    Program id: BPFLoader2111111111111111111111111111111111
    Instructions
    Management instructions are disabled, but programs still execute
- loader-v3:
    Program id: BPFLoaderUpgradeab1e11111111111111111111111
    Instructions
    Is being phased out
- loader-v4:
    Program id: LoaderV411111111111111111111111111111111111
    Instructions
    Will become the standard loader

##### Precompile Programs

###### For what used Ed25519 Program?

The program for verifying ed25519 signatures. It takes an ed25519 signature, a public key, and a message. Multiple signatures can be verified. If any of the signatures fail to verify, an error is returned.

###### For what used Secp256k1 Program?

Verify secp256k1 public key recovery operations (ecrecover).

###### For what used Secp256r1 Program?

The program for verifying secp256r1 signatures. It takes a secp256r1 signature, a public key, and a message. Up to 8 signatures can be verified. If any of the signatures fail to verify, an error is returned.

#### Core Programs

###### What are "native" programs?

The Solana cluster genesis includes a list of special programs that provide various core functionalities for the network. Historically these were referred to as "native" programs and they used to be distributed together with the validator code.

###### Which there are Core Programs?

- System Program
    Program id: 11111111111111111111111111111111
    Create new accounts, allocate account data, assign accounts to owning programs, transfer lamports from System Program owned accounts and pay transaction fees.
- Vote Program
    Program id: Vote111111111111111111111111111111111111111
    Create and manage accounts that track validator voting state and rewards.
- Stake Program
    Program id: Stake11111111111111111111111111111111111111
    Create and manage accounts representing stake and rewards for delegations to validators.
- Config Program
    Program id: Config1111111111111111111111111111111111111
    Add configuration data to the chain, followed by the list of public keys that are allowed to modify it. Unlike the other programs, the Config program does not define any individual instructions. It has just one implicit instruction: "store". Its instruction data is a set of keys that gate access to the account and the data to store inside of it.
- Compute Budget Program
    Program id: ComputeBudget111111111111111111111111111111
- Address Lookup Table Program
    Program id: AddressLookupTab1e1111111111111111111111111
- Zk Token Proof Program
    Program id: ZkTokenProof1111111111111111111111111111111
- Zk Elgamal Proof Program
    Program id: ZkE1Gama1Proof11111111111111111111111111111

###### For what used System Program?

Create new accounts, allocate account data, assign accounts to owning programs, transfer lamports from System Program owned accounts and pay transaction fees.

###### For what used Vote Program?

Create and manage accounts that track validator voting state and rewards

###### For what used Stake Program?

Create and manage accounts representing stake and rewards for delegations to validators.

###### For what used Config Program?

Add configuration data to the chain, followed by the list of public keys that are allowed to modify it. Unlike the other programs, the Config program does not define any individual instructions. It has just one implicit instruction: "store". Its instruction data is a set of keys that gate access to the account and the data to store inside of it.

### Program Derived Address (PDA)

###### What is Program Derived Address (PDA)?

PDAs are addresses that are deterministically derived and look like standard public keys, but have no associated private keys. This means that no external user can generate a valid signature for the address. However, the Solana runtime enables programs to programmatically "sign" for PDAs without needing a private key.

###### For what used Program Derived Address (PDA)?

Program that derive address can create account bound to that address and subsequently find and use it based on the initial data from which the address was derived without remembering the address itself. So PDA is used as the address (unique identifier) for an on-chain account, providing a method to easily store, map, and fetch program state.

###### Should we explicitly create account when derive address?

It's important to understand that simply deriving a Program Derived Address (PDA) does not automatically create an on-chain account at that address. Accounts with a PDA as the on-chain address must be explicitly created through the program used to derive the address. 

###### Do PDA have private key?

PDAs are addresses that fall off the Ed25519 curve and have no corresponding private key.

#### Who to derive a PDA

###### Who to derive a PDA?

The derivation of a PDA requires 3 inputs.

- Optional seeds: Predefined inputs (e.g. string, number, other account addresses) used to derive a PDA. These inputs are converted to a buffer of bytes.
- Bump seed: An additional input (with a value between 255-0) that is used to guarantee that a valid PDA (off curve) is generated. This bump seed (starting with 255) is appended to the optional seeds when generating a PDA to "bump" the point off the Ed25519 curve. The bump seed is sometimes referred to as a "nonce".
- Program ID: The address of the program the PDA is derived from. This is also the program that can "sign" on behalf of the PDA

```ts
import { PublicKey } from "@solana/web3.js";

const programId = new PublicKey("11111111111111111111111111111111");
const string = "helloWorld";

// Under the hood, findProgramAddressSync will iteratively append an additional bump seed (nonce) to the seeds buffer and call the createProgramAddressSync method. The bump seed starts with a value of 255 and is decreased by 1 until a valid PDA (off curve) is found.
const [PDA, bump] = PublicKey.findProgramAddressSync( 
  [Buffer.from(string)],
  programId,
);

console.log(`PDA: ${PDA}`);
console.log(`Bump: ${bump}`);
```

```sh
PDA: 46GZzzetjCURsdFPb7rcnspbEMnCBXe9kpjrsZAkKb6X
Bump: 254
```

###### What is Bump seed?

An additional input (with a value between 255-0) that is used to guarantee that a valid PDA (off curve) is generated. This bump seed (starting with 255) is appended to the optional seeds when generating a PDA to "bump" the point off the Ed25519 curve. The bump seed is sometimes referred to as a "nonce".

###### What is Canonical Bump seed?

The "canonical bump" refers to the first bump seed (starting from 255 and decrementing by 1) that derives a valid PDA. For program security, it is recommended to only use PDAs derived from a canonical bump.

```ts
import { PublicKey } from "@solana/web3.js";

const programId = new PublicKey("11111111111111111111111111111111");
const string = "helloWorld";

// Loop through all bump seeds for demonstration
for (let bump = 255; bump >= 0; bump--) {
  try {
    const PDA = PublicKey.createProgramAddressSync(
      [Buffer.from(string), Buffer.from([bump])],
      programId,
    );
    console.log("bump " + bump + ": " + PDA);
  } catch (error) {
    console.log("bump " + bump + ": " + error);
  }
}
```

```sh
bump 255: Error: Invalid seeds, address must fall off the curve
bump 254: 46GZzzetjCURsdFPb7rcnspbEMnCBXe9kpjrsZAkKb6X
bump 253: GBNWBGxKmdcd7JrMnBdZke9Fumj9sir4rpbruwEGmR4y
bump 252: THfBMgduMonjaNsCisKa7Qz2cBoG1VCUYHyso7UXYHH
bump 251: EuRrNqJAofo7y3Jy6MGvF7eZAYegqYTwH2dnLCwDDGdP
bump 250: Error: Invalid seeds, address must fall off the curve
...
// remaining bump outputs
```

#### Create PDA Accounts

```rust
// lib.rs

use anchor_lang::prelude::*;

declare_id!("75GJVCJNhaukaa2vCCqhreY31gaphv7XTScBChmr1ueR");

#[program]
pub mod pda_account {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let account_data = &mut ctx.accounts.pda_account;
        // store the address of the `user`
        account_data.user = *ctx.accounts.user.key;
        // store the canonical bump
        account_data.bump = ctx.bumps.pda_account;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        // set the seeds to derive the PDA
        seeds = [b"data", user.key().as_ref()],
        // use the canonical bump
        bump,
        payer = user,
        space = 8 + DataAccount::INIT_SPACE
    )]
    pub pda_account: Account<'info, DataAccount>,
    pub system_program: Program<'info, System>,
}

#[account]

#[derive(InitSpace)]
pub struct DataAccount {
    pub user: Pubkey,
    pub bump: u8,
}
```

```ts
// pda-account.test.ts

import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PdaAccount } from "../target/types/pda_account";
import { PublicKey } from "@solana/web3.js";

describe("pda-account", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.PdaAccount as Program<PdaAccount>;
  const user = provider.wallet as anchor.Wallet;

  // Derive the PDA address using the seeds specified on the program
  const [PDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("data"), user.publicKey.toBuffer()],
    program.programId
  );

  it("Is initialized!", async () => {
    const transactionSignature = await program.methods
      .initialize()
      .accounts({
        user: user.publicKey,
        pdaAccount: PDA,
      })
      .rpc();

    console.log("Transaction Signature:", transactionSignature);
  });

  it("Fetch Account", async () => {
    const pdaAccount = await program.account.dataAccount.fetch(PDA);
    console.log(JSON.stringify(pdaAccount, null, 2));
  });
});
```

### Cross Program Invocation (CPI)

###### What is CPI?

A Cross Program Invocation (CPI) refers to when one program invokes the instructions of another program.

You can think of instructions as API endpoints that a program exposes to the network and a CPI as one API internally invoking another API.

###### What happen whit signer privileges under CPI?

The signer privileges from the initial transaction invoking the caller program (A) extend to the callee (B) program

###### What maximum depth of CPI call?

The callee (B) program can make further CPIs to other programs, up to a maximum depth of 4 (ex. B->C, C->D)

###### Can programs "sing" on behalf of a PDA?

The programs can "sign" on behalf of the PDAs derived from its program ID

###### What must specify each CPI instruction?

each CPI instruction must specify the following information:

- Program address: Specifies the program being invoked
- Accounts: Lists every account the instruction reads from or writes to, including other programs
- Instruction Data: Specifies which instruction on the program to invoke, plus any additional data required by the instruction (function arguments)

###### What instructions is used programs to execute CPIs?

Programs then execute CPIs using either one of the following functions from the `solana_program` crate:

- `invoke` - used when there are no PDA signers
- `invoke_signed` - used when the caller program needs to sign with a PDA derived from its program ID

###### What crate define instruction for execute CPIs?

there may be crates available with helper functions for building the CPIs instruction, each then execute under the hood to execute CPI `invoke` or `invoke_signed` functions from the `solana_program` crate.

###### In what cases used `solana_program` `invoke` function?

`invoke` function used for execute CPIs when making a CPI that does not require PDA signers. When making CPIs, signers provided to the caller program automatically extend to the callee program.

```rust
pub fn invoke(
    instruction: &Instruction,
    account_infos: &[AccountInfo<'_>]
) -> Result<(), ProgramError>
```

```rust
// src/lib.rs

use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};

declare_id!("55xRZZnhSk1aN6seNTj75mThJEjZkBRYPQJ8qvKVh1eC");

#[program]
pub mod cpi_invoke {
    use super::*;

    pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
        let from_pubkey = ctx.accounts.sender.to_account_info();
        let to_pubkey = ctx.accounts.recipient.to_account_info();
        let program_id = ctx.accounts.system_program.to_account_info();

        let instruction =
            &system_instruction::transfer(&from_pubkey.key(), &to_pubkey.key(), amount);

        invoke(instruction, &[from_pubkey, to_pubkey, program_id])?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SolTransfer<'info> {
    #[account(mut)]
    sender: Signer<'info>,
    #[account(mut)]
    recipient: SystemAccount<'info>,
    system_program: Program<'info, System>,
}
```

```ts
// tests/cpi-invoke.test.ts

import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { CpiInvoke } from "../target/types/cpi_invoke";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

describe("cpi-invoke", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CpiInvoke as Program<CpiInvoke>;

  const sender = provider.wallet as anchor.Wallet;
  const recipient = new Keypair();

  const transferAmount = 0.01 * LAMPORTS_PER_SOL;

  it("SOL Transfer Anchor", async () => {
    const transactionSignature = await program.methods
      .solTransfer(new BN(transferAmount))
      .accounts({
        sender: sender.publicKey,
        recipient: recipient.publicKey,
      })
      .rpc();

    console.log(
      `\nTransaction Signature: https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`
    );
  });
});
```


###### In what cases used `solana_program` `invoke_signed` function?

The `invoke_signed` function is used when making a CPI that requires PDA signers. The seeds used to derive the signer PDAs are passed into the `invoke_signed` function as `signer_seeds`.

```rust
pub fn invoke_signed(
    instruction: &Instruction,
    account_infos: &[AccountInfo<'_>],
    signers_seeds: &[&[&[u8]]]
) -> Result<(), ProgramError>
```

```rust
// src/lib.rs

use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke_signed, system_instruction};

declare_id!("EyxvVL2akUZZHx4DXzYzCroKLmigPrS2WgpSetKzM9wh");

#[program]
pub mod cpi_invoke_signed {
    use super::*;

    pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
        let from_pubkey = ctx.accounts.pda_account.to_account_info();
        let to_pubkey = ctx.accounts.recipient.to_account_info();
        let program_id = ctx.accounts.system_program.to_account_info();

        let seed = to_pubkey.key();
        let bump_seed = ctx.bumps.pda_account;
        let signer_seeds: &[&[&[u8]]] = &[&[b"pda", seed.as_ref(), &[bump_seed]]];

        let instruction =
            &system_instruction::transfer(&from_pubkey.key(), &to_pubkey.key(), amount);

        invoke_signed(
            instruction,
            &[from_pubkey, to_pubkey, program_id],
            signer_seeds,
        )?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SolTransfer<'info> {
    #[account(
        mut,
        seeds = [b"pda", recipient.key().as_ref()], 
        bump, 
    )]
    pda_account: SystemAccount<'info>,
    #[account(mut)]
    recipient: SystemAccount<'info>,
    system_program: Program<'info, System>,
}
```

```ts
// tests/cpi-invoke-signed.test.ts

import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { CpiInvokeSigned } from "../target/types/cpi_invoke_signed";
import {
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

describe("cpi-invoke-signed", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CpiInvokeSigned as Program<CpiInvokeSigned>;

  const connection = program.provider.connection;

  const wallet = provider.wallet as anchor.Wallet;
  const [PDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("pda"), wallet.publicKey.toBuffer()],
    program.programId
  );

  const transferAmount = 0.1 * LAMPORTS_PER_SOL;

  it("Fund PDA with SOL", async () => {
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: PDA,
      lamports: transferAmount,
    });

    const transaction = new Transaction().add(transferInstruction);

    const transactionSignature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [wallet.payer] // signer
    );

    console.log(
      `\nTransaction Signature: https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`
    );
  });

  it("PDA SOL Transfer invoke_signed", async () => {
    const transactionSignature = await program.methods
      .solTransfer(new BN(transferAmount))
      .accounts({
        pdaAccount: PDA,
        recipient: wallet.publicKey,
      })
      .rpc();

    console.log(
      `\nTransaction Signature: https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`
    );
  });
});
```

### Tokens on Solana

###### What is Token?

Tokens are digital assets that represent ownership over diverse categories of assets.

###### what is achieved with tokenization?

Tokenization enables the digitalization of property rights, serving as a fundamental component for managing both fungible and non-fungible assets.

###### What is Fungible Tokens?

Fungible Tokens represent interchangeable and divisible assets of the same type and value (ex. USDC).

###### What is Non-fungible Tokens (NFT)?

Non-fungible Tokens (NFT) represent ownership of indivisible assets (e.g. artwork).

###### What is Token Program?

The Token Program contains all the instruction logic for interacting with tokens on the network (both fungible and non-fungible). All tokens on Solana are effectively data accounts owned by the Token Program.

###### What is Mint Account?

A Mint Account represents a specific type of token and stores global metadata about the token such as the total supply and mint authority (address authorized to create new units of a token).

Tokens on Solana are uniquely identified by the address of a Mint Account owned by the Token Program. This account is effectively a global counter for a specific token

###### What is Token Account?

A Token Account keeps track of individual ownership of how many units of a specific type of token (mint account) are owned by a specific address.

###### What is Token Extensions Program (Token2022)?

There are currently two versions of the Token Program. The original Token Program and the Token Extensions Program (Token2022). The Token Extensions Program functions the same as the original Token Program, but with additional features and improvements. The Token Extensions Program is the recommended version to use for creating new tokens (mint accounts)

###### What is Associated Token Account?

Associated Token Account is a Token Account created with an address derived from the owner's and mint account's addresses.

#### Token Program

You can find the full list of Token Program instructions [here](https://github.com/solana-labs/solana-program-library/blob/b1c44c171bc95e6ee74af12365cb9cbab68be76c/token/program/src/instruction.rs).

###### What there are Token Program commonly used instructions?

- `InitializeMint`: Create a new mint account to represent a new type of token.
- `InitializeAccount`: Create a new token account to hold units of a specific type of token (mint).
- `MintTo`: Create new units of a specific type of token and add them to a token account. This increases the supply of the token and can only be done by the mint authority of the mint account.
`- Transfer`: Transfer units of a specific type of token from one token account to another.

###### What is `InitializeMint` Token Program instruction used for?

`InitializeMint`: Create a new mint account to represent a new type of token.

###### What is `InitializeAccount` Token Program instruction used for?

`InitializeAccount`: Create a new token account to hold units of a specific type of token (mint).

###### What is `MintTo` Token Program instruction used for?

`MintTo`: Create new units of a specific type of token and add them to a token account. This increases the supply of the token and can only be done by the mint authority of the mint account.

###### What is `Transfer` Token Program instruction used for?

`Transfer`: Transfer units of a specific type of token from one token account to another.

##### Mint Account

###### Which data stores Mint Account?

- Supply: Total supply of the token
- Decimals: Decimal precision of the token
- Mint authority: The account authorized to create new units of the token, thus increasing the supply
- Freeze authority: The account authorized to freeze tokens from being transferred from "token accounts"

```rust
pub struct Mint {
    /// Optional authority used to mint new tokens. The mint authority may only
    /// be provided during mint creation. If no mint authority is present
    /// then the mint has a fixed supply and no further tokens may be
    /// minted.
    pub mint_authority: COption<Pubkey>,
    /// Total supply of tokens.
    pub supply: u64,
    /// Number of base 10 digits to the right of the decimal place.
    pub decimals: u8,
    /// Is `true` if this structure has been initialized
    pub is_initialized: bool,
    /// Optional authority to freeze token accounts.
    pub freeze_authority: COption<Pubkey>,
}
```

##### Token Account

###### What data stores Token Account?

The most commonly referenced data stored on the Token Account include the following:

- Mint: The type of token the Token Account holds units of
- Owner: The account authorized to transfer tokens out of the Token Account
- Amount: Units of the token the Token Account currently holds

```rust
pub struct Account {
    /// The mint associated with this account
    pub mint: Pubkey,
    /// The owner of this account.
    pub owner: Pubkey,
    /// The amount of tokens this account holds.
    pub amount: u64,
    /// If `delegate` is `Some` then `delegated_amount` represents
    /// the amount authorized by the delegate
    pub delegate: COption<Pubkey>,
    /// The account's state
    pub state: AccountState,
    /// If is_native.is_some, this is a native token, and the value logs the
    /// rent-exempt reserve. An Account is required to be rent-exempt, so
    /// the value is used by the Processor to ensure that wrapped SOL
    /// accounts do not drop below this threshold.
    pub is_native: COption<u64>,
    /// The amount delegated
    pub delegated_amount: u64,
    /// Optional authority to close the account.
    pub close_authority: COption<Pubkey>,
}
```

###### What needs For a wallet to own units of a certain token?

For a wallet to own units of a certain token, it needs to create a token account for a specific type of token (mint) that designates the wallet as the owner of the token account.

###### How many token accounts of the same type can a wallet have?

A wallet can create multiple token accounts for the same type of token, but each token account can only be owned by one wallet and hold units of one type of token.

##### Associated Token Account

###### What is Associated Token Account?

An Associated Token Account is a token account whose address is deterministically derived using the owner's address and the mint account's address. You can think of the Associated Token Account as the "default" token account for a specific mint and owner.



###### Is a Associated Token Account a different type of token account?

It's important to understand that an Associated Token Account isn't a different type of token account. It's just a token account with a specific address.

###### What are Associated Token Accounts is used for?

To simplify the process of locating a token account's address for a specific mint and owner, we often use Associated Token Accounts.

```ts
// client/client.ts

import { PublicKey } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const USDC_MINT_ADDRESS = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);
const OWNER_ADDRESS = new PublicKey(
  "3jkL1nGA2vin3Radry1D4UGf4Wp9aTwu9HjoUick9tHA"
);

const [PDA, bump] = PublicKey.findProgramAddressSync(
  [
    OWNER_ADDRESS.toBuffer(),
    TOKEN_PROGRAM_ID.toBuffer(),
    USDC_MINT_ADDRESS.toBuffer(),
  ],
  ASSOCIATED_TOKEN_PROGRAM_ID
);

console.log(
  "Associated Token Account:",
  `https://explorer.solana.com/address/${PDA.toString()}`
);
```