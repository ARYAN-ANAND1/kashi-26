import { useState } from "react"
import Footer from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { eventsPageData } from "../../store/eventsPageData"

interface EventType {
  id: number
  title: string
  image: string
  type: "concert" | "international_carnival" | "graffiti" | "juggler_shows" | "kavi_sammelan"
}

const Events = () => {
  const [activeTab, setActiveTab] = useState("concert")

  // Map event categories to display names and colors
  const eventTabs = [
    { key: "concert", label: "CONCERTS", color: "from-orange-500 to-red-500" },
    { key: "international_carnival", label: "INTERNATIONAL CARNIVAL", color: "from-red-500 to-pink-600" },
    { key: "graffiti", label: "GRAFFITI", color: "from-yellow-500 to-orange-500" },
    { key: "juggler_shows", label: "JUGGLER SHOWS", color: "from-green-500 to-teal-500" },
    { key: "kavi_sammelan", label: "KAVI SAMMELAN", color: "from-pink-500 to-rose-500" }
  ]

  const handleEventClick = (eventId: number) => {
    // Navigate to event details page or handle event interaction
    console.log(`Clicked event with ID: ${eventId}`)
    // You can implement navigation to event details page here
  }

  const currentEvents = eventsPageData[activeTab as keyof typeof eventsPageData] as EventType[] || []
  const activeTabInfo = eventTabs.find(tab => tab.key === activeTab)

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <Navbar />
      <div 
        className="min-h-screen w-full"
        style={{
          background: "linear-gradient(180deg, #100318 0%, #310D3D 15%, #6A3E92 35%, #310D3D 70%, #100318 100%)"
        }}
      >
        {/* Tab Navigation */}
        <div className="pt-24 pb-8">
          {/* First Row of Tabs */}
          <div className="flex flex-wrap justify-center gap-3 px-4 mb-4">
            {eventTabs.slice(0, 5).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-4 rounded-xl border-2 font-bold text-sm md:text-base tracking-wider transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.key
                    ? `bg-gradient-to-r ${tab.color} text-white border-transparent shadow-2xl scale-105`
                    : "bg-transparent text-white border-gray-500 hover:border-white hover:bg-white/10 hover:shadow-lg"
                }`}
                style={{
                  textShadow: activeTab === tab.key ? '0 0 20px rgba(255,255,255,0.5)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Second Row of Tabs */}
          <div className="flex flex-wrap justify-center gap-3 px-4 mb-12">
            {eventTabs.slice(5).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-4 rounded-xl border-2 font-bold text-sm md:text-base tracking-wider transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.key
                    ? `bg-gradient-to-r ${tab.color} text-white border-transparent shadow-2xl scale-105`
                    : "bg-transparent text-white border-gray-500 hover:border-white hover:bg-white/10 hover:shadow-lg"
                }`}
                style={{
                  textShadow: activeTab === tab.key ? '0 0 20px rgba(255,255,255,0.5)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Title */}
          <div className="text-center mb-16">
            <h1 
              className={`text-7xl md:text-9xl font-joti bg-gradient-to-r ${activeTabInfo?.color} bg-clip-text text-transparent`}
              style={{
                textShadow: '0 0 40px rgba(255,255,255,0.3)',
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))'
              }}
            >
              {activeTabInfo?.label}
            </h1>
          </div>

          {/* Event Cards Grid */}
          <div className="max-w-7xl mx-auto px-4">
            <div 
              key={activeTab} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              style={{
                animation: 'fadeIn 0.5s ease-in-out forwards'
              }}
            >
              {currentEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event.id)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-gray-700 hover:border-gray-400 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                    {/* Event Image */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Gradient Border Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${activeTabInfo?.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay`} />
                    </div>

                    {/* Event Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-joti text-white text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-200 transition-all duration-300">
                        {event.title}
                      </h3>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                         style={{
                           boxShadow: `inset 0 0 60px rgba(255,255,255,0.1), 0 0 60px rgba(255,255,255,0.1)`
                         }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {currentEvents.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-2xl text-gray-400 mb-4">No events available</h3>
                <p className="text-gray-500">Check back later for updates!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Events