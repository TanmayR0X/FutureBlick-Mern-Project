import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Background,
  Controls,
  ReactFlowProvider,
  ReactFlow,
} from "@xyflow/react";
import axios from "axios";
import InputNode from "./nodes/InputNode";
import "@xyflow/react/dist/style.css";
import ResultNode from "./nodes/ResultNode";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    type: "smoothstep",
    style: { stroke: "#6366f1", strokeWidth: 2 },
  },
];

function FlowApp() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const nodes = useMemo(
    () => [
      {
        id: "1",
        type: "inputNode",
        position: { x: 100, y: 100 }, //  left node
        data: { prompt, setPrompt, loading },
      },
      {
        id: "2",
        type: "resultNode",
        position: { x: 500, y: 100 }, //  right node
        data: { result, loading },
      },
    ],
    [prompt, result, loading],
  );

  const edges = useMemo(() => {
    return initialEdges.map((edge) => ({
      ...edge,
      animated: loading,
    }));
  }, [loading]);

  const fetchHistory = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      setHistory(response.data.data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleRunFlow = async () => {
    if (!prompt.trim()) {
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await axios.post(`${API_BASE_URL}/ask-ai`, {
        prompt: prompt.trim(),
      });

      setResult(response.data.answer);
    } catch (error) {
      console.error("Error calling AI:", error);
      setResult("Error: Could not get response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!prompt.trim() || !result.trim()) {
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/save`, {
        prompt: prompt.trim(),
        response: result.trim(),
      });

      setSaved(true);
      await fetchHistory();

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

    const handleHistoryClick = (item) => {
      setPrompt(item.prompt);
      setResult(item.response);
      setSelectedHistory(item._id);
    };

    const handleNew = () => {
      setPrompt("");
      setResult("");
      setSelectedHistory(null);
    };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return `${seconds} secs ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hrs ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const truncateText = (text, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleRunFlow();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [prompt]);

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1>AI Flow</h1>
      </nav>

      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodesConnectable={false}
          nodesDraggable={true}
          fitView
        >
          <Background color="#1a1a2e" gap={16} />
          <Controls style={{color:"black"}}/>
        </ReactFlow>
      </div>

      <div className="control-panel">
        <div className="button-group">
          <button className="btn btn-new" onClick={handleNew}>
            + New
          </button>

          <button
            className="btn btn-primary"
            onClick={handleRunFlow}
            disabled={loading || !prompt.trim()}
          >
            {loading ? (
              <>
                <div className="spinner"></div>Running...
              </>
            ) : (
              "Run Flow"
            )}
          </button>

          <button
            className={`btn btn-success ${saved ? "saved" : ""}`}
            onClick={handleSave}
            disabled={!prompt.trim() || !result.trim() || loading}
          >
            {saved ? "Saved! ✓" : "Save"}
          </button>

          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
            Press Ctrl+Enter to run
          </div>
        </div>

        {history.length > 0 && (
          <div className="history-section">
            <div
              className="history-title"
              onClick={() => setHistoryOpen(!historyOpen)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>{historyOpen ? "▼" : "▶"}</span>
              <span>Recent Conversations ({history.length})</span>
            </div>

            {historyOpen && (
              <div className="history-list">
                {history.map((item) => (
                  <div
                    key={item._id}
                    className={`history-item ${selectedHistory === item._id ? "active" : ""}`}
                    onClick={() => handleHistoryClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="history-item-prompt">
                      {truncateText(item.prompt)}
                    </span>
                    <span className="history-item-time">
                      {formatTimeAgo(item.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <FlowApp />
    </ReactFlowProvider>
  );
}

export default App;
