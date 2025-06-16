import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          {/* Improved Navigation */}
          <nav className="space-x-6 text-sm hidden md:flex">
            {[
              { to: "/reviews", label: "Book Reviews" },
              { to: "/profile", label: "Profile" },
              { to: "/sign-up", label: "Sign Up" },
              { to: "/login", label: "Login" },
            ].map(({ to, label }, i) => (
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

          <Link to="/sign-up" className="md:hidden">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-transform hover:scale-110">
              Join
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-tr from-purple-700 to-blue-600 text-white py-28 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl font-extrabold leading-tight">
            Discover. Reflect. Connect.
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-purple-100">
            ReadSphere is the ultimate platform for readers to log books, share
            reviews, set goals, and engage with a community of passionate book
            lovers.
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-yellow-300 to-pink-400 hover:from-yellow-400 hover:to-pink-500 text-purple-800 px-8 py-4 text-lg font-bold rounded-full shadow-xl transition-transform duration-200 hover:scale-110"
          >
            <Link to="/sign-up">Get Started for Free</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-extrabold text-purple-700">
            Powerful Features to Elevate Your Reading
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                icon: "📖",
                title: "Instant Book Logging",
                desc: "Add new books and track your reading progress effortlessly.",
              },
              {
                icon: "✍️",
                title: "Meaningful Reviews",
                desc: "Express your thoughts and discover insights from others.",
              },
              {
                icon: "🎯",
                title: "Personal Goals",
                desc: "Set and achieve your yearly or monthly reading targets.",
              },
              {
                icon: "👥",
                title: "Community Driven",
                desc: "Join groups, discuss books, and find your reading tribe.",
              },
              {
                icon: "🔒",
                title: "Privacy First",
                desc: "Control what you share and keep your reading habits private if you want.",
              },
              {
                icon: "⚡",
                title: "Fast & Responsive",
                desc: "Enjoy a sleek experience on desktop, tablet, and mobile devices.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition"
              >
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-purple-700 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-extrabold">Hear from Our Readers</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Alicia Monroe",
                quote:
                  "ReadSphere helped me track my reading and discover amazing books I never would’ve found!",
              },
              {
                name: "Brian Lee",
                quote:
                  "The community is welcoming, and the reviews are insightful and honest.",
              },
              {
                name: "Carmen Diaz",
                quote:
                  "Setting reading goals motivated me to read more consistently this year.",
              },
            ].map(({ name, quote }, i) => (
              <blockquote
                key={i}
                className="bg-purple-600 rounded-lg p-8 shadow-lg italic text-sm"
              >
                “{quote}”
                <footer className="mt-6 font-semibold text-right">— {name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold text-purple-700">
            Stay Updated with ReadSphere
          </h2>
          <p className="text-gray-700 text-lg">
            Subscribe to receive updates about new features, book challenges, and
            exclusive content.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-transform hover:scale-105"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-700 text-white py-6 mt-auto">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
    <div className="text-sm">
      © {new Date().getFullYear()} ReadSphere. Read better, live brighter.
    </div>
    <nav className="flex space-x-6 text-sm">
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

export default HomePage;
