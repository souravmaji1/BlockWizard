import {
    Card,
    CardBody,
    Stat,
    StatLabel,
    StatHelpText,
    StatArrow,
    StatNumber,
  } from '@chakra-ui/react'
  import { Sparkline } from '@saas-ui/charts'
  import { ethers } from 'ethers'
  import { useState, useEffect } from 'react'
  
  export default function Page() {
    const value = Number(data[data.length - 1].value ?? 0)
    const compareValue = Number(data[data.length - 1].compareValue ?? 0)
  
    const percentage = Math.round(((value - compareValue) / value) * 100)

    const [contractdata, setContractData] = useState(null);
  
    useEffect(() => {
      // Your contract address and ABI
      const getConnectedAddress = async () => {
        try {
          // Check if there is a wallet connected
          if (window.ethereum && window.ethereum.selectedAddress) {
            setAddress(window.ethereum.selectedAddress.toLowerCase());
            console.log(address);
            readContractData(address);
          } else {
            setAddress(null);
          }
        } catch (error) {
          console.error('Error getting connected address:', error);
        }
      };

      const contractAddress = "0xAe239EE3e0DfF4E964869C24e3961c109e964bDe";
      const contractABI = [
        {
          "type": "function",
          "name": "getTotalEventsCreatedByUser",
          "inputs": [
            {
              "type": "address",
              "name": "_organizer",
              "internalType": "address"
            }
          ],
          "outputs": [
            {
              "type": "uint256",
              "name": "",
              "internalType": "uint256"
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
          const result = await contract.getTotalEventsCreatedByUser(address); // Replace with the actual function name
          setContractData(result);
          console.log(result);
        } catch (error) {
          console.error('Error reading contract data:', error);
        }
      };
  
      getConnectedAddress()
      
    }, []);
  
    return (
        <>
     <div style={{ display: 'flex', gap: '16px' }}>
      <Card width="300px">
        <CardBody>
          <Stat pos="relative">
            <StatLabel>Total Events</StatLabel>
            <StatHelpText pos="absolute" top="0" right="0">
              <StatArrow type="increase" /> {percentage}%
            </StatHelpText>
            <StatNumber>{data[data.length - 1].value ?? 0}</StatNumber>
            <Sparkline
              data={data}
              categories={['value', 'compareValue']}
              height="60px"
              mx="-4"
            />
          </Stat>
        </CardBody>
      </Card>

      <Card width="300px">
        <CardBody>
          <Stat pos="relative">
            <StatLabel>Ticket Bought</StatLabel>
            <StatHelpText pos="absolute" top="0" right="0">
              <StatArrow type="increase" /> {percentage}%
            </StatHelpText>
            <StatNumber>{data[data.length - 1].value ?? 0}</StatNumber>
            <Sparkline
              data={data}
              categories={['value', 'compareValue']}
              height="60px"
              mx="-4"
            />
          </Stat>
        </CardBody>
      </Card>

      <Card width="300px">
        <CardBody>
          <Stat pos="relative">
            <StatLabel>Ticket Sold</StatLabel>
            <StatHelpText pos="absolute" top="0" right="0">
              <StatArrow type="increase" /> {percentage}%
            </StatHelpText>
            <StatNumber>{data[data.length - 1].value ?? 0}</StatNumber>
            <Sparkline
              data={data}
              categories={['value', 'compareValue']}
              height="60px"
              mx="-4"
            />
          </Stat>
        </CardBody>
      </Card>
    </div>
      </>
    )
  }
  
  const data = [
    {
      date: 'Dec 1',
      value: 40,
      compareValue: 21,
    },
    {
      date: 'Dec 2',
      value: 38,
      compareValue: 22,
    },
    {
      date: 'Dec 3',
      value: 49,
      compareValue: 22,
    },
    {
      date: 'Dec 4',
      value: 48,
      compareValue: 29,
    },
    {
      date: 'Dec 5',
      value: 50,
      compareValue: 22,
    },
    {
      date: 'Dec 6',
      value: 42,
      compareValue: 30,
    },
    {
      date: 'Dec 7',
      value: 41,
      compareValue: 28,
    },
    {
      date: 'Dec 8',
      value: 44,
      compareValue: 23,
    },
    {
      date: 'Dec 9',
      value: 44,
      compareValue: 24,
    },
    {
      date: 'Dec 10',
      value: 44,
      compareValue: 30,
    },
    {
      date: 'Dec 11',
      value: 46,
      compareValue: 25,
    },
    {
      date: 'Dec 12',
      value: 48,
      compareValue: 25,
    },
    {
      date: 'Dec 13',
      value: 46,
      compareValue: 25,
    },
    {
      date: 'Dec 14',
      value: 50,
      compareValue: 28,
    },
    {
      date: 'Dec 15',
      value: 42,
      compareValue: 34,
    },
    {
      date: 'Dec 16',
      value: 58,
      compareValue: 33,
    },
    {
      date: 'Dec 17',
      value: 49,
      compareValue: 35,
    },
    {
      date: 'Dec 18',
      value: 44,
      compareValue: 33,
    },
    {
      date: 'Dec 19',
      value: 46,
      compareValue: 35,
    },
    {
      date: 'Dec 20',
      value: 44,
      compareValue: 35,
    },
    {
      date: 'Dec 21',
      value: 51,
      compareValue: 30,
    },
    {
      date: 'Dec 22',
      value: 58,
      compareValue: 36,
    },
    {
      date: 'Dec 23',
      value: 46,
      compareValue: 30,
    },
    {
      date: 'Dec 24',
      value: 61,
      compareValue: 30,
    },
    {
      date: 'Dec 25',
      value: 56,
      compareValue: 33,
    },
    {
      date: 'Dec 26',
      value: 55,
      compareValue: 33,
    },
    {
      date: 'Dec 27',
      value: 47,
      compareValue: 32,
    },
    {
      date: 'Dec 28',
      value: 55,
      compareValue: 33,
    },
    {
      date: 'Dec 29',
      value: 61,
      compareValue: 32,
    },
    {
      date: 'Dec 30',
      value: 62,
      compareValue: 29,
    },
    {
      date: 'Dec 31',
      value: 52,
      compareValue: 37,
    },
  ]