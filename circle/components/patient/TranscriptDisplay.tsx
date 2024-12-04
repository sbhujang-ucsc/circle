const TranscriptDisplay = ({ transcript }: { transcript: string[] }) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="font-semibold text-lg">Conversation Transcript:</h2>
      <ul>
        {transcript.map((line, index) => (
          <li key={index} className="mb-2 text-sm">
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
  
  export default TranscriptDisplay;
  