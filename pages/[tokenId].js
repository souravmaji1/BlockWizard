import { Box, Input, Button, Flex } from '@chakra-ui/react'
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
  NavItem,
  Navbar,
  NavbarBrand,
  PersonaAvatar,
  NavbarContent,
  NavbarItem,
  NavGroup,
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

import Mainlogo from '../public/images/mainlogo.png'
import Image from 'next/image';
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { FaVoteYea } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";


export default function Page() {
    const router = useRouter();
    const isNavItemActive = (href) => router.pathname === href;

    const { tokenId } = router.query;
    const [ quantity, setQuantity] = useState("");
  
    const [address, setAddress] = useState("");
    const [qrCodeData, setQRCodeData] = useState('');
    const [status, setStatus] = useState('Not Connected');
    const [account, setAccount] = useState('');

    const [filteredEventDetail, setFilteredEventDetail] = useState(null);

    const convertUnixTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const downloadQR = () => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "myqr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};

 

  const call = async () => {
    try {
      
      const getConnectedAddress = async () => {
        try {
          // Check if there is a wallet connected
          if (window.ethereum && window.ethereum.selectedAddress) {
            setAddress(window.ethereum.selectedAddress.toLowerCase());
            console.log(address);
          } else {
            setAddress(null);
          }
        } catch (error) {
          console.error('Error getting connected address:', error);
        }
      };

      await getConnectedAddress();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = "0x75bfbb56B29E1126d22f945E86aa193dCB6b5dee";
      const contract = new ethers.Contract(contractAddress, [
        {
          "type": "function",
          "name": "purchaseTicket",
          "inputs": [
            {
              "type": "uint256",
              "name": "_eventId",
              "internalType": "uint256"
            },
            {
              "type": "uint256",
              "name": "_numTickets",
              "internalType": "uint256"
            }
          ],
          "outputs": [],
          "stateMutability": "payable"
        }
      ], provider.getSigner());
      const price = ethers.utils.formatEther(filteredEventDetail.ticketPrice.toString());
      const total = (price * quantity).toString();
      const data = await contract.purchaseTicket(tokenId, quantity, { value: ethers.utils.parseEther(total) } );
    // Assuming your user address is available in some variable (replace with your actual user address variable)


    const userAddress = address;
    
    // Generate QR code data containing user address and token ID
    const qrCodeData = JSON.stringify({ userAddress, tokenId });
    setQRCodeData(qrCodeData);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const handleCrossmintPayment = async () => {
    try {
      
      const getConnectedAddress = async () => {
        try {
          // Check if there is a wallet connected
          if (window.ethereum && window.ethereum.selectedAddress) {
            setAddress(window.ethereum.selectedAddress.toLowerCase());
            console.log(address);
          } else {
            setAddress(null);
          }
        } catch (error) {
          console.error('Error getting connected address:', error);
        }
      };

      await getConnectedAddress();

      const userAddress = address;
  
      // Generate QR code data containing user address and token ID
      const qrCodeData = JSON.stringify({ userAddress, tokenId });
      setQRCodeData(qrCodeData);
  
      console.info("Crossmint payment success");
    } catch (err) {
      console.error("Crossmint payment failure", err);
    }
  };
  

  const usdcPayment = async () => {
    try {
      
      const getConnectedAddress = async () => {
        try {
          // Check if there is a wallet connected
          if (window.ethereum && window.ethereum.selectedAddress) {
            setAddress(window.ethereum.selectedAddress.toLowerCase());
            console.log(address);
          } else {
            setAddress(null);
          }
        } catch (error) {
          console.error('Error getting connected address:', error);
        }
      };

      await getConnectedAddress();

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const usdccontractaddress = "0xFEca406dA9727A25E71e732F9961F680059eF1F9";
      const usdccontract = new ethers.Contract(usdccontractaddress,
        [
          'function approve(address spender, uint256 amount) external returns (bool)',
        ]
        , provider.getSigner());

      const prices = ethers.utils.formatEther(filteredEventDetail.usdcPrice.toString());
      const totals = (prices * quantity).toString();
      const usdccall = await usdccontract.approve("0xac751E66f8cd62411Db2Cc2Bf177D962A7d38E01","10000000");  

      await usdccall.wait();

      console.log(usdccall);

      
      const contractAddress = "0xac751E66f8cd62411Db2Cc2Bf177D962A7d38E01";
      const contract = new ethers.Contract(contractAddress, [
        {
          "type": "function",
          "name": "purchaseTicketUsdc",
          "inputs": [
            {
              "type": "uint256",
              "name": "_eventId",
              "internalType": "uint256"
            },
            {
              "type": "uint256",
              "name": "_numTickets",
              "internalType": "uint256"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        }
      ], provider.getSigner());
      const data = await contract.purchaseTicketUsdc(tokenId, quantity );
    // Assuming your user address is available in some variable (replace with your actual user address variable)


    const userAddress = address;
    
    // Generate QR code data containing user address and token ID
    const qrCodeData = JSON.stringify({ userAddress, tokenId });
    setQRCodeData(qrCodeData);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const [data, setContractData] = useState(null);

  

  useEffect(() => {
    // Your contract address and ABI
    const contractAddress = "0xa30B55E48b185C497aCf353c413430F3C7DfdF4B";
    const contractABI = [
      {
        "type": "function",
        "name": "getAllEvents",
        "inputs": [],
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
    const provider = new ethers.providers.JsonRpcProvider('https://bsc-testnet.drpc.org/'); // Replace with your Ethereum node URL
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    // Example: Read a specific value from the contract
    const readContractData = async () => {
      try {
        const result = await contract.getAllEvents(); // Replace with the actual function name
        setContractData(result);
        const filteredDetail = result.find((eventDetail) => eventDetail.tokenId.toString() === tokenId);
        setFilteredEventDetail(filteredDetail);
      } catch (error) {
        console.error('Error reading contract data:', error);
      }
    };

    const getConnectedAddress = async () => {
      try {
        // Check if there is a wallet connected
        if (window.ethereum && window.ethereum.selectedAddress) {
          setAddress(window.ethereum.selectedAddress.toLowerCase());
          console.log(address);
        } else {
          setAddress(null);
        }
      } catch (error) {
        console.error('Error getting connected address:', error);
      }
    };

    // Call the functions when the component mounts
    readContractData();
    getConnectedAddress();
  }, []);

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
      navbar={
        <Navbar borderBottomWidth="1px" position="sticky" top="0">
          <NavbarBrand>
          
          <Image style={{width:"79px",marginTop:"10px",display:"flex"}} src={Mainlogo} />
          
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
  <FaTicket style={{fontSize:'30px'}} /> Ticket Information
</Text>

<Box display="flex" justifyContent="space-around" mb="20px">
<Flex mt="2" align="center">
        <Box w="20px" h="20px" bg="gray.200" borderRadius="md" mr="2" />
        <Text fontSize="sm" color="white" fontWeight="bold">
          Seat Available
        </Text>
      </Flex>

      <Flex mt="2" align="center">
        <Box w="20px" h="20px" bg="#0bd7e1" borderRadius="md" mr="2" />
        <Text fontSize="sm" color="white" fontWeight="bold">
          Ticket Booked
        </Text>
      </Flex>
</Box>




        <Box borderWidth="1px" padding="10px" borderRadius="5px" background="#181818">

        {data &&
        data.length > 0 &&
       filteredEventDetail && (
           
               
               <Flex  flexWrap="wrap">
                  {[...Array(filteredEventDetail.totalTickets.toNumber())].map((_, i) => (
                    <Box
                      key={i}
                      w="80px"
                      h="80px"
                      bg={i < filteredEventDetail.ticketsSold.toNumber() ? "#0bd7e1" : "gray.200"}
                      borderRadius="md"
                      mr="2"
                      mb="2"
                    />
                  ))}
                </Flex>

           
          )}
     
        </Box>

     
  
      
    {data &&
      data.length > 0 &&
      filteredEventDetail && (
        <Box mb="4" borderWidth="1px" padding="20px" marginTop="10px" borderRadius="5px" background="#181818" >
          <Text fontSize="xl" fontWeight="bold" mb="2">
            Event Details
          </Text>

          <Stack background="#04bcc7"  spacing="4" borderWidth="1px"  padding="20px" borderRadius="10px">
          <Box bg="#181818" p="4" borderRadius="8px">
      <Text fontSize="lg" fontWeight="bold">
        Name: {filteredEventDetail.name}
      </Text>
    </Box>
          

    <Box bg="#181818" p="4" borderRadius="8px">
      <Flex align="center">
        <FaTicket size={20} />
        <Text ml="2" fontWeight="bold" fontSize="md">
          Total Tickets: {filteredEventDetail.totalTickets.toNumber()}
        </Text>
      </Flex>
    </Box>

    <Box bg="#181818" p="4" borderRadius="8px">
      <Flex align="center">
        <FaTicket size={20} />
        <Text ml="2" fontWeight="bold" fontSize="md">
          Ticket Sold: {filteredEventDetail.ticketsSold.toNumber()}
        </Text>
      </Flex>
    </Box>    

   
    
          
          </Stack>

          <InputGroup mt="4">
            <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
              <FaDollarSign />
            </InputLeftElement>
            <Input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              focusBorderColor="teal.500"
              borderColor="gray.200"
            />
          </InputGroup>

          <Flex direction="column" alignItems="center" mt="4">
    <Button
      colorScheme="teal"
      onClick={call}
      loadingText="Buying..."
    >
      Buy Tickets with crypto
    </Button>
    
    <Text mt="4px" mb="4px">Or</Text>

    <Button
      colorScheme="teal"
      onClick={usdcPayment}
      loadingText="Buying..."
    >
      Buy Tickets using USDC
    </Button>

    <Text mt="4px" mb="4px">Or</Text>

    <CrossmintPayButton
    collectionId="7fd40b7d-5d39-4c64-9c44-6de965b84960"
    projectId="67f3faf5-43bd-45a5-99a2-6321b2ada073"
    mintConfig={{
      "totalPrice": (quantity * ethers.utils.formatEther(filteredEventDetail.ticketPrice.toString()).toString()).toString(),
      "_eventId": tokenId.toString(),
      "_numTickets": quantity.toString(),
      "_buyerWallet": address,
    }}
    environment="staging"
    onClick={handleCrossmintPayment}
  />

  </Flex>

          {qrCodeData && (
            <Box mt="4" borderWidth="1px"  background="#181818" borderRadius="10px" padding="10px">
              <Text  textAlign="center" fontSize="xl" fontWeight="bold">
                Ticket QR Code
              </Text>
              <br></br>
              <QRCode style={{margin:"auto"}}  size={320} includeMargin={true}  id="myqr" value={qrCodeData} />
              <br></br>
              <Button display="flex" alignItems="center" justifyContent="center" margin="auto"  onClick={downloadQR}>Download</Button>
            </Box>
          )}

            </Box>
          )}
      </Box>
    </AppShell>
  )
}