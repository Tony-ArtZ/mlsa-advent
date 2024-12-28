"use client";

import { getBadge } from "@/actions/getBadge";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import UserModal from "@/components/UserModal";
import { UserDetails } from "@/lib/verifications";

const Badge = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [badge, setBadge] = useState<number | null>(null);
  const [showGift, setShowGift] = useState(true);
  const [showOpenGift, setShowOpenGift] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showPreviousBadges, setShowPreviousBadges] = useState(false);
  const [showUserModal, setShowUserModal] = useState(true);

  const badgeId: { [key: number]: string } = {
    1: "christmasbadge_iron.png",
    2: "christmasbadge_bronze.png",
    3: "christmasbadge_silver.png",
    4: "christmasbadge_gold.png",
    5: "christmasbadge_diamond.png",
  };

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  const handleDownload = async () => {
    if (!badge) return;
    const response = await fetch(`/${badgeId[badge]}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MLSA_Christmas_Badge_${badge}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handlePreviousBadgeDownload = async (badgeNumber: number) => {
    const response = await fetch(`/${badgeId[badgeNumber]}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MLSA_Christmas_Badge_${badgeNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleGiftClick = () => {
    localStorage.setItem("gift_claimed", "true");
    setShowGift(false);
    setShowOpenGift(true);
    setTimeout(() => {
      setShowBadge(true);
      setTimeout(() => {
        setShowDownload(true);
      }, 3000);
    }, 1000);
  };

  const handleUserSubmit = async (details: UserDetails) => {
    setUserDetails(details);
    setShowUserModal(false);
    setIsLoading(true);

    try {
      const badge = await getBadge(details.email);
      if (!badge) {
        alert(
          "No badges found for this email address, please solve a question first"
        );
        router.push("/");
        return;
      }
      localStorage.setItem("userDetails", JSON.stringify(details));
      setBadge(badge);
    } catch (error) {
      alert("Error fetching badge");
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("userDetails");
    if (!stored) {
      setShowUserModal(true);
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(stored);
    setUserDetails(parsedData);
    setShowUserModal(false);

    const fetchBadge = async () => {
      try {
        const badge = await getBadge(parsedData.email);
        if (!badge) {
          alert("No badges found for this email address");
          router.push("/");
          return;
        }
        setBadge(badge);
      } catch (error) {
        alert("Error fetching badge");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBadge();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-christmas-snow text-xl animate-pulse">
          Loading your badge...
        </div>
      </div>
    );
  }

  const confettiConfig = {
    particles: {
      number: { value: 100 },
      color: {
        value: ["#FFD700", "#ff0000", "#00ff00", "#0000ff", "#ff00ff"],
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      opacity: {
        value: 0.8,
        random: true,
      },
      size: {
        value: 6,
        random: true,
      },
      move: {
        enable: true,
        speed: 10,
        direction: "top",
        random: true,
        straight: false,
        outMode: "out",
        gravity: {
          enable: true,
          acceleration: 0.5,
        },
      },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gap-8">
      <UserModal
        isOpen={showUserModal}
        onSubmit={handleUserSubmit}
        onClose={() => setShowUserModal(false)}
      />

      {(showOpenGift || showBadge) && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          // @ts-ignore
          options={confettiConfig}
          className="!fixed inset-0 -z-10" // Add negative z-index
        />
      )}

      <AnimatePresence mode="wait">
        {showGift && (
          <motion.div
            key="gift-closed"
            className="cursor-pointer"
            onClick={handleGiftClick}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 },
            }}
          >
            <Image
              src="/gift_closed.png"
              width={300}
              height={300}
              alt="Gift Icon"
              className="drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
          </motion.div>
        )}

        {(showOpenGift || showBadge) && (
          <motion.div
            key="gift-open-badge"
            className="relative w-[300px] h-[300px]"
          >
            {showOpenGift && (
              <motion.div
                key="open-gift"
                initial={{ scale: 1 }}
                animate={{
                  scale: showBadge ? 0.8 : 1.2,
                  opacity: showBadge ? 0.5 : 1,
                }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src="/gift.png"
                  fill
                  style={{ objectFit: "contain" }}
                  alt="Open Gift"
                  className="drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]"
                />
              </motion.div>
            )}

            {showBadge && (
              <motion.div
                key="badge"
                initial={{
                  scale: 0,
                  filter: "brightness(0) blur(10px)",
                }}
                animate={{
                  scale: [0, 0.5, 1.2, 1],
                  filter: [
                    "brightness(0) blur(10px)",
                    "brightness(0) blur(5px)",
                    "brightness(0.5) blur(0px)",
                    "brightness(1) blur(0px)",
                  ],
                }}
                transition={{
                  duration: 2,
                  times: [0, 0.3, 0.7, 1],
                  ease: "easeOut",
                }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <motion.div
                  animate={{
                    filter: [
                      "drop-shadow(0 0 0px rgba(255,215,0,0))",
                      "drop-shadow(0 0 30px rgba(255,215,0,0.8))",
                      "drop-shadow(0 0 15px rgba(255,215,0,0.6))",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Image
                    src={`/${badgeId[badge ?? 1]}`}
                    width={400}
                    height={400}
                    alt="Badge"
                    className="transform-gpu"
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}

        {showDownload && (
          <div className="flex flex-col items-center gap-4 relative z-50">
            {" "}
            {/* Add z-50 */}
            <motion.button
              key="download-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleDownload}
              className="frost-button mt-4 animate-bounce-gentle cursor-pointer" // Add cursor-pointer
            >
              <span className="flex items-center gap-2">
                Download Badge
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </span>
            </motion.button>
            <motion.div
              key="previous-badges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center z-50" // Add z-50
            >
              <button
                onClick={() => setShowPreviousBadges(!showPreviousBadges)}
                className="text-white/70 hover:text-white text-sm underline underline-offset-4 transition-colors cursor-pointer" // Add cursor-pointer
              >
                Download previous badges
              </button>

              {showPreviousBadges && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex flex-col gap-2 relative z-50" // Add relative and z-50
                >
                  {Array.from({ length: badge || 0 }, (_, i) => i + 1).map(
                    (num) => (
                      <button
                        key={num}
                        onClick={() => handlePreviousBadgeDownload(num)}
                        className="text-white/50 hover:text-white text-sm py-1 px-4 rounded-lg 
                               hover:bg-white/5 transition-all duration-200"
                      >
                        Day {num} Badge -{" "}
                        {num === 1
                          ? "Iron"
                          : num === 2
                          ? "Bronze"
                          : num === 3
                          ? "Silver"
                          : num === 4
                          ? "Gold"
                          : "Diamond"}
                      </button>
                    )
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Badge;
