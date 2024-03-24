import { Text, Spacer, ButtonGroup } from '@chakra-ui/react'
import {
  FormLayout,
  Field,
  PrevButton,
  NextButton,
  FormStepper,
  StepsCompleted,
  FormValue,
  LoadingOverlay,
  LoadingSpinner,
  LoadingText,
  PropertyList,
  Property,
  Sidebar,
} from '@saas-ui/react'
import { StepForm } from '@saas-ui/forms/yup'
import axios from 'axios'

import * as yup from 'yup'
import { ethers } from 'ethers';
import { useState } from 'react';
import { IoCreate } from "react-icons/io5";


export default function CreateProject() {
  const steps = [
    {
      name: 'project',
      schema: yup.object({
        name: yup.string().required().label('Name'),
        ticketPrice: yup.number().required().label('Ticket Price'),
        totalTickets: yup.number().required().label('Total Tickets'),
        category: yup.string().required().label('Category'),
      }),
    },
    {
      name: 'members',
      schema: yup.object({
        members: yup.string().label('Members'),
      }),
    },
  ]

  const onSubmit = (params) => {
    console.log(params)
    call(params);
    return new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
  }

 
  const [transactionStatus, setTransactionStatus] = useState('pending');





  const call = async (formValues) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractaddress = "0x1b97aDBc93B9F9f9319C535C1AdeE3Da8EA19402";
      const contract = new ethers.Contract(contractaddress, [
        {
          "type": "function",
          "name": "createEvent",
          "inputs": [
          {
            "type": "string",
            "name": "_name",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "_ticketPrice",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "_category",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "_totalTickets",
            "internalType": "uint256"
          }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        }
      ], provider.getSigner());
      const { name, ticketPrice, totalTickets, category } = formValues;
      const tx = await contract.createEvent(name, ethers.utils.parseEther(ticketPrice), category, totalTickets);
      const receipt = await tx.wait();
      console.log(receipt);

      if (receipt.status === 1) {
        setTransactionStatus('success');
        console.info("contract call success");
      } else {
        setTransactionStatus('failure');
        console.error("contract call failure");
      }
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }



  return (
    <div className='upload-page'>

<Text style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottomWidth: '1px', marginBottom: '30px', padding: '10px' }}>
  <IoCreate style={{fontSize:'30px'}} /> Create Your Event
</Text>
      
    <StepForm
    borderWidth="1px" padding="20px" borderRadius="12px"
      steps={steps}
      defaultValues={{
        name: '',
        ticketPrice: '',
        totalTickets: '',
        category: '',
      }}
      onSubmit={onSubmit}
    >
      {({ Field, FormStep }) => (
        <FormLayout >
          <FormStepper  orientation="vertical">
            <FormStep name="project" title="Fill Your Event details">
            <FormLayout>
        <FormLayout >
          <Field
            name="name" isRequired label="Event Name"
          />
        </FormLayout>
        <FormLayout columns={2}>
          <Field name="ticketPrice" type="number" isRequired label="Ticket Price" />
          <Field name="totalTickets" type="number" isRequired label="Total Tickets" />
        </FormLayout>
        <FormLayout >
        <Field
            name="category" isRequired label="Category"
          />
        </FormLayout>
        
        <NextButton  />
      </FormLayout>
            </FormStep>
            <FormStep name="members" title="Confirm">
              <FormLayout>
              <Text>Please confirm that your information is correct.</Text>
                <PropertyList>
                  <Property label="Event Name" value={<FormValue name="name" />} />
                  <Property
                    label="Ticket Price"
                    value={<FormValue name="ticketPrice" />}
                  />
                  <Property label="Total Tickets" value={<FormValue name="totalTickets" />} />
                  <Property
                    label="Category"
                    value={<FormValue name="category" />}
                  />
                </PropertyList>
                <ButtonGroup>
                  <NextButton  />
                  <PrevButton variant="ghost" />
                </ButtonGroup>
              </FormLayout>
            </FormStep>
            <FormStep name="confirm" title="Pay Gas Fees">
              <FormLayout>
                <Text>Please confirm that your information is correct.</Text>
                <PropertyList>
                  <Property label="Name" value={<FormValue name="name" />} />
                  <Property
                    label="Description"
                    value={<FormValue name="description" />}
                  />
                </PropertyList>
                <ButtonGroup>
                  <NextButton  />
                  <PrevButton variant="ghost" />
                </ButtonGroup>
              </FormLayout>
            </FormStep>

            <StepsCompleted>
            {transactionStatus === 'pending' && (
                <LoadingOverlay>
                  <LoadingSpinner />
                  <LoadingText>
                    We are setting up your project, just a moment...
                  </LoadingText>
                </LoadingOverlay>
              )}

              {transactionStatus === 'success' && (
                <Text fontSize="xl" color="green.500">
                  Transaction successful! Your project has been set up.
                </Text>
              )}

              {transactionStatus === 'failure' && (
                <Text fontSize="xl" color="red.500">
                  Transaction failed. Please try again.
                </Text>
              )}
            </StepsCompleted>
          </FormStepper>
        </FormLayout>
      )}
    </StepForm>
   
    </div>
  )
}