import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "@/Context/AuthContext";

interface EventCardProps {
  title: string;
  type: "Individual" | "Team";
  description: string;
  details: string;
  image: string;
  eventId: number;
  registerButtonText: string;
  setEId: (eId: number | null) => void;
  isZonals?: boolean;
}

const EventCard2: React.FC<EventCardProps> = ({
  title,
  type,
  description,
  details,
  image,
  eventId,
  registerButtonText,
  setEId,
  isZonals,
}) => {
  const { userInfo } = useContext(AuthContext);
  const [paymentStatus, setPaymentStatus] = useState(userInfo?.paymentStatus);
  const navigate = useNavigate();

  useEffect(() => {
    setPaymentStatus(userInfo?.paymentStatus);
  }, [userInfo?.paymentStatus]);

  const handleEventRegistration = (
    eventId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation(); // Prevent card click
    if (registerButtonText === "Register Now") {
      setEId(eventId);
    }
  };

  const handleTitleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    navigate(`/competitions/${title}`);
  };

  const zonalsCardClasses = isZonals
    ? "bg-[#100318]/70 border border-[#6A3E92] shadow-xl"
    : "bg-[#D1914D]";
  const zonalsHeaderClasses = isZonals ? "bg-[#310D3D]" : "bg-[#DFB384]";
  const zonalsTextColor = isZonals ? "text-yellow-300" : "text-black";
  const zonalsLinkClasses = isZonals
    ? "bg-[#6A3E92] hover:bg-[#C285E0] px-2 text-yellow-300 rounded-2xl py-1 transition-colors"
    : "bg-[#430B04] hover:text-[#fafafa] px-2 text-black rounded-2xl py-1";

  return (
    <div
      className={`group relative w-[90%] md:w-[350px] m-4 md:m-10 rounded-xl overflow-hidden transition-all ease-in-out duration-700 ${zonalsCardClasses} ${zonalsTextColor}`}
    >
      <div
        className={`w-full flex flex-col justify-center items-center rounded-xl pb-2 ${zonalsHeaderClasses}`}
      >
        <img
          src={image}
          className="h-[220px] w-[95%] rounded-lg m-4 object-cover"
          alt={title}
        />
        <div className="flex text-center items-center font-semibold justify-between w-full p-2 flex-wrap">
          <p
            className="text-2xl font-semibold w-[60%] font-delius cursor-pointer"
            onClick={handleTitleClick}
          >
            {title}
          </p>
          <p className="mt-2 md:mt-0">
            {paymentStatus ? (
              <button
                onClick={(e) => handleEventRegistration(eventId, e)}
                className={`transition-colors ${
                  isZonals
                    ? "text-yellow-300 hover:text-yellow-100"
                    : "text-black hover:text-gray-700"
                }`}
              >
                {registerButtonText}
              </button>
            ) : (
              <Link
                to="https://konfhub.com/copy-kashiyatra26"
                onClick={(e) => e.stopPropagation()} // Prevent card click
                className={`${zonalsLinkClasses}`}
              >
                Payment Due
              </Link>
            )}
          </p>
        </div>
        <p className="text-lg text-[#D3D3D3]">{type} Event</p>
      </div>

      {/* Hover / Expandable Details */}
      <div className="max-h-0 opacity-0 overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out group-hover:max-h-[400px] group-hover:opacity-100 px-4 py-4 text-[#D9D7B6]">
        <p className="text-center text-lg font-poiret">{description}</p>
        <p>{details}</p>
      </div>
    </div>
  );
};

export default EventCard2;
