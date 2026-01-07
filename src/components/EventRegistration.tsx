import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { countData } from "../../store/events";
import AuthContext from "@/Context/AuthContext";
import { useNavigate } from "react-router-dom";


interface DynamicFormProps {
    type: "Individual" | "Team";
    eventId: number | null;
    onSuccess?: () => void;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const DynamicForm: React.FC<DynamicFormProps> = ({ type, eventId, onSuccess }) => {
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const [members, setMembers] = useState<string[]>([""]);
    const [teamName, setTeamName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Initialize members array with user's KY ID
        setMembers([userInfo?.ky_id || ""]);
    }, [type, userInfo?.ky_id]);

    const addMember = () => {
        if (type === "Team" && eventId && countData[eventId]) {
            if (members.length >= countData[eventId].maxparticipants) {
                toast.error(`Maximum ${countData[eventId].maxparticipants} participants allowed`);
                return;
            }
        }
        setMembers([userInfo?.ky_id || "", ...members.slice(1), ""]);
    };

    const handleInputChange = (index: number, value: string) => {
        const updatedMembers = [...members];
        // Don't allow changing the first member (user's KY ID)
        if (index === 0) return;
        updatedMembers[index] = value;
        setMembers(updatedMembers);
    };


    const removeMember = (index: number) => {
        const updatedMembers = members.filter((_, i) => i !== index);
        setMembers(updatedMembers);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setIsSubmitting(true);

        // Validation
        if (!teamName.trim()) {
            toast.error("Team name cannot be empty");
            setIsSubmitting(false);
            return;
        }

        if (type === "Team" && eventId && countData[eventId]) {
            if (members.length < countData[eventId].minparticipants) {
                toast.error(`Minimum ${countData[eventId].minparticipants} participants required`);
                setIsSubmitting(false);
                return;
            }
        }

        // Validate empty KY IDs
        if (members.some(m => !m.trim())) {
            toast.error("All member KY IDs must be filled");
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch(`${BACKEND_URL}/api/event_reg/create`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    members_ky_ids: members,
                    team_name: teamName,
                    event_id: eventId,
                })
            });

            if (res.status === 200) {
                toast.success("Registration successful!");
                if (onSuccess) {
                    onSuccess();
                } else {
                    navigate("/competitions/zonals");
                }
            } else {
                const resJSON = await res.json();
                toast.error(resJSON.message || "Registration failed");
            }
        } catch {
            toast.error("Error creating team. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-[#D2C1A1] shadow-lg rounded-xl h-full overflow-y-scroll">
            <h2 className="text-2xl font-semibold text-center mb-4">Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-lg font-medium">Select Type</label>
                    <p>{type} Event</p>
                </div>

                <div>
                    <label className="block text-lg font-medium">Team Name</label>
                    <input
                        type="text"
                        placeholder="Enter team name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0F0F] mb-4 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    />
                    <label className="block text-lg font-medium">{type === "Team" ? "Member KY IDs" : "Your KY ID"}</label>
                    {type === "Individual" ? (
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="text"
                                value={userInfo?.ky_id}
                                readOnly={true}
                                className="flex-1 p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-xs font-medium mb-2">YOUR KY ID</label>
                            {members.map((member, index) => (
                                <div key={index} className="flex items-center gap-2 mt-2">
                                    <input
                                        type="text"
                                        readOnly={index === 0}
                                        placeholder={index === 0 ? "Your KY ID" : `Member ${index + 1} KY ID`}
                                        value={member}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        disabled={isSubmitting}
                                        className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0F0F] ${
                                            index === 0 ? "bg-gray-100 cursor-not-allowed" : ""
                                        } disabled:bg-gray-200 disabled:cursor-not-allowed`}
                                    />
                                    {members.length > 1 && index !== 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeMember(index)}
                                            disabled={isSubmitting}
                                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            ❌
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {type === "Team" && (
                        <button
                            type="button"
                            onClick={addMember}
                            disabled={isSubmitting || Boolean(eventId && countData[eventId] && members.length >= countData[eventId].maxparticipants)}
                            className={`mt-3 w-full p-2 rounded-lg transition ${
                                isSubmitting || (eventId && countData[eventId] && members.length >= countData[eventId].maxparticipants)
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#3E0F0F] hover:bg-[#4f1313] text-white"
                            }`}
                        >
                            ➕ Add Member
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full p-3 rounded-lg font-semibold transition ${
                        isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#3E0F0F] hover:bg-[#4f1313] text-white"
                    }`}
                >
                    {isSubmitting ? "Submitting..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default DynamicForm;