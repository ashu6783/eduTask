import React, { useState } from 'react'
import WelcomePage from './Welcome'
import LoginPage from './LogIn'
import CreateAccountPage from './CreateAccount'
import AccountSettingsPage from './AccountSettings'

const PopXApp = () => {
  const [currentPage, setCurrentPage] = useState('welcome')
  const [currentUser, setCurrentUser] = useState(null)

  const renderPage = () => {
    switch(currentPage) {
      case 'welcome':
        return (
          <WelcomePage 
            onCreateAccount={() => setCurrentPage('create-account')}
            onLogin={() => setCurrentPage('login')}
          />
        )
      case 'login':
        return (
          <LoginPage 
            onBack={() => setCurrentPage('welcome')}
            onLoginSuccess={(user) => {
              setCurrentUser(user)
              setCurrentPage('account-settings')
            }}
          />
        )
      case 'create-account':
        return (
          <CreateAccountPage 
            onBack={() => setCurrentPage('welcome')}
            onCreateSuccess={(user) => {
              setCurrentUser(user)
              setCurrentPage('account-settings')
            }}
          />
        )
      case 'account-settings':
        return (
          <AccountSettingsPage 
            user={currentUser}
            onLogout={() => {
              setCurrentUser(null)
              setCurrentPage('welcome')
            }}
          />
        )
      default:
        return <WelcomePage />
    }
  }

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  )
}

export default PopXApp