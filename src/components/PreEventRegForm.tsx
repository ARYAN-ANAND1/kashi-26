import { useState } from "react";
import PDTicket from "./PDTicket";
import { toast } from 'react-toastify'; // Import react-toastify

interface Member {
  name: string;
  phone: string; // Changed from number to string
  college: string;
  email: string;
}

interface Adjudicator {
  name: string;
  phone: string; // Changed from number to string
  college: string;
  email: string;
}

const PreEventRegForm: React.FC = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);
  const [Adjudicator, setAdjudicator] = useState<Adjudicator>({
    name: "",
    phone: "",
    college: "",
    email: "",
  });

  const handleMemberChange = (
    index: number,
    field: keyof Member,
    value: string
  ) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const addMember = () => {
    if (members.length < 3) {
      setMembers([...members, { name: "", phone: "", college: "", email: "" }]);
    }
  };

  const removeMember = (index: number) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleAdjudicatorChange = (field: keyof Adjudicator, value: string) => {
    setAdjudicator({ ...Adjudicator, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (members.length === 3 && Adjudicator.name) ||
      (members.length === 0 && Adjudicator.name)
    ) {
      console.log("Team Name:", teamName);
      console.log("Members:", members);
      console.log("Adjudicator:", Adjudicator);
      setShowticket(true)
      // Add your form submission logic here
      // toast.success("Registration successful!"); // Show success toast
      setShowticket(false);
    } else {
      toast.error("Please ensure you have 3 team members with an Adjudicator or only an Adjudicator."); // Show error toast
    }

  };

  const [showTicket, setShowticket] = useState(true);
  


  return (
    <>
        <div className="min-h-[520px] w-[400px] max-w-md mx-auto  rounded shadow">
      {(showTicket) ? (
          <form
          onSubmit={handleSubmit}
          className="p-4 w-full h-full mx-auto border rounded shadow bg-[#DFB384]"
          >
          <h2 className="text-lg font-bold mb-2">Register Your Team</h2>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            />

          <h3 className="text-lg font-semibold mb-2">Team Members</h3>
          {members.map((member, index) => (
              <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) =>
                    handleMemberChange(index, "name", e.target.value)
                }
                className="w-full p-2 border rounded-full mb-2"
                />
              <input
                type="text" // Changed from number to text
                placeholder="Phone Number"
                value={member.phone}
                onChange={(e) =>
                    handleMemberChange(index, "phone", e.target.value)
                }
                className="w-full p-2 border rounded-full mb-2"
                />
              <input
                type="text"
                placeholder="College Name"
                value={member.college}
                onChange={(e) =>
                    handleMemberChange(index, "college", e.target.value)
                }
                className="w-full p-2 border rounded-full mb-2"
                />
              <input
                type="email"
                placeholder="Email"
                value={member.email}
                onChange={(e) =>
                    handleMemberChange(index, "email", e.target.value)
                }
                className="w-full p-2 border rounded-full mb-2"
                />
              {members.length > 1 && (
                  <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="text-red-500"
                  >
                  Remove Member
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMember}
            className="mb-4 p-2 bg-blue-500 text-white rounded-full"
            >
            Add Member
          </button>

          <h3 className="text-lg font-semibold mb-2">Adjudicator Details</h3>
          <input
            type="text"
            placeholder="Adjudicator Name"
            value={Adjudicator.name}
            onChange={(e) => handleAdjudicatorChange("name", e.target.value)}
            className="w-full p-2 border rounded-full mb-2"
            />
          <input
            type="text" // Changed from number to text
            placeholder="Adjudicator Phone Number"
            value={Adjudicator.phone}
            onChange={(e) => handleAdjudicatorChange("phone", e.target.value)}
            className="w-full p-2 border rounded-full mb-2"
            />
          <input
            type="text"
            placeholder="Adjudicator College Name"
            value={Adjudicator.college}
            onChange={(e) => handleAdjudicatorChange("college", e.target.value)}
            className="w-full p-2 border rounded-full mb-2"
            />
          <input
            type="email"
            placeholder="Adjudicator Email"
            value={Adjudicator.email}
            onChange={(e) => handleAdjudicatorChange("email", e.target.value)}
            className="w-full p-2 border rounded-full mb-4"
            />

          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded-full"
            >
            Submit Registration
          </button>
        </form>
      ) : (
          <PDTicket />
        )}
        </div>
    </>
  );
};

export default PreEventRegForm;
