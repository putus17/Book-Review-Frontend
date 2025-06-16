import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useAuthStore } from "../../store/useAuthStore";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/reviews", label: "Book Reviews" },
  { to: "/login", label: "Login" },
  { to: "/sign-up", label: "Sign Up" },
];

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, fetchCurrentUser } = useAuthStore();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.avatarUrl || "");
  const [showDialog, setShowDialog] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep form state updated if user changes externally (like fetch refresh)
  useEffect(() => {
    setUsername(user?.username || "");
    setEmail(user?.email || "");
    setBio(user?.bio || "");
    setAvatar(user?.avatarUrl || "");
  }, [user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpdate = () => {
    console.log("Profile Updated:", { username, email, bio, avatar });
    toast.success("Profile updated successfully!");
  };

  const confirmDelete = () => {
    console.log("User deleted:", email);
    toast.success("User profile deleted.");
    setShowDialog(false);
    setTimeout(() => navigate("/sign-up"), 1500);
  };

  return (
    <div className="bg-white text-gray-900 font-sans min-h-screen flex flex-col">
      {/* Header */}
      <header
        className={`bg-white/90 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2 shadow-md" : "py-4 shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-300">
          <Link
            to="/"
            className="text-3xl font-extrabold text-purple-700 tracking-tight relative group"
          >
            📚 ReadSphere
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900 rounded-full group-hover:w-full transition-all"></span>
          </Link>

          {/* Navigation */}
          <nav className="space-x-6 text-sm hidden md:flex">
            {navItems.map(({ to, label }, i) => (
              <Link
                key={i}
                to={to}
                className="relative text-gray-700 hover:text-purple-700 font-medium tracking-wide uppercase px-2 transition-all duration-300 group"
              >
                <span>{label}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-purple-700 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="relative flex-grow bg-gradient-to-b from-pink-100 via-purple-100 to-indigo-200 flex items-center justify-center px-6 py-16 overflow-hidden">
        {/* Floating pastel bubbles */}
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 85%)`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatSoft ${6 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`,
              filter: "blur(4px)",
            }}
          />
        ))}

        {/* Frosted glass container */}
        <div className="relative p-1 rounded-3xl bg-white bg-opacity-90 backdrop-blur-xl shadow-2xl max-w-lg w-full ring-4 ring-pink-200 border border-pink-300">
          <div className="bg-white rounded-3xl p-10 shadow-lg relative">
            

            <h2 className="text-center text-4xl font-extrabold text-pink-600 tracking-widest mb-10 select-none">
              🌸 My Profile
            </h2>

            {/* Avatar Upload */}
            <div className="flex justify-center mb-8">
              <label className="relative cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="w-32 h-32 rounded-full border-8 border-pink-300 overflow-hidden flex items-center justify-center bg-pink-50 shadow-lg group-hover:brightness-110 transition-transform duration-300 transform group-hover:scale-105">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-pink-400 font-bold select-none text-lg tracking-wider">
                      Upload
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 rounded-full ring-4 ring-pink-400 opacity-0 group-hover:opacity-60 transition pointer-events-none" />
              </label>
            </div>
            <p className="text-center text-sm text-pink-500 mb-10 select-none">
              Click the avatar to upload a cute new photo!
            </p>

            {/* Form fields */}
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-pink-700 font-semibold tracking-wide">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full border border-pink-300 rounded-2xl px-6 py-3 text-pink-700 placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-300 transition shadow-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your lovely username"
                  spellCheck={false}
                />
              </div>

              <div>
                <label className="block mb-2 text-pink-700 font-semibold tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-pink-300 rounded-2xl px-6 py-3 text-pink-700 placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-300 transition shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  spellCheck={false}
                />
              </div>

              <div>
                <label className="block mb-2 text-pink-700 font-semibold tracking-wide">
                  Bio
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-pink-300 rounded-2xl px-6 py-3 text-pink-700 placeholder-pink-300 resize-none focus:outline-none focus:ring-4 focus:ring-pink-300 transition shadow-sm"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us a bit about yourself..."
                  spellCheck={true}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-12 gap-6">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-pink-500 text-white font-bold py-3 rounded-3xl shadow-md hover:bg-pink-600 transition transform hover:-translate-y-0.5 active:translate-y-0"
                type="button"
              >
                Update Profile
              </button>
              <button
                onClick={() => setShowDialog(true)}
                className="flex-1 bg-pink-300 text-pink-700 font-bold py-3 rounded-3xl shadow-md hover:bg-pink-400 transition transform hover:-translate-y-0.5 active:translate-y-0"
                type="button"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 shadow-lg ring-2 ring-pink-300">
            <DialogHeader>
              <DialogTitle className="text-2xl font-extrabold text-pink-600">
                Delete Profile
              </DialogTitle>
              <DialogDescription className="mt-3 text-pink-700 font-semibold">
                Are you sure you want to delete your profile? <br />
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowDialog(false)}
                className="bg-pink-100 text-pink-600 px-6 py-2 rounded-xl font-semibold hover:bg-pink-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-pink-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-pink-700 transition"
              >
                Confirm
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Animations */}
        <style>{`
          @keyframes floatSoft {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.25;
            }
            50% {
              transform: translateY(-15px);
              opacity: 0.6;
            }
          }
        `}</style>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-purple-700 text-white py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm select-none">© 2025 ReadSphere. All rights reserved.</p>
          <nav className="space-x-6 text-sm select-none">
            <Link to="/privacy" className="hover:text-purple-300 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-purple-300 transition">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-purple-300 transition">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;
