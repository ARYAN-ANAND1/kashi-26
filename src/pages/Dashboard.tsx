import { Navbar } from "@/components/Navbar";
import dashboardBg from "/dashboardBg.svg";
import { Link } from "react-router-dom";
import { CSSProperties, useContext, useEffect, useState } from "react";
import AuthContext from "@/Context/AuthContext";
import { getEventFromEventId } from "@/../store/getEventFromId"
import upload_image from "../utils/uploadImage";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

import axios from "axios"; // Ensure axios is imported at the top of the file
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const PayButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/payment")}
      className="bg-[#B36BFF] hover:bg-[#00F2FF] text-white font-bold py-2 px-6 rounded-full transition duration-300 mx-auto block"
    >
      Pay Now
    </button>
  );
};


const Dashboard = () => {
  const { logoutUser, userInfo } = useContext(AuthContext);
  console.log("uf", userInfo);
  const [paymentStatus, setPaymentStatus] = useState(userInfo?.paymentStatus);
  const [registeredTeams, setRegisteredTeams] = useState<any[]>([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  const styling : CSSProperties = {
        fontWeight: 700,
        background: 'linear-gradient(to right, #B36BFF, #00F2FF)',
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      };
  const headingStyle: CSSProperties = {
        fontWeight: 700,
        background: 'linear-gradient(to right, #B36BFF, #00F2FF)',
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        display: 'block',
        width: 'fit-content',
        marginInline: 'auto',
      };

  //connect to backend
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const authToken = JSON.parse(localStorage.getItem("authTokens") || "");

    if (!authToken) {
      toast.error("Unauthorized Access: No token found!");
      return;
    }
    const file = event.target.files?.[0];
    if (file) {
      const uploadedUrl = await upload_image(file);
      setUploadedImageUrl(uploadedUrl);
      console.log("Uploaded file URL:", uploadedUrl);
      console.log("Uploaded file URL usestate:", uploadedImageUrl);
      if (uploadedUrl) {
        try {
          const response = await axios.post(
            `${BACKEND_URL}/api/user/updatePicture`,
            { profile_picture: uploadedUrl },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken.access}`,
                // Authorization: `Bearer ${userInfo?.accessToken}`,
              },
            }
          );
          console.log("Image uploaded successfully:", response.data);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      } else {
        console.log("No image URL to upload");
      }
    }
  };

  useEffect(() => {
    setPaymentStatus(userInfo?.paymentStatus);
  }, [userInfo?.paymentStatus]);

  useEffect(() => {
    if (userInfo) {
      (async () => {
        const res = await fetch(
          `${BACKEND_URL}/api/event_reg/get_registered_events`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              registered_teams: userInfo.registered_teams,
            }),
          }
        );
        const resJSON = await res.json();
        const registered_teams = resJSON.result;
        if (registered_teams) {
          const events: any = [];
          registered_teams.forEach((team: any, idx: number) => {
            // Backend may already send the event name/title or a full event object.
            // Prefer the backend-provided display name when available (e.g. team.event_name,
            // team.event_title or team.event.title). Fall back to local lookup by id.
            console.log("team : ", team.event_id);
            const localEvent = getEventFromEventId(team.event_id);
            const backendTitle = team?.event_name || team?.event_title || team?.event?.title;
            const finalEvent = localEvent || (backendTitle ? { title: backendTitle, eventId: team.event_id } : null);
            events.push(finalEvent);
            registered_teams[idx].event = finalEvent;
          });
          setRegisteredTeams(registered_teams);
          console.log(registered_teams);
        }
      })();
    }
  }, [userInfo]);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen text-center flex flex-col items-center p-6 font-playfair w-full bg-[#100318 0%, #310D3D 15%, #6A3E92 35%, #310D3D 70%, #100318 100%] overflow-hidden justify-center pt-24relative min-h-screen text-center flex flex-col items-center p-6 font-playfair w-full bg-[#430B04] overflow-hidden justify-center pt-2"
      style={{
        background:"linear-gradient(180deg, #100318 0%, #310D3D 15%, #6A3E92 35%, #310D3D 70%, #100318 100%)"
      }}
      >
        <img
          src={dashboardBg}
          alt="flower"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[80%] h-[80%]"
        />

        {/* Header */}
        <h1 className="text-[#fafafa] text-5xl xs:text-4xl mt-16 tracking-wider"
        style={headingStyle}>
          DASHBOARD
        </h1>

        {/* Profile Card */}
        <div className="relative bg-[#310D3D] rounded-3xl border-[6px] border-[#DBAF7B] w-full sm:w-3/4 md:w-2/3 lg:w-2/3 xl:w-1/2 mt-7 p-8 shadow-lg flex flex-col sm:flex-row items-center sm:items-start justify-start">
          {/* Profile Icon */}
          <div className="flex justify-center sm:absolute sm:-left-16 top-0 sm:top-1/2 transform sm:-translate-y-1/2 bg-black rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 items-center shadow-md border-[8px] border-[#DBAF7B] mb-4 sm:mb-0">
            {uploadedImageUrl ? (
              <img
                src={uploadedImageUrl}
                alt="Uploaded"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-cover rounded-full border-4 border-[#DBAF7B]"
              />
            ) : userInfo?.profile_picture ? (
              <img
                src={userInfo.profile_picture}
                alt="Uploaded"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-cover rounded-full border-4 border-[#DBAF7B]"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#DBAF7B"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14c3.866 0 7 3.134 7 7M12 14c-3.866 0-7 3.134-7 7M12 14a5 5 0 100-10 5 5 0 000 10z"
                />
              </svg>
            )}
          </div>

          {/* Upload Photo Section */}
          {!userInfo?.profile_picture && (
            <div className="relative mt-6 h-full xs:h-auto">
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }} // Hide the default file input
              />
              <label
                htmlFor="photo-upload"
                className="my-6 z-10 bg-[#DBAF7B] rounded-full text-[#431400] font-bold py-2 px-4 hover:bg-[#DFB384] transition duration-200 cursor-pointer"
              >
                Upload Photo <br />
              </label>
              <div className="text-md ml-3 mt-4 text-[#FF4C4C] text-bold">
                {" "}
                (<span className='font-bold'>Warning</span> - You can upload the photo only once.){" "}
              </div>
              <div className="text-md mt-4 text-white text-bold">
                {" "}
                (Your face should be clearly <br/> visible in the photo){" "}
              </div>
              <button
                    onClick={logoutUser}
                    className="hidden lg:flex bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200 items-center justify-center text-sm absolute left-1/3 mt-5"
                  >
                    Logout
                </button>
            </div>
          )}
          {/* User Info Section */}
          <div className="text-left text-[#fafafa] sm:ml-16 space-y-3 w-full sm:w-auto">
            {/* Name centered */}
            
            <h2 className="text-2xl font-bold text-center sm:text-left sm:mt-0"
            style={styling}>
              {userInfo?.name}
            </h2>
            {/* Other details aligned to the left */}
            <p>
              Email: <span className="text-orange-300">{userInfo?.email}</span>
            </p>
            <p>
              Gender:{" "}
              <span className="text-orange-300">{userInfo?.gender}</span>
            </p>
            <p>
              College:{" "}
              <span className="text-orange-300">{userInfo?.college}</span>
            </p>
            <p>
              Year: <span className="text-orange-300">{userInfo?.year}</span>
            </p>
            <p>
              Phone:{" "}
              <span className="text-orange-300">{userInfo?.mobile_number}</span>
            </p>
            <p>
              KY ID: <span className="text-orange-300">{userInfo?.ky_id}</span>
            </p>
            <p>
              Payment:{" "}
              <span className="text-orange-300">
                {paymentStatus ? "Payment Done" : "Payment Not Completed"}
              </span>
            </p>
            <button
                onClick={logoutUser}
                className="bg-[#B36BFF] hover:bg-[#00F2FF] text-white font-bold py-2 px-6 rounded-full transition duration-300 mx-auto block"
              >
                Logout
            </button>
            <PayButton />
          </div>
        </div>

        {!userInfo?.isIITStudent &&
        userInfo?.profile_picture &&
        paymentStatus ? (
          <Link
            to="/generate-id-card"
            className="mt-6 z-10 bg-[#D2C1A1] rounded-full text-[#431400] font-bold py-2 px-4 hover:bg-[#DFB384] transition duration-200"
          >
            Generate Your ID Card
          </Link>
        ) : (
          !userInfo?.isIITStudent && (
            <h1 className="text-2xl font-bold text-center text-red-500 mt-4">
              {userInfo?.profile_picture
                ? "Payment Not Completed"
                : "Upload your Profile Photo to generate ID Card"}
            </h1>
          )
        )}

        {userInfo?.isIITStudent && (
          <h1 className="text-2xl font-bold text-center text-blue-500 mt-4">
            IITBHU Student Profile
          </h1>
        )}

        {/* Registered Events Section */}
        <h2 className="text-[#fafafa] font-Uchen text-3xl font-bold mt-12 underline tracking-wider">
          <Link to="/competitions" className="hover:text-orange-300">
            Registered Competitions
          </Link>
        </h2>
        <p className="text-[#fafafa] font-semibold mt-4">
          {registeredTeams.length == 0 && (
            <>
              No events to show at the moment. You have not registered for any
              events! <br />
              Register at Events Registration
            </>
          )}
          <div className="w-full p-10 flex flex-wrap items-center justify-center gap-4">
            {registeredTeams.length && (
              <>
                {registeredTeams.map((team) => (
                  <div className="w-[280px] min-h-[280px] rounded-lg bg-[#D2C1A1] text-[#430B04] border p-2 flex flex-col justify-center items-start">
                    <div className="font-bold">{team.event.title}</div>
                    <div className="">team name : {team.team_name}</div>
                    <div className="font-bold mt-2">Members:</div>
                    <ul className="">
                      {team.members_ky_ids.map((ky_id: any) => (
                        <li key={ky_id}>{ky_id}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>
          
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
