import React from 'react';
import { Link } from 'react-router-dom';

const ChooseRegister: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/newBG.jpg')] bg-cover">
      <div className="bg-white/90 rounded-xl p-8 shadow-lg max-w-lg w-full mx-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register as</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register" className="flex-1 text-center py-3 rounded-full bg-[#3E0F0F] text-white font-semibold">Kashiyatra User</Link>
          {/* <Link to="/zonals-register" className="flex-1 text-center py-3 rounded-full bg-[#6A3E92] text-yellow-200 font-semibold">Zonal User</Link> */}
        </div>
        {/* <p className="text-sm text-center text-gray-600 mt-4">If you're not sure, choose Kashiyatra User. Zonal accounts are separate and have their own login/profile.</p> */}
      </div>
    </div>
  );
};

export default ChooseRegister;
