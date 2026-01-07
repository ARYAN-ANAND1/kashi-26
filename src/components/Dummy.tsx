import InfiniteCarousel from './infiniteCariusel';

const YourPage = () => {
  // Sample carousel items
  const carouselItems = [
    {
      id: 1,
      title: "Raftaar",
      subtitle: "Rapper",
      description: "“Taking the stage at Kashiyatra was a high like no other! The electric vibe and fervent energy from the college crowd added an extra kick to the performance.”",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/raftaar.png"
    },
    {
      id: 2,
      title: "Ritviz",
      subtitle: "Singer",
      description: "“Stepping into Kashiyatra was like entering a sonic wonderland! ig thanks for creating an atmosphere of pure musical bliss and etching unforgettable memories together!”",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/ritviz.png"
    },
    {
      id: 3,
      title: "MJ5",
      subtitle: "Dance Group",
      description: "“The vibrant energy and passion from the college audience elevated our performance to new heights. Grateful for the electric atmosphere and unforgettable moments on stage!”",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/mj5.png"
    },
    {
      id: 4,
      title: "Darshan Raval",
      subtitle: "Singer",
      description: "“Performing at Kashiyatra was an incredible experience! The energy and enthusiasm from the college crowd made it a night to remember. Thank you for the amazing vibes and unforgettable memories!”",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/raval.png"
    },
    {
      id: 5,
      title: "Anubhav Bassi",
      subtitle: "Stand-up Comedian",
      description: "“Kashiyatra was a laughter filled rendezvous that i wont soon forget Thank you all for turning an evening of comedy into a heartwarming connection!”",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/bassi.png"
    },
  ];

  return (
    <div>
      <InfiniteCarousel items={carouselItems} interval={5000} />
    </div>
  );
};

export default YourPage;
