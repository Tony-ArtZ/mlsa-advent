"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/CodeMirror";
import SnowfallBackground from "@/components/SnowfallBackground";
import { useParams } from "next/navigation";
import { Submit } from "@/actions/submit";
import Modal from "@/components/Modal";
import UserModal from "@/components/UserModal";
import type { UserDetails } from "@/lib/verifications";

const languages = ["javascript", "python", "cpp", "java"] as const;

const Editor = () => {
  const params = useParams();
  const day = parseInt(params.id as string);
  const [code, setCode] = useState("// Write your solution here\n");
  const [language, setLanguage] =
    useState<(typeof languages)[number]>("javascript");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [hint, setHint] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

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
    // Always show modal when submitting
    setShowUserModal(true);
    if (details) {
      setIsSubmitting(true);
      try {
        const res = await Submit({
          ...details,
          code,
          language,
          day,
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

  return (
    <div className="min-h-screen flex flex-wrap relative">
      <SnowfallBackground />

      {/* Problem Description Side */}
      <div className="w-full lg:w-1/2 p-4 lg:p-8 relative z-10 order-1">
        <div className="card p-4 lg:p-6 mb-4 lg:mb-6 animate-float">
          <div className="inline-block px-3 py-1 rounded-full bg-christmas-red/20 text-christmas-red text-sm mb-4">
            Day 1 - December 1, 2023
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-christmas-snow mb-4">
            🎄 Christmas Tree Pattern
          </h1>
          <div className="prose text-christmas-snow/80">
            <p className="mb-4 lg:mb-6 text-base lg:text-lg">
              Create a function that prints a Christmas tree pattern using
              asterisks (*). The function should take a number n as input, which
              represents the height of the tree.
            </p>

            <div className="card p-3 lg:p-4 mb-4 lg:mb-6 bg-christmas-green/10 overflow-x-auto">
              <h3 className="text-christmas-gold font-semibold mb-2">
                Example:
              </h3>
              <pre className="text-christmas-snow bg-black/30 p-3 lg:p-4 rounded-lg text-sm lg:text-base whitespace-pre">
                {`Input: n = 3
Output:
   *
  ***
 *****`}
              </pre>
            </div>

            <div className="card p-3 lg:p-4 bg-christmas-red/10">
              <h3 className="text-christmas-gold font-semibold mb-2">
                Constraints:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-christmas-snow/90">
                <li>1 ≤ n ≤ 20</li>
                <li>The tree should be centered</li>
              </ul>
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
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Solution"}
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
