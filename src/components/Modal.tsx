interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  hint: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, hint }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-christmas-dark p-6 rounded-xl max-w-md w-full mx-4 animate-float">
        <h2 className="text-2xl font-bold text-christmas-snow mb-4">
          Thank You! 🎄
        </h2>
        <p className="text-christmas-snow/80 mb-4">
          Your solution has been submitted successfully!
        </p>

        <div className="bg-christmas-green/10 p-4 rounded-lg mb-4">
          <p className="text-christmas-gold font-semibold">
            First Part of Hint:
          </p>
          <p className="text-christmas-snow/90">{hint}</p>
        </div>

        <div className="bg-christmas-red/10 p-4 rounded-lg mb-6">
          <p className="text-christmas-snow/80">
            Follow us on Instagram for the second part of the hint!
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

        <button onClick={onClose} className="w-full btn-primary">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
