# Blockchain

###### What is Blockchain?

A blockchain is a distributed ledger with growing lists of records (blocks) that are securely linked together via cryptographic hashes. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data (generally represented as a Merkle tree, where data nodes are represented by leaves). Since each block contains information about the previous block, they effectively form a chain (compare linked list data structure), with each additional block linking to the ones before it. Consequently, blockchain transactions are resistant to alteration because, once recorded, the data in any given block cannot be changed retroactively without altering all subsequent blocks and obtaining network consensus to accept these changes. This protects blockchains against nefarious activities such as creating assets "out of thin air", double-spending, counterfeiting, fraud, and theft.

###### what is Distributed ledger

A distributed ledger (also called a shared ledger or distributed ledger technology or DLT) is a system whereby replicated, shared, and synchronized digital data is geographically spread (distributed) across many peer. In contrast to a centralized database, a distributed ledger does not require a central administrator, and consequently does not have a single (central) point-of-failure

###### How maintained  "Data quality" in in a decentralized blockchain system?

- Massive database replication. Every node in a decentralized system has a copy of the blockchain.
- Computational trust - generation of trusted authorities or user trust through cryptography
- No centralized "official" copy exists and no user is "trusted" more than any other

###### What is Record?

In computer science, a record is a composite data structure – a collection of fields, possibly of different data types, typically fixed in number and sequence.

###### What is Cryptographic Hash?

Cryptographic hash is hash function calculation result that takes a string of any length as input and produce a fixed-length hash value.

###### What is Peer-To-Peer computer network?

Peer-to-peer (P2P) computing or networking is a distributed application architecture that partitions tasks or workloads between peers. Peers are equally privileged, equipotent participants in the network, forming a peer-to-peer network of nodes.

###### What is Merkle tree?

In cryptography and computer science, a hash tree or Merkle tree is a tree in which every "leaf" node is labelled with the cryptographic hash of a data block, and every node that is not a leaf (called a branch, inner node, or inode) is labelled with the cryptographic hash of the labels of its child nodes. A hash tree allows efficient and secure verification of the contents of a large data structure. A hash tree is a generalization of a hash list and a hash chain.

###### What is "51% attack"?

In a so-called "51% attack" a central entity gains control of more than half of a network and can then manipulate that specific blockchain record at will, allowing double-spending

###### How public-key cryptography used in blockchain?

A public key (a long, random-looking string of numbers) is an address on the blockchain. Value tokens sent across the network are recorded as belonging to that address. A private key is like a password that gives its owner access to their digital assets or the means to otherwise interact with the various capabilities that blockchains now support.

###### What is Proof of work?

In context of blockchain Prof of work is consensus mechanisms.

Proof of work (also written as proof-of-work, an abbreviated PoW) is a form of cryptographic proof in which one party (the prover) proves to others (the verifiers) that a certain amount of a specific computational effort has been expended. Verifiers can subsequently confirm this expenditure with minimal effort on their part.

The purpose of proof-of-work algorithms is not proving that certain work was carried out or that a computational puzzle was "solved", but deterring manipulation of data by establishing large energy and hardware-control requirements to be able to do so

###### What is Proof of stake?

Proof-of-stake (PoS) protocols are a class of consensus mechanisms for blockchains that work by selecting validators in proportion to their quantity of holdings in the associated cryptocurrency. This is done to avoid the computational cost of proof-of-work (POW) schemes.

###### What is blockchain consensus mechanism?

For a blockchain block to be recognized, it must be appended to the blockchain. Before appending, there must be agreement or consensus between nodes about it correctness. This consensus achieved in various ways that called "consensus mechanism"

###### What are the consensus mechanisms?

There are some consensus mechanisms, the main ones being:

- Proof of stake, proof-of-stake (PoS)
- Proof of work, proof-of-work (PoW)

###### What difference between PoS and PoW.

For a blockchain transaction to be recognized, it must be appended to the blockchain. Before appending must be completed validation that must bi accepted all peer of network. In blockchain validating and appending transaction accomplished by entities are named minters or validators, the validators receive a reward for doing so. For the blockchain to remain secure, it must have a mechanism to prevent a malicious user or group from taking over a majority of validation. PoS accomplishes this by requiring that validators have some quantity of blockchain tokens, requiring potential attackers to acquire a large fraction of the tokens on the blockchain to mount an attack. Proof of work (PoW), uses a validation of computational prowess to verify transactions, requiring a potential attacker to acquire a large fraction of the computational power of the validator network.

