"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CodeEditor } from "@/components/CodeMirror";
import SnowfallBackground from "@/components/SnowfallBackground";
import { useParams } from "next/navigation";
import Modal from "@/components/Modal";
import UserModal from "@/components/UserModal";
import type { UserDetails } from "@/lib/verifications";
import { getQuestion } from "@/actions/question";
import Loader from "@/components/Loader";
import { verifyCode } from "@/actions/verifyCode";
import { Submit } from "@/actions/submit";

const languages = ["javascript", "python", "cpp", "java", "c"] as const;

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
  const [canSubmit, setCanSubmit] = useState(true);
  const [outputDisplay, setOutputDisplay] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  }>({ show: false, success: false, message: "" });
  const [cooldownTime, setCooldownTime] = useState(0);

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
    createSubmission(details);
  };

  const startCooldown = () => {
    setCanSubmit(false);
    setCooldownTime(10);

    const timer = setInterval(() => {
      setCooldownTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (details?: UserDetails) => {
    if (!canSubmit) {
      alert("Please wait before submitting again");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await verifyCode(code, language, question.testCases);

      if (!result.success || result.error) {
        setOutputDisplay({
          show: true,
          success: false,
          message:
            result.error ||
            `Expected: ${question.testCases[0].expected}\nGot: ${result.output}`,
        });
        startCooldown();
      } else {
        setOutputDisplay({ show: false, success: false, message: "" });
        setShowUserModal(true);
      }
    } catch (error) {
      setOutputDisplay({
        show: true,
        success: false,
        message: "An error occurred while verifying your code",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const createSubmission = async (details?: UserDetails) => {
    try {
      const submission = {
        name: details?.name,
        email: details?.email,
        rollNumber: details?.rollNumber,
        code,
        language,
        day,
        questionId: question.id,
      };

      const res = await Submit(submission);
      if (res.success) {
        setShowUserModal(false);
        setHint(question.hint || "Complete the challenge to unlock the hint!");
        localStorage.removeItem("gift_claimed");
        setShowModal(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (!question) return null;

  return (
    <div className="min-h-screen moon-bg flex flex-wrap relative">
      <SnowfallBackground />

      {/* Problem Description Side */}
      <div className="w-full lg:w-1/2 p-4 lg:p-8 relative z-10 order-1">
        <div className="card p-4 lg:p-6 mb-4 lg:mb-6 ">
          <div className="inline-block px-3 py-1 rounded-full bg-christmas-red/20 text-christmas-red text-sm mb-4">
            Day {day} - December {25 + day}, 2024
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

            {/* Warning Section */}
            <div className="mt-4 p-4 bg-yellow-600/10 rounded-lg border border-yellow-600/20">
              <h3 className="text-yellow-500 flex items-center gap-2">
                <span>⚠️</span> Important Note
              </h3>
              <div className="mt-2 text-yellow-500/90">
                <p>Please note:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>
                    Input will be provided as a string through standard input
                    exactly as shown in the test cases
                  </li>
                  <li>You must parse the input properly before processing</li>
                  <li>
                    Your output format must exactly match the example output
                    format
                  </li>
                  <li>
                    Any deviation from the expected output format will be
                    considered incorrect
                  </li>
                </ul>
              </div>
            </div>

            {/* Test Cases Section */}
            <div className="mt-4 p-4 bg-green-800/10 rounded-lg border border-green-800/20">
              <h3 className="text-christmas-gold flex items-center gap-2">
                <span>🎯</span> Test Cases
              </h3>
              <div className="space-y-4 mt-2">
                {question.testCases[0] && (
                  <div className="bg-christmas-dark/30 rounded-md p-3">
                    <div className="text-christmas-gold/80 text-sm mb-2">
                      Test Case {1}:
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-christmas-snow/60 text-sm mb-1">
                          Input:
                        </div>
                        <pre className="text-christmas-snow/90">
                          {question.testCases[0].input}
                        </pre>
                      </div>
                      <div>
                        <div className="text-christmas-snow/60 text-sm mb-1">
                          Expected Output:
                        </div>
                        <pre className="text-christmas-snow/90 whitespace-pre">
                          {question.testCases[0].expected}
                        </pre>
                      </div>
                    </div>
                  </div>
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

            <button
              onClick={() => handleSubmit()}
              disabled={isSubmitting || !canSubmit}
              className="btn-primary disabled:opacity-50 min-w-[150px]"
            >
              {isSubmitting
                ? "Submitting..."
                : !canSubmit
                ? `Wait ${cooldownTime}s`
                : "Submit Solution"}
            </button>
          </div>
          <div className="h-[calc(100%-5rem)] lg:h-[calc(100%-4rem)] rounded-xl overflow-hidden border border-white/10">
            <CodeEditor
              language={language}
              value={code}
              onChange={handleCodeChange}
            />
          </div>
        </div>
      </div>

      {outputDisplay.show && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-lg ${
            outputDisplay.success ? "bg-green-800" : "bg-christmas-red"
          } text-christmas-snow z-50`}
        >
          <pre className="whitespace-pre-wrap">{outputDisplay.message}</pre>
          <button
            onClick={() => setOutputDisplay({ ...outputDisplay, show: false })}
            className="absolute top-2 right-2 text-christmas-snow/80 hover:text-christmas-snow"
          >
            ×
          </button>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          window.open("https://www.instagram.com/mlsakiit/?hl=en", "_blank");
          router.push("/");
        }}
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
