import { ChevronLeft } from 'lucide-react';
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

const ResetPasswordView = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

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
            Forgot your password?
          </h1>
          <p className="mb-8 text-[15px] text-[#6b7280]">
            Don’t worry, happens to all of us. Enter your email below to recover your password.
          </p>

          <form className="space-y-5">
            <TextInput
              label="Email"
              type="email"
              placeholder="john.doe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className="w-full rounded-md bg-[#2f66ff] py-3 font-medium text-white transition hover:bg-[#1f4fe0]"
            >
              Submit
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

export default ResetPasswordView;
