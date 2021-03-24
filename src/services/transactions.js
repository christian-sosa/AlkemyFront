/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const totalUrl = 'http://localhost:3001/total'
const spendingUrl = 'http://localhost:3001/spending'
const entryUrl = 'http://localhost:3001/entry'
const createUrl = 'http://localhost:3001/api'
const updateUrl = 'http://localhost:3001/api/modify'
const deleteUrl = 'http://localhost:3001/delete'
const balanceUrl = 'http://localhost:3001/balance'


const getAll =  () => {
    const request =  axios.get(totalUrl)
    return request.then(Response => Response.data)
}

const getSpending = () => {
    const request = axios.get(spendingUrl)
    return request.then(Response => Response.data)
}

const getEntry =  () =>  {
     const request =  axios.get(entryUrl)
    return request.then(Response => Response.data)
}

const getBalance =  () =>  {
    const request =  axios.get(balanceUrl)
   return request.then(Response => Response.data)
}


const create = transaction => {
    const request = axios.post(createUrl, transaction)
    return request.then(response => response.data)
}
  
const update = (id ,newObject) => {
    const request = axios.put(`${updateUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteTrx = (id ) => {
    const request = axios.delete(`${deleteUrl}/${id}`)
    return request.then(response => response.data)
}
export default { getAll, create, update , getSpending , getEntry , deleteTrx , getBalance}