import { useState } from "react";
import { toast } from "react-toastify";

// const allowedKyId = ["KY1909"];

export default function RegistrationForm() {
  const eventsOptions = [
    "Food",
    "Accomodation",
    "T-Shirt",
    "Single Event",
    "Multi Event",
    "Event_1",
    "Event_2",
    "Event_3",
  ];
  const [kyId, setKyId] = useState("");
  const [uploads, setUploads] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEventChange = (event: any) => {
    setSelectedEvents((prevSelected) =>
      prevSelected.includes(event)
        ? prevSelected.filter((e) => e !== event)
        : [...prevSelected, event]
    );
  };

  //loll

  const handleSubmit = async () => {
    let authToken: any = localStorage.getItem("authTokens");

    if (!authToken) {
      toast.error("Unauthorized Access: No token found!");
      return;
    }

    if (!kyId || selectedEvents.length === 0 || !amount) {
      toast.error("Please fill all required fields.");
      return;
    }

    authToken = authToken ? JSON.parse(authToken) : null;
    console.log(authToken.access);

    setLoading(true);

    try {
      const response = await fetch(
        "https://apiv2.kashiyatra.org/api/payments/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.access}`,
          },
          body: JSON.stringify({
            ky_ids: kyId,
            selected_items: selectedEvents,
            amount: amount,
            upload: uploads,
          }),
        }
      );

      if (response.status === 401) {
        toast.error("Unauthorized Access");
        return;
      }

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Payment request successful!");
        setKyId("");
        setUploads("");
        setAmount(0);
        setSelectedEvents([]);
        // Add a toast for successful completion here
        toast.success("Validation completed successfully!");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Error processing request. Please try again.");
      console.error(error);
    } finally {
      // toast.success("");
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Register for Events</h2>
      <label htmlFor="KY ID">KY IDs [seperated by comma]</label>
      <input
        type="text"
        placeholder="KY ID"
        value={kyId}
        onChange={(e) => setKyId(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <label htmlFor="Amount">Amount paid</label>
      <input
        type="number"
        placeholder="Amount"
        value={Number(amount).toString()}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-2 border rounded mb-2"
      />
      <label htmlFor="Upload Links">Upload Drive link</label>
            <input
                type="text"
                placeholder="Upload Links"
                value={uploads}
                onChange={(e) => setUploads(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />

      {eventsOptions.map((event) => (
        <div key={event} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={event}
            value={event}
            checked={selectedEvents.includes(event)}
            onChange={() => handleEventChange(event)}
            className="mr-2"
          />
          <label htmlFor={event} className="text-gray-700">
            {event}
          </label>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}