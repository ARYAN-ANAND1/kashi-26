import flowerSvg from '/flower.svg';
import ScrollCard from './ScrollCard';

const PreEvent = () => {
  const preEvents = [
    {
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/Raga.jpeg",
      title: "RAGA SCAPE",
      content:
        "RagaScape is a theme-based music production competition where creativity meets pressure. Participants get 48 hours to compose, produce, and polish an original track from scratch, pushing their musical ideas, sound design, and storytelling skills. With experienced music producers as judges, RagaScape is the perfect stage to showcase your sound and make it heard.",
    },
    {
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/TreasureHunt.jpeg",
      title: "TREASURE HUNT",
      content:
        "A treasure hunter is someone who actively looks for riches. For instance, treasure hunters go for sunken shipwrecks and scavenge valuable relics. The market for antiquities typically supports this sector of the economy.",
    },
    {
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/pe2.webp",
      title: "IIT BHU PD",
      content:
        "Welcome to the IIT BHU Parliamentary Debate Tournament, a battleground of intellect, strategy, and rhetoric! Hosted by the prestigious IIT BHU Debating Society, a part of the Literary Club, IIT (BHU), this tournament brings together the sharpest minds from across the country for an exhilarating showdown of ideas.",
    },
    {
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/patangbaazi.webp",
      title: "PATANG BAAZI",
      content:
        "Wishing you a joyous Makar Sankranti. Let's soar high this Makar Sankranti! Join us for PatangBaazi at Kashiyatra 25 and experience the joy of kite flying, competition, and festive fun.",
    },
    {
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/image.webp",
      title: "MUN",
      content:
        "Students can study about diplomacy, international relations, and the UN through the educational simulation known as Model United Nations (often referred to as Model UN or MUN).",
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
        {/* Title */}
        <h1
        className="font-bold mx-auto text-4xl sm:text-5xl md:text-6xl text-center mb-8 md:mb-16"
        style={{
          fontFamily: 'Urbanist, sans-serif',
          fontWeight: 700,
          backgroundImage:
            'linear-gradient(180deg, #FFD966 0%, #F0B84E 15%, #C285E0 50%, #7D8FE8 80%, #310D3D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '0.5px',
        }}
        >
        Pre Events
        </h1>
        {/* ScrollCard Container */}
        <div className="mx-auto max-w-7xl">
          {/* First row - 3 cards on desktop, stacked on mobile */}
          <div className="w-full flex flex-col md:flex-row justify-center gap-6 md:gap-8 lg:gap-12 p-4 mb-8">
            {preEvents.slice(0, 3).map((event, index) => (
              <div key={index} className="flex-shrink-0 mx-auto md:mx-0">
                <ScrollCard
                  image={event.image}
                  title={event.title}
                  content={event.content}
                  showRegister={event.title === "RAGA SCAPE"}
                  registerLink={event.title === "RAGA SCAPE" ? "https://docs.google.com/forms/d/e/1FAIpQLScbxB8ZFpnJG9oQwlTzywp_80cjXujsC0GXzlDmkoRe-ool6w/viewform?usp=publish-editor" : "#"}
                />
              </div>
            ))}
          </div>
          
          {/* Second row - remaining cards centered */}
          {preEvents.length > 3 && (
            <div className="w-full flex flex-col md:flex-row justify-center gap-6 md:gap-8 lg:gap-12 p-4">
              {preEvents.slice(3).map((event, index) => (
                <div key={index + 3} className="flex-shrink-0 mx-auto md:mx-0">
                  <ScrollCard
                    image={event.image}
                    title={event.title}
                    content={event.content}
                    showRegister={event.title === "RAGA SCAPE"}
                    registerLink={event.title === "RAGA SCAPE" ? "https://docs.google.com/forms/d/e/1FAIpQLScbxB8ZFpnJG9oQwlTzywp_80cjXujsC0GXzlDmkoRe-ool6w/viewform?usp=publish-editor" : "#"}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreEvent;