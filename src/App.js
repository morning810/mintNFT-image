import React, { useState } from 'react';
import Web3 from 'web3';
import NFTContractABI from './Lock.json';

// 0x07374dF25C853De44fdD3D13d568971cFa4691E1 // contract address

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
                const contract = await new web3.eth.Contract(NFTContractABI, '0x07374dF25C853De44fdD3D13d568971cFa4691E1');
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
          {
            !account ?
            <button onClick={connectWallet}>Connect Wallet</button>
            :
            <div>
              <label for="imageUpload">Upload Image:</label>
              <input type="file" id="imageUpload" accept="image/*"/>
              <label for="nftText">NFT Text:</label>
              <input type="text" id="nftText"/>
              <button onClick={mintNFT}>Mint</button>
            </div>
          }
        </div>
    );
};

export default NFTMinter;
