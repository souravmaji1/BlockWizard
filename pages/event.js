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
import Mainlogo from '../public/images/block.png'
import axios from 'axios';
import { Days_One } from 'next/font/google';

const daysone = Days_One({ subsets: ['latin'],weight:'400' });

export default function Page() {
    const router = useRouter();
    const isNavItemActive = (href) => router.pathname === href;


    const [status, setStatus] = useState('Not Connected');
    const [account, setAccount] = useState('');
    const [contractAddress, setContractAddress] = useState('');
    const [contractABI, setContractABI] = useState(null);
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [functionInputs, setFunctionInputs] = useState([]);
    const [functionResult, setFunctionResult] = useState(null);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedWriteFunction, setSelectedWriteFunction] = useState(null);
    const [writeFunctionInputs, setWriteFunctionInputs] = useState([]);
    const [scheduleTime, setCronExpression] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState('');
    
    
  
    const presetButtonStyle = {
      color: '#ffffff',
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '16px',
      background: '#4109af',
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
      marginRight: '10px',
    };
  
  
  
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
  
      // Reset function inputs
      setFunctionInputs(Array(selectedFunc.inputs.length).fill(''));
      setFunctionResult(null);
  
      // Generate API endpoint for the selected function
      const apiEndpoint = `https://smartcontractx.onrender.com/execute-contract/${contractAddress}/${selectedFunc.name}`;
      setApiEndpoint(apiEndpoint);
    };
  
    const handleInputChange = (index, value) => {
      const updatedInputs = [...functionInputs];
      updatedInputs[index] = value;
      setFunctionInputs(updatedInputs);
  
  
      // Update API endpoint with input values
      if (selectedFunction) {
        const apiEndpoint = `https://smartcontractx.onrender.com/execute-contract/${contractAddress}/${selectedFunction.name}?${selectedFunction.inputs.map((input, i) => `${input.name}=${encodeURIComponent(updatedInputs[i])}`).join('&')}`;
        setApiEndpoint(apiEndpoint);
      }
    };
  
    const handleWriteFunctionSelect = (functionName) => {
      const selectedFunc = contractABI.find((func) => func.name === functionName);
      setSelectedWriteFunction(selectedFunc);
  
      // Reset write function inputs and cron expression
      setWriteFunctionInputs(Array(selectedFunc.inputs.length).fill(''));
      setCronExpression('');
    };
  
    // ... (previous code)
  
    const handleInputChangeWriteFunction = (index, value) => {
      const updatedInputs = [...writeFunctionInputs];
      updatedInputs[index] = value;
      setWriteFunctionInputs(updatedInputs);
    };
  
    const handleTestFunction = async () => {
      try {
        if (!selectedFunction) {
          console.error('No function selected.');
          return;
        }
  
        const response = await axios.post(`https://smartcontractx.onrender.com/test-contract/${contractAddress}`, {
          functionName: selectedFunction.name,
          inputValues: functionInputs,
        });
        console.log(response);
  
        setFunctionResult(response.data.result);
      } catch (error) {
        console.error('Error testing contract function:', error);
      }
    };
  
    const presetCronExpressions = {
      everySecond: '* * * * * *',
      everyMinute: '* * * * *',
      everyHour: '* */1 * * *',
      everyDay: '0 0 * * *',
    };
  
    const handlePresetSchedule = (scheduleTime) => {
      // Set the selected cron expression
      setCronExpression(scheduleTime);
      setSelectedSchedule(scheduleTime);
    };
  
  
    const handleScheduleWriteFunction = async () => {
      try {
        setLoading(true);
        if (!selectedWriteFunction) {
          console.error('No write function selected.');
          return;
        }
    
        // Prepare input data for the write function
        const inputData = {};
        selectedWriteFunction.inputs.forEach((input, index) => {
          inputData[input.name] = writeFunctionInputs[index];
        });
  
        // Log the request payload
      console.log('Request Payload:', {
        contractAddress,
        functionName: selectedWriteFunction.name,
        inputValues: inputData,
        scheduleTime: scheduleTime,
      });
    
        // Make a POST request with input data
        const response = await axios.post(`https://smartcontractx.onrender.com/schedule-function`, {
          contractAddress,
          functionName: selectedWriteFunction.name,
          inputValues: inputData,
          scheduleTime: scheduleTime,
        });
  
       
        // Handle the response as needed
      } catch (error) {
        console.error('Error scheduling contract function:', error);
      }
      finally {
        setLoading(false);
      }
    };
  
   
  
  
    const getReadFunctionDataExample = () => {
      if (selectedFunction && selectedFunction.stateMutability === 'view') {
        const axiosGetCode = `
  import axios from 'axios';
  
  const apiEndpoint = '${apiEndpoint}';
  
  axios.get(apiEndpoint)
    .then((response) => {
      console.log('Read Function Data:', response.data);
    })
    .catch((error) => {
      console.error('Error making GET request:', error);
    });
        `;
        return axiosGetCode;
      }
      return null;
    };
  
    // Example function to make a POST request for write functions
    const postWriteFunctionDataExample = () => {
      if (selectedFunction && selectedFunction.stateMutability !== 'view') {
        const inputData = {
          // Replace with the actual input data for the write function
        };
  
        const axiosPostCode = `
  import axios from 'axios';
  
  const apiEndpoint = '${apiEndpoint}';
  const inputData = ${JSON.stringify(inputData, null, 2)};
  
  axios.post(apiEndpoint, inputData)
    .then((response) => {
      console.log('Write Function Data:', response.data);
    })
    .catch((error) => {
      console.error('Error making POST request:', error);
    });
        `;
        return axiosPostCode;
      }
      return null;
    };
  
    
  
    useEffect(() => {
      // Clear selected function, result, and API endpoint when the contract ABI changes
      setSelectedFunction(null);
      setFunctionResult(null);
      setApiEndpoint('');
    }, [contractABI]);
  
    const events = contractABI ? contractABI.filter((item) => item.type === 'event') : [];
    const readFunctions = contractABI ? contractABI.filter((item) => item.stateMutability === 'view') : [];
    const writeFunctions = contractABI ? contractABI.filter((item) => item.stateMutability !== 'view') : [];

   
 



  

  
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
          <NavItem color='gray' icon={<FiHelpCircle color='gray' />}>Documentation</NavItem>
       
        </SidebarSection>
      </Sidebar>
      }
    >




      <Box as="main" flex="1" py="2" px="4" overflowY="scroll">

      <Text borderColor='rgba(255,255,255,0.08)'  style={{ color:'white',display: 'flex', alignItems: 'center', gap: '10px', borderBottomWidth: '1px', marginBottom: '30px', padding: '10px' }}>
  <FaVoteYea style={{fontSize:'30px',color:'white'}} /> Automation
