// src/components/PhoneNumberInput.tsx

import React, { useState } from 'react';

interface PhoneNumberInputProps {
  id: string;
  placeholder: string;
  ariaLabel: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ id, placeholder, ariaLabel }) => {
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, ''); // Hanya izinkan angka
    setPhone(numericValue);
  };

  return (
    <div className='flex flex-col gap-y-1'>
      <div className='flex items-center w-full bg-neutral-02 py-3 px-5 rounded-lg focus:outline-primary-blue'>
        <span className='mr-2'>+62</span>
        <input
          type='tel'
          id={id}
          className='flex-grow bg-transparent border-none outline-none'
          placeholder={placeholder}
          aria-label={ariaLabel}
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
