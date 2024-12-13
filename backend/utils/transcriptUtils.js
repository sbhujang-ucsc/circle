/**
 * Format text (e.g., summary or analysis) into a structured JSX component.
 * @param {string} text - Raw text to format.
 * @returns {JSX.Element} - Formatted JSX component.
 */
export const formatTranscriptText = (text) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    const formatted = lines.map((line, index) => {
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="text-black">
            {line.replace("- ", "")}
          </li>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h3 key={index} className="font-bold text-lg mt-4 text-black">
            {line.replace("# ", "")}
          </h3>
        );
      }
      return (
        <p key={index} className="text-black">
          {line}
        </p>
      );
    });
  
    return <div>{formatted}</div>;
  };
  