</Text>


      <div className="flex flex-col items-center justify-center px-20 mt-40 w-full z-[20]">
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
 <h1 className={daysone.className}  style={{ color: 'white', marginBottom: '1rem', textAlign: 'center' ,fontSize:'30px',fontWeight:'700', color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            width: '100%',
            background: '#07a5b5' }}>AUTOMATE YOUR SMART CONTRACT</h1>
        <label style={{ color: 'white' }}>
          Contract Address:
          <input
            style={{
              color: 'white',
              padding: '8px',
              borderRadius: '4px',
              borderColor:'rgba(255,255,255,0.08)',
              background:'rgba(255,255,255,0.08)',
              borderWidth:"1px",
              marginBottom:'20px',
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
            display:'flex',
            margin:'auto',
            outline: 'none',
          }}
          disabled={loading}
        >
         {loading ? 'Fetching...' : 'Fetch Contract'}
        </button>

     



{selectedFunction && (
  <div style={{ marginTop: '20px', border: '1px solid #7042f88b', borderRadius: '8px', padding: '20px', background: '#151515' }}>
    <h2 style={{ color: '#ffffff', marginBottom: '15px' }}>Selected Function: {selectedFunction.name}</h2>

    {selectedFunction.inputs.map((input, index) => (
      <div key={index} style={{ marginBottom: '15px' }}>
        <label style={{ color: '#ffffff', display: 'block', marginBottom: '5px' }}>
          {input.name} ({input.type}):
        </label>
        <input
          type="text"
          value={functionInputs[index]}
          onChange={(e) => handleInputChange(index, e.target.value)}
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
    ))}
  </div>
)}



