import React, { useState, useEffect } from 'react'
import BaseInput from '../components/BaseInput'
import BaseButton from '../components/BaseButton'

const CreateAccountPage = ({ onBack, onCreateSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: false
  })
  const [errors, setErrors] = useState({})
  const [existingUsers, setExistingUsers] = useState([])

  // Load existing users from local storage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('popx_users') || '[]')
    setExistingUsers(storedUsers)
  }, [])

  const validateForm = () => {
    const newErrors = {}
    
    // Validation rules
    if (!formData.fullName) newErrors.fullName = 'Full Name is required'
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Password strength validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateAccount = () => {
    if (validateForm()) {
      // Check if email already exists
      const existingUser = existingUsers.find(
        u => u.email.toLowerCase() === formData.email.toLowerCase()
      )

      if (existingUser) {
        setErrors({ email: 'Email already exists' })
        return
      }

      // Add user to local storage
      const updatedUsers = [...existingUsers, formData]
      localStorage.setItem('popx_users', JSON.stringify(updatedUsers))
      
      // Update local state
      setExistingUsers(updatedUsers)
      
      // Call success callback
      onCreateSuccess(formData)
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear specific field error when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">Create your PopX account</h1>
        
        <div className="space-y-4 mt-6">
          <BaseInput
            label="Full Name*"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            errorMessage={errors.fullName}
            showSuccess={!!formData.fullName && !errors.fullName}
          />
          <BaseInput
            label="Phone number*"
            value={formData.phoneNumber}
            onChange={(e) => updateFormData('phoneNumber', e.target.value)}
            errorMessage={errors.phoneNumber}
            showSuccess={!!formData.phoneNumber && !errors.phoneNumber}
          />
          <BaseInput
            label="Email address*"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            variant="email"
            errorMessage={errors.email}
            showSuccess={!!formData.email && !errors.email}
          />
          <BaseInput
            label="Password*"
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            variant="password"
            errorMessage={errors.password}
            showSuccess={!!formData.password && !errors.password}
          />
          <BaseInput
            label="Company name"
            value={formData.companyName}
            onChange={(e) => updateFormData('companyName', e.target.value)}
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Are you an Agency?*
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="isAgency"
                  checked={formData.isAgency === true}
                  onChange={() => updateFormData('isAgency', true)}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="isAgency"
                  checked={formData.isAgency === false}
                  onChange={() => updateFormData('isAgency', false)}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <BaseButton 
              variant="primary" 
              fullWidth 
              onClick={handleCreateAccount}
            >
              Create Account
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

export default CreateAccountPage