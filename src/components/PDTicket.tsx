import React, { useState } from 'react';

const PDTicket: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('option1');
    const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setPaymentScreenshot(event.target.files[0]);
        }
    };

    const renderImage = () => {
        if (selectedOption === 'option1') {
            return <img src="/upi-400.jpg" className='h-[250px]  object-cover mx-auto' alt="Option 1" />;
        } else if (selectedOption === 'option2') {
            return <img src="/upi-1900.jpg" className='h-[250px] object-cover mx-auto' alt="Option 2" />;
        }
        return null;
    };

    const handleProceedPayment = () => {
        // Handle payment logic here
        console.log('Proceeding with payment...');
    };

    return (
        <div className="border rounded shadow bg-[#DFB384] w-full h-full flex flex-col items-center">
            <h2 className="text-lg font-bold m-4">Select Ticket Option</h2>
            <select value={selectedOption} onChange={handleOptionChange} className="mb-4 p-3 border rounded w-full">
                <option value="option1">Adjudicator - ₹400</option>
                <option value="option2">Full Team - ₹1900</option>
            </select>
            <div className="mb-4 w-full flex justify-center items-center">
                {renderImage()}
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 w-full"
                placeholder="Upload payment screenshot"
            />
            {paymentScreenshot && (
                <div className="m-2 w-full">
                    <h3 className="text-sm font-semibold">Preview:</h3>
                    <img src={URL.createObjectURL(paymentScreenshot)} alt="Payment Screenshot" className="mt-2 max-w-full h-auto" />
                </div>
            )}
            <button onClick={handleProceedPayment} className="w-full p-2 bg-green-500 text-white rounded">
                Proceed Payment
            </button>
        </div>
    );
};

export default PDTicket;
