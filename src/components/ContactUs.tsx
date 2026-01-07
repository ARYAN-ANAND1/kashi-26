import React from "react";

interface Contact {
  name: string;
  phone: string;
}

interface ContactList {
  contacts?: Contact[];
}

const ContactUs: React.FC<ContactList> = ({ contacts = [] }) => {
  return (
    <div
      id="contactUs"
      className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-12 py-12"
      style={{
        backgroundColor: "#0F0418", // dark purple background
      }}
    >
      <h1
        className="font-urbanist font-normal text-center bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(94.47deg, #FFD966 0%, #C285E0 50%, #7D8FE8 100%)",
          fontFamily: "'Urbanist', sans-serif",
          fontWeight: 300,
          fontStyle: "normal",
          fontSize: "40px",
          lineHeight: "50px",
          letterSpacing: "0%",
          textAlign: "center",
          verticalAlign: "middle",
        }}
      >
        Feel Free To Contact Us.
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-center text-[#DFB384] font-raleway mb-8 sm:mb-12 md:mb-16 lg:mb-24 max-w-md">
        If you have any questions or concerns, please don’t hesitate to contact us at your convenience.
      </p>

      <div className="flex flex-row flex-wrap justify-between items-center w-full max-w-screen-lg text-[#DFB384]">
        {contacts.length === 0 ? ( 
          <div className="text-center px-12 mx-auto my-3">
            <p className="font-semibold">No contacts available</p>
          </div>
        ) : (
          contacts.map((contact, idx) =>  {
            const { name, phone } = contact;
            return (
              <div className="text-center px-12 mx-auto my-3" key={idx}>
                <p className="text-xl font-semibold">{name}</p>
                <p className="font-semibold">{phone}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ContactUs;
