import React, { useState } from 'react';
import Web3 from 'web3';
import NFTContractABI from './Lock.json';

// 0x2818260114E9a41015106e514c8DE2e9f8B9F92B // contract address

const NFTMinter = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await web3.eth.getAccounts();
                setWeb3(web3);
                setAccount(accounts[0]);
                const contract = await new web3.eth.Contract(NFTContractABI, '0x2818260114E9a41015106e514c8DE2e9f8B9F92B');
                console.log("=====", accounts[0]);
                setContract(contract);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask.");
        }
    };

    const mintNFT = async () => {
        if (contract) {
            try {
                await contract.methods.mintNFT().send({ from: account });
                console.log("NFT minted!");
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            {!account && (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
            {account && (
                <button onClick={mintNFT}>Mint NFT</button>
            )}
        </div>
    );
};

export default NFTMinter;
