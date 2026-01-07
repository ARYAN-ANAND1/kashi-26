import { Navbar } from '@/components/Navbar'
import PreEvent from '@/components/PreEvent'
import Footer from '@/components/Footer'
import { useEffect } from 'react'

function PreEvents() {
  useEffect(() => {
    console.log('PreEvents component mounted')
  }, [])

  return (
    <div>
      <Navbar/>
      <PreEvent/>
      <Footer/>
    </div>
  )
}

export default PreEvents