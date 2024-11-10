# Triage-O-Matic using Blockchain

## Overview
Triage-O-Matic is a decentralized, blockchain-based cyber triage tool with advanced AI/ML capabilities for automated analysis and anomaly detection. The tool is designed to store **evidence hashes**, **analysis results**, and **case metadata securely** utilizing a consensus mechanism like Proof of Authority, suitable for high-security environments. It includes a triage tool that offers a user-friendly interface for investigators, allowing them to interact with the blockchain to store and retrieve evidence efficiently.


## Prerequisites

- Python 3.x
- Flask
- WSL (Ubbantu or Linux)
- Tezos client
- Node.js

## Languages Used

- **HTML**: 34.3%
- **Python**: 25.9%
- **CSS**: 25.4%
- **JavaScript**: 12.5%
- **Solidity**: 1.9%

## Setup and Installation

To get started with this project, clone the repository and follow the instructions below:

```bash
git clone https://github.com/Tanmay1906/Triage-O-matic__Tezos.git
cd Triage-O-matic__Tezos
```

**1. Create Virtual Environment:**
```bash
#in WSL
python3 -m venv venv
source env/bin/activate  
```
**2. Install Python dependencies:**
```bash
pip install -r requirements.txt
```
**3. Run the Flask application:**
```bash
python3 app.py
```

## Deploying Smart Contracts on Tezos
**1. Install Tezos client:**
```bash
sudo apt-get update
sudo apt-get install -y tezos
```
**2. Compile the smart contracts using LIGO:**
```bash
ligo compile contract <your_contract.mligo>
```
**3. Deploy the smart contracts using Tezos client:**
```bash
tezos-client originate contract contract.tz transferring 0 from <your_account> running '<your_compiled_contract.tz>'
```

## For Demo Video and Image Link:
For a detailed demo and visual walkthrough, check out the following links:
https://drive.google.com/drive/folders/16inLdIA9e-ZGIiUaE-xAgmu5AsxNpH5w?usp=drive_link


## Key Features:
1. Secure evidence upload and storage
2. Comprehensive evidence analysis
3. Detailed chain of custody management
4. Evidence Management and Incident Overview


