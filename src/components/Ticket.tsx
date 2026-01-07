// import React from 'react'

interface TicketProps{
    price:number,
    ogPrice:number,
    withFood:boolean
}

const Ticket = ({price, withFood, ogPrice}:TicketProps) => {
  return (
    <div className='w-[40%] h-[80%] bg-[#D2C1A1] text-[#101720] text-raleway text-center'>
      <div className="registration-option">
          <h2>Registration Without Food</h2>
          <div className="price">
            <span className="original-price line-through">₹{ogPrice}</span>
            <span className="discounted-price">₹{price}</span>
          </div>
          <ul className="features">
            <li>All Events Registration</li>
            <li>All Pronite (Celeb Performance) Passes</li>
            <li>Accomodation (Food {withFood? "included":"excluded"})</li>
            <li>Access to International Carnival</li>
            <li>Free Official KY Tshirt!</li>
            <li>Welcome Kit!</li>
          </ul>
          <button className="buy-button text-[#D2C1A1] bg-[#430B04] rounded-full px-4 py-2">Coming soon</button>
        </div>
    </div>
  )
}

export default Ticket
