import React, { useState, useEffect } from 'react'
import './App.css';
import TransactionEntry from './components/TransactionEntry'
import TransactionSpending from './components/TransactionSpending'
import TransactionTotal from './components/TransactionTotal'
import transactionService from './services/transactions'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Input, Button, Heading, Container, ChakraProvider } from "@chakra-ui/react"
import './components/TransactionTotal.css'


const App = () => {
  const [total, setTotal] = useState([])
  const [spending, setSpending] = useState([])
  const [entry, setEntry] = useState([])
  const [type, SetType] = useState([])
  const [amount, SetAmount] = useState([])
  const [concept, SetConcept] = useState([])
  const [balance, setBalance] = useState([])

  useEffect(() => {
    transactionService.getAll().then(initialTransacion => {
      setTotal(initialTransacion)
      setSpending(initialTransacion.filter(t => t.type === 'Spending'))
      setEntry(initialTransacion.filter(t => t.type === 'Entry'))
    })
    transactionService.getBalance().then(initialValor => {
      setBalance(initialValor)
    })
  }, [])

  const addTransaction = (event) => {
    event.preventDefault()
    const transaction = {
      type: type,
      date: new Date(),
      amount: amount,
      concept: concept
    }
    if (type === 'Spending' || type === 'Entry') {
      transactionService.create(transaction).then(
        transactionService.getAll().then(initialTransacion => {
          setTotal(initialTransacion)
        }),
        transactionService.getEntry().then(initialTransacion => {
          setEntry(initialTransacion)
        }),
        transactionService.getSpending().then(initialTransacion => {
          setSpending(initialTransacion)
        }), transactionService.getBalance().then(initialTransacion => {
          setBalance(initialTransacion)
        })
      )
    }
    else {
      console.log('nada')
    }

  }

  const handleTypeChange = (event) => {
    SetType(event.target.value)
  }
  const handleAmountChange = (event) => {
    SetAmount(event.target.value)
  }
  const handleConceptChange = (event) => {
    SetConcept(event.target.value)
  }
  const deleteTrx = (trx) => {
    const trx2 = total.filter(n => n.id !== trx.id)
    setTotal(trx2)
    if (trx.type === 'Entry') {
      const trx3 = total.filter(n => n.id !== trx.id)
      setBalance(balance-trx.amount)
      setEntry(trx3)
    }
    else {
      const trx4 = total.filter(n => n.id !== trx.id)
      setBalance(balance+trx.amount)
      setEntry(trx4)
    }
  }

  const modifyTrx = (trx) => {
    const trxaux = total.find(n => n.id === trx.id)
    const changedTrx = {...trxaux , amount: trx.amount , concept: trx.concept}

    
    setTotal(total.map(t => t.id !== trx.id ? t : changedTrx))
    if (trx.type === 'Entry') {
      setEntry(total.map(t => t.id !== trx.id ? t : changedTrx))
    }
    else {
      setSpending(total.map(t => t.id !== trx.id ? t : changedTrx))
    }
    var aux = 0
    var total2 = parseInt(total.map(t => t.type === 'Entry' ? aux = aux + t.amount : aux = aux - t.amount ))
    setBalance(aux)
  }


  return (
    <div className='containergrande'>
      <ChakraProvider className='chakra' >
        <Container className='App' bg='#81E6D9' maxW="container.xl">
          <Heading className='title' bg='#81E6D9'>Personal calculator</Heading>
          <Heading className='title2' size='md' bg='#81E6D9'>Balance</Heading>
          <Heading className='balance' size='3xl' bg='#81E6D9'>${balance}</Heading>
          <Container w='100%' bg='#81E6D9' >
            <h1 className='addTrx'>Add Transaction</h1>
            <form onSubmit={addTransaction}>
              <Input className='input' placeholder='Type : Entry or Spending' onChange={handleTypeChange} value={type} ></Input>
              <Input className='input' size='lg' placeholder='Amount' onChange={handleAmountChange} value={amount} ></Input>
              <Input className='input' size='lg' placeholder='Concept' onChange={handleConceptChange} value={concept} ></Input>
              <Button className='submit' type='submit' colorScheme="red">Submit</Button>
            </form>
          </Container>
          <Container bg='#81E6D9' className='Container' maxW="container.xl">
            <Tabs >
              <TabList>
                <Tab w='33%'><strong>Total</strong></Tab>
                <Tab w='33%'><strong>Entry</strong></Tab>
                <Tab w='34%'><strong>Spending</strong></Tab>
              </TabList>
              <TabPanels>
                <TabPanel >
                  {total.map((total2, i) =>
                    <Container maxW="container.xl">
                      <TransactionTotal key={i} total={total2} dlt={() => deleteTrx(total2)} mdf={() => modifyTrx(total2)}></TransactionTotal>
                    </Container>)}
                </TabPanel>
                <TabPanel>
                  <Container maxW="container.xl">{entry.map((entry, i) =>
                    <TransactionEntry key={i + 5000} entry={entry} />
                  )}</Container>
                </TabPanel>
                <TabPanel>
                  <Container maxW="container.xl">{spending.map((spending, i) =>
                    <TransactionSpending key={i + 10000} spending={spending} />
                  )}</Container>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
        </Container>
      </ChakraProvider>
    </div>

  )
}

export default App;
