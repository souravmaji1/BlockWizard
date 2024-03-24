import { Box,Button,Input,Select } from '@chakra-ui/react'
import {
  AppShell,
  Sidebar,
  SidebarSection,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  PersonaAvatar,
  NavGroup,
  SearchInput,
} from '@saas-ui/react'
import { FiHome, FiUsers, FiSettings,FiHelpCircle } from 'react-icons/fi'
import UploadPage from '../components/Chart';
import Charts from '../components/Bar';
import {
  Badge,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import {  FiPlus} from 'react-icons/fi'
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { FaVoteYea } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import Mainlogo from '../public/images/block.png'
import Image from 'next/image';
import Link from 'next/link';
import { ethers } from 'ethers';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Days_One } from 'next/font/google';

const daysone = Days_One({ subsets: ['latin'],weight:'400' });


export default function Page() {
  const router = useRouter();
  const isNavItemActive = (href) => router.pathname === href;

  const [contractAddress, setContractAddress] = useState('');
  const [abi, setAbi] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState('');
  const [functionInputs, setFunctionInputs] = useState({});
  const [transactionHash, setTransactionHash] = useState('');
  const [provider, setProvider] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionLink, setTransactionLink] = useState('');
 
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  useEffect(() => {
    const getAbi = async () => {
      try {
        const etherscanApiKey = 'XB61QPDHJQA19IXP8TEEUJ83YTS4NY5BRH';
        const abiResponse = await axios.get(`https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${etherscanApiKey}`);
        
        if (abiResponse.data.status === '1') {
          const contractABI = JSON.parse(abiResponse.data.result);
          setAbi(contractABI);
        } else {
          console.error('Error in response:', abiResponse.data.message);
        }
      } catch (error) {
        console.error('Error fetching ABI:', error);
      }
    };

    if (contractAddress) {
      getAbi();
    }
  }, [contractAddress]);

  const handleContractAddressChange = (event) => {
    const address = event.target.value;
    setContractAddress(address);
  };

  const handleInputChange = (event, paramName) => {
    const value = event.target.value;
    setFunctionInputs((prevState) => ({
      ...prevState,
      [paramName]: value,
    }));
  };

  const executeTransaction = async () => {
    try {
      const functionAbi = abi.find((item) => item.name === selectedFunction);
      const functionInputsEncoded = ethers.utils.defaultAbiCoder.encode(functionAbi.inputs, Object.values(functionInputs));

      const tx = await contractInstance[functionAbi.name](...Object.values(functionInputsEncoded), {
        gasLimit: 500000,
      });

      setTransactionHash(tx.hash);
    } catch (error) {
      console.error('Error executing transaction:', error);
    }
  };

  const isFunctionPayable = (functionAbi) => {
    return functionAbi.stateMutability === 'payable';
  };

  const execute = async () => {
    try {
      // Generate the transaction link here
      const link = `http://localhost:3000/transaction?contractAddress=${contractAddress}&functionName=${selectedFunction}&paymentMethod=${paymentMethod}`;
      setTransactionLink(link);
    } catch (error) {
      console.error('Error executing transaction:', error);
    }
  };



  return (
    <AppShell
      variant="static"
      borderColor='rgba(255,255,255,0.08)'
      background="#1D2025"
      minH="$100vh"
      navbar={
        <Navbar borderBottomWidth="1px" position="sticky" top="0" background="#1D2025" borderColor='rgba(255,255,255,0.08)'  >
          <NavbarBrand>
          <Image style={{width:"136px",marginTop:"17px",display:"flex"}} src={Mainlogo} />
          </NavbarBrand>
          <NavbarContent justifyContent="flex-end">
            <NavbarItem>
       
              <SearchInput borderColor='rgba(255,255,255,0.08)'  size="sm" />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      }
      sidebar={
        <Sidebar position="sticky" top="56px" toggleBreakpoint="sm" bg="1D2025" borderColor='rgba(255,255,255,0.08)'>
          <SidebarSection  >
         
          <NavGroup>
              <NavItem color='gray'  href='/' icon={<FiHome color='gray' />} 
              isActive={isNavItemActive('/')}
              >
                Home
              </NavItem>
              
              <NavItem color='gray'  href='/profile' icon={<MdEventAvailable color='gray' />}
              isActive={isNavItemActive('/profile')}
              >Deploy</NavItem>
              <NavItem color='gray'  href='/event'  icon={<FiPlus color='gray'  />}
              isActive={isNavItemActive('/event')}
              >Automate</NavItem>
            </NavGroup>

            <NavGroup title="Contract" isCollapsible>
            <NavItem color='gray' href='/startvoting' icon={<FaVoteYea color='gray' />}
              isActive={isNavItemActive('/startvoting')}
              >Create Page</NavItem>
              <NavItem color='gray'  href='/requestvote' icon={<GiReceiveMoney color='gray' />}
              isActive={isNavItemActive('/requestvote')}
              >Notification</NavItem>
            </NavGroup>

         
            
             
             

          


          </SidebarSection>
          <SidebarSection flex="1" overflowY="auto"></SidebarSection>
          <SidebarSection>
            <NavItem href='/sdk'color='gray' icon={<FiHelpCircle color='gray' />}>SDK Documentation</NavItem>
         
          </SidebarSection>
        </Sidebar>
      }
    >
      <Box as="main" flex="1" py="2" px="4">

      <Text borderColor='rgba(255,255,255,0.08)'  style={{ color:'white',display: 'flex', alignItems: 'center', gap: '10px', borderBottomWidth: '1px', marginBottom: '30px', padding: '10px' }}>
      <FaVoteYea style={{fontSize:'30px',color:'white'}} /> Contract Setup
</Text>



      <Box
      borderColor='rgba(255,255,255,0.08)'
      style={{
        padding: '2rem',
        maxWidth: '66rem',
        margin: 'auto',
        width: '-webkit-fill-available',
      }}
      borderWidth="1px" 
      borderRadius="md"
      >
         <h1  className={daysone.className}  style={{ color: 'gray', marginBottom: '1rem', textAlign: 'center' ,fontSize:'30px',fontWeight:'700', color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            width: '100%',
            background: '#07a5b5' }}>CREATE YOUR WEB3 PAGE</h1>
           
  <Input
  borderColor='rgba(255,255,255,0.08)'
    type="text"
    placeholder="Enter contract address"
    value={contractAddress}
    onChange={handleContractAddressChange}
    mb={4} // Add margin-bottom for spacing
  />
  {abi.length > 0 && (
    <>
    <Text>Select Function:</Text>
    <Select
      value={selectedFunction}
      onChange={(e) => setSelectedFunction(e.target.value)}
      mb={4} // Add margin-bottom for spacing
    >
      <option value="" disabled>
        Select a function
      </option>
      {abi.map((item) =>
        item.type === 'function' ? (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ) : null
      )}
    </Select>
    </>
  )}
 
  {selectedFunction && (
    <>
      <Text>Select Payment Method:</Text>
      <Select value={paymentMethod} onChange={handlePaymentMethodChange} mb={4}>
        <option value="">Select Payment Method</option>
        <option value="crypto">Crypto</option>
        <option value="creditCard">Credit Card</option>
      </Select>
      {/* Add additional UI components as needed */}
    </>
  )}
 
    <Button
      as="button"
      onClick={execute}
      mt={1} // Add margin-top for spacing
      mb={4}
      width="-webkit-fill-available"
    >
      Execute Transaction
    </Button>

    {transactionLink && (
            <Link href={transactionLink}>
              <Text style={{ color: '#ffffff', background: '#282c34', padding: '15px', borderRadius: '8px', overflowX: 'auto' }}  fontSize="20px">{transactionLink}</Text>
            </Link>
          )}
  {transactionHash && <Text mt={4}>Transaction Hash: {transactionHash}</Text>}
</Box>

      </Box>
    </AppShell>
  )
}