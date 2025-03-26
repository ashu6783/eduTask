import React from 'react'
import BaseButton from '../components/BaseButton'

const AccountSettingsPage = ({ user, onLogout }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img 
              src="/api/placeholder/120/120" 
              alt="Profile" 
              className="rounded-full w-24 h-24 object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-purple-500 text-white rounded-full p-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0011.586 3H8.414a1 1 0 00-.707.293L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold">{user.fullName}</h2>
        <p className="text-gray-600 mb-4">{user.email}</p>
        
        <div className="bg-white shadow-md rounded-lg p-6 text-left mb-6">
          <p className="text-gray-600">
            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing 
            Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut 
            Labore Et Dolore Magna Aliquyam Erat, Sed Diam
          </p>
        </div>
        
        <BaseButton 
          variant="danger" 
          fullWidth 
          onClick={onLogout}
        >
          Logout
        </BaseButton>
      </div>
    </div>
  )
}

export default AccountSettingsPage