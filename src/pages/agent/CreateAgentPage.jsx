import { useState } from "react";
import CInput from "../../utils/CInput/CInput";
import CTextArea from "../../utils/CTextArea/CTextArea";
import CButton from "../../utils/CButton/CButton";

const CreateAgentPage = () => {
  // State for form fields
  const [agentName, setAgentName] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
    } finally {
      setLoading(false);
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
          loading={loading}
        >
          Create Agent
        </CButton>
      </form>
    </div>
  );
};

export default CreateAgentPage;
