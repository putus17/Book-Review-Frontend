import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { useAuthStore } from "../../store/useAuthStore";
import { registerFormSchema } from "../../lib/utils";
import type { infer as Infer } from "zod";

type SignUpFormData = Infer<ReturnType<typeof registerFormSchema>>;

const navItems = [
  { to: "/", label: "Home" },
  { to: "/reviews", label: "Book Reviews" },
  { to: "/profile", label: "Profile" },
  { to: "/login", label: "Login" },
];

const SignIn = () => {
  const navigate = useNavigate();
  const { registerUser, loading } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(registerFormSchema()),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    try {
      const passwordHash = btoa(data.password); // simple placeholder hash
      await registerUser({
        username: data.username,
        email: data.email,
        passwordHash,
      });
      navigate("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
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

      {/* Main content */}
      <main className="relative flex-grow bg-gradient-to-b from-pink-50 via-white to-pink-100 flex items-center justify-center px-6 py-16 overflow-hidden">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-pink-300 opacity-20"
            style={{
              width: `${Math.random() * 12 + 6}px`,
              height: `${Math.random() * 12 + 6}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatUpDown ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Frosted glass container */}
        <div className="relative p-1 rounded-3xl bg-white bg-opacity-90 backdrop-blur-xl shadow-2xl max-w-md w-full ring-4 ring-pink-200 border border-pink-300">
          <div className="bg-white rounded-3xl p-10 shadow-lg relative">
           

            <h1 className="text-4xl font-extrabold text-pink-600 mb-6 text-center tracking-widest select-none">
              🌸 Create Your Account
            </h1>
            <p className="text-center text-pink-500 mb-8 select-none">
              Sign up to start reviewing books
            </p>

            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <Label
                  htmlFor="username"
                  className="block mb-2 font-semibold text-pink-700 tracking-wide"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  {...form.register("username")}
                  disabled={isSubmitting || loading}
                  className="border-pink-300 focus:ring-pink-500 focus:border-pink-500 rounded-xl px-4 py-3 text-pink-700 placeholder-pink-300 shadow-sm transition"
                  spellCheck={false}
                />
                {form.formState.errors.username && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="block mb-2 font-semibold text-pink-700 tracking-wide"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  {...form.register("email")}
                  disabled={isSubmitting || loading}
                  className="border-pink-300 focus:ring-pink-500 focus:border-pink-500 rounded-xl px-4 py-3 text-pink-700 placeholder-pink-300 shadow-sm transition"
                  spellCheck={false}
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="block mb-2 font-semibold text-pink-700 tracking-wide"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...form.register("password")}
                  disabled={isSubmitting || loading}
                  className="border-pink-300 focus:ring-pink-500 focus:border-pink-500 rounded-xl px-4 py-3 text-pink-700 placeholder-pink-300 shadow-sm transition"
                  spellCheck={false}
                />
                {form.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl shadow transition"
              >
                {isSubmitting || loading ? "Creating…" : "Sign Up"}
              </Button>
            </form>

            <p className="mt-8 text-center text-pink-600 text-sm select-none">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold hover:underline hover:text-pink-700 transition"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Custom floating animation */}
        <style>{`
          @keyframes floatUpDown {
            0%, 100% { transform: translateY(0); opacity: 0.2; }
            50% { transform: translateY(-10px); opacity: 0.5; }
          }
        `}</style>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-purple-700 text-white py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 ReadSphere. All rights reserved.</p>
          <nav className="space-x-6 text-sm">
            <Link
              to="/privacy"
              className="hover:text-purple-300 transition"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-purple-300 transition"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="hover:text-purple-300 transition"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
