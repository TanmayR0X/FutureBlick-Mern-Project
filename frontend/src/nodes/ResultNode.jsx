import { Handle, Position } from '@xyflow/react';
import ReactMarkdown from 'react-markdown';

function ResultNode({ data }) {
  return (
    <div
      style={{
        background: '#1e1e2e',
        border: '2px solid #6366f1',
        borderRadius: '12px',
        padding: '16px',
        width: '320px',
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
        overflow: 'hidden',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: '#6366f1',
          width: '12px',
          height: '12px',
        }}
      />

      <h3
        style={{
          margin: '0 0 12px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#e2e8f0',
        }}
      >
        AI Response
      </h3>

      <div
        className="result-content"
        style={{
          padding: '12px 12px 12px 20px',  /* ← left padding for bullets */
          background: '#0f0f1a',
          border: '1px solid #2d2d3d',
          borderRadius: '8px',
          minHeight: '120px',
          maxHeight: '200px',
          overflowY: 'auto',
          overflowX: 'hidden',
          color: '#e2e8f0',
          fontSize: '14px',
          lineHeight: '1.6',
        }}
      >
        {data.loading ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minHeight: '120px',
          }}>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>
              Thinking...
            </span>
          </div>
        ) : data.result ? (
          <div className="markdown-body">
            <ReactMarkdown>{data.result}</ReactMarkdown>
          </div>
        ) : (
          <div style={{
            color: '#64748b',
            fontStyle: 'italic',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '120px',
            textAlign: 'center',
          }}>
            Response will appear here...
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultNode;