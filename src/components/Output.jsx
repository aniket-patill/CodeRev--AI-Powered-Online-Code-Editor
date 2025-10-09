"use client";
import { useState, useEffect } from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [needsInput, setNeedsInput] = useState(false);
  const [inputExamples, setInputExamples] = useState('');

  // Input detection patterns for different languages
  const inputPatterns = {
    c: [/\bscanf\s*\(/, /\bfgets\s*\(/, /\bgetchar\s*\(/, /\bfgetc\s*\(/, /\bgets\s*\(/],
    cpp: [/\bcin\s*>>/, /\bgetline\s*\(/, /\bcin\.get\s*\(/, /\bcin\.getline\s*\(/],
    python: [/\binput\s*\(/, /\braw_input\s*\(/, /\bsys\.stdin\.readline\s*\(/],
    java: [/\bScanner\b/, /\bnextLine\s*\(/, /\bnext\s*\(/, /\bnextInt\s*\(/, /\bnextDouble\s*\(/, /\bnextFloat\s*\(/, /\bnextLong\s*\(/],
    csharp: [/\bConsole\.ReadLine\s*\(/, /\bConsole\.Read\s*\(/, /\bConsole\.ReadKey\s*\(/],
    php: [/\breadline\s*\(/, /\bfgets\s*\(/, /\bfgetc\s*\(/],
    javascript: [/\bprompt\s*\(/, /\breadline\s*\(/, /\bprocess\.stdin\.read\s*\(/],
    typescript: [/\bprompt\s*\(/, /\breadline\s*\(/, /\bprocess\.stdin\.read\s*\(/]
  };

  // Generate input examples based on language and detected patterns
  const generateInputExamples = (code, lang) => {
    const examples = [];
    
    if (lang === 'c' || lang === 'cpp') {
      const scanfCount = (code.match(/\bscanf\s*\(/g) || []).length;
      const cinCount = (code.match(/\bcin\s*>>/g) || []).length;
      const getlineCount = (code.match(/\bgetline\s*\(/g) || []).length;
      
      if (scanfCount > 0) {
        examples.push(`// For ${scanfCount} scanf() call(s):`);
        examples.push('John');
        if (scanfCount > 1) examples.push('25');
        if (scanfCount > 2) examples.push('Engineer');
      }
      
      if (cinCount > 0) {
        examples.push(`// For ${cinCount} cin >> call(s):`);
        examples.push('Alice');
        if (cinCount > 1) examples.push('30');
      }
      
      if (getlineCount > 0) {
        examples.push('// For getline() calls:');
        examples.push('Hello World');
        examples.push('This is a longer string');
      }
    }
    
    if (lang === 'python') {
      const inputCount = (code.match(/\binput\s*\(/g) || []).length;
      if (inputCount > 0) {
        examples.push(`# For ${inputCount} input() call(s):`);
        examples.push('Bob');
        if (inputCount > 1) examples.push('25');
        if (inputCount > 2) examples.push('Developer');
      }
    }
    
    if (lang === 'java') {
      const scannerCount = (code.match(/\bScanner\b/g) || []).length;
      if (scannerCount > 0) {
        examples.push(`// For Scanner input:`);
        examples.push('Charlie');
        examples.push('28');
        examples.push('Software Engineer');
      }
    }
    
    if (lang === 'csharp') {
      const readlineCount = (code.match(/\bConsole\.ReadLine\s*\(/g) || []).length;
      if (readlineCount > 0) {
        examples.push(`// For ${readlineCount} Console.ReadLine() call(s):`);
        examples.push('David');
        if (readlineCount > 1) examples.push('32');
      }
    }
    
    return examples.join('\n');
  };

  // Detect if code needs input
  const detectInputNeeds = (code, lang) => {
    const patterns = inputPatterns[lang] || [];
    return patterns.some(pattern => pattern.test(code));
  };

  // Update input detection when code or language changes
  useEffect(() => {
    const checkInputNeeds = () => {
      if (editorRef.current) {
        const sourceCode = editorRef.current.getValue();
        const needsInputDetected = detectInputNeeds(sourceCode, language);
        setNeedsInput(needsInputDetected);
        
        if (needsInputDetected) {
          const examples = generateInputExamples(sourceCode, language);
          setInputExamples(examples);
          setShowInput(true); // Auto-show input field when input is needed
        } else {
          setInputExamples('');
        }
      }
    };

    // Check immediately
    checkInputNeeds();

    // Set up interval to check for changes
    const interval = setInterval(checkInputNeeds, 1000);
    
    return () => clearInterval(interval);
  }, [language]);

  // Also check when editor content changes
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const disposable = editor.onDidChangeModelContent(() => {
        const sourceCode = editor.getValue();
        const needsInputDetected = detectInputNeeds(sourceCode, language);
        setNeedsInput(needsInputDetected);
        
        if (needsInputDetected) {
          const examples = generateInputExamples(sourceCode, language);
          setInputExamples(examples);
        } else {
          setInputExamples('');
        }
      });
      
      return () => disposable.dispose();
    }
  }, [language]);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    setIsLoading(true);
    try {
      const { run: result } = await executeCode(language, sourceCode, userInput);
      setOutput(result.output.split("\n"));
      if (result.stderr) {
        setIsError(true);
        // Show compilation errors for C/C++
        if (language === 'c' || language === 'cpp') {
          setOutput(result.stderr.split("\n"));
        }
      } else {
        setIsError(false);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setOutput([`Error while running the code: ${error.message || 'Unknown error'}`]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" ml-3 w-[30%] bg-black ring-1 ring-gray-700 rounded-lg shadow-lg ">
      {/* Input Detection Alert */}
      {needsInput && !showInput && (
        <div className="mb-4 p-3 bg-amber-900/20 border border-amber-500/30 rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-amber-300 text-sm font-medium">
              Input Required
            </span>
          </div>
          <p className="text-amber-200 text-xs mt-1">
            Your code contains input functions. Click "Add Input" to provide data.
          </p>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <button
          onClick={runCode}
          className={`flex-1 py-2 text-white ring-1 rounded-md ${
            needsInput && !userInput.trim() 
              ? 'bg-orange-600 hover:bg-orange-700 ring-orange-500' 
              : 'bg-indigo-700 hover:bg-indigo-900 ring-indigo-500'
          } bg-opacity-30`}
          disabled={isLoading}
        >
          {isLoading ? 'Compiling...' : needsInput && !userInput.trim() ? 'Run (No Input)' : 'Run Code'}
        </button>
        <button
          onClick={() => setShowInput(!showInput)}
          className={`px-3 py-2 text-white ring-1 rounded-md text-sm ${
            needsInput 
              ? 'bg-amber-600 hover:bg-amber-700 ring-amber-500' 
              : 'bg-gray-600 hover:bg-gray-700 ring-gray-500'
          }`}
        >
          {showInput ? 'Hide Input' : needsInput ? 'Add Input ⚠️' : 'Add Input'}
        </button>
      </div>

      {showInput && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm text-gray-300">
              Program Input (stdin):
            </label>
            {needsInput && (
              <span className="text-xs text-amber-400 bg-amber-900/30 px-2 py-1 rounded">
                Required
              </span>
            )}
          </div>
          
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={needsInput ? "Enter input for your program..." : "Enter input for your program..."}
            className={`w-full h-20 px-3 py-2 bg-gray-800 text-white border rounded-md resize-none focus:outline-none focus:ring-2 text-sm ${
              needsInput && !userInput.trim() 
                ? 'border-amber-500 focus:ring-amber-500' 
                : 'border-gray-600 focus:ring-indigo-500'
            }`}
          />
          
          {/* Input Examples */}
          {inputExamples && (
            <div className="mt-2 p-2 bg-gray-800/50 border border-gray-600 rounded text-xs">
              <div className="text-gray-400 mb-1">Example input format:</div>
              <pre className="text-green-400 whitespace-pre-wrap">{inputExamples}</pre>
            </div>
          )}
          
          <p className="text-xs text-gray-400 mt-1">
            {needsInput 
              ? "⚠️ Your program requires input. Provide data above or the program may hang."
              : "This input will be provided to your program when it requests user input."
            }
          </p>
        </div>
      )}
      
      <div
        className={` p-4 rounded-md overflow-auto h-[90%] ${isError ? 'border-red-500 text-red-500' : ' text-white'} `}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-16 h-16 border-4 border-t-teal-500 border-transparent rounded-full animate-spin"></div>
          </div>
        ) : output ? (
          output.map((line, i) => (
            <p key={i} className="text-sm whitespace-pre-wrap overflow-auto">{line}</p>
          ))
        ) : (
          <p className="text-gray-400">Click "Run Code" to see the output here</p>
        )}
      </div>
    </div>
  );
};

export default Output;
