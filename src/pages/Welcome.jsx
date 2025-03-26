import React from 'react'
import BaseButton from '../components/BaseButton'

const WelcomePage = ({ onCreateAccount, onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to PopX</h1>
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <div className="w-full max-w-xs space-y-4">
        <BaseButton 
          variant="primary" 
          fullWidth 
          onClick={onCreateAccount}
        >
          Create Account
        </BaseButton>
        <BaseButton 
          variant="outline" 
          fullWidth 
          onClick={onLogin}
        >
          Already Registered? Login
        </BaseButton>
      </div>
    </div>
  )
}

export default WelcomePage