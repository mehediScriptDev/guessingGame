import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    {show ? <EyeOff /> : <Eye />}
  </button>
);

const RegisterView = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="min-h-screen bg-[#f9fafb]">
      <div className="grid grid-cols-1 items-center md:grid-cols-2">
        {/* Right: image */}
        <div className="order-2 md:order-1">
          <img src="/img/login.png" alt="City skyline" className="h-screen w-full object-cover" />
        </div>
        {/* Left: form */}
        <div className="order-1 px-6 py-10 md:order-2 md:p-24 lg:px-32">
          <Logo />

          <h1 className="mb-2 text-[2rem] leading-tight font-semibold text-[#111b2b]">Sign up</h1>
          <p className="mb-8 text-[15px] text-[#6b7280]">
            Let's get you all set up so you can access your personal account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name and Last Name in one row */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <TextInput
                label="First Name"
                type="text"
                placeholder="Nayem"
                value={formData.firstName}
                onChange={handleChange('firstName')}
              />
              <TextInput
                label="Last Name"
                type="text"
                placeholder="Islam"
                value={formData.lastName}
                onChange={handleChange('lastName')}
              />
            </div>

            {/* Email and Phone Number in one row */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <TextInput
                label="Email"
                type="email"
                placeholder="john.doe@gmail.com"
                value={formData.email}
                onChange={handleChange('email')}
              />
              <TextInput
                label="Phone Number"
                type="tel"
                placeholder="+1 234 567 890"
                value={formData.phoneNumber}
                onChange={handleChange('phoneNumber')}
              />
            </div>

            {/* Password field */}
            <TextInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••"
              value={formData.password}
              onChange={handleChange('password')}
              right={<EyeIcon show={showPassword} onClick={() => setShowPassword(!showPassword)} />}
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

            {/* Terms and Conditions checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded border-gray-300 text-[#2f66ff] focus:ring-[#2f66ff]"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label htmlFor="terms" className="ml-2 text-[14px] text-[#111b2b]">
                I agree to all the Terms and Privacy Policies
              </label>
            </div>

            {/* Create Account button */}
            <button
              type="submit"
              className="w-full rounded-md bg-[#2f66ff] py-3 font-medium text-white transition hover:bg-[#1f4fe0]"
            >
              Create account
            </button>
          </form>

          {/* Already have an account link */}
          <p className="mt-6 text-center text-[14px] text-[#6b7280]">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-rose-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterView;
