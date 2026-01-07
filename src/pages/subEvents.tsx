import { useContext, useState, useEffect, CSSProperties } from "react";
import EventCard2 from "@/components/EventCard2";
import flowerSvg from "/flower.svg";
import Footer from "@/components/Footer";
import { eventsData } from "@/../store/events";
import AuthContext from "@/Context/AuthContext";
import { getEventFromEventId } from '@/../store/getEventFromId'
import ContactUs from "@/components/ContactUs";
import DynamicForm from "@/components/EventRegistration";

interface Event2Props {
  eventName: string;
}
interface EventType {
  title: string;
  type: "Individual" | "Team";
  description: string;
  details: string;
  image: string;
  eventId: number;
}

interface EventTypeFromID {
  title: string;
  type: "Individual" | "Team";
  description: string;
  details: string;
  image: string;
  eventId: number;
}

interface RegisteredTeam {
  event_id: number;
  event?: EventTypeFromID;
}

const contacts: Record<string, { name: string; phone: string }[]> = {
  "Abhinay": [{ name: "Som", phone: "8827123193" }],
  "Bandish": [{ name: "Narayan", phone: "8299123896" }],
  "Crosswindz": [{ name: "Narayan", phone: "8299123896" }],
  "Mirage": [{ name: "Anmol", phone: "7355048325" }],
  "Natraj": [{ name: "Abhishek", phone: "7390947049" }],
  "Samwaad": [{ name: "Divyanshu", phone: "8948121424" }],
  "Toolika": [{ name: "Atharv", phone: "7620515480" }],
  "Enquizta": [{ name: "Kinjal", phone: "8240702610" }],
  "Zaika": [{ name: "Narayan", phone: "8299123896" }],
  "Zonals": [{ name: "Bhanu Vyas", phone: "9174694951"}, 
             { name: "Pranjal Kourav", phone: "9165328550"}],
};



