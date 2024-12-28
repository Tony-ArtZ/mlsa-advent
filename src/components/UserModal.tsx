import { useState, useEffect } from "react";
import { userSchema, type UserDetails } from "@/lib/verifications";

interface UserModalProps {
  isOpen: boolean;
  onSubmit: (details: UserDetails) => void;
  onClose: () => void;
}

export default function UserModal({
  isOpen,
  onSubmit,
  onClose,
}: UserModalProps) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserDetails, string>>
  >({});
  const [formData, setFormData] = useState<Partial<UserDetails>>({
    name: "",
    email: "",
    rollNumber: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("userDetails");
    if (stored) {
      const parsedData = JSON.parse(stored);
      setFormData(parsedData);
    }
  }, [isOpen]);

  const handleClose = () => {
    const stored = localStorage.getItem("userDetails");
    if (!stored) {
      return; // Prevent closing if no stored data
    }
    onClose();
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = userSchema.parse(formData);
      onSubmit(validatedData);
      setErrors({});
    } catch (error: any) {
      const newErrors: typeof errors = {};
      error.errors.forEach((err: any) => {
        if (err.path[0] && typeof err.path[0] === "string") {
          const key = err.path[0] as keyof UserDetails;
          newErrors[key] = err.message;
        }
      });
      setErrors(newErrors);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/70 transition-opacity"
          onClick={handleClose}
        />

        {/* Modal */}
        <div className="relative transform overflow-hidden rounded-lg bg-christmas-dark border border-white/10 p-6 text-left shadow-xl transition-all w-full max-w-md">
          <div className="absolute right-4 top-4">
            <button
              onClick={handleClose}
              className="text-christmas-snow/60 hover:text-christmas-snow"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-christmas-snow mb-4">
              Enter Your Details
            </h2>

            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-christmas-dark/50 text-christmas-snow rounded-lg px-4 py-2 border border-white/10"
              />
              {errors.name && (
                <p className="text-christmas-red text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-christmas-dark/50 text-christmas-snow rounded-lg px-4 py-2 border border-white/10"
              />
              {errors.email && (
                <p className="text-christmas-red text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="rollNumber"
                placeholder="Roll Number (Optional)"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full bg-christmas-dark/50 text-christmas-snow rounded-lg px-4 py-2 border border-white/10"
              />
              {errors.rollNumber && (
                <p className="text-christmas-red text-sm mt-1">
                  {errors.rollNumber}
                </p>
              )}
            </div>

            <button type="submit" className="w-full btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
