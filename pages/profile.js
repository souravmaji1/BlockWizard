import { Box, Input, Button, Flex,List ,ListItem, VStack, Heading} from '@chakra-ui/react'
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

    const [loading, setLoading] = useState(false);

  
    const [nftcontract, setNftContract] = useState("");
    const [tokenid, setTokenId] = useState("");
    const [amount, setAmount] = useState('');

  
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


const BorrowUSDC = async () => {
  try {
    setLoading(true);
  
    

    // Deploy the compiled contract using MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();



    const contractaddress = "0xde920135370e98d306f782479728131eb05ee28f";
    const abi = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "stakeNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "borrowUSDC",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    // Create a contract factory using the ABI and bytecode
    const contract = new ethers.Contract(contractaddress, abi, signer);

    // Deploy the contract
    const call = await contract.stakeNFT(nftcontract, tokenid);

    console.log(call);

  

    setLoading(false);
  } catch (error) {
    console.error(error);
  }
};

const Borrow = async () => {
  try {
    setLoading(true);
  
    

    // Deploy the compiled contract using MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();



    const contractaddress = "0xde920135370e98d306f782479728131eb05ee28f";
    const abi = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "stakeNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "borrowUSDC",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    // Create a contract factory using the ABI and bytecode
    const contract = new ethers.Contract(contractaddress, abi, signer);


    const borrow = await contract.borrowUSDC(tokenid,amount);
    

    console.log(borrow);
    setLoading(false);
  } catch (error) {
    console.error(error);
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
          <h1 style={{color:'white'}}>EasySol</h1> 
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

</Box>
<Heading style={{ color: 'white' }} >Enter Contract Address</Heading>
<Input
            type="text"
            name="enter nft contract address"
            value={nftcontract}
            onChange={(e) => setNftContract(e.target.value)}
            style={{ color: 'white' }}
          />
          <Heading style={{ color: 'white' }} >Enter TokenId</Heading>
<Input
            type="text"
            style={{ color: 'white' }}
            name="enter nft tokenid"
            value={tokenid}
            onChange={(e) => setTokenId(e.target.value)}
          />
           <Heading style={{ color: 'white' }} >Enter Amount</Heading>
<Input
 style={{ color: 'white' }}
            type="text"
            name="enter amount of usdc you want"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

<Button onClick={Borrow} colorScheme="teal"  width="100%">
          Borrow Usdc
        </Button>

       



    </AppShell>
  )
}