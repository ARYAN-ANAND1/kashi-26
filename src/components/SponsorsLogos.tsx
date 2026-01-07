interface SponsorsLogosProps {
    src: string;
    alt: string;
  }
  
  const SponsorsLogos = ({ src, alt }: SponsorsLogosProps) => {
    return (
      <div className="aspect-[3/2] p-4 flex items-center justify-center w-32 sm:w-40 md:w-48">
        <img src={src} alt={alt} className="w-full h-full object-contain" />
      </div>
    );
  };
  
  export default SponsorsLogos;
  