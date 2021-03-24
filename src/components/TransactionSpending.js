/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
} from "@chakra-ui/react"


const TransactionSpending = ({ spending }) => {
  var date = spending.date.slice(0, 10)
  var hour = spending.date.slice(11, 16)
  return (
    <Container bg='cyan'  maxW="container.xl">
      <Table variant="simple" colorScheme='red'>
        <Thead>
          <Tr>
            <Th w='25%'>Type</Th>
            <Th w='25%'>Date</Th>
            <Th  w='25%'>Amount</Th>
            <Th w='25%' >Concept</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{spending.type}</Td>
            <Td >{date}  {hour}</Td>
            <Td >${spending.amount}</Td>
            <Td  >{spending.concept}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Container>
  )
}


export default TransactionSpending