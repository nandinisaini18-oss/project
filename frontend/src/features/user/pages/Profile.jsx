import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from "react";
import { useUser } from "../hook/useUser";


const Profile = () => {

  const profile = useSelector(
    (state) => state.user.profile
  );

  const navigate = useNavigate();

  const { handleGetProfile } = useUser();

  useEffect(() => {

    handleGetProfile();

  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#F5F2E9] flex items-center justify-center font-sans">
        <div className="text-center bg-[#FDFAF6] p-12 rounded-3xl shadow-sm ring-1 ring-[#4A3B32]/5">
          <h2 className="text-2xl font-semibold text-[#4A3B32]">Profile not found</h2>
          <p className="mt-3 text-[#8B7E74]">Please log in to view your profile details.</p>
        </div>
      </div>
    );
  }

  const {
    fullname,
    email,
    contact,
    bio,
    age,
    gender,
    location,
    profilePicture,
    role,
    preferences
  } = profile;

  const renderPreferenceBadge = (label, value) => {
    if (value === undefined || value === null || value === '') return null;
    let displayValue = value;
    if (typeof value === 'boolean') {
      displayValue = value ? 'Yes' : 'No';
    } else {
      // Formats camelCase to Title Case (e.g., earlyBird -> Early Bird)
      displayValue = String(value).replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }

    return (
      <div className="bg-[#F5F2E9] px-5 py-3 rounded-2xl border border-[#8B7E74]/15 shadow-sm flex flex-col hover:shadow-md transition-shadow duration-300 group">
        <span className="text-xs text-[#8B7E74] mb-1.5 font-medium tracking-wider uppercase">{label}</span>
        <span className="text-sm font-semibold text-[#4A3B32] group-hover:text-[#C27A62] transition-colors">{displayValue}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F2E9] py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Profile Card */}
        <div className="bg-[#FDFAF6] shadow-xl shadow-[#4A3B32]/5 ring-1 ring-[#4A3B32]/10 rounded-3xl overflow-hidden relative">
          {/* Cover Photo / Background Graphic */}
          <div className="h-36 sm:h-48 bg-[#C27A62] opacity-90 relative overflow-hidden">
             {/* Subtle pattern or gradient overlay could go here */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <div className="px-6 sm:px-12 pb-10 relative -mt-16 sm:-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between">
              <div className="flex items-end space-x-6">
                <div className="relative group">
                  <div className="h-32 w-32 sm:h-44 sm:w-44 rounded-full border-4 border-[#FDFAF6] bg-[#F5F2E9] overflow-hidden shadow-lg">
                    {profilePicture ? (
                      <img src={profilePicture} alt={fullname} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-5xl sm:text-7xl text-[#C27A62] bg-[#F5F2E9]">
                        {fullname ? fullname.charAt(0).toUpperCase() : '?'}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pb-3 sm:pb-1">
                  <h1 className="text-3xl sm:text-4xl font-bold text-[#4A3B32] tracking-tight">{fullname || 'Unknown User'}</h1>
                  <p className="text-[#8B7E74] mt-2 text-base font-medium flex items-center space-x-2">
                    <span className="bg-[#F5F2E9] px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#8B7E74]/20">
                      {role || 'User'}
                    </span>
                    <span>•</span>
                    <span>{location?.city || 'City'}, {location?.state || 'State'}</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-0 pb-3 sm:pb-6 flex-shrink-0">
                <button
                  onClick={() => navigate('/editProfile')}
                  className="rounded-xl bg-[#FDFAF6] border-2 border-[#C27A62] px-7 py-2.5 text-sm font-semibold text-[#C27A62] hover:bg-[#C27A62] hover:text-[#FDFAF6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C27A62] transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            
            {/* About Me Section */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10 border-t border-[#8B7E74]/15 pt-10">
              <div className="col-span-1 lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#4A3B32] mb-4">About Me</h3>
                  {bio ? (
                    <p className="text-[#8B7E74] leading-relaxed text-base">
                      {bio}
                    </p>
                  ) : (
                    <p className="text-[#8B7E74] italic">This user hasn't added a bio yet.</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-[#F5F2E9]/50 p-6 rounded-2xl border border-[#8B7E74]/10">
                  <div>
                    <h4 className="text-xs font-semibold text-[#8B7E74] uppercase tracking-wider mb-1">Email</h4>
                    <p className="text-[#4A3B32] text-sm truncate" title={email}>{email || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#8B7E74] uppercase tracking-wider mb-1">Contact</h4>
                    <p className="text-[#4A3B32] text-sm">{contact || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#8B7E74] uppercase tracking-wider mb-1">Age</h4>
                    <p className="text-[#4A3B32] text-sm">{age || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#8B7E74] uppercase tracking-wider mb-1">Gender</h4>
                    <p className="text-[#4A3B32] text-sm capitalize">{gender || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        {preferences && (
          <div className="bg-[#FDFAF6] shadow-xl shadow-[#4A3B32]/5 ring-1 ring-[#4A3B32]/10 rounded-3xl p-8 sm:p-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#4A3B32]">Lifestyle & Preferences</h2>
                <p className="text-[#8B7E74] mt-2">A quick glance at living habits and roommate requirements.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {renderPreferenceBadge('Sleep', preferences.sleepSchedule)}
              {renderPreferenceBadge('Diet', preferences.diet)}
              {renderPreferenceBadge('Cleanliness', preferences.cleanliness)}
              {renderPreferenceBadge('Smoking', preferences.smoking)}
              {renderPreferenceBadge('Drinking', preferences.drinking)}
              {renderPreferenceBadge('Pets', preferences.pets)}
              {renderPreferenceBadge('Guests', preferences.guestFrequency)}
              {renderPreferenceBadge('Noise Tolerance', preferences.noiseTolerance)}
              {renderPreferenceBadge('Study Vibe', preferences.studyEnvironment)}
              {renderPreferenceBadge('Work Schedule', preferences.workSchedule)}
              {renderPreferenceBadge('Room Type', preferences.sharingPreference)}
              {renderPreferenceBadge('Pref. Gender', preferences.preferredGender)}
            </div>
            
            {!Object.values(preferences).some(val => val !== undefined && val !== null && val !== '') && (
              <div className="bg-[#F5F2E9] p-8 rounded-2xl text-center border border-[#8B7E74]/15">
                <p className="text-[#8B7E74] font-medium">No preferences set yet.</p>
                <button 
                  onClick={() => navigate('/preferences')}
                  className="mt-4 text-[#C27A62] font-semibold hover:underline"
                >
                  Set up your lifestyle preferences
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
