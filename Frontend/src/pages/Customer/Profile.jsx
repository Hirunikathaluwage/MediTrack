import React, { useEffect, useState } from 'react';
import { getCustomerProfile, updateCustomerProfile } from '../../api/customerAPI';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    age: '',
    avatar: ''
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCustomerProfile();
        setProfile({ ...data, password: '' });
        setAvatarPreview(data.avatar ? `http://localhost:5000${data.avatar}` : null);
      } catch (err) {
        const localUser = JSON.parse(localStorage.getItem('user'));
        if (localUser) {
          setProfile({ ...localUser, password: '' });
          setAvatarPreview(localUser.avatar ? `http://localhost:5000${localUser.avatar}` : null);
        } else {
          setMessage('⚠️ Failed to load profile');
        }
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (avatarFile) formData.append('avatar', avatarFile);

      const res = await updateCustomerProfile(formData);
      setMessage(res.message || '✅ Profile updated');
      localStorage.setItem('user', JSON.stringify({ ...profile, avatar: res.avatar }));
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Update failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl overflow-hidden mt-10">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8">
        <h2 className="text-3xl font-bold text-white">My Profile</h2>
        <p className="text-blue-100 mt-1">Manage your personal information</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-4 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'personal' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button
          className={`flex-1 py-4 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'security' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>

      <div className="p-8">
        <form onSubmit={handleUpdate} className="space-y-6" encType="multipart/form-data">
          {/* Avatar Section with Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-200">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 ring-4 ring-white shadow-lg">
                <img
                  src={avatarPreview || (profile.avatar ? `http://localhost:5000${profile.avatar}` : '/default-avatar.png')}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <label htmlFor="avatar-upload" className="text-white text-xs font-medium cursor-pointer p-2">
                  Change
                </label>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{profile.name || 'Your Name'}</h3>
              <p className="text-gray-500 text-sm">{profile.email || 'your.email@example.com'}</p>
              <div className="mt-3 flex items-center">
                <label htmlFor="avatar-upload" className="cursor-pointer bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Upload New Photo
                </label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
              </div>
            </div>
          </div>

          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Full Name" 
                  name="name" 
                  value={profile.name} 
                  onChange={handleChange} 
                  required 
                  icon="👤"
                />
                <Input 
                  label="Email Address" 
                  name="email" 
                  value={profile.email} 
                  onChange={handleChange} 
                  type="email" 
                  required 
                  icon="✉️"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Phone Number" 
                  name="phoneNumber" 
                  value={profile.phoneNumber} 
                  onChange={handleChange}
                  icon="📱"
                />
                <Input 
                  label="Age" 
                  name="age" 
                  value={profile.age} 
                  onChange={handleChange} 
                  type="number"
                  icon="🎂"
                />
              </div>
              
              <Input 
                label="Address" 
                name="address" 
                value={profile.address} 
                onChange={handleChange}
                icon="🏠"
              />
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-400">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Changing your password will log you out of all devices.
                    </p>
                  </div>
                </div>
              </div>
              
              <Input 
                label="Current Password" 
                name="currentPassword" 
                type="password" 
                icon="🔒"
              />
              
              <Input 
                label="New Password" 
                name="password" 
                value={profile.password} 
                onChange={handleChange} 
                type="password"
                icon="🔑"
              />
              
              <Input 
                label="Confirm New Password" 
                name="confirmPassword" 
                type="password"
                icon="✓"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : 'Save Changes'}
            </button>
            <button
              type="button"
              className="flex-1 sm:flex-none bg-white text-gray-700 border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="text-sm font-medium">
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = "text", required = false, icon }) => (
  <div className="relative">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </label>
    <input
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      type={type}
      required={required}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    />
  </div>
);

export default Profile;