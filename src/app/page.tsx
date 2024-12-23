import Image from "next/image";
import Link from "next/link";
import SnowfallBackground from "@/components/SnowfallBackground";

export default function Home() {
  const calendarDays = Array.from({ length: 5 }, (_, i) => ({
    day: i + 1,
    title: [
      "Santa's Helper",
      "Christmas Tree Builder",
      "Present Sorter",
      "Reindeer Routes",
      "Elf Workshop",
    ][i],
    isLocked: [false, true, true, true, true][i],
    difficulty: ["Easy", "Medium", "Hard", "Medium", "Hard"][i],
    emoji: ["🎅", "🎄", "🎁", "🦌", "⚒️"][i],
    description: [
      "Help Santa organize his database",
      "Create the perfect Christmas tree algorithm",
      "Sort presents by priority",
      "Optimize delivery paths",
      "Manage workshop efficiency",
    ][i],
  }));

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-christmas-dark via-christmas-pine to-christmas-dark/95">
      <SnowfallBackground />

      {/* Header Section */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 animate-float opacity-20">
          <Image
            src="/holly-decoration.png"
            alt="Holly"
            fill
            className="object-contain"
          />
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8 animate-float">
            <div className="w-40 h-40 relative">
              <Image
                src="/mlsaLogo.webp"
                alt="MLSA KIIT Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-christmas-red">Advent</span>
            <span className="text-christmas-snow"> of </span>
            <span className="text-christmas-green">Code</span>
          </h1>
          <p className="text-christmas-gold text-xl mb-8">
            🎄 5 Days of Coding Magic 🎄
          </p>
        </div>

        {/* Instagram Follow Section */}
        <div className="card p-8 max-w-4xl mx-auto mb-16 text-center">
          <div className="animate-pulse mb-4">
            <span className="text-4xl">🎅</span>
          </div>
          <h2 className="text-3xl font-bold text-christmas-gold mb-4">
            Join Santa's Digital Workshop! 🎄
          </h2>
          <p className="text-christmas-snow/80 mb-6">
            Follow the MLSA KIIT on Instagram for challenge alerts and special
            surprises!
          </p>
          <Link
            href="https://www.instagram.com/mlsakiit/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-christmas-red to-christmas-green 
                      text-white font-bold py-4 px-8 rounded-full
                     transform transition-all hover:scale-105 shadow-lg hover:shadow-xl
                     border-2 border-christmas-gold animate-glow"
          >
            <span className="text-2xl">🎁</span>
            Follow Us on Instagram!
            <span className="text-2xl">✨</span>
          </Link>
          <div className="animate-pulse mt-4">
            <span className="text-4xl">🎄</span>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="card p-8 max-w-6xl mx-auto bg-christmas-dark/80">
            <h2 className="text-3xl font-bold text-center text-christmas-gold mb-8 flex items-center justify-center gap-4">
              <span className="text-4xl">🎄</span>
              Advent Calendar
              <span className="text-4xl">🎄</span>
            </h2>

            {/* Calendar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {calendarDays.map(
                ({ day, title, isLocked, difficulty, emoji, description }) => (
                  <Link
                    href={isLocked ? "#" : `/editor/${day}`}
                    key={day}
                    className={`aspect-square relative group ${
                      isLocked ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <div
                      className={`
                    calendar-day w-full h-full rounded-lg p-4
                    flex flex-col items-center justify-between
                    transform transition-all duration-300
                    ${
                      isLocked
                        ? "bg-white/5 opacity-50"
                        : "bg-white/10 hover:scale-105 hover:bg-white/20"
                    }
                    border-2 border-christmas-gold/30
                    backdrop-blur-sm
                  `}
                    >
                      <span className="text-3xl mb-2">{emoji}</span>
                      <span className="text-2xl font-bold text-christmas-snow mb-1">
                        Day {day}
                      </span>
                      <h3 className="text-christmas-gold font-medium text-sm mb-1">
                        {title}
                      </h3>
                      <p className="text-xs text-christmas-snow/70 line-clamp-2">
                        {description}
                      </p>
                      {isLocked && (
                        <span className="text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          🔒
                        </span>
                      )}
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Instructions Card */}
          <div className="card p-6 max-w-2xl mx-auto mt-8 text-center">
            <h3 className="text-xl font-bold text-christmas-snow mb-4">
              How to Participate
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start space-x-3">
                <span className="text-xl">1️⃣</span>
                <p className="text-sm text-christmas-snow/80">
                  Click on today's unlocked challenge to begin
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-xl">2️⃣</span>
                <p className="text-sm text-christmas-snow/80">
                  Write your solution in the code editor
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-xl">3️⃣</span>
                <p className="text-sm text-christmas-snow/80">
                  Submit your solution to earn points
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-xl">4️⃣</span>
                <p className="text-sm text-christmas-snow/80">
                  Come back daily for new challenges
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About MLSA Section */}
        <div className="card p-8 max-w-4xl mx-auto my-16 text-center">
          <h2 className="text-2xl font-bold text-christmas-gold mb-4">
            About MLSA KIIT
          </h2>
          <p className="text-christmas-snow/80 mb-6">
            Microsoft Learn Student Ambassadors at KIIT University brings you
            this festive coding challenge. Join us in celebrating the holiday
            season with programming puzzles that will test your skills and
            creativity! 🚀
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <span className="text-3xl mb-2 block">👩‍💻</span>
              <h3 className="text-christmas-gold font-medium mb-1">Learn</h3>
              <p className="text-sm text-christmas-snow/70">
                Practice coding with festive themes
              </p>
            </div>
            <div className="p-4">
              <span className="text-3xl mb-2 block">🏆</span>
              <h3 className="text-christmas-gold font-medium mb-1">Compete</h3>
              <p className="text-sm text-christmas-snow/70">
                Complete daily challenges
              </p>
            </div>
            <div className="p-4">
              <span className="text-3xl mb-2 block">🌟</span>
              <h3 className="text-christmas-gold font-medium mb-1">Win</h3>
              <p className="text-sm text-christmas-snow/70">
                Earn badges and recognition
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center">
          <p className="text-christmas-snow/60 text-sm">
            Made with ❤️ by MLSA KIIT • Spreading Christmas Cheer Through Code
          </p>
        </div>
      </div>
    </main>
  );
}
