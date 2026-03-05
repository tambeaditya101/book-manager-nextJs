'use client';

import { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center z-50
      bg-black/40 backdrop-blur-sm transition-opacity duration-200
      ${show ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 relative
        transform transition-all duration-200
        ${show ? 'scale-100 translate-y-0' : 'scale-95 translate-y-2'}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-lg'
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
