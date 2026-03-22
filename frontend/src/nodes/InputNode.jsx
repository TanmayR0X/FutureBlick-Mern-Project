import { Handle, Position } from '@xyflow/react';

function InputNode({ data }) {
  const handleKeyDown = (e) => {
    e.stopPropagation();
  };

  const handleChange = (e) => {
    data.setPrompt(e.target.value);
  };

  const handleClear = () => {
    data.setPrompt('');
  };

  const charCount = data.prompt?.length || 0;
  const maxChars = 500;

  return (
    <div
      style={{
        background: '#1e1e2e',
        border: '2px solid #6366f1',
        borderRadius: '12px',
        padding: '16px',
        width: '280px',
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
      }}
    >
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: '#6366f1',
          width: '12px',
          height: '12px',
        }}
      />

      <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: '600',
            color: '#e2e8f0',
          }}
        >
          Input Prompt
        </h3>
        {data.prompt && (
          <button
            onClick={handleClear}
            style={{
              background: 'transparent',
              border: '1px solid #6366f1',
              borderRadius: '4px',
              color: '#6366f1',
              padding: '4px 8px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        )}
      </div>

      <textarea
        value={data.prompt || ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={data.loading}
        placeholder="Ask me anything..."
        maxLength={maxChars}
        style={{
          width: '100%',
          minHeight: '120px',
          padding: '12px',
          background: '#0f0f1a',
          border: '1px solid #2d2d3d',
          borderRadius: '8px',
          color: '#e2e8f0',
          fontSize: '14px',
          fontFamily: 'inherit',
          resize: 'vertical',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.target.style.border = '1px solid #6366f1';
        }}
        onBlur={(e) => {
          e.target.style.border = '1px solid #2d2d3d';
        }}
      />

      <div
        style={{
          marginTop: '8px',
          fontSize: '12px',
          color: charCount >= maxChars ? '#ef4444' : '#64748b',
          textAlign: 'right',
        }}
      >
        {charCount} / {maxChars} chars
      </div>
    </div>
  );
}

export default InputNode;
