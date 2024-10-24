import { useState } from "react";
import CInput from "../../utils/CInput/CInput";
import CTextArea from "../../utils/CTextArea/CTextArea";
import CButton from "../../utils/CButton/CButton";
import { useCreateAgentMutation } from "../../redux/features/agent/agentApiSlice"; // Import mutation hook

const CreateAgentPage = () => {
  // State for form fields
  const [agentName, setAgentName] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Use mutation hook from Redux
  const [createAgent, { isLoading }] = useCreateAgentMutation();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Create agent object
    const newAgent = {
      agent_name: agentName,
      knowledge,
      prompt,
    };

    try {
      // Send the agent creation request using the createAgent mutation
      await createAgent(newAgent).unwrap(); // unwrap to handle async behavior
      setSuccess("Agent created successfully!");
      setAgentName("");
      setKnowledge("");
      setPrompt("");
    } catch (err) {
      setError("Failed to create agent. Please try again.", err);
    }
  };

  return (
    <div className="mt-16 py-8 bg-black">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto  p-5 rounded-lg space-y-2 bg-black border-2 border-secondary text-white"
      >
        <p className="text-2xl text-center mb-4">Create Agent</p>

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
          className="bg-black border border-secondary h-10"
        />
        <CTextArea
          label="Knowledge"
          placeholder="Enter knowledge for your agent"
          value={knowledge}
          onChange={(e) => setKnowledge(e.target.value)}
          height="h-52"
          className="bg-black border border-secondary"
        />
        <CTextArea
          label="Prompt"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-black border border-secondary"
        />

        <CButton
          type="submit"
          variant="outline"
          className="rounded-md w-full"
          loading={isLoading} // Use the loading state from Redux
        >
          Create Agent
        </CButton>
      </form>
    </div>
  );
};

export default CreateAgentPage;