###### How are dominant designs of PoS?

- Byzantine fault tolerance-based. BFT-based PoS.
  a randomly chosen validator proposes a block, the rest of validators vote on it, and, if a supermajority decision approves it, the block is irreversibly committed into the blockchain
  The outline of the BFT PoS "epoch" (adding a block to the chain) is as follows:

  1. A "proposer" with a "proposed block" is randomly selected by adding it to the temporary pool used to select just one consensual block;
  2. The other participants, validators, obtain the pool, validate, and vote for one;
  3. The BFT consensus is used to finalize the most-voted block.
  The scheme works as long as no more than a third of validators are dishonest. BFT schemes are used in Tendermint and Casper FFG.
- chain-based
  This is essentially a modification of the PoW scheme, where the competition is based not on applying brute force to solving the identical puzzle in the smallest amount of time, but instead on varying the difficulty of the puzzle depending on the stake of the participant. The smaller amount of calculations required for solving the puzzle for high-value stakeholders helps to avoid excessive hardware.

###### How are Attacks is in PoS based blockchains?

- Long-range attacks. The low amount of computing power involved allows a class of attacks that replace a non-negligible portion of the main blockchain with a hijacked version. If the per-block and per-transaction rewards are offered, the malicious group can, for example, redo the entire history and collect these rewards.
- Nothing at stake. Since validators do not need to spend a considerable amount of computing power (and thus money) on the process, they are prone to the Nothing-at-Stake attack: the participation in a successful validation increases the validator's earnings, so there is a built-in incentive for the validators to accept all chain forks submitted to them, thus increasing the chances of earning the validation fee.
- Bribery attack. Bribery attack, where the attackers financially induce some validators to approve their fork of blockchain, is enhanced in PoS, as rewriting a large portion of history might enable the collusion of once-rich stakeholders that no longer hold significant amounts at stake to claim a necessary majority at some point back in time, and grow the alternative blockchain from there, an operation made possible by the low computing cost of adding blocks in the PoS scheme

###### What is Sybil attack?

A Sybil attack is a type of attack on a computer network service in which an attacker subverts the service's reputation system by creating a large number of pseudonymous identities and uses them to gain a disproportionately large influence.

An entity on a peer-to-peer network is a piece of software that has access to local resources. An entity advertises itself on the peer-to-peer network by presenting an identity. More than one identity can correspond to a single entity. In other words, the mapping of identities to entities is many to one. Entities in peer-to-peer networks use multiple identities for purposes of redundancy, resource sharing, reliability and integrity. In peer-to-peer networks, the identity is used as an abstraction so that a remote entity can be aware of identities without necessarily knowing the correspondence of identities to local entities. By default, each distinct identity is usually assumed to correspond to a distinct local entity. In reality, many identities may correspond to the same local entity.

An adversary may present multiple identities to a peer-to-peer network in order to appear and function as multiple distinct nodes. The adversary may thus be able to acquire a disproportionate level of control over the network, such as by affecting voting outcomes.

In the context of (human) online communities, such multiple identities are sometimes known as sockpuppets. The less common term inverse-Sybil attack has been used to describe an attack in which many entities appear as a single identity.

###### What is Cryptocurrencies?

Most cryptocurrencies use blockchain technology to record transactions.

###### What is DeFi?

Decentralized finance (often stylized as DeFi) provides financial instruments and services through smart contracts on a programmable, permissionless blockchain.

###### Whai is NFT?

A non-fungible token (NFT) is a unique digital identifier that is recorded on a blockchain and is used to certify ownership and authenticity. It cannot be copied, substituted, or subdivided. The ownership of an NFT is recorded in the blockchain and can be transferred by the owner, allowing NFTs to be sold and traded.

## Blocks

###### What is blocks?

Blocks hold batches of valid transactions that are hashed and encoded into a Merkle tree. Each block includes the cryptographic hash of the prior block in the blockchain, linking the two. The linked blocks form a chain. This iterative process confirms the integrity of the previous block, all the way back to the initial block, which is known as the genesis block (Block 0). To assure the integrity of a block and the data contained in it, the block is usually digitally signed.

###### What is Fork (blockchain)?

Forks are separate parallel blocks or chains of blocks that exist simultaneously on different peer.

###### How do Forks arise?

