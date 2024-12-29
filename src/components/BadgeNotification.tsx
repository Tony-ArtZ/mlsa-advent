"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const BadgeNotification = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isClaimed =
      localStorage.getItem("gift_claimed") ||
      !localStorage.getItem("userDetails");
    if (!isClaimed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("gift_claimed", "true");
  };

  if (!isVisible) return null;

  return (
    <Link href="/badge">
      <div className="fixed bottom-4 sm:top-4 right-4 z-50 animate-fadeIn">
        <div className="relative">
          <div className="card p-4 flex items-center gap-3 pr-12 animate-bounce-gentle max-w-[95vw] sm:max-w-none">
            <div className="text-4xl animate-shake">🎁</div>
            <div>
              <h3 className="text-christmas-gold font-bold mb-1">
                Claim Your Badge!
              </h3>
              <p className="text-christmas-snow/80 text-sm">
                Congrats on your progress, claim your badge now!
              </p>
            </div>
            {/* <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-christmas-snow/60 hover:text-christmas-snow"
          >
            ✕
          </button> */}
          </div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-christmas-red to-christmas-green opacity-30 blur rounded-lg animate-pulse" />
        </div>
      </div>
    </Link>
  );
};

export default BadgeNotification;
