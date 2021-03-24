/* eslint-disable import/no-anonymous-default-export */
import React, { useState  } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  Button,
  Input,
} from "@chakra-ui/react"

import './TransactionTotal.css'
import transactionService from '../services/transactions'


const TransactionTotal = ({ total,dlt , mdf }) => {
  const [amount, SetAmount] = useState([])
  const [concept, SetConcept] = useState([])
  var date = total.date.slice(0, 10)
  var hour = total.date.slice(11, 16)

  const DeleteTransaction = (event) => {
    event.preventDefault()
    transactionService.deleteTrx(total.id)
    dlt()
  }

  const handleAmountChange = (event) => {
    SetAmount(event.target.value)
  }
  const handleConceptChange = (event) => {
    SetConcept(event.target.value)
  }

  const ModifyTransaction = (event) => {
    event.preventDefault()
    total.amount = amount
    total.concept = concept
    transactionService.update(total.id, total)
    mdf()
  }

  return (
    <Container bg='cyan' className='hola2' maxW="container.xl">
      <Table variant="simple" size='lg' className='css-10gf8jm2' >
        <Thead h='15%' className='css-10gf8jm2'>
          <Tr className='css-10gf8jm2'>
            <Th className='hola' w='25%' ><strong>Type</strong></Th>
            <Th className='hola' w='25%'><strong>Date</strong></Th>
            <Th className='hola' w='25%'><strong>Amount</strong></Th>
            <Th className='hola' w='25%'><strong>Concept</strong></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td className='hola'>{total.type}</Td>
            <Td className='hola'>{date}  {hour}</Td>
            <Td className='hola' >${total.amount}</Td>
            <Td className='hola' >{total.concept}</Td>
          </Tr>
        </Tbody>

      </Table>
      <div className='separador'>
      <Button onClick={DeleteTransaction} colorScheme='red'>Delete</Button>
      </div>
      <form onSubmit={ModifyTransaction}>
        <Input className='separador2' size='lg' placeholder='Modify Amount' onChange={handleAmountChange} value={amount} ></Input>
        <Input className='separador2' size='lg' placeholder='Modify Concept' onChange={handleConceptChange} value={concept} ></Input>
        <Button colorScheme='blue' type='submit'>Modify</Button>
      </form>
    </Container>
  )
}


export default TransactionTotal