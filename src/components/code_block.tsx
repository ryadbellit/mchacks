import { useState } from "react";
import "../css/components/code_block.css";


type Language = "javascript" | "typescript" | "python";

const CODE = `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`;

export default function CodeBlock() {
  const [language, setLanguage] = useState<Language>("javascript");

  return (
    <div className="simple-code">
      <div className="simple-code-header">
        <span>Solution.js</span>

        <select
          className="simple-code-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
        </select>
      </div>

      <pre className="simple-code-body">
        <code>{CODE}</code>
      </pre>
    </div>
  );
};
