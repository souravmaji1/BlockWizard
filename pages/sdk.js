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
          <NavbarBrand >
           <h1 style={{color:'white'}}>EasySol</h1> 
          </NavbarBrand>
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
           
          </NavGroup>

          

       


        </SidebarSection>
        <SidebarSection flex="1" overflowY="auto"></SidebarSection>
        <SidebarSection>
          <NavItem href='/sdk'  color='gray' icon={<FiHelpCircle color='gray' />}>SDK Documentation</NavItem>
       
        </SidebarSection>
      </Sidebar>
      }
    >

<Box as="main" flex="1" py="2" px="4" overflowY="scroll">
  


<Homepage />


</Box>


      
    </AppShell>
  )
}