import React from 'react';
import royalFrame from '/royal-frame.svg';
import royalPlate from '/royal-plate.svg';

interface EventCardProps {
    title: string;
    description: string;
}

// EventCard Component
const EventCard: React.FC<EventCardProps> = ({ title, description }) => {
    return (
        <div className="flex items-center justify-center mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 sm:mx-[8%]">
            {/* Content Wrapper */}
            <div className="flex flex-col items-center justify-center pt-10 relative">
                {/* Decorative Royal Frame SVG */}
                <div className="relative w-full flex flex-col items-center">
                    <img
                        src={royalFrame}
                        alt="Royal Frame"
                        className="w-2/3 sm:w-3/4 md:w-80 lg:w-96 h-auto"
                    />
                    {/* Royal Plate Image */}
                    <div className="relative w-3/4 sm:w-80 md:w-96 sm:-mt-14 -mt-6 mb-0">
                        <img
                            src={royalPlate}
                            alt="Royal Plate"
                            className="w-full h-auto"
                        />
                        {/* Event Title Text */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#000000] text-center text-sm sm:text-xl md:text-2xl font-semibold"
                            style={{ width: '100%', whiteSpace: 'nowrap' }}
                        >
                            <h2 className="inline-block tracking-wider">{title}</h2>
                        </div>
                    </div>
                </div>

                {/* Event Description */}
                <div className="text-[#DFB384] font-semibold text-center px-4 sm:-mt-16 sm:text-lg md:text-base text-sm -mt-8">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
