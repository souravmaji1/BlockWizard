import React from "react";
import { Box, Text, List, ListItem, Flex, Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import HomeImage from '../public/images/Latest.png'
import TicketImage from '../public/images/ticket.png'
import { MdEventAvailable } from "react-icons/md";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
export default function Component() {

  const [data, setContractData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        console.log(result);
      } catch (error) {
        console.error('Error reading contract data:', error);
      }
    };

    // Call the function to read contract data when the component mounts
    readContractData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleResetClick = () => {
    setSelectedCategory(null);
  };

  const filteredData = data
    ? selectedCategory
      ? data.filter((event) => event.category === selectedCategory)
      : data
    : null;

  const categories = ["music", "sports", "dance"];

 

  return (
    <>
    
    <Text style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottomWidth: '1px', marginBottom: '30px', padding: '10px' }}>
  <MdEventAvailable style={{fontSize:'30px'}} /> Latest Events
</Text>


    <Box   shadow="md" borderWidth="1px" borderRadius="md">
     <Image src={HomeImage} style={{width:"-webkit-fill-available",borderRadius:"5px"}}  />
    </Box>

    <br></br>

    <Box p={3} shadow="md" borderWidth="1px" borderRadius="md" mt={2} background="#181818" >
    <Flex align="center" justify="space-between" mb={2}>
        <Text fontWeight="bold">Filter by Category:</Text>
        <Flex>
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === category ? "solid" : "outline"}
              colorScheme="teal"
              onClick={() => handleCategoryClick(category)}
              mr={2}
            >
              {category}
            </Button>
          ))}
          <Button
            variant="outline"
            colorScheme="teal"
            onClick={handleResetClick}
            ml={2}
          >
            Reset
          </Button>
        </Flex>
      </Flex>
    </Box>

    <br></br>

    <Box p={3} shadow="md" borderWidth="1px" borderRadius="md" background="#181818" >

    {filteredData ? (
      <List spacing={4}>
        {filteredData.map((event, index) => (
          <Link
            key={index}
            href={`/${event.tokenId}`}
            passHref
          >
            
            <ListItem key={index} borderWidth="1px" borderRadius="md" p={4} marginBottom="15px" background="#07a5b5"  _hover={{ border: "2px solid white", cursor: "pointer" }}   >
              <Flex  justifyContent="space-between">
               
                <Box>
                  <Text  fontWeight="bold" fontSize="lg">
                    Event Name: {event.name}
                  </Text>
                  <Text fontWeight="bold" fontSize="md">
                    Price: {ethers.utils.formatEther(event.ticketPrice.toString())}
                  </Text>
                  <Text fontWeight="bold" fontSize="md">
                    Total Tickets: {event.totalTickets.toNumber()}
                  </Text>
                  <Text fontWeight="bold" fontSize="md">
                    Ticket Sold: {event.ticketsSold.toNumber()}
                  </Text>
                  <Text fontWeight="bold" fontSize="lg" background="#181818" padding="10px" borderRadius="10px" mt="10px">
                    Category: {event.category}
                  </Text>
                
                </Box>
                <Box  >
        <Image style={{ borderRadius: '10px', width: '100%', maxWidth: '278px', height: 'auto' }}  src={TicketImage} />
                </Box>
              </Flex>
            </ListItem>
          </Link>
        ))}
      </List>
    ) : (
      <Text>No data available</Text>
    )}
  </Box>
  </>
  );
}

