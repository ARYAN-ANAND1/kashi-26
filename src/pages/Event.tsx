import { useState, useEffect, useRef } from "react"
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
  
  // Refs for each section
  const concertRef = useRef<HTMLDivElement>(null)
  const internationalCarnivalRef = useRef<HTMLDivElement>(null)
  const graffitiRef = useRef<HTMLDivElement>(null)
  const jugglerShowsRef = useRef<HTMLDivElement>(null)
  const kaviSammelanRef = useRef<HTMLDivElement>(null)

  // Map event categories to display names, colors, and refs
  const eventTabs = [
    { key: "concert", label: "CONCERTS", color: "from-yellow-500 to-orange-500", ref: concertRef },
    { key: "international_carnival", label: "INTERNATIONAL CARNIVAL", color: "from-orange-500 to-red-500", ref: internationalCarnivalRef },
    { key: "graffiti", label: "GRAFFITI", color: "from-red-500 to-pink-600", ref: graffitiRef },
    { key: "juggler_shows", label: "JUGGLER SHOWS", color: "from-green-500 to-teal-500", ref: jugglerShowsRef },
    { key: "kavi_sammelan", label: "KAVI SAMMELAN", color: "from-pink-500 to-rose-500", ref: kaviSammelanRef }
  ]

  const handleEventClick = (eventId: number) => {
    console.log(`Clicked event with ID: ${eventId}`)
  }

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey)
    const tab = eventTabs.find(t => t.key === tabKey)
    if (tab?.ref.current) {
      const element = tab.ref.current
      const offsetTop = element.offsetTop - 120 // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250 // Increased offset for better detection

      for (const tab of eventTabs) {
        if (tab.ref.current) {
          const element = tab.ref.current
          const elementTop = element.offsetTop - 120
          const elementBottom = elementTop + element.offsetHeight

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveTab(tab.key)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderEventSection = (categoryKey: string, events: EventType[], tabInfo: any, ref: React.RefObject<HTMLDivElement>, isFirst: boolean = false) => (
    <div key={categoryKey} ref={ref} className={`min-h-screen ${isFirst ? 'pt-56 pb-24' : 'py-24'}`}>
      {/* Category Title */}
      <div className="text-center mb-16 px-4">
        <h1 
          className={`text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r ${tabInfo.color} bg-clip-text text-transparent`}
          style={{
            fontFamily: 'Ceviche One, cursive',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {tabInfo.label}
        </h1>
      </div>

      {/* Event Cards Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
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
                  <div className={`absolute inset-0 bg-gradient-to-r ${tabInfo.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay`} />
                </div>

                {/* Event Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-ceviche text-white text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-200 transition-all duration-300">
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
        {events.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl text-gray-400 mb-4">No events available</h3>
            <p className="text-gray-500">Check back later for updates!</p>
          </div>
        )}
      </div>
    </div>
  )

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
      
      {/* Fixed Tab Navigation */}
      <div className="fixed top-14 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="flex flex-wrap justify-center gap-2 px-4 py-4">
          {eventTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`px-4 py-2 rounded-xl border-2 font-bold text-xs md:text-sm tracking-wider transition-all duration-300 transform hover:scale-105 ${
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
      </div>

      <div 
        className="w-full"
        style={{
          background: "linear-gradient(180deg, #100318 0%, #310D3D 15%, #6A3E92 35%, #310D3D 70%, #100318 100%)"
        }}
      >
        {/* Render all sections */}
        {eventTabs.map((tab, index) => {
          const events = eventsPageData[tab.key as keyof typeof eventsPageData] as EventType[] || []
          const isFirst = index === 0
          return renderEventSection(tab.key, events, tab, tab.ref, isFirst)
        })}
      </div>
      
      <Footer />
    </>
  )
}

export default Events