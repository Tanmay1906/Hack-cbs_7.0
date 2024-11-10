const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner } = require('@taquito/signer');
const fs = require('fs');

// Set up Tezos toolkit with the Ghostnet RPC URL and your private key
const Tezos = new TezosToolkit('https://rpc.ghostnet.teztnets.com');
Tezos.setProvider({ signer: new InMemorySigner('edskRjMDLmdx7gdT67MJFcJ83PtumBnEbwWXxiLcY5Yd5nUFWk3cSAGRM1Tm9y437w2rM85s6HAPZwqjbrgGGxCo5eM7gqtMjG') });

const deployContract = async () => {
  // Use absolute path to read the compiled contract code
  const contractCode = fs.readFileSync('../../contracts/compiled/contract.tz', 'utf8');
  
  // Define the initial storage
  const storage = {
    incidents: {},
    evidences: {},
    incidentCounter: 0,
    evidenceCounter: 0
  };

  try {
    // Deploy the contract
    const op = await Tezos.contract.originate({
      code: contractCode,
      storage: storage,
    });
    console.log(`Waiting for confirmation of ${op.hash}...`);
    await op.confirmation();
    console.log(`Contract deployed at: ${op.contractAddress}`);
  } catch (error) {
    console.error(`Error deploying contract: ${error}`);
  }
};

deployContract();