const SubEvents: React.FC<Event2Props> = ({ eventName }) => {
  const eventData = eventsData;
const handleDownload = () => {
  window.open('/RulebookZonal.pdf', '_blank');
};
  const { userInfo, setInfoFromToken, authTokens } = useContext(AuthContext);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [registeredTeams, setRegisteredTeams] = useState<RegisteredTeam[]>([])
  const [eId, setEId] = useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<EventTypeFromID | null>(null);
    
  // *** DEFINITION FOR ZONALS BACKGROUND GRADIENT ***
  const ZONALS_GRADIENT = "linear-gradient(180deg, #100318 0%, #310D3D 15%, #6A3E92 35%, #310D3D 70%, #100318 100%)";
    
  // *** UPDATED DEFINITION: Only includes gradient properties ***
  // Font size, weight, etc., are now controlled by Tailwind classes
  const ZONALS_HEADING_STYLE = {
    background: 'linear-gradient(94.47deg, #FFD966 0%, #C285E0 50%, #7D8FE8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent', 
  };
    const eventHeadingStyle: CSSProperties = {
      fontFamily: 'Urbanist, sans-serif', // Assuming Urbanist is the font to use
      fontWeight: 700,
      fontStyle: 'italic',
      background: 'linear-gradient(93.83deg, #FFD966 0%, #C285E0 40%, #7D8FE8 100%)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent',
      display: 'block',
      width: 'fit-content',
    };
    
  useEffect(() => {
    const fetchRegisteredTeams = async () => {
      if (userInfo) {
        const res = await fetch(`${BACKEND_URL}/api/event_reg/get_registered_events`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ registered_teams: userInfo.registered_teams })
        })
        const resJSON = await res.json()
        const registered_teams = resJSON.result
        if (registered_teams) {
          const events: EventTypeFromID[] = []
          registered_teams.forEach((team: RegisteredTeam, idx: number) => {
            const event = getEventFromEventId(team.event_id)
            if (event && (event.type === "Individual" || event.type === "Team")) {
              const typedEvent = event as EventTypeFromID;
              events.push(typedEvent);
              registered_teams[idx].event = typedEvent;
            }
          })
          setRegisteredTeams(registered_teams)
        }
      }
    };
    
    fetchRegisteredTeams();
  }, [userInfo, BACKEND_URL])

  const handleRegistrationSuccess = async () => {
    // Refresh user info from server
    if (authTokens?.access) {
      await setInfoFromToken(authTokens.access);
    }
    // Close the modal
    setEId(null);
    setSelectedEvent(null);
  };

  // Update the event whenever eId changes
  useEffect(() => {
    if (eId !== null) {
      const event = getEventFromEventId(eId);
      if (event && (event.type === "Individual" || event.type === "Team")) {
        setSelectedEvent(event as EventTypeFromID);
      }
    }
  }, [eId]);

  const registeredEventTitles = new Set(registeredTeams.map(team => team.event?.title));

  const events = eventData[eventName as keyof typeof eventData] || [];
  const typedEvents = events as EventType[];

  // *** BACKGROUND STYLE APPLICATION LOGIC ***
  const backgroundStyle = eventName === "Zonals"
  ? { background: ZONALS_GRADIENT, minHeight: '100vh' }
  : { backgroundColor: '#430B04', minHeight: '100vh' };

  return (
    <>
      {eId !== null && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="relative bg-[#D2C1A1] p-6 w-full max-w-2xl max-h-[90vh] rounded-lg shadow-lg overflow-y-auto">
            <button
              onClick={() => {
                setEId(null);
                setSelectedEvent(null);
              }}
              className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700 z-10"
            >
              ✖
            </button>
            
            {selectedEvent && <DynamicForm type={selectedEvent.type} eventId={eId} onSuccess={handleRegistrationSuccess} />}
          </div>
        </div>
      )}

      <div className={`${eId !== null ? 'hidden' : ''}`}>

        {/* *** MAIN CONTAINER: APPLIES THE ZONALS BACKGROUND *** */}
        <div 
          className="w-full h-full flex flex-col items-center" 
          style={backgroundStyle}
        >
          {/* Background Flower Image */}
          <img
            src={flowerSvg}
            alt="flower"
            className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[200%] md:w-[120%] lg:w-[800%] h-[80%] opacity-30"
          />

          {/* *** TITLE SECTION: NOW RESPONSIVE *** */}
          <div className="text-center z-20 mt-6 mx-auto pt-14 px-4">
            <h2
              className={`
                ${eventName === "Zonals" 
                    // UPDATED: Added responsive font size and font family
                    ? 'text-4xl md:text-6xl font-urbanist font-normal' 
                    // Original classes
                    : 'font-uncial text-[#DFB384] text-4xl md:text-5xl font-semibold' 
                }
              `}
              // Style object now only applies the gradient
              style={eventName === "Zonals" ? ZONALS_HEADING_STYLE : {}} 
            >
              {eventName}
            </h2>
          </div>
                        <h3 
  style={eventHeadingStyle} 
  className="relative z-10 text-xl font-sans font-semibold underline underline-offset-1 mt-4"
