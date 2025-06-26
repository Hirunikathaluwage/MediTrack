import React, { useState } from 'react';
import { registerCustomer } from '../../api/customerAPI';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    age: ''
  });

  const [message, setMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await registerCustomer(formData);

      if (res.user || res.userId) {
        localStorage.setItem('user', JSON.stringify(res.user || res));
        setMessage('Registration successful! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(res.message || ' Registration completed, but no user returned');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-200 rounded-full opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-200 rounded-full opacity-20"></div>

          <div className="relative p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">MediTrack</h2>
              <p className="text-gray-500 mt-2">Create your account in a few simple steps</p>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-between items-center mb-8 px-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${currentStep >= step
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                      }`}
                  >
                    {step}
                  </div>
                  <div className="text-xs mt-1 text-gray-500">
                    {step === 1 ? 'Basic' : step === 2 ? 'Contact' : 'Confirm'}
                  </div>
                </div>
              ))}
              <div className="absolute top-24 left-10 right-10 h-0.5 bg-gray-200 -z-10"></div>
              <div
                className="absolute top-24 left-10 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all -z-10"
                style={{ width: `${(currentStep - 1) * 50}%` }}
              ></div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full pl-10 pr-4 py-3 border-0 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                      <span className="absolute left-3 top-3.5 text-gray-400">👤</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full pl-10 pr-4 py-3 border-0 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                      <span className="absolute left-3 top-3.5 text-gray-400">✉️</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-4 py-3 border-0 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                      <span className="absolute left-3 top-3.5 text-gray-400">🔒</span>
                    </div>
                  </div>

                  <div className="mt-6 text-right">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="relative">
                      <input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St, City, Country"
                        className="w-full pl-10 pr-4 py-3 border-0 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                      <span className="absolute left-3 top-3.5 text-gray-400">🏠</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+1 (123) 456-7890"
                        className="w-full pl-10 pr-4 py-3 border-0 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                      <span className="absolute left-3 top-3.5 text-gray-400">📱</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <div className="relative">
                      <input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="25"
                        min="1"
                        className="w-full pl-10 pr-4 py-3 border-0 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                      <span className="absolute left-3 top-3.5 text-gray-400">📅</span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-3">Please confirm your details:</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-500">Name:</p>
                      <p className="text-gray-800 font-medium">{formData.name || '—'}</p>

                      <p className="text-gray-500">Email:</p>
                      <p className="text-gray-800 font-medium">{formData.email || '—'}</p>

                      <p className="text-gray-500">Address:</p>
                      <p className="text-gray-800 font-medium">{formData.address || '—'}</p>

                      <p className="text-gray-500">Phone:</p>
                      <p className="text-gray-800 font-medium">{formData.phoneNumber || '—'}</p>

                      <p className="text-gray-500">Age:</p>
                      <p className="text-gray-800 font-medium">{formData.age || '—'}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Complete Registration'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {message && (
              <div className={`mt-6 p-4 rounded-lg text-center animate-fadeIn ${message.includes('success')
                  ? 'bg-green-50 text-green-800 border-l-4 border-green-500'
                  : 'bg-red-50 text-red-800 border-l-4 border-red-500'
                }`}>
                {message}
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6 text-gray-500 text-sm">
          Already have an account? <a href="#" className="text-blue-600 hover:underline">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
