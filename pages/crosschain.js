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
import TransferSection from '../components/CrosschainToken';

export default function Page() {
    const router = useRouter();
    const isNavItemActive = (href) => router.pathname === href;

  
 
 

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
  <BiMoneyWithdraw style={{fontSize:'30px'}} /> CrossChain
</Text>
<TransferSection />
</Box>


      
    </AppShell>
  )
}