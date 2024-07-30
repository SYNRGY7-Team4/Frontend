// src/components/PhoneNumberInput.tsx

import React from 'react';

interface PhoneNumberInputProps {
  id: string;
  placeholder: string;
  ariaLabel: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ id, placeholder, ariaLabel, value, onChange }) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Hanya izinkan angka
    onChange({ ...e, target: { ...e.target, value: numericValue } });
  };

  return (
    <div className='flex flex-col gap-y-1'>
      <label htmlFor={id} className='text-sm font-medium text-gray-700'>No. HP</label>
      <div className='flex items-center w-full bg-neutral-02 py-3 px-5 rounded-lg focus:outline-primary-blue'>
        <span className='mr-2'>+62</span>
        <input
          type='tel'
          id={id}
          className='flex-grow bg-transparent border-none outline-none'
          placeholder={placeholder}
          aria-label={ariaLabel}
          value={value}
          onChange={handlePhoneChange}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
