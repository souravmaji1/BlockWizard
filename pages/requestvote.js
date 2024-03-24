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
import { FiHome, FiUsers, FiSettings,FiHelpCircle,FiPlus, FiClock } from 'react-icons/fi'
import { FaTicket, FaDollarSign } from "react-icons/fa6";
import {
  Badge,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { ethers } from "ethers";
import { useState , useEffect} from 'react';

import Image from 'next/image';
import { GiReceiveMoney } from "react-icons/gi";
import { FaVoteYea } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdEventAvailable } from "react-icons/md";

import axios from 'axios';
import Mainlogo from '../public/images/block.png'

export default function Page() {
    const router = useRouter();
    const isNavItemActive = (href) => router.pathname === href;


    const [contractAddress, setContractAddress] = useState('');
    const [contractABI, setContractABI] = useState(null);
    const [selectedFunction, setSelectedFunction] = useState(null);
   
  
    const [loading, setLoading] = useState(false);
  
    const [userEmailInput, setUserEmail] = useState('');
  
  
  
  
    const fetchContractABI = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://smartcontractx.onrender.com/contract-info/${contractAddress}`);
        setContractABI(response.data.contractABI);
      } catch (error) {
        console.error('Error fetching contract ABI:', error);
      }
      finally{
        setLoading(false);
      }
    };
  
  
    const handleFunctionSelect = (functionName) => {
      const selectedFunc = contractABI.find((func) => func.name === functionName);
      setSelectedFunction(selectedFunc);
    };
  
   
  
  
    const trackevent = async () => {
      try {
  
        // Call the backend configure endpoint
        const response = await axios.post('http://localhost:4000/configure', {
          contract: contractAddress,
          event: selectedFunction.name,
          email: userEmailInput,
        });
  
        console.log(response.data);  // Log the response from the backend (for debugging)
  
      } catch (error) {
        console.error('Error handling function selection:', error);
      }
    };
  
  
  
    useEffect(() => {
      // Clear selected function, result, and API endpoint when the contract ABI changes
      setSelectedFunction(null);
    //  setFunctionResult(null);
      //setApiEndpoint('');
    }, [contractABI]);
  
    const events = contractABI ? contractABI.filter((item) => item.type === 'event') : [];

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
          <NavItem href='/sdk' color='gray' icon={<FiHelpCircle color='gray' />}>SDK Documentation</NavItem>
       
        </SidebarSection>
      </Sidebar>
      }
    >




      <Box as="main" flex="1" py="2" px="4" overflowY="scroll">

      <Text   borderColor='rgba(255,255,255,0.08)'  style={{color:'white', display: 'flex', alignItems: 'center', gap: '10px', borderBottomWidth: '1px', marginBottom: '30px', padding: '10px' }}>
  <FaVoteYea style={{fontSize:'30px',color:'white'}} /> Contract Notification
</Text>


<div className="flex flex-col items-center justify-center px-20 mt-40 w-full z-[20]">
      <div
        style={{
          padding: '2rem',
          maxWidth: '66rem',
          margin: 'auto',
          borderWidth:"1px",
          borderColor:'rgba(255,255,255,0.08)',
          borderRadius: '8px',
          width: '-webkit-fill-available',
        }}
      >
        <h1 style={{ color: 'white', marginBottom: '1rem', textAlign: 'center', fontSize: '30px', fontWeight: '700', fontFamily: 'sans-serif', color: 'white', padding: '8px 16px', borderRadius: '8px', width: '100%', background: '#07a5b5' }}>Track Your Smart Contract Events</h1>
        <label style={{ color: 'white' }}>
          Contract Address:
          <input
            style={{
              color: 'white',
              padding: '8px',
              borderRadius: '4px',
              borderColor:'rgba(255,255,255,0.08)',
              background:'rgba(255,255,255,0.08)',
              borderWidth:'1px',
              marginBottom: '20px',
              width: '100%',
            }}
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </label>

        <button
          onClick={fetchContractABI}
          style={{
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '16px',
            background: '#07a5b5',
            cursor: 'pointer',
            border: 'none',
            display: 'flex',
            margin: 'auto',
            outline: 'none',
          }}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch Contract'}
        </button>

        {contractABI && (
          <div style={{ display: 'flex', marginTop: '1rem' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ color: 'white' }}>Events:</h2>
              <table style={{ width: '100%', border: '1px solid white', color: 'white' }}>
                <thead>
                 
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index} style={{ border: '1px solid white' }}>
                      <td
                        style={{ border: '1px solid white', cursor: 'pointer',textAlign:'center' }}
                        onClick={() => handleFunctionSelect(event.name)}
                      >
                        {event.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedFunction && (
          <div style={{ marginTop: '20px', borderWidth:'1px', borderRadius: '8px', padding: '20px', background: '#151515' }}>
            <h2 style={{ color: '#ffffff', marginBottom: '15px' }}>Selected Function: {selectedFunction.name}</h2>

           
              <div  style={{ marginBottom: '15px' }}>
                <label style={{ color: '#ffffff', display: 'block', marginBottom: '5px' }}>
                  Enter Your Email
                </label>
                <input
                  type="text"
                  value={userEmailInput}
                  onChange={(e) => setUserEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#282c34',
                    border: '2px solid #777',
                    color: '#ffffff',
                    borderRadius: '4px',
                    padding: '8px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            

            <button
              onClick={trackevent}
              style={{
                color: '#ffffff',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '16px',
                background: '#4109af',
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
              }}
            >
              Track Event
            </button>
          </div>
        )}
      </div>
    </div>
    
      </Box>
    </AppShell>
  )
}