# SOLANA

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

#### Account Type

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

#### Rent

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

#### Program Owner

###### What is the name of "Smart Contract" in Solana?

On Solana, "smart contracts" are referred to as "programs".

###### Who owns the Account?

Every account has a designated program as its owner.

###### What whit Account can do only the owner program?

- Modify the account's data field
- Deduct lamports from the account's balance