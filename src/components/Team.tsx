import flowerSvg from "/flower.svg";
import ConveynerCard from "./ConveynerCard";

const Team = () => {
  const conveyner = [
    {
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/Abhishek.webp",
      name: "Abhishek Shukla",
      title: "Convener\nKashiyatra'26",
      link: "https://www.instagram.com/abhishek_._shukla?igsh=bzF0cDU0aWYzOWQy",
    },
  ];

  const coConveyner = [
    {
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/Jatin.webp",
      name: "Jatin Sharma",
      title: "Co-Convener Kashiyatra'26",
      link: "https://www.instagram.com/_jatin.sharma28?igsh=cGw3aHYyYm85c3U0",
    },
    {
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/Narayan.webp",
      name: "Narayan Singh",
      title: "Co-Convener Kashiyatra'26",
      link: "https://www.instagram.com/__nar_ayan__?igsh=azI0cjR5aGF0NXYw",
    },
  ];

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden px-4 md:px-8 py-16"
      style={{
        background:
          "linear-gradient(180deg, #100318 0%, #310D3D 15%, #6A3E92 35%, #310D3D 70%, #100318 100%)",
      }}
    >
      {/* Background Flower */}
      <img
        src={flowerSvg}
        alt="flower"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] opacity-20"
      />

      {/* Content */}
      <div className="relative z-10 mt-10">
        {/* ConveynerCard Container */}
        <div className="mx-auto max-w-6xl">
          {/* Conveyner Section - Single card on first line */}
          <div className="flex flex-col items-center gap-12 p-4">
            <div className="flex justify-center">
              {conveyner.map((person, index) => (
                <div key={index} className="pb-4">
                  <ConveynerCard
                    image={person.image}
                    name={person.name}
                    title={person.title}
                    link={person.link}
                  />
                </div>
              ))}
            </div>

            {/* Co-Conveyners Section - Two cards on second line */}
            <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20">
              {coConveyner.map((person, index) => (
                <div key={index} className="pb-4">
                  <ConveynerCard
                    image={person.image}
                    name={person.name}
                    title={person.title}
                    link={person.link}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
