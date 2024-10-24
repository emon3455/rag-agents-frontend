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
        <>
          <div className="bg-gray-950 mb-10 rounded-lg text-white flex justify-between gap-4">
            <div className="p-8">
              <p className="text-3xl">Create your agent</p>
              <p className="opacity-65 mt-6">
                Craft a unique AI agent of your own by uploading your data and{" "}
                <br />
                effortlessly customizing its appearance and personality.
              </p>
            </div>
            <div className="w-1/3 flex items-center gap-6 justify-end mr-4">
              <div className="space-y-4 py-3">
                <img
                  src={
                    "https://img.freepik.com/free-photo/cartoon-ai-robot-scene_23-2151675076.jpg?ga=GA1.1.522172574.1729754806&semt=ais_hybrid"
                  }
                  alt=""
                  className="max h-20 rounded-lg shadow-[0px_0px_5px_1px_cyan]"
                />
                <img
                  src={
                    "https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?t=st=1729769273~exp=1729772873~hmac=7dd547cf4755352b4f17367f9247d38f8ef10f7932b02f4b6ba5e1f002b76399&w=740"
                  }
                  alt=""
                  className="max h-20 rounded-lg shadow-[0px_0px_5px_1px_cyan]"
                />
              </div>
              <img
                src={
                  "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFpJTIwcm9ib3R8ZW58MHx8MHx8fDA%3D"
                }
                alt=""
                className="max-h-28 rounded-lg  shadow-[0px_0px_5px_1px_cyan]"
              />
            </div>
          </div>
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
              <CButton
                onClick={handleCreateAgent}
                className="border py-24 hover:bg-orange-500 overflow-hidden rounded-lg transition-all duration-300 hover:text-white"
              >
                <BsPlus size={22} /> Create Agent
              </CButton>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AgentPage;
