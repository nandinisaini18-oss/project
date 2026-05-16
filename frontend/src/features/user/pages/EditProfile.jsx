import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useUser } from '../hook/useUser';

const EditProfile = () => {
  const profile = useSelector((state) => state.user.profile);
  const navigate = useNavigate();
  const { handleUpdateProfile, loading } = useUser();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullname: '',
    contact: '',
    bio: '',
    age: '',
    gender: '',
    city: '',
    state: ''
  });
  
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.fullname || '',
        contact: profile.contact || '',
        bio: profile.bio || '',
        age: profile.age || '',
        gender: profile.gender || '',
        city: profile.location?.city || '',
        state: profile.location?.state || ''
      });
      if (profile.profilePicture) {
        setPreviewImage(profile.profilePicture);
      }
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert to FormData for API submission handling file upload
    const submitData = new FormData();

    submitData.append("fullname", formData.fullname);
    submitData.append("contact", formData.contact);
    submitData.append("bio", formData.bio);
    submitData.append("age", formData.age);
    submitData.append("gender", formData.gender);
    submitData.append("city", formData.city);
    submitData.append("state", formData.state);

    if(profilePicture) {
        submitData.append(
            "profilePicture",
            profilePicture
        );
    }

    try {
      await handleUpdateProfile(submitData);
      navigate('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  // Reusable Tailwind classes for inputs
  const inputClasses = "mt-2 block w-full rounded-xl border border-[#8B7E74]/30 py-3.5 pl-4 pr-4 text-base text-[#4A3B32] focus:border-[#C27A62] focus:outline-none focus:ring-1 focus:ring-[#C27A62] bg-[#FDFAF6] shadow-sm transition-all duration-300 hover:border-[#8B7E74]/50 placeholder:text-[#8B7E74]/40";
  const labelClasses = "block text-sm font-medium text-[#4A3B32] tracking-wide mb-1";

  return (
    <div className="min-h-screen bg-[#F5F2E9] py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-[#4A3B32] mb-3">Edit Profile</h1>
          <p className="text-lg text-[#8B7E74] max-w-xl">
            Update your personal information to help potential roommates get to know you better.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#FDFAF6] shadow-xl shadow-[#4A3B32]/5 ring-1 ring-[#4A3B32]/10 sm:rounded-3xl overflow-hidden">
          
          <div className="px-6 sm:px-10 lg:px-12 py-10 space-y-12">
            
            {/* Profile Picture Section */}
            <div>
              <h3 className="text-xl font-semibold leading-6 text-[#4A3B32] mb-6">Profile Picture</h3>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0 sm:space-x-8">
                <div 
                  className="h-36 w-36 rounded-full border-4 border-[#F5F2E9] bg-[#F5F2E9] overflow-hidden shadow-md flex-shrink-0 relative group cursor-pointer" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Profile preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-5xl text-[#C27A62] font-semibold">
                      {formData.fullname ? formData.fullname.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#4A3B32]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[#FDFAF6] text-sm font-semibold tracking-wider uppercase">Change</span>
                  </div>
                </div>
                
                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-xl bg-[#F5F2E9] px-6 py-3 text-sm font-semibold text-[#4A3B32] hover:bg-[#EBE7DD] transition-colors duration-200 border border-[#8B7E74]/20 shadow-sm"
                  >
                    Upload New Photo
                  </button>
                  <p className="mt-3 text-sm text-[#8B7E74]">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-[#8B7E74]/15"></div>

            {/* Basic Info Section */}
            <div>
              <h3 className="text-xl font-semibold leading-6 text-[#4A3B32] mb-8">Basic Information</h3>
              <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8">
                <div className="sm:col-span-2">
                  <label htmlFor="fullname" className={labelClasses}>Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="bio" className={labelClasses}>About You</label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell potential roommates about yourself, your hobbies, and what you're like to live with..."
                  />
                </div>

                <div>
                  <label htmlFor="age" className={labelClasses}>Age</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g. 24"
                    min="18"
                    max="100"
                  />
                </div>

                <div>
                  <label htmlFor="gender" className={labelClasses}>Gender</label>
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234A3B32%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1.2rem top 50%',
                      backgroundSize: '0.65rem auto',
                    }}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-[#8B7E74]/15"></div>

            {/* Contact & Location Section */}
            <div>
              <h3 className="text-xl font-semibold leading-6 text-[#4A3B32] mb-8">Contact & Location</h3>
              <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8">
                <div className="sm:col-span-2">
                  <label htmlFor="contact" className={labelClasses}>Phone Number</label>
                  <input
                    type="text"
                    name="contact"
                    id="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="city" className={labelClasses}>City</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g. San Francisco"
                  />
                </div>

                <div>
                  <label htmlFor="state" className={labelClasses}>State / Region</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g. CA"
                  />
                </div>
              </div>
            </div>

          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-x-6 border-t border-[#8B7E74]/15 px-6 py-6 sm:px-10 lg:px-12 bg-[#FDFAF6]">
            <button 
              type="button" 
              onClick={() => navigate('/profile')}
              className="text-sm font-semibold leading-6 text-[#8B7E74] hover:text-[#4A3B32] transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#C27A62] px-8 py-3.5 text-sm font-semibold text-[#FDFAF6] shadow-md shadow-[#C27A62]/20 hover:bg-[#B36952] hover:shadow-lg hover:shadow-[#C27A62]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C27A62] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none disabled:hover:shadow-md flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
