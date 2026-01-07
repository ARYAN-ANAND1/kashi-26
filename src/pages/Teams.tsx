import { Navbar } from "@/components/Navbar";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import { useEffect } from "react";

function Teams() {
  useEffect(() => {
    console.log("Teams component mounted");
  }, []);

  return (
    <div>
      <Navbar />
      <Team />
      <Footer />
    </div>
  );
}

export default Teams;
