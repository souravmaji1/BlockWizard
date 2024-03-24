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
import Mainlogo from '../public/images/block.png'
import Image from 'next/image';
import Homepage from '../components/homepage'

export default function Page() {
    const router = useRouter();
    const isNavItemActive = (href) => router.pathname === href;

  
 


 

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
          <NavItem color='gray' icon={<FiHelpCircle color='gray' />}>SDK Documentation</NavItem>
       
        </SidebarSection>
      </Sidebar>
      }
    >

<Box as="main" flex="1" py="2" px="4" overflowY="scroll">
  
<Text borderColor='rgba(255,255,255,0.08)'   style={{color:'white', display: 'flex', alignItems: 'center', gap: '10px', borderBottomWidth: '1px', marginBottom: '30px', padding: '10px' }}>
  <FaVoteYea style={{fontSize:'30px',color:'white'}} /> SDK Documentation
</Text>

<Box as="main" flex="1" py="2" px="4" backgroundColor="#282c34"
    borderRadius="md">
        <Box marginBottom="1rem">
    <Text fontSize="lg" fontWeight="bold" color="#ffffff" marginBottom="0.5rem">
      Install the SDK
    </Text>
    <Text fontSize="sm" color="#8a8d90" marginBottom="0.5rem">
      This is an example 
    </Text>
  </Box>
  <pre style={{background:'black',borderRadius:'10px'}}>
    <code style={{color:'white'}} >{`
    npm install blockwizard
    `}
    </code>
  </pre>
</Box>

<br></br>
<Box as="main" flex="1" py="2" px="4" backgroundColor="#282c34"
    borderRadius="md">
        <Box marginBottom="1rem">
    <Text fontSize="lg" fontWeight="bold" color="#ffffff" marginBottom="0.5rem">
      Initialize SDK
    </Text>
    <Text fontSize="sm" color="#8a8d90" marginBottom="0.5rem">
      This is an example 
    </Text>
  </Box>
  <pre style={{background:'black',borderRadius:'10px'}}>
    <code style={{color:'white'}}>{`
    const sdk = new BlockWizard();
    `}
    </code>
  </pre>
</Box>

<br></br>

<Box as="main" flex="1" py="2" px="4" backgroundColor="#282c34"
    borderRadius="md">
        <Box marginBottom="1rem">
    <Text fontSize="lg" fontWeight="bold" color="#ffffff" marginBottom="0.5rem">
      Call Any Smart Contract Function
    </Text>
    <Text fontSize="sm" color="#8a8d90" marginBottom="0.5rem">
      This is an example component demonstrating to call any smart contract using metamask wallet
    </Text>
  </Box>
  <pre style={{background:'black',borderRadius:'10px'}}>
    <code style={{color:'white'}} >{`
    const writeFunctionTest = async () => { try {

        sdk.connectWallet();
      
        sdk.setContract(contractAddress, contractABI);
      
        // Call the write function (without value or arguments)
        const transactionHash = await sdk.callWriteFunction('mint',
        undefined, [connectedAddress,"1000000"]);
        console.log('Write Transaction Hash:', transactionHash);
      } catch (error) {
        setSdkError(error.message);
      }
    `}
    </code>
  </pre>
</Box>

<br></br>

<Box as="main" flex="1" py="2" px="4" backgroundColor="#282c34"
    borderRadius="md">
        <Box marginBottom="1rem">
    <Text fontSize="lg" fontWeight="bold" color="#ffffff" marginBottom="0.5rem">
      Call Any Smart Contract Function using Credit Card
    </Text>
    <Text fontSize="sm" color="#8a8d90" marginBottom="0.5rem">
      This is an example component demonstrating to call any smart contract using credit card
    </Text>
  </Box>
  <pre style={{background:'black',borderRadius:'10px'}}>
    <code style={{color:'white'}} >{`
    const writeFunctionTest = async () => { try {

        sdk.connectWallet();
      
        sdk.setContract(contractAddress, contractABI);
      
        // Call the write function (without value or arguments)
        const transactionHash = await sdk.callWriteFunctionWithRazorpay('mint',
        undefined, [connectedAddress,"1000000"]);
        console.log('Write Transaction Hash:', transactionHash);
      } catch (error) {
        setSdkError(error.message);
      }
    `}
    </code>
  </pre>
</Box>


</Box>


      
    </AppShell>
  )
}