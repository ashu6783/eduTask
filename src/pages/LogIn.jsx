import React, { useState } from 'react'
import BaseInput from '../components/BaseInput'
import BaseButton from '../components/BaseButton'

// Mock user database (in a real app, this would be a backend service)
const MOCK_USERS = [
  {
    fullName: 'Marry Doe',
    email: 'marry@gmail.com',
    password: 'Password123',
    phoneNumber: '1234567890',
    companyName: 'PopX Inc',
    isAgency: true
  }
]

const LoginPage = ({ onBack, onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    // Find user in mock database
    const user = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (user) {
      onLoginSuccess(user)
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">Signin to your PopX account</h1>
        <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        
        <div className="space-y-4">
          <BaseInput
            label="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            type="email"
            placeholder="Enter email address"
            className="w-full mb-7"
          />
          <BaseInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            placeholder="Enter password"
            className="w-full"
          />
          
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}

          <div className="space-y-4 mt-4">
            <BaseButton 
              variant="primary" 
              fullWidth 
              onClick={handleLogin}
            >
              Login
            </BaseButton>
            <BaseButton 
              variant="outline" 
              fullWidth 
              onClick={onBack}
            >
              Back
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage