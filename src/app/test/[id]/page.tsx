"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CodeEditor } from "@/components/CodeMirror";
import SnowfallBackground from "@/components/SnowfallBackground";
import { useParams } from "next/navigation";
import { Submit } from "@/actions/submit";
import Modal from "@/components/Modal";
import UserModal from "@/components/UserModal";
import type { UserDetails } from "@/lib/verifications";
import { getQuestion } from "@/actions/question";
import Loader from "@/components/Loader";
import { executeCode } from "@/actions/execute";  

const languages = ["javascript", "python", "cpp", "java", "rust"] as const;

const Editor = () => {
  const router = useRouter();
  const params = useParams();
  const day = parseInt(params.id as string);

  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("// Write your solution here\n");
  const [language, setLanguage] =
    useState<(typeof languages)[number]>("javascript");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [hint, setHint] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [executionResults, setExecutionResults] = useState<any>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await getQuestion(day);
        if (response.error) throw new Error("Question not found");
        if (response.question?.isLocked) {
          router.push("/");
          return;
        }

        setQuestion(response.question);
      } catch (error) {
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [day, router]);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage(e.target.value as typeof language);
    },
    []
  );

  const handleUserDetails = (details: UserDetails) => {
    setUserDetails(details);
    localStorage.setItem("userDetails", JSON.stringify(details));
    setShowUserModal(false);
    handleSubmit(details);
  };

  const handleSubmit = async (details?: UserDetails) => {
    setShowUserModal(false);
    if (details) {
      setIsSubmitting(true);
      try {
        const res = await Submit({
          ...details,
          code,
          language,
          day,
          questionId: question.id,
        });

        if (res.success) {
          setHint(res.hint || "Complete the challenge to unlock the hint!");
          setShowModal(true);
        } else {
          throw new Error("Submission failed");
        }
      } catch (error) {
        alert("Failed to submit. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCheck = async () => {
    setIsChecking(true);
    console.log('Starting code check:', { language, codeLength: code.length });
    
    try {
      const res = await executeCode(code, language, question.testCases);
      console.log('Code check completed:', res);
      setExecutionResults(res);
    } catch (error) {
      console.error('Code check failed:', error);
      alert("Failed to check code. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  if (loading) return <Loader />;
  if (!question) return null;

  return (
    <div className="min-h-screen flex flex-wrap relative">
      <SnowfallBackground />

      {/* Problem Description Side */}
      <div className="w-full lg:w-1/2 p-4 lg:p-8 relative z-10 order-1">
        <div className="card p-4 lg:p-6 mb-4 lg:mb-6 ">
          <div className="inline-block px-3 py-1 rounded-full bg-christmas-red/20 text-christmas-red text-sm mb-4">
            Day {day} - December {day}, 2023
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-christmas-snow mb-4">
            {question.emoji} {question.title}
          </h1>
          <div className="prose text-christmas-snow/80">
            <div className="whitespace-pre-wrap">{question.description}</div>

            {/* Example Section */}
            <div className="mt-6 p-4 bg-christmas-gold/10 rounded-lg border border-christmas-gold/20">
              <h3 className="text-christmas-gold flex items-center gap-2">
                <span>🎁</span> Example
              </h3>
              <pre className="mt-2 p-3 bg-christmas-dark/30 rounded-md overflow-x-auto">
                {question.example}
              </pre>
            </div>

            {/* Constraints Section */}
            <div className="mt-4 p-4 bg-christmas-red/10 rounded-lg border border-christmas-red/20">
              <h3 className="text-christmas-red flex items-center gap-2">
                <span>🎄</span> Constraints
              </h3>
              <pre className="mt-2 p-3 bg-christmas-dark/30 rounded-md overflow-x-auto">
                {question.constraints}
              </pre>
            </div>

            {/* Test Cases Section */}
            <div className="mt-4 p-4 bg-green-800/10 rounded-lg border border-green-800/20">
              <h3 className="text-christmas-gold flex items-center gap-2">
                <span>🎯</span> Test Cases
              </h3>
              <div className="space-y-4 mt-2">
                {question.testCases?.map(
                  (
                    test: { input: string; expected: string },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="bg-christmas-dark/30 rounded-md p-3"
                    >
                      <div className="text-christmas-gold/80 text-sm mb-2">
                        Test Case {index + 1}:
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-christmas-snow/60 text-sm mb-1">
                            Input:
                          </div>
                          <pre className="text-christmas-snow/90">
                            {test.input}
                          </pre>
                        </div>
                        <div>
                          <div className="text-christmas-snow/60 text-sm mb-1">
                            Expected Output:
                          </div>
                          <pre className="text-christmas-snow/90 whitespace-pre">
                            {test.expected}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Side */}
      <div className="w-full lg:w-1/2 p-4 lg:p-8 relative z-10 order-2 min-h-[60vh] lg:min-h-0">
        <div className="card p-4 lg:p-6 h-full lg:h-[calc(100vh-4rem)]">
          <div className="flex items-center justify-between gap-4 mb-4">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-christmas-dark/50 text-christmas-snow rounded-lg 
                       px-4 py-2 border border-white/10 focus:ring-2 
                       focus:ring-christmas-gold/50 focus:outline-none"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={handleCheck}
                disabled={isChecking}
                className="btn-secondary disabled:opacity-50"
              >
                {isChecking ? "Checking..." : "Check Solution"}
              </button>
              <button
                onClick={() => setShowUserModal(true)}
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Solution"}
              </button>
            </div>
          </div>
          <div className="h-[calc(100%-5rem)] lg:h-[calc(100%-4rem)] rounded-xl overflow-hidden border border-white/10">
            <CodeEditor
              language={language}
              value={code}
              onChange={handleCodeChange}
            />
          </div>
          {executionResults && (
            <div className="mt-4 p-4 bg-christmas-dark/30 rounded-lg">
              <h3 className="text-christmas-gold mb-2">Execution Results:</h3>
              {executionResults.success ? (
                executionResults.results.map((result: any, index: number) => (
                  <div key={index} className="mb-2">
                    <div className={`text-${result.passed ? 'green' : 'red'}-500`}>
                      Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                    </div>
                    {!result.passed && (
                      <div className="text-sm text-christmas-snow/60">
                        <div>Expected: {question.testCases[index].expected}</div>
                        <div>Got: {result.output}</div>
                        {result.error && <div className="text-red-500">Error: {result.error}</div>}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-red-500">{executionResults.error}</div>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        hint={hint}
      />

      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSubmit={handleUserDetails}
      />
    </div>
  );
};

export default Editor;
