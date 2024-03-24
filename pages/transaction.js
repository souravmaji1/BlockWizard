import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import BlockWizard from 'blockwizard';
import { ethers } from 'ethers';
import { Button,Box, Input } from '@chakra-ui/react';
import Mainlogo from '../public/images/wizard.png'
import Image from 'next/image';

const TransactionPage = () => {
  const [abi, setAbi] = useState([]);
  const [functionInputs, setFunctionInputs] = useState({});
  const [transactionHash, setTransactionHash] = useState('');
  const router = useRouter();
  const { contractAddress, functionName, paymentMethod } = router.query;
  const [address, setAddress] = useState("");

  const [status, setStatus] = useState('Not Connected');
  const [account, setAccount] = useState('');

  const sdk = new BlockWizard();

  useEffect(() => {
    const fetchAbi = async () => {
      try {
        const etherscanApiKey = 'XB61QPDHJQA19IXP8TEEUJ83YTS4NY5BRH';
        const abiResponse = await axios.get(`https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${etherscanApiKey}`);

        const contractABI = JSON.parse(abiResponse.data.result);
        setAbi(contractABI);
      } catch (error) {
        console.error('Error fetching ABI:', error);
      }
    };

    if (contractAddress) {
      fetchAbi();
    }
  }, [contractAddress]);

  console.log(contractAddress);

  const executePayment = async () => {
    try {
      if (paymentMethod === 'creditCard') {
        // Call the credit card payment function
        await creditcardPayment();
      } else if (paymentMethod === 'crypto') {
        // Call the crypto payment function
        await cryptoPayment();
      }
    } catch (error) {
      console.error('Error executing payment:', error);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        handleAccountsChanged(accounts);
        window.ethereum.on('accountsChanged', handleAccountsChanged);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };
  
  const disconnectWallet = () => {
    setAccount('');
    setStatus('Not Connected');
  };
  
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
      setStatus('Connected');
    }
  };
  


 const cryptoPayment = async () => {
    try {

     const provider = new ethers.providers.Web3Provider(window.ethereum);

      const functionAbi = abi.find((item) => item.name === functionName);
      const functionInputsEncoded = ethers.utils.defaultAbiCoder.encode(
        functionAbi.inputs,
        Object.values(functionInputs)
      );
  
      // Get contract instance
      const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
  
      // Make the function call
      const result = await contract[functionAbi.name](...Object.values(functionInputs));
  
      // Update state with result
      console.log('Function call result:', result);
  
    } catch (error) {
      console.error('Error executing function call:', error);
    }
  };

  const handleInputChange = (event, paramName) => {
    const value = event.target.value;
    setFunctionInputs((prevState) => ({
      ...prevState,
      [paramName]: value,
    }));
  };

  const creditcardPayment = async () => {
    try {
      const argumentValues = Object.values(functionInputs);
      const pay = await sdk.callWriteFunctionWithRazorpay(contractAddress,abi,functionName,100,undefined,argumentValues);
      console.log(pay);
    } catch (error) {
      console.log(error)
    }
  }

 

  return (
    <Box textAlign="center" margin="30px auto" width="70%" padding="20px" borderRadius="10px" borderWidth="1px">
    {paymentMethod === "crypto" && (
      <>
        {status !== "Connected" && (
          <Button
            variant="contained"
            colorScheme="orange"
            onClick={connectWallet}
            margin="20px auto"
          >
            Connect Wallet
          </Button>
        )}

        {status === "Connected" && (
          <Button
            variant="outline"
            colorScheme="red"
            onClick={disconnectWallet}
            margin="10px auto"
          >
            Disconnect Wallet
          </Button>
        )}
      </>
    )}

    {abi.length > 0 && (
      <Box>
        <h2>Function Name: {functionName}</h2>
        <Image src={Mainlogo} style={{height:"43vh",width:"42vh",margin:"30px auto",background:'black', borderRadius:'10px'}} />
        {abi.find((item) => item.name === functionName).inputs.map((param, index) => (
          <>
          <Input
            key={index}
            type="text"
            placeholder={param.name}
            onChange={(e) => handleInputChange(e, param.name)}
            marginBottom="4"
          />
          </>
        ))}
        <Button colorScheme="blue" onClick={executePayment} marginBottom="4">
          Execute Transaction
        </Button>
        {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
      </Box>
    )}
  </Box>
  );
};

export default TransactionPage;