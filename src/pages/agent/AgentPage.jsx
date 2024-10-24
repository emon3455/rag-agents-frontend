import { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import CButton from "../../utils/CButton/CButton";

const AgentPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const imgUrls = [
    // "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFpJTIwcm9ib3R8ZW58MHx8MHx8fDA%3D",
  ];

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(
          "https://rag-agent-js.vercel.app/api/agents"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch agents.");
        }
        const data = await response.json();
        console.log("agents: ", data);
        setAgents(data);
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleCreateAgent = () => {
    console.log("Create Agent clicked");
  };

  // Helper function to get a random image URL from the imgUrls array
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imgUrls.length);
    return imgUrls[randomIndex];
  };

  return (
    <div className="mt-16 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Agents</h1>
        <button
          onClick={handleCreateAgent}
          className="flex items-center gap-2 bg-orange-500 text-white rounded-md py-2 px-4"
        >
          <BsPlus size={22} /> Create Agent
        </button>
      </div>

      {loading && <p>Loading agents...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2">
          {agents.length > 0 ? (
            agents.map((agent) => (
              <div
                key={agent.id}
                className="group relative border  rounded-md shadow-md overflow-hidden"
              >
                {/* Display a random image for each agent */}
                <img
                  src={getRandomImage()}
                  alt="Agent"
                  className="w-full h-48 object-cover rounded-md "
                />
                {/* Overlay content - hidden by default, shown on hover */}
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 hover:bg-opacity-60 text-white  opacity-100 transition duration-300 p-4 rounded-md">
                  <h2 className="font-semibold text-lg mb-2">
                    {agent.agent_name}
                  </h2>
                  <CButton
                    variant={"outline"}
                    // loading={isLoading}
                  >
                    Start Conversation
                  </CButton>
                </div>
              </div>
            ))
          ) : (
            <p>No agents found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentPage;
