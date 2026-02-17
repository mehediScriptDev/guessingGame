import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Logo = () => (
  <div className="mb-10 flex items-center gap-2">
    <Link to="/">
      <img src="/img/logo-white.png" alt="" />
    </Link>
  </div>
);

const TextInput = ({ label, type = 'text', placeholder, value, onChange, right }) => (
  <label className="block">
    <span className="mb-1 block text-sm text-[#111b2b]">{label}</span>
    <div className="relative">
      <input
        type={type}
        className="w-full rounded-md border border-gray-300 px-3 py-3 text-[15px] transition outline-none focus:border-[#2f66ff] focus:ring-2 focus:ring-[#2f66ff]/20"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {right ? <div className="absolute inset-y-0 right-3 flex items-center">{right}</div> : null}
    </div>
  </label>
);

const EyeIcon = ({ show, onClick }) => (
  <button
    type="button"
    aria-label={show ? 'Hide password' : 'Show password'}
    onClick={onClick}
    className="text-gray-500 hover:text-[#2f66ff]"
  >
    {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
  </button>
);

const SetPasswordView = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="bg-[#f9fafb]">
      <div className="grid grid-cols-1 items-center md:grid-cols-2">
        {/* Left: form */}
        <div className="px-6 py-10 md:p-24 lg:px-32">
          <Logo />
          <button
            onClick={() => navigate(-1)}
            className="text-md mb-4 flex items-center text-[#2f66ff] hover:underline"
          >
            <ChevronLeft /> Back
          </button>

          <h1 className="mb-2 text-[2rem] leading-tight font-semibold text-[#111b2b]">
            Set a new password
          </h1>
          <p className="mb-8 text-[15px] text-[#6b7280]">
            Your previous password has been reseted. Please set a new password for your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password field */}
            <TextInput
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="••••••••••"
              value={formData.newPassword}
              onChange={handleChange('newPassword')}
              right={
                <EyeIcon
                  show={showNewPassword}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                />
              }
            />

            {/* Confirm Password field */}
            <TextInput
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••••"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              right={
                <EyeIcon
                  show={showConfirmPassword}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />

            <button
              type="submit"
              className="w-full rounded-md bg-[#2f66ff] py-3 font-medium text-white transition hover:bg-[#1f4fe0]"
            >
              Set Password
            </button>
          </form>
        </div>

        {/* Right: image */}
        <div className="">
          <img src="/img/login.png" alt="City skyline" className="h-screen w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default SetPasswordView;
