// heloooo
// import Landing from "./components/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
// import { DragCards } from "./components/DragCards";
// import About from "./components/About";
// import Testimonials from "./components/Testimonials";
// import Footer from "./components/Footer";
// import Testimonials from './components/Testimonials'
// import LocomotiveScroll from 'locomotive-scroll' ;
import Test from "./pages/Test";
// import Dashboard from "./pages/Dashboard";
import ProfileRedirect from "./pages/ProfileRedirect";
// import ComingSoon from "./pages/ComingSoon";
import PreEvents from "./pages/PreEvents";
import Landing from "./pages/Landing";
import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { AuthProvider } from "./Context/AuthContext";
import { ToastContainer } from "react-toastify";
import About from "./components/About";
import { DragCards } from "./components/DragCards";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import ScrollToTop from "./components/ScrollToTop"; // Added ScrollToTop import
import Event from "./pages/Event";
import SubEvents from "./pages/subEvents";
import Ca from "./pages/CA";
import Payment from "./pages/payment";
// import SplashCursor from "./components/SplashCursor";

// import SplashCursor from "./components/SplashCursor";
import Validate from "./pages/Validate";
import PreEventReg from "./pages/PreEventReg";
import ManualValidate from "./pages/ManualValidate";
import ForgotPassword from "./components/forgotpassword";
import IDCard from "./pages/IDcard";
import EventsForm from "./pages/ValidateEvents";
import Sponsors from "./pages/Sponsors";
import ZonalSignupPage from "./pages/ZonalSignupPage";
import ChooseRegister from "./pages/ChooseRegister";
import ZonalLogin from "./pages/ZonalLogin";
import ZonalProfile from "./pages/ZonalProfile";
import ZonalPrivateRoute from "./components/ZonalPrivateRoute";
import Merchandise from "./pages/Merchandise";
import VideoSection from "./components/VideoSection";
import Competition from "./pages/Competitions";
import EventDetails from "@/pages/EventDetails";
import Teams from "./pages/Teams";
import ZonalForgotPassword from "./components/ZonalForgotPassword";

const App = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);
  // const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  // const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   const newAudio = new Audio("/audio/generic.ogg");
  //   newAudio.loop = true;
  //   newAudio.volume = 0.7;

  //   // Handle audio loading errors
  //   newAudio.addEventListener("error", (e) => {
  //     console.error("Error loading audio:", e);
  //   });

  //   setAudio(newAudio);

  //   // Auto-play on component mount
  //   newAudio
  //     .play()
  //     .then(() => {
  //       setIsPlaying(!isPlaying);
  //     })
  //     .catch((error) => {
  //       console.error("Error auto-playing audio:", error);
  //     });

  //   return () => {
  //     if (audio) {
  //       audio.pause();
  //       audio.currentTime = 0;
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("locomotive-scroll").then((locomotiveModule) => {
        locomotiveScrollRef.current = new locomotiveModule.default({
          lenisOptions: {
            wrapper: scrollRef.current!,
            lerp: 0.1,
            duration: 1.2,
            smoothWheel: true,
            easing: (t) => 1 - Math.pow(2, -10 * t),
            // smoothTouch: false,
          },
        });
        // Expose the instance globally so small utilities (like ScrollToTop)
        // can trigger programmatic scrolls without major refactoring.
        try {
          (window as any).locoScroll = locomotiveScrollRef.current;
        } catch (e) {
          // no-op
        }
      });
    }

    return () => {
      locomotiveScrollRef.current?.destroy();
      try {
        // Clean up global reference
        delete (window as any).locoScroll;
      } catch (e) {}
    };
  }, []);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <main ref={scrollRef} data-scroll-container>
            {/* <SplashCursor/> */}
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Landing />
                    <VideoSection />
                    <About />
                    <ContactUs contacts={[
                      { name: "Gaurav Jat", phone: "+91 9752703619" },
                      { name: "Vishal Bagde", phone: "+91 7974074341" },
                      { name: "Vijyant Vikram", phone: "+91 7302733012"}
                    ]}/>
                    {/* <div className="bg-[url(blueBG.svg)] bg-cover"> */}

                    <DragCards />
                    <Testimonials />
                    <Footer />
                    {/* </div> */}
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignupPage />} />
              <Route path="/choose-register" element={<ChooseRegister />} />
              <Route path="/zonals-register" element={<ZonalSignupPage />} />
              <Route path="/zonal-login" element={<ZonalLogin />} />
              <Route
                path="/zonal-forgot-password"
                element={<ZonalForgotPassword />}
              />
              <Route
                path="/profile/zonal"
                element={
                  <ZonalPrivateRoute>
                    <ZonalProfile />
                  </ZonalPrivateRoute>
                }
              />

              <Route path="/pre-events" element={<PreEvents />} />
              <Route
                path="/payment"
                element={
                  <PrivateRoute>
                    <Payment />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfileRedirect />
                  </PrivateRoute>
                }
              />
              <Route path="/events" element={<Event />} />
              <Route path="/competitions" element={<Competition />}>
                {/* <Route path="natraj" element={<SubEvents eventName="Natraj" />} />
                <Route path="bandish" element={<SubEvents eventName="Bandish" />} />
                <Route path="abhinay" element={<SubEvents eventName="Abhinay" />} />
                <Route path="crosswindz" element={<SubEvents eventName="Crosswindz" />} />
                <Route path="mirage" element={<SubEvents eventName="Mirage" />} />
                <Route path="samwaad" element={<SubEvents eventName="Samwaad" />} />
                <Route path="toolika" element={<SubEvents eventName="Toolika" />} />
                <Route path="zaika" element={<SubEvents eventName="Zaika" />} />
                <Route path="enquizta" element={<SubEvents eventName="Enquizta" />} /> */}
                <Route
                  path="zonals"
                  element={<SubEvents eventName="Zonals" />}
                />
                {/* Add more subEvents routes here... */}
              </Route>
              {/* <Route path="/sponsors" element={<ComingSoon />} /> */}
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/ca" element={<Ca />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/merch" element={<Merchandise />} />
              <Route path="/test" element={<Test />} />
              <Route path="/pd" element={<PreEventReg />} />
              <Route path="/validate" element={<Validate />} />
              <Route path="/manual-validate" element={<ManualValidate />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/generate-id-card" element={<IDCard />} />
              <Route path="/Validate-Events" element={<EventsForm />} />
              <Route path="/competitions/:id" element={<EventDetails />} />
            </Routes>
          </main>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;