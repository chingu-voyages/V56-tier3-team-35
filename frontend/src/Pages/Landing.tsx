import React from "react";
import { Calendar, Users, Heart, Shield, Menu, X, ArrowRight } from "lucide-react";
// import {
// //   AppBar,
// //   Toolbar,
// //   Box,
// //   Typography,
// //   Link as MuiLink,
// //   Container,
// Button
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import '../utils/landingPage.css'
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Stack } from "@mui/material";
import { GitHub } from "@mui/icons-material";

export const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const developers = [
    { name: "Santhosh Basina", github: "https://github.com/BVSanthosh " },
    { name: "Niamh Brown ", github: "https://github.com/NiamhBrown" },
    { name: "Alexander Nsowah", github: "https://github.com/recklessbud" },
    { name: "Evaristo Caraballo", github: "https://github.com/evaristoc" },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Surgery Scheduling",
      description:
        "Efficiently manage and schedule surgical procedures with real-time updates.",
    },
    {
      icon: Users,
      title: "Patient Management",
      description:
        "Comprehensive patient records and tracking for optimal care coordination.",
    },
    {
      icon: Heart,
      title: "Reduces Anxiety",
      description:
        "This app helps loved ones in the waiting room by keeping them informed and providing peace of mind.",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description:
        "HIPAA-compliant platform ensuring patient data privacy and security.",
    },
  ];

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Waiting Room", href: "/waiting-room" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <header
        className="relative z-50 backdrop-blur-sm  bg-[#1da1f2]/2"
        style={{ borderBottom: "1px solid #ccc" }}
      >
        <div
          className="container mx-auto px-6"
          style={{ border: "1px solid red" }}
        >
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">SurgeryMS</span>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-muted-foreground hover:text-emerald-600 transition-colors story-link"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="contained"
                // to="/dashboard"
                size="medium"
                sx={{
                  backgroundColor: "#1da1f2",
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "12px",
                  paddingX: 2.3,
                  // paddingY: 1.2,
                  borderColor: "#e0e0e0",
                  // backgroundColor: "white",
                  color: "white",
                  "&:hover": {
                    // backgroundColor: "#f9f9f9",
                    borderColor: "#cfcfcf",
                  },
                }}
              >
                <Link to="/login">Authorized Login</Link>
              </Button>
              {/* </Stack> */}
              {/* <Button variant="text">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="contained" style={{ borderRadius: "10px" }}>
                <Link to="/dashboard">Get Started</Link>
              </Button> */}
            </div>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/50">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button
                    variant="contained"
                    // to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    size="medium"
                    sx={{
                      backgroundColor: "#1da1f2",
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: "12px",
                      paddingX: 2.3,
                      // paddingY: 1.2,
                      borderColor: "#e0e0e0",
                      // backgroundColor: "white",
                      color: "white",
                      "&:hover": {
                        // backgroundColor: "#f9f9f9",
                        borderColor: "#cfcfcf",
                      },
                    }}
                  >
                    <Link to='/login'>Authorized Login</Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary))_0%,transparent_50%)] opacity-[0.15]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,hsl(var(--secondary))_0%,transparent_50%)] opacity-[0.1]"></div>

        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-blue-400 bg-clip-text text-transparent">
              Surgery, Managed with Confidence.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Streamline surgical operations with our comprehensive platform
              designed for healthcare professionals to manage schedules,
              patients, and procedures efficiently.
            </p>
            <div className="flex gap-4 justify-center">
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<Users />}
                  sx={{
                    backgroundColor: "#1da1f2",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "12px",
                    paddingX: 3,
                    paddingY: 1.2,
                    "&:hover": {
                      backgroundColor: "#1a91da",
                    },
                  }}
                >
                  Continue as Guest
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "12px",
                    paddingX: 3,
                    paddingY: 1.2,
                    borderColor: "#e0e0e0",
                    backgroundColor: "white",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                      borderColor: "#cfcfcf",
                    },
                  }}
                >
                  <Link to={'/login'}>Sign In</Link>
                </Button>
              </Stack>
              {/* <Button variant="contained" size="large">
                <Link to="/dashboard">
                  Get Start <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outlined">
                <Link to="/login">Sign In</Link>
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for healthcare professionals who need reliable, secure, and
            efficient tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all hover-scale"
              >
                <CardContent>
                  <div className="mx-auto w-12 h-12 bg-[#87b0df] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg px-4 pb-3">{feature.title}</h4>

                  <p className="text-sm leading-relaxed px-3">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="about" className="bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Our Platform</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our Surgery Management System is designed by healthcare
              professionals for healthcare professionals. We understand the
              critical nature of surgical operations and have built a platform
              that prioritizes reliability, security, and ease of use. From
              scheduling to patient management, our comprehensive solution helps
              medical teams deliver exceptional care while maintaining
              operational efficiency.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4a90e2] mb-2">
                  99.9%
                </div>
                <p className="text-muted-foreground">Uptime Guarantee</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4a90e2] mb-2">
                  500+
                </div>
                <p className="text-muted-foreground">Healthcare Facilities</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4a90e2] mb-2">
                  24/7
                </div>
                <p className="text-muted-foreground">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 text-center">
        <Card className="max-w-2xl mx-auto backdrop-blur-sm  bg-[#1da1f2]/4">
          <CardContent className="pt-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Join healthcare professionals who trust our platform for their
              surgical operations
            </p>
            <Button
              variant="contained"
              endIcon={<ArrowRight />}
              sx={{
                backgroundColor: "#1da1f2",
                color: "white",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "12px",
                paddingX: 3,
                paddingY: 1.2,
                "&:hover": {
                  backgroundColor: "#1a91da",
                },
              }}
            >
              <Link to="/dashboard">Access Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <footer
        className=" bg-[#1da1f2]/2"
        style={{ borderTop: "1px solid #ccc" }}
      >
        <div className="container mx-auto px-6 py-12">
          {/* Team Section */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Meet the Development Team
            </h3>
            <p className="text-muted-foreground mb-6">
              Built by passionate developers committed to improving healthcare
              technology
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {developers.map((dev, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-muted/30 rounded-lg px-4 py-2"
                >
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold text-sm">
                      {dev.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <span className="font-medium text-sm">{dev.name}</span>
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <GitHub className="h-4 w-4 text-[#4a90e2]" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="pt-8" style={{ borderTop: "1px solid #ccc" }}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
                  <Heart className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">Surgery Management System</span>
              </div>

              <div className="flex space-x-6 text-sm text-muted-foreground">
                <Link
                  to="/dashboard"
                  className="hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/waiting-room"
                  className="hover:text-primary transition-colors"
                >
                  Waiting Room
                </Link>
                <Link
                  to="/login"
                  className="hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>

            <div
              className="mt-6 pt-6 text-center text-sm text-muted-foreground"
              style={{ borderTop: "1px solid #ccc" }}
            >
              <p>
                &copy; 2024 Surgery Management System. Built for healthcare
                excellence.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