{apiEndpoint && (
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>API Endpoint:</h3>
                <p style={{ color: '#ffffff', background: '#282c34', padding: '15px', borderRadius: '8px' }}>{apiEndpoint}</p>
                {selectedFunction.stateMutability === 'view' && (
                  <div style={{ marginTop: '10px' }}>
                    <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>Axios GET Request Example:</h3>
                    <pre style={{ color: '#ffffff', background: '#282c34', padding: '15px', borderRadius: '8px', overflowX: 'auto' }}>
                      {getReadFunctionDataExample()}
                    </pre>
                  </div>
                )}
                {selectedFunction.stateMutability !== 'view' && (
                  <div style={{ marginTop: '10px' }}>
                    <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>Axios POST Request Example:</h3>
                    <pre style={{ color: '#ffffff', background: '#282c34', padding: '15px', borderRadius: '8px', overflowX: 'auto' }}>
                      {postWriteFunctionDataExample()}
                    </pre>
                  </div>
                )}
              </div>
            )}


{writeFunctions.length > 0 && (
        <div style={{ marginTop: '20px', borderWidth:"2px", borderRadius: '8px', padding: '20px', background: '#151515' }}>
          <h2 style={{ color: '#ffffff', marginBottom: '15px' }}>Schedule Write Function:</h2>

          {/* Contract address input */}
          <label style={{ color: '#ffffff', display: 'block', marginBottom: '15px' }}>
            Contract Address:
            <input
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
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
          </label>

          {/* Select write function */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#ffffff', display: 'block', marginBottom: '5px' }}>Select Write Function:</label>
            <select
              value={selectedWriteFunction ? selectedWriteFunction.name : ''}
              onChange={(e) => handleWriteFunctionSelect(e.target.value)}
              style={{
                width: '100%',
                background: '#282c34',
                border: '2px solid #777',
                color: '#ffffff',
                borderRadius: '4px',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            >
              <option value="">Select a function...</option>
              {writeFunctions.map((func) => (
                <option key={func.name} value={func.name}>
                  {func.name}
                </option>
              ))}
            </select>
          </div>

          {/* Input fields for write function */}
          {selectedWriteFunction &&
            selectedWriteFunction.inputs.map((input, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <label style={{ color: '#ffffff', display: 'block', marginBottom: '5px' }}>
                  {input.name} ({input.type}):
                </label>
                <input
                  type="text"
                  value={writeFunctionInputs[index]}
                  onChange={(e) => handleInputChangeWriteFunction(index, e.target.value)}
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
            ))}

          {/* Cron expression input */}
          <div style={{ marginBottom: '15px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#ffffff', display: 'block', marginBottom: '5px' }}>Select Schedule:</label>
            <button
              onClick={() => handlePresetSchedule(presetCronExpressions.everySecond)}
              style={{ ...presetButtonStyle, background: selectedSchedule === presetCronExpressions.everySecond ? 'green' : '#4109af' }}
            >
              Every Second
            </button>
            <button
              onClick={() => handlePresetSchedule(presetCronExpressions.everyMinute)}
              style={{ ...presetButtonStyle, background: selectedSchedule === presetCronExpressions.everyMinute ? 'green' : '#4109af' }}
            >
              Every Minute
            </button>
            <button
              onClick={() => handlePresetSchedule(presetCronExpressions.everyHour)}
              style={{ ...presetButtonStyle, background: selectedSchedule === presetCronExpressions.everyHour ? 'green' : '#4109af' }}
            >
              Every Hour
            </button>
            <button
              onClick={() => handlePresetSchedule(presetCronExpressions.everyDay)}
              style={{ ...presetButtonStyle, background: selectedSchedule === presetCronExpressions.everyDay ? 'green' : '#4109af' }}
            >
              Every Day
            </button>
          </div>
        </div>

          <label style={{ color: '#ffffff', display: 'block', marginBottom: '5px' }}>Final Step:</label>
          {/* Schedule button */}
          <button
            onClick={handleScheduleWriteFunction}
            style={{
              color: '#ffffff',
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '16px',
              background: '#07a5b5',
              cursor: 'pointer',
              border: 'none',
              outline: 'none',
            }}
            disabled={loading}
          >
             {loading ? 'Automating...' : 'Start Automation'}
          </button>
        </div>
      )}




      </Box>
      
     
      
    </div>
    
      </Box>
    </AppShell>
  )
}