Fork happens when two or more peer find a block at nearly the same time. This can happen accidental and intentional as a result of the adoption and application of different blockchain rules by individual nodes or group of nodes, what leads to the emergence different blockchains.

###### What should a blockchain do with forks?

Peers supporting the database have different versions of the history from time to time. Any blockchain must have a algorithm for scoring different versions of the history so that one with a higher score can be selected over others. Peeps keep only the highest-scoring version of the database known to them. Whenever a peer receives a higher-scoring version (usually the old version with a single new block added) they extend or overwrite their own database and retransmit the improvement to their peers.

###### What is orphaned blocks?

Sometimes separate blocks can be produced concurrently, creating a temporary fork. In addition to a secure hash-based history, any blockchain has a specified algorithm for scoring different versions of the history so that one with a higher score can be selected over others. Blocks not selected for inclusion in the chain are called orphan blocks.

###### What is Block time?

The block time is the average time it takes for the network to generate one extra block in the blockchain. By the time of block completion, the included data becomes verifiable. In cryptocurrency, this is practically when the transaction takes place, so a shorter block time means faster transactions.

###### What is Hard forks?

A hard fork is a change to the blockchain protocol that is not backward compatible and requires all users to upgrade their software in order to continue participating in the network. In a hard fork, the network splits into two separate versions: one that follows the new rules and one that follows the old rules.

###### What is Finality?

Finality is the level of confidence that the well-formed block recently appended to the blockchain will not be revoked in the future (is "finalized") and thus can be trusted. Most distributed blockchain protocols, whether proof of work or proof of stake, cannot guarantee the finality of a freshly committed block, and instead rely on "probabilistic finality": as the block goes deeper into a blockchain, it is less likely to be altered or reverted by a newly found consensus.

###### How is Finality of BFT-based PoS?

Byzantine fault tolerance-based proof-of-stake protocols purport to provide so called "absolute finality": a randomly chosen validator proposes a block, the rest of validators vote on it, and, if a supermajority decision approves it, the block is irreversibly committed into the blockchain.

## Cryptography

###### What is Public-key cryptography?

Public-key cryptography, or asymmetric cryptography, is the field of cryptographic systems that use pairs of related keys. Each key pair consists of a public key and a corresponding private key. Key pairs are generated with cryptographic algorithms based on mathematical problems termed "one-way functions". Security of public-key cryptography depends on keeping the private key secret; the public key can be openly distributed without compromising security. There are many kinds of public-key cryptosystems, with different security goals, including "digital signature", "Diffie–Hellman key exchange", "public-key key encapsulation", and "public-key encryption".

###### What is "One-way function"?

In computer science, a one-way function is a function that is easy to compute on every input, but hard to invert given the image of a random input.

## Smart contracts

###### What is Smart contract?

A smart contract is a computer program or a transaction protocol that is intended to automatically execute, control or document events and actions according to the terms of a contract or an agreement. The objectives of smart contracts are the reduction of need for trusted intermediators, arbitration costs, and fraud losses, as well as the reduction of malicious and accidental exceptions. Smart contracts are commonly associated with cryptocurrencies, and the smart contracts introduced by Ethereum are generally considered a fundamental building block for decentralized finance (DeFi) and non-fungible token (NFT) applications.

###### How Smart contracts working?

Similar to a transfer of value on a blockchain, deployment of a smart contract on a blockchain occurs by sending a transaction from a wallet for the blockchain. The transaction includes the compiled code for the smart contract as well as a special receiver address. That transaction must then be included in a block that is added to the blockchain, at which point the smart contract's code will execute to establish the initial state of the smart contract. Byzantine fault-tolerant algorithms secure the smart contract in a decentralized way from attempts to tamper with it. Once a smart contract is deployed, it cannot be updated. Smart contracts on a blockchain can store arbitrary state and execute arbitrary computations. End clients interact with a smart contract through transactions. Such transactions with a smart contract can invoke other smart contracts. These transactions might result in changing the state and sending coins from one smart contract to another or from one account to another.

###### What is Cryptocurrency wallet?

A cryptocurrency wallet is a device, physical medium, program or an online service which stores the public and/or private keys for cryptocurrency transactions. In addition to this basic function of storing the keys, a cryptocurrency wallet more often offers the functionality of encrypting and/or signing information. Signing can for example result in executing a smart contract, a cryptocurrency transaction (see "bitcoin transaction" image), identification, or legally signing a 'document' (see "application form" image).
