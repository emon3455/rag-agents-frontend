import { useState, useEffect } from "react";
import CInput from "../../utils/CInput/CInput";
import CTextArea from "../../utils/CTextArea/CTextArea";
import CButton from "../../utils/CButton/CButton";
import {
  useUpdateAgentMutation,
  useGetAgentByIdQuery,
} from "../../redux/features/agent/agentApiSlice"; // Import update and query hooks
import { useParams } from "react-router-dom";
import { successAlert } from "../../utils/allertFunction";

const UpdateAgentPage = () => {
  // State for form fields
  const { id } = useParams();
  const [agentName, setAgentName] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Use the update mutation hook from Redux
  const [updateAgent, { isLoading }] = useUpdateAgentMutation();

  // Fetch the current agent data by ID to populate the form
  const { data: agentData, isLoading: isFetching } = useGetAgentByIdQuery(id);

  useEffect(() => {
    if (agentData) {
      setAgentName(agentData.agent_name);
      setKnowledge(agentData.knowledge);
      setPrompt(agentData.prompt);
    }
  }, [agentData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (agentName === "") {
      setError("Agent Name is Required");
      return;
    }
    if (knowledge === "") {
      setError("Knowledge is Required");
      return;
    }
    if (prompt === "") {
      setError("Prompt is Required");
      return;
    }

    // Create agent object
    const agentData = {
      agentId: id, // Using the ID from URL parameters
      email: "newemail@example.com", // Include if necessary
      agent_name: agentName,
      knowledge,
      prompt,
    };

    try {
      // Send the agent update request using the updateAgent mutation
      await updateAgent(agentData).unwrap(); // unwrap to handle async behavior
      successAlert("Agent updated successfully!");
      // setSuccess();
    } catch (err) {
      console.log(err);
      setError("Failed to update agent. Please try again.");
    }
  };

  if (isFetching) {
    return <p>Loading...</p>; // You can customize the loading state
  }

  return (
    <div className="mt-16 py-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-5 rounded-lg space-y-2 border-2 border-secondary"
      >
        <p className="text-2xl text-center mb-4">Update Agent</p>

        {/* Show success or error message */}
        {success && (
          <p className="text-green-500 mt-2 text-center">{success}</p>
        )}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        <CInput
          label="Agent Name"
          placeholder="Enter your agent's name"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          className="border border-secondary h-10"
        />
        <CTextArea
          label="Knowledge"
          placeholder="Enter knowledge for your agent"
          value={knowledge}
          onChange={(e) => setKnowledge(e.target.value)}
          height="h-52"
          className="border border-secondary"
        />
        <CTextArea
          label="Prompt"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border border-secondary"
        />

        <CButton
          type="submit"
          variant="outline"
          className="rounded-md w-full"
          loading={isLoading} // Use the loading state from Redux
        >
          Update Agent
        </CButton>
      </form>
    </div>
  );
};

export default UpdateAgentPage;
