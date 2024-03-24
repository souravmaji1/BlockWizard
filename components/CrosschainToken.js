import React from "react";
import { Box, Text, List, ListItem, Flex, Button } from "@chakra-ui/react";
import { ethers, Wallet } from "ethers";
import { useState, useEffect } from "react";
import { MdEventAvailable } from "react-icons/md";






export default function Component() {


 

  return (
    <>
    
    <Text style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottomWidth: '1px', marginBottom: '30px', padding: '10px' }}>
  <MdEventAvailable style={{fontSize:'30px'}} /> Latest Events
</Text>

    <Box   shadow="md" borderWidth="1px" borderRadius="md" padding="30px">
   
  </Box>
  </>
  );
}

