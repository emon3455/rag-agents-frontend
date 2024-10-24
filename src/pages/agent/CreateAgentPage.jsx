import { useState } from "react";
import CInput from "../../utils/CInput/CInput";
import CTextArea from "../../utils/CTextArea/CTextArea";

const CreateAgentPage = () => {
  // State for form fields
  const [agentName, setAgentName] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      // Send POST request using fetch
      const response = await fetch(
        "https://rag-agent-js.vercel.app/api/agents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAgent),
        }
      );

      if (response.ok) {
        setSuccess("Agent created successfully!");
        setAgentName("");
        setKnowledge("");
        setPrompt("");
      } else {
        setError("Failed to create agent. Please try again.");
      }
    } catch (err) {
      setError("Failed to create agent. Please try again.", err);
    }
  };

  return (
    <div className="mt-16 pt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-xs mx-auto border p-5 rounded-lg space-y-2 bg-orange-500 text-white"
      >
        <p className="text-2xl text-center mb-4">Create Agent</p>

        <CInput
          label="Agent Name"
          placeholder="Enter your agent's name"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
        />
        <CTextArea
          label="Knowledge"
          placeholder="Enter knowledge for your agent"
          value={knowledge}
          onChange={(e) => setKnowledge(e.target.value)}
        />
        <CTextArea
          label="Prompt"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          type="submit"
          className="bg-white text-orange-500 py-2 px-4 rounded-md w-full"
        >
          Create Agent
        </button>

        {/* Show success or error message */}
        {success && <p className="text-green-500 mt-2">{success}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateAgentPage;
