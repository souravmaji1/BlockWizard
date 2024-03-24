import { Box, Input, Button, Flex,List ,ListItem, VStack} from '@chakra-ui/react'
import {
  Stack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Menu, MenuButton, IconButton, MenuList } from '@chakra-ui/react'
import {
  AppShell,
  Sidebar,
  SidebarSection,
  FormLayout,
  NavItem,
  Form,
  Navbar,
  NavbarBrand,
  PersonaAvatar,
  NavbarContent,
  NavbarItem,
  NavGroup,
  Field,
  SearchInput,
} from '@saas-ui/react'
import { FiHome, FiUsers, FiSettings,FiHelpCircle,FiPlus, FiClock } from 'react-icons/fi'
import { FaTicket, FaDollarSign } from "react-icons/fa6";
import {
  Badge,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { ethers } from "ethers";
import { useState , useEffect} from 'react';

import { QrReader } from 'react-qr-reader';
import QRCode from 'qrcode.react';
import { FaVoteYea } from "react-icons/fa";
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import VoteImage from '../public/images/vote.png'
import Image from 'next/image';
import { GiReceiveMoney } from "react-icons/gi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdEventAvailable } from "react-icons/md";
import Mainlogo from '../public/images/block.png'
import { Days_One } from 'next/font/google';

const daysone = Days_One({ subsets: ['latin'],weight:'400' });

export default function Page() {
    const router = useRouter();
    const isNavItemActive = (href) => router.pathname === href;
    

    const [status, setStatus] = useState('Not Connected');
    const [account, setAccount] = useState('');

    const [smartContractSource, setSmartContractSource] = useState('');
    const [network, setNetwork] = useState('mumbai'); // Default to mainnet
    const [loading, setLoading] = useState(false);
    const [contractAddress, setContractAddress] = useState('');
  
    const deployContract = async () => {
      try {
        setLoading(true);
        // Compile the Solidity contract on the server
        const response = await fetch('https://smartcontractx.onrender.com/smart-contract', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contractCode: smartContractSource }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          console.error(data.error);
          return;
        }
  
        // Deploy the compiled contract using MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        // Create a contract factory using the ABI and bytecode
        const factory = new ethers.ContractFactory(data.abi, data.bytecode, signer);
  
        // Deploy the contract
        const deployedContract = await factory.deploy();
        await deployedContract.deployed();
  
        setContractAddress(deployedContract.address);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

   
 


  
 //const filteredEventDetail = data.find(eventDetail => eventDetail.tokenId.toString() === tokenId);
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




  
 

  return (
    <AppShell
      variant="static"
      height="100vh"
      borderColor='rgba(255,255,255,0.08)'
      background="#1D2025"
      navbar={
        <Navbar borderBottomWidth="1px" position="sticky" top="0"  borderColor='rgba(255,255,255,0.08)' >
          <NavbarBrand>
          <NavbarBrand>
          <Image style={{width:"136px",marginTop:"17px",display:"flex"}} src={Mainlogo} />
          </NavbarBrand>
          </NavbarBrand>
          <NavbarContent justifyContent="flex-end">
            <NavbarItem>

            <Menu>
              <MenuButton
                as={IconButton}
                icon={
                  <PersonaAvatar
                    presence="online"
                    size="xs"
                    src="/showcase-avatar.jpg"
                  />
                }
                variant="ghost"
              />
              <MenuList>
              {status !== 'Connected' && (
        <Button
          variant="contained"
          color="primary"
          onClick={connectWallet}
          style={{ margin: '20px auto',fontFamily:'__Days_One_cad049',background:'#ff5200',display:'flex' }}
        >
          Connect Wallet
        </Button>
      )}

{status === 'Connected' && (
        <Button
        variant="outlined"
        color="secondary"
        onClick={disconnectWallet}
        style={{ margin: '10px auto',fontFamily:'__Days_One_cad049',display:'flex',color:'#ff5200',border:'2px solid #ff5200' }}
      >
        Disconnect Wallet
      </Button>
      )}
              </MenuList>
            </Menu>




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
            <NavItem href='/sdk'  color='gray' icon={<FiHelpCircle color='gray' />}>Documentation</NavItem>
         
          </SidebarSection>
        </Sidebar>
      }
    >

<Box as="main" flex="1" py="2" px="4" overflowY="scroll">

<Text borderColor='rgba(255,255,255,0.08)'   style={{color:'white', display: 'flex', alignItems: 'center', gap: '10px', borderBottomWidth: '1px', marginBottom: '30px', padding: '10px' }}>
  <FaVoteYea style={{fontSize:'30px',color:'white'}} /> Contract Deployment
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
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '20px', color: 'white', fontWeight: 'medium', marginTop: '10px', marginBottom: '15px' }}>
          Smart Contract Source Code:
        </p>
        <textarea
          rows="8"
          
          
          value={smartContractSource}
          onChange={(e) => setSmartContractSource(e.target.value)}
          placeholder="Enter your smart contract source code here..."
          style={{
            width: '100%',
            color:'white',
            borderWidth:'2px',
            borderRadius: '4px',
            padding: '8px',
            borderColor: 'rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.08)',
          }}
        />
      </div>
    
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '20px', color: 'white', fontWeight: 'medium', marginTop: '10px', marginBottom: '15px' }}>
          Select Network:
        </p>
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.08)',
            borderColor: 'rgba(255,255,255,0.08)',
            borderWidth:"1px",
            borderRadius: '4px',
            padding: '8px',
          }}
        >
          
          <option value="mumbai" style={{color:'white'}}>Mumbai</option>
        </select>
      </div>
   
      <button
        onClick={deployContract}
        style={{
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '16px',
          width: '100%',
          background: '#07a5b5',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
        disabled={loading}
      >
        {loading ? 'Deploying...' : 'Deploy Contract'}
      </button>
      {contractAddress && (
        <div style={{ marginTop: '1rem' }}>
          
          <p    style={{ color: '#ffffff', background: '#282c34', padding: '15px', borderRadius: '8px', overflowX: 'auto',fontSize: '14px', color: 'white' }} >
            Contract Address: {contractAddress}
          </p>
        </div>
      )}
    </Box>

</Box>



    
    </AppShell>
  )
}