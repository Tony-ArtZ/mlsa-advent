interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  hint: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, hint }) => {
  if (!isOpen) return null;

  const handleClaim = () => {
    window.location.href = "/badge";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-christmas-dark p-6 rounded-xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-christmas-snow mb-4">
          Thank You! 🎄
        </h2>
        <p className="text-christmas-snow/80 mb-4">
          Your solution has been submitted successfully!
        </p>

        <div className="bg-christmas-green/10 p-4 rounded-lg mb-4">
          <p className="text-christmas-gold font-semibold">
            Hint for the Instagram challenge:
          </p>
          <p className="text-christmas-snow/90">{hint}</p>
        </div>

        <div className="bg-christmas-red/10 p-4 rounded-lg mb-6">
          <p className="text-christmas-snow/80">
            Follow us on Instagram and use the hint to solve the challenge !
          </p>
          <a
            href="https://www.instagram.com/mlsakiit/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-christmas-gold hover:text-christmas-gold/80"
          >
            @mlsakiit
          </a>
        </div>

        <div className="relative mb-6">
          <button
            onClick={handleClaim}
            className="w-full z-40 card p-4 flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <div className="text-4xl animate-shake">🎁</div>
            <div>
              <h3 className="text-christmas-gold font-bold mb-1">
                Claim Your Badge!
              </h3>
              <p className="text-christmas-snow/80 text-sm">
                Congrats on your progress, claim your badge now!
              </p>
            </div>
          </button>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-christmas-red to-christmas-green opacity-30 blur rounded-lg animate-pulse" />
        </div>

        <button onClick={onClose} className="w-full btn-primary">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
