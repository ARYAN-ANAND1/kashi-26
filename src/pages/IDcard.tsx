import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import AuthContext from "@/Context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const IDCard = () => {
  const { userInfo } = useContext(AuthContext);
  console.log("useer", userInfo);
  const authToken = JSON.parse(localStorage.getItem("authTokens") || "");
  
  const photoUrl = userInfo?.profile_picture || '';

  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/generateQR`, { 
          responseType: 'blob',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken.access}`,
          },
        });
        const url = URL.createObjectURL(response.data); // Create a URL for the blob
        console.log("qr", url);
        
        setQrCodeUrl(url); // Set the URL for the QR code image
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };

    if (userInfo) {
      fetchQrCode();
    }
  }, [userInfo]);

  const downloadIDCard = () => {
    const idCardElement = document.getElementById("id-card");
    if (idCardElement) {
      html2canvas(idCardElement, { useCORS: true }).then((canvas) => { // Enable CORS for images
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          putOnlyUsedFonts: true,
          floatPrecision: 16 // or "smart", default is 16
        });
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('IDCard.pdf');
      });
    }
  };

  return (
    <>
    <div id="id-card" className="w-[210mm] h-[297mm] p-6 border mx-auto border-gray-400 flex flex-col bg-white shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <img src="/iit.jpg" alt="Left" className="w-24 h-24 mr-4" />
        <h2 className="text-4xl font-bold text-gray-800">Provisional ID Card</h2>
        <img src="/ky.jpg" alt="Right" className="w-40" />
      </div>
      <div className="border-t border-gray-400 mb-4"></div>
      
      <div className="border-dotted border-[3px] w-[10cm] mx-auto border-gray-800 mt-4 text-center">
      <div className="flex justify-center w-[9.7cm] mx-auto bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-200 p-4 rounded-lg shadow-md">
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 shadow-md rounded-lg p-4 w-full h-full border border-gray-400 flex">
          <div className="flex-shrink-0">
            <img src={photoUrl} alt="User" className="w-28 h-28 " />
            <div className="w-28 h-28 bg-gray-300 border border-gray-400 flex items-center justify-center">
              <img src={qrCodeUrl} alt="QR Code" className="w-28 h-28 border border-gray-400" />
            </div>
          </div>
          <div className="ml-6 flex-grow">
            <div className="text-lg text-left">
              <p><span className="font-semibold">KY-ID:</span> {userInfo?.ky_id}</p>
              <p><span className="font-semibold">Name:</span> {userInfo?.name}</p>
              <p><span className="font-semibold">Contact:</span> {userInfo?.mobile_number}</p>
              <p><span className="font-semibold">College:</span> {userInfo?.college}</p>
            </div>
            <div className="border-t border-gray-400 my-4"></div>
          </div>
        </div>
        </div>
      </div>
          <p className="font-semibold text-center">Cut along dotted border</p>
      <div className="text-lg text-gray-700 w-full mx-auto p-4 bg-gray-100 rounded-lg shadow-md mt-4">
        <p className='text-red-500 text-center mt-6 font-semibold'>Bring an A4 size Coloured Printed Copy of this ID card with you.</p>
        <p className="mt-3 font-semibold">Instructions:</p>
        <ul className="list-disc text-base list-inside pl-5">
          <li>This ID card is provisional and does not confer entitlement as a valid identity or participant's pass for Kashiyatra'26. It is mandatory for all participants to bring this ID Card at the registration desk in front of SAC, IIT BHU for getting a valid id card.</li>
          <li>This provisional ID Card must be in an undamaged condition and it is advised to be carried within a file case to prevent any folding or creasing.</li>
          <li>Additionally, participants are required to bring two identical passport-sized photographs and AADHAR Card or any government issued photo identity proof as well as their Institute ID Card.</li>
          <li>Outer line of id card must be appropriately cut along the dotted lines and presented at the registration desk.</li>
          <li>Participants must bring a minimum of two printed copies of this ID Card for the registration process.</li>
          <li>Any forgery with the ID Card will lead to the jurisdiction of the Kashiyatra Organizing Committee and the authorities of IIT (BHU) Varanasi.</li>
          <li>This identification card does not serve as a valid proof of payment status. It is exclusively designated as a provisional identification card, intended solely for the purpose of verifying payment at the registration desk.</li>
        </ul>
      </div>
    </div>
      <div className="flex justify-center mt-4">
        <button id="download-button" onClick={downloadIDCard} className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
          Download ID Card
        </button>
      </div>
      </>
  );
};

export default IDCard;