import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './components/context/AuthContext/AuthContext'
import { AccountContextProvider } from './components/context/AccountContext/AccountContext.jsx'
import { TransactionContextProvider } from './components/context/TransactionContext/TransactionsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <AccountContextProvider>
      <TransactionContextProvider>
        <App />
      </TransactionContextProvider>
    </AccountContextProvider>
  </AuthContextProvider>,
)
