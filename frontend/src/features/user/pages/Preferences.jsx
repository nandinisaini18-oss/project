import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUser } from "../hook/useUser"

const Toggle = ({ enabled, onChange }) => (
    
  <button
    type="button"
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#C27A62] focus:ring-offset-2 focus:ring-offset-[#F5F2E9] ${
      enabled ? 'bg-[#C27A62]' : 'bg-[#8B7E74]/30'
    }`}
    role="switch"
    aria-checked={enabled}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#FDFAF6] shadow-sm ring-0 transition duration-300 ease-in-out ${
        enabled ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

const Select = ({ value, onChange, options, label, id }) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-sm font-medium text-[#4A3B32] mb-2 tracking-wide">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="block w-full rounded-xl border border-[#8B7E74]/30 py-3.5 pl-4 pr-10 text-base text-[#4A3B32] focus:border-[#C27A62] focus:outline-none focus:ring-1 focus:ring-[#C27A62] sm:text-sm bg-[#FDFAF6] appearance-none shadow-sm transition-all duration-300 hover:border-[#8B7E74]/50"
      style={{
        backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234A3B32%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1.2rem top 50%',
        backgroundSize: '0.65rem auto',
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const Section = ({ title, description, children }) => (
  <div className="py-10 border-b border-[#8B7E74]/15 last:border-0">
    <div className="md:grid md:grid-cols-3 md:gap-12">
      <div className="md:col-span-1 mb-8 md:mb-0 pr-4">
        <h3 className="text-xl font-semibold leading-6 text-[#4A3B32]">{title}</h3>
        {description && <p className="mt-3 text-sm leading-relaxed text-[#8B7E74]">{description}</p>}
      </div>
      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const Preferences = () => {
    const { handleUpdatePreferences, loading } = useUser();

    const profile = useSelector(
        (state) => state.user.profile
    );
  const [formData, setFormData] = useState({

    sleepSchedule: "earlyBird",

    diet: "non-vegetarian",

    cleanliness: "medium",

    smoking: false,

    drinking: false,

    pets: false,

    guestFrequency: "sometimes",

    noiseTolerance: "medium",

    studyEnvironment: "moderate",

    workSchedule: "student",

    sharingPreference: "privateRoom",

    preferredGender: "any"
});
useEffect(() => {

    if(profile?.preferences) {

        setFormData({

            sleepSchedule:
                profile.preferences.sleepSchedule
                || "earlyBird",

            diet:
                profile.preferences.diet
                || "non-vegetarian",

            cleanliness:
                profile.preferences.cleanliness
                || "medium",

            smoking:
                profile.preferences.smoking
                || false,

            drinking:
                profile.preferences.drinking
                || false,

            pets:
                profile.preferences.pets
                || false,

            guestFrequency:
                profile.preferences.guestFrequency
                || "sometimes",

            noiseTolerance:
                profile.preferences.noiseTolerance
                || "medium",

            studyEnvironment:
                profile.preferences.studyEnvironment
                || "moderate",

            workSchedule:
                profile.preferences.workSchedule
                || "student",

            sharingPreference:
                profile.preferences.sharingPreference
                || "privateRoom",

            preferredGender:
                profile.preferences.preferredGender
                || "any"
        });
    }

}, [profile]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {

        e.preventDefault();

        await handleUpdatePreferences(
            formData
        );
    };

  return (
    <div className="min-h-screen bg-[#F5F2E9] py-16 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-[#4A3B32] mb-3">Your Lifestyle</h1>
          <p className="text-lg text-[#8B7E74] max-w-2xl">
            Let's find the perfect living arrangement. Your honest answers help us match you with compatible roommates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#FDFAF6] shadow-xl shadow-[#4A3B32]/5 ring-1 ring-[#4A3B32]/10 sm:rounded-3xl overflow-hidden">
          <div className="px-6 sm:px-10 lg:px-12 py-4">
            
            <Section 
              title="Daily Habits" 
              description="Basic information about your daily routines and lifestyle choices."
            >
              <Select
                id="sleepSchedule"
                label="Sleep Schedule"
                value={formData.sleepSchedule}
                onChange={(e) => handleChange('sleepSchedule', e.target.value)}
                options={[
                  { value: 'earlyBird', label: 'Early Bird' },
                  { value: 'nightOwl', label: 'Night Owl' },
                ]}
              />
              <Select
                id="diet"
                label="Dietary Preference"
                value={formData.diet}
                onChange={(e) => handleChange('diet', e.target.value)}
                options={[
                  { value: 'vegetarian', label: 'Vegetarian' },
                  { value: 'non-vegetarian', label: 'Non-Vegetarian' },
                  { value: 'vegan', label: 'Vegan' },
                ]}
              />
              <Select
                id="cleanliness"
                label="Cleanliness Standard"
                value={formData.cleanliness}
                onChange={(e) => handleChange('cleanliness', e.target.value)}
                options={[
                  { value: 'low', label: 'Relaxed ' },
                  { value: 'medium', label: 'Moderate' },
                  { value: 'high', label: 'High ' },
                ]}
              />
            </Section>

            <Section 
              title="Work & Study" 
              description="How do you spend your working hours? This helps match you with compatible daily schedules."
            >
              <Select
                id="workSchedule"
                label="Work/Study Routine"
                value={formData.workSchedule}
                onChange={(e) => handleChange('workSchedule', e.target.value)}
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'workFromHome', label: 'Work from Home' },
                  { value: 'office', label: 'Go to Office' },
                  { value: 'hybrid', label: 'Hybrid' },
                ]}
              />
              <Select
                id="studyEnvironment"
                label="Home Vibe"
                value={formData.studyEnvironment}
                onChange={(e) => handleChange('studyEnvironment', e.target.value)}
                options={[
                  { value: 'quiet', label: 'Very Quiet ' },
                  { value: 'moderate', label: 'Moderate ' },
                  { value: 'social', label: 'Social ' },
                ]}
              />
              <Select
                id="noiseTolerance"
                label="Noise Tolerance"
                value={formData.noiseTolerance}
                onChange={(e) => handleChange('noiseTolerance', e.target.value)}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium ' },
                  { value: 'high', label: 'High' },
                ]}
              />
            </Section>

            <Section 
              title="Rules & Boundaries" 
              description="What are your dealbreakers and allowances for the apartment?"
            >
              <Select
                id="guestFrequency"
                label="Guest Frequency"
                value={formData.guestFrequency}
                onChange={(e) => handleChange('guestFrequency', e.target.value)}
                options={[
                  { value: 'rarely', label: 'Rarely ' },
                  { value: 'sometimes', label: 'Sometimes ' },
                  { value: 'often', label: 'Often ' },
                ]}
              />
              <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-3">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-[#8B7E74]/20 bg-[#F5F2E9]/40 hover:bg-[#F5F2E9]/80 transition-colors duration-300">
                  <span className="text-sm font-medium text-[#4A3B32]">Smoking OK</span>
                  <Toggle enabled={formData.smoking} onChange={(val) => handleChange('smoking', val)} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl border border-[#8B7E74]/20 bg-[#F5F2E9]/40 hover:bg-[#F5F2E9]/80 transition-colors duration-300">
                  <span className="text-sm font-medium text-[#4A3B32]">Drinking OK</span>
                  <Toggle enabled={formData.drinking} onChange={(val) => handleChange('drinking', val)} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl border border-[#8B7E74]/20 bg-[#F5F2E9]/40 hover:bg-[#F5F2E9]/80 transition-colors duration-300">
                  <span className="text-sm font-medium text-[#4A3B32]">Pets OK</span>
                  <Toggle enabled={formData.pets} onChange={(val) => handleChange('pets', val)} />
                </div>
              </div>
            </Section>

            <Section 
              title="Preferences" 
              description="Who are you looking to share your space with?"
            >
              <Select
                id="sharingPreference"
                label="Room Type"
                value={formData.sharingPreference}
                onChange={(e) => handleChange('sharingPreference', e.target.value)}
                options={[
                  { value: 'privateRoom', label: 'Private Room' },
                  { value: 'shareRoom', label: 'Shared Room' },
                ]}
              />
              <Select
                id="preferredGender"
                label="Preferred Gender"
                value={formData.preferredGender}
                onChange={(e) => handleChange('preferredGender', e.target.value)}
                options={[
                  { value: 'any', label: 'Any Gender' },
                  { value: 'female', label: 'Female' },
                  { value: 'male', label: 'Male' },
                ]}
              />
            </Section>

          </div>
          
          <div className="flex items-center justify-end gap-x-6 border-t border-[#8B7E74]/15 px-6 py-6 sm:px-10 lg:px-12 bg-[#FDFAF6]">
            <button type="button" className="text-sm font-semibold leading-6 text-[#8B7E74] hover:text-[#4A3B32] transition-colors duration-200">
              Cancel
            </button>
            <button
                type="submit"
                disabled={loading}
                className="
                    rounded-xl
                    bg-[#4A3B32]
                    px-8
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    hover:bg-[#3D3028]
                    transition-colors
                    duration-200
                    disabled:opacity-50
                "
                >
                {
                    loading
                    ? "Saving..."
                    : "Save Preferences"
                }
                </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