>
                <button 
                  className="underline underline-offset-1 text-lg" 
                  onClick={handleDownload}
                  style={{
                    fontFamily: 'Urbanist, sans-serif',
                    color: '#D2C1A1', // Use the original accent color
                  }}
                >
                  Click here to Download RuleBook 
                </button>
              </h3>

         
          <div className="relative z-10 flex flex-col items-center">
            {eventName === "Zonals" && (
              <div className="flex flex-col items-center">

                {/* -------- Circular Logo -------- */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#D2C1A1] overflow-hidden flex items-center justify-center shadow-md mb-4 mt-12">
                  <img
                    src="https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535217/org_site/yo8dy5ypvrxkoo3kbtsy.webp"
                    alt="Oriental Group Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* -------- College Info Card (NOW RESPONSIVE) -------- */}
                <div 
                  // These classes already made the *card itself* responsive
                  className="rounded-lg p-6 mb-6 mx-auto w-[90%] sm:w-full max-w-sm shadow-xl font-serif" 
                  style={eventName === "Zonals" ? { 
                      background: '#100318', 
                      color: '#DFB384', 
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: 'transparent',
                      borderImageSource: 'linear-gradient(94.47deg, #FFD966 0%, #C285E0 50%, #7D8FE8 100%)',
                      borderImageSlice: 1,
                    } : {}}
                >
                  {/* Card Heading - NOW RESPONSIVE */}
                  <h3 
                    // UPDATED: Added responsive font size and family
                    className="text-2xl md:text-3xl font-urbanist font-semibold mb-4 text-center"
                    // Style object now only applies the gradient
                    style={eventName === "Zonals" ? ZONALS_HEADING_STYLE : { color: '#101720' }}
                  >
                    College Information
                  </h3>

                  {/* These text classes were already responsive */}
                  <p className="mb-2 text-center sm:text-left">
                    <strong>Venue:</strong> Oriental Group of Institutes, Bhopal
                  </p>

                  <p className="mb-2 text-center sm:text-left">
                    <strong>Website:</strong>{" "}
                    <a
                      href="https://www.oriental.ac.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={eventName === "Zonals" ? "underline hover:text-yellow-200 transition duration-150" : "text-[#101720] underline hover:text-[#430B04] transition duration-150"}
                    >
                      www.oriental.ac.in
                    </a>
                  </p>

                  <p className="mb-2 text-center sm:text-left">
                    <strong>Facebook:</strong>{" "}
                    <a
                      href="https://www.facebook.com/orientalgroupofinstitutes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={eventName === "Zonals" ? "underline hover:text-yellow-200 transition duration-150" : "text-[#101720] underline hover:text-[#430B04] transition duration-150"}
                    >
                      orientalgroupofinstitutes
                    </a>
                  </p>

                  <p className="mb-2 text-center sm:text-left">
                    <strong>Instagram:</strong>{" "}
                    <a
                      href="https://shorturl.at/IGrSL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={eventName === "Zonals" ? "underline hover:text-yellow-200 transition duration-150" : "text-[#101720] underline hover:text-[#430B04] transition duration-150"}
                    >
                      Instagram
                    </a>
                  </p>
                </div>
                {/* Zonal actions: login / register / profile */}
                <div className="flex gap-3 mt-4 justify-center">
                  <a
                    href="/zonal-login"
                    className="bg-[#DBAF7B] text-[#431400] px-4 py-2 rounded-full font-semibold"
                  >
                    Zonal Login
                  </a>
                  <a
                    href="/zonals-register"
                    className="bg-white/10 text-[#DFB384] px-4 py-2 rounded-full font-semibold border border-[#DFB384]"
                  >
                    Zonal Register
                  </a>
                  <a
                    href="/profile/zonal"
                    className="bg-transparent text-white/90 px-4 py-2 rounded-full font-semibold border border-white/20"
                  >
                    Zonal Profile
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Event Cards Section */}
          <div className="flex flex-col md:flex-row md:flex-wrap justify-around items-center md:items-start w-[90%]">
            {typedEvents.map((event, index) => {
              const isRegistered = registeredEventTitles.has(event.title);

              return (
                <EventCard2
                  key={index}
                  type={event.type}
                  title={event.title}
                  description={event.description}
                  details={event.details}
                  image={event.image}
                  eventId={event.eventId} 
                  registerButtonText={isRegistered ? "Registered" : "Register Now"} 
                  setEId={setEId}
                  isZonals={eventName === "Zonals"}
                />
              );
            })}
          </div>
        </div>
        <ContactUs contacts={contacts[eventName]} />
        <Footer />
      </div>
    </>
  );
};

export default SubEvents;
