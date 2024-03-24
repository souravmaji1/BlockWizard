import { Box, Input, Button, Flex,List ,ListItem} from '@chakra-ui/react'
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
import { FiHome, FiUsers,FiHelpCircle,FiPlus } from 'react-icons/fi'

import {
  Badge,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { ethers } from "ethers";
import { useState , useEffect} from 'react';

import { QrReader } from 'react-qr-reader';
import QRCode from 'qrcode.react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { FaVoteYea } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import Mainlogo from '../public/images/mainlogo.png'
import Image from 'next/image';
import Homepage from '../components/homepage'

export default function Page() {
    const router = useRouter();
    const isNavItemActive = (href) => router.pathname === href;

  
    const [status, setStatus] = useState('Not Connected');
    const [account, setAccount] = useState('');

    const [selectedEndDate, setSelectedEndDate] = useState("");

    const [filteredEventDetail, setFilteredEventDetail] = useState(null);

   
 

  const call = async (tokenId) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = "0x1b97aDBc93B9F9f9319C535C1AdeE3Da8EA19402";
      const contract = new ethers.Contract(contractAddress, [
        {
            "type": "function",
            "name": "withdrawFunds",
            "inputs": [
              {
                "type": "uint256",
                "name": "_eventId",
                "internalType": "uint256"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          }
      ], provider.getSigner());
      const data = await contract.withdrawFunds(tokenId);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const [data, setContractData] = useState(null);

  
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

    readContractData(accounts[0]);
    setStatus('Connected');
  }
};


const contractAddress = "0x1b97aDBc93B9F9f9319C535C1AdeE3Da8EA19402";
    const contractABI = [
        {
            "type": "function",
            "name": "getEventsCreatedByUser",
            "inputs": [
              {
                "type": "address",
                "name": "_organizer",
                "internalType": "address"
              }
            ],
            "outputs": [
              {
                "type": "tuple[]",
                "name": "",
                "components": [
                  {
                    "type": "string",
                    "name": "name",
                    "internalType": "string"
                  },
                  {
                    "type": "uint256",
                    "name": "ticketPrice",
                    "internalType": "uint256"
                  },
                  {
                    "type": "string",
                    "name": "category",
                    "internalType": "string"
                  },
                  {
                    "type": "uint256",
                    "name": "totalTickets",
                    "internalType": "uint256"
                  },
                  {
                    "type": "uint256",
                    "name": "availableTickets",
                    "internalType": "uint256"
                  },
                  {
                    "type": "uint256",
                    "name": "ticketsSold",
                    "internalType": "uint256"
                  },
                  {
                    "type": "uint256",
                    "name": "tokenId",
                    "internalType": "uint256"
                  }
                ],
                "internalType": "struct EventManagement.EventDetails[]"
              }
            ],
            "stateMutability": "view"
          }
    ];

    // Initialize ethers provider and contract
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/TLmFnCSKSQnh2uMk7iDnuyXc9fpMC_DD'); // Replace with your Ethereum node URL
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    // Example: Read a specific value from the contract
    const readContractData = async (address) => {
      try {
        const result = await contract.getEventsCreatedByUser(address);
        setContractData(result);
        console.log(result);
        setFilteredEventDetail(result);
      } catch (error) {
        console.error('Error reading contract data:', error);
      }
    };
  
 
 

  return (
    <AppShell
      variant="static"
      height="100vh"
      navbar={
        <Navbar borderBottomWidth="1px" position="sticky" top="0">
          <NavbarBrand>
          <NavbarBrand>
          <Image style={{width:"79px",marginTop:"10px",display:"flex"}} src={Mainlogo} />
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




              <SearchInput size="sm" />
              



            </NavbarItem>
          </NavbarContent>
        </Navbar>
      }
      sidebar={
        <Sidebar position="sticky" top="56px" toggleBreakpoint="sm">
          <SidebarSection>
         
          <NavGroup>
              <NavItem href='/' icon={<FiHome />} 
              isActive={isNavItemActive('/')}
              >
                Home
              </NavItem>
              
              <NavItem href='/profile' icon={<MdEventAvailable />}
              isActive={isNavItemActive('/profile')}
              >Events</NavItem>
              <NavItem href='/event'  icon={<FiPlus />}
              isActive={isNavItemActive('/event')}
              >Create</NavItem>
            </NavGroup>

            <NavGroup title="Voting" isCollapsible>
            <NavItem href='/startvoting' icon={<FaVoteYea />}
              isActive={isNavItemActive('/startvoting')}
              >Start Voting</NavItem>
              <NavItem href='/requestvote' icon={<GiReceiveMoney />}
              isActive={isNavItemActive('/requestvote')}
              >Refund</NavItem>
            </NavGroup>

            <NavGroup title="Event Owner" isCollapsible>
            <NavItem href='/withdraw' icon={<BiMoneyWithdraw />}
              isActive={isNavItemActive('/withdraw')}
              >Withdraw</NavItem>
             
            </NavGroup>
          </SidebarSection>
          <SidebarSection flex="1" overflowY="auto"></SidebarSection>
          <SidebarSection>
            <NavItem icon={<FiHelpCircle />}>Documentation</NavItem>
         
          </SidebarSection>
        </Sidebar>
      }
    >

<Box as="main" flex="1" py="2" px="4" overflowY="scroll">
  
<Text style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottomWidth: '1px', marginBottom: '30px', padding: '10px' }}>
  <BiMoneyWithdraw style={{fontSize:'30px'}} /> Withdraw Information
</Text>

<Homepage />


</Box>


      
    </AppShell>
  )
}