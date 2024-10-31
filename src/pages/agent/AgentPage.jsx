import { useNavigate } from "react-router-dom";
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import CButton from "../../utils/CButton/CButton";
import {
  useGetUserAllAgentQuery,
  useCreateAgentMutation,
  useDeleteAgentMutation,
} from "../../redux/features/agent/agentApiSlice";

import { useEffect, useRef, useState } from "react";
import {
  errorAlert,
  successAlert,
  warningAlert,
} from "../../utils/allertFunction";

const AgentPage = () => {
  const navigate = useNavigate();
  const user  = JSON.parse(localStorage.getItem('ODL-LLM-USER'))
  const {
    data: agents,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserAllAgentQuery(user?._id);
  console.log(agents);
  
  const [showDropdown, setShowDropdown] = useState("");
  const dropdownRef = useRef(null);
  const [createAgent] = useCreateAgentMutation();

  const [deleteAgent] = useDeleteAgentMutation();

  const handleDelete = async (agentId) => {
    // Show confirmation alert
    const result = await warningAlert({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    // Proceed if the user confirmed
    if (result.isConfirmed) {
      try {
        await deleteAgent(agentId).unwrap();
        refetch();
        successAlert({ text: "Agent deleted successfully" });
      } catch (error) {
        console.error("Failed to delete agent:", error);
        errorAlert({ text: "Failed to delete agent" });
      }
    }
  };

  const imgUrls = [
    "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFpJTIwcm9ib3R8ZW58MHx8MHx8fDA%3D",
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imgUrls.length);
    return imgUrls[randomIndex];
  };

  const handleCreateAgent = async () => {
    try {
      await createAgent({ agentName: "New Agent" });
      navigate("/create-agent"); // or handle redirection based on success
    } catch (err) {
      console.error("Failed to create agent:", err);
    }
  };

  const handleStartConversation = (agentId) => {
    navigate(`/conversation/${agentId}`);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-semibold">My Agents</h1>
        <button
          onClick={handleCreateAgent}
          className="flex items-center gap-2 bg-orange-500 text-white rounded-md py-2 px-4"
        >
          <BsPlus size={22} /> Create Agent
        </button>
      </div>

      {isLoading && <p>Loading agents...</p>}
      {isError && (
        <p className="text-red-500">
          {error?.message || "Error fetching agents"}
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <div className="bg-gray-950 mb-10 rounded-lg text-white flex flex-col-reverse lg:flex-row justify-between gap-4 max-w-screen-xl mx-auto">
            <div className="p-8">
              <p className="text-3xl">Create your agent</p>
              <p className="opacity-65 mt-6">
                Craft a unique AI agent of your own by uploading your data and{" "}
                <br className="hidden lg:block" />
                effortlessly customizing its appearance and personality.
              </p>
            </div>
            <div className="w-full lg:w-1/3 flex items-center gap-6 justify-end mr-4">
              <div className="space-y-4 py-3 ml-auto lg:ml-0">
                <img
                  src="https://img.freepik.com/free-photo/cartoon-ai-robot-scene_23-2151675076.jpg?ga=GA1.1.522172574.1729754806&semt=ais_hybrid"
                  alt="AI Robot"
                  className="max h-20 rounded-lg shadow-[0px_0px_5px_1px_cyan]"
                />
                <img
                  src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg"
                  alt="AI Robot"
                  className="max h-20 rounded-lg shadow-[0px_0px_5px_1px_cyan]"
                />
              </div>
              <img
                src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFpJTIwcm9ib3R8ZW58MHx8MHx8fDA%3D"
                alt="AI Robot"
                className="max-h-28 rounded-lg  shadow-[0px_0px_5px_1px_cyan] mr-auto lg:mr-0"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-xl mx-auto">
            {agents?.agents?.length > 0 ? (
              agents?.agents.map((agent) => (
                <div
                  key={agent._id}
                  className="group relative border  rounded-md shadow-md overflow-hidden"
                >
                  <div className="absolute top-2 right-1 text-white z-50">
                    <BsThreeDotsVertical
                      size={20}
                      className="ml-auto relative cursor-pointer hover:text-orange-500"
                      onClick={() =>
                        showDropdown === agent._id
                          ? setShowDropdown("")
                          : setShowDropdown(agent._id)
                      }
                    />

                    {showDropdown === agent._id && (
                      <div
                        className="bg-black p-4 right-4 relative rounded-md"
                        ref={dropdownRef}
                      >
                        <ul className="space-y-4">
                          <li
                            className="hover:bg-orange-500 px-2 rounded cursor-pointer"
                            onClick={() =>
                              navigate(`/update-agent/${agent._id}`)
                            }
                          >
                            Update Agent
                          </li>
                          <li
                            className="hover:bg-red-700 px-2 rounded cursor-pointer"
                            onClick={() => handleDelete(agent._id)}
                          >
                            Delete Agent
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <img
                    src={getRandomImage()}
                    alt="Agent"
                    className="w-full h-48 object-cover rounded-md "
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 hover:bg-opacity-60 text-white  opacity-100 transition duration-300 p-4 rounded-md">
                    <h2 className="font-semibold text-lg mb-2">
                      {agent.agent_name}
                    </h2>
                    <CButton
                      variant={"outline"}
                      onClick={() => handleStartConversation(agent._id)}
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
