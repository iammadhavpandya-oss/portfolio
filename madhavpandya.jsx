import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Terminal, 
  Cpu, 
  Server, 
  Award, 
  Briefcase, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Menu, 
  X,
  Code2,
  Database,
  CheckCircle2,
  ChevronDown,
  Shield,
  Lock,
  Globe,
  Zap,
  Wifi
} from 'lucide-react';

// --- Custom Animations & Styles ---
const styles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-glitch:hover {
    animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
    color: #4ade80; /* Green for hacker feel */
  }
  .cyber-card {
    background: rgba(10, 20, 30, 0.9);
    border: 1px solid #1e293b;
    position: relative;
    overflow: hidden;
  }
  .cyber-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 50%, rgba(74, 222, 128, 0.05) 50%);
    background-size: 100% 4px;
    pointer-events: none;
  }
  .cloud-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(147, 197, 253, 0.2);
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.1);
  }
`;

// --- Components ---

const SpaceBackground = () => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Star generation
    const stars = Array.from({ length: 300 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.05
    }));

    let animationFrameId;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Deep space gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#020617'); // slate-950
      gradient.addColorStop(1, '#0b1121'); // darker slate
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        // Scroll effect
        const scrollY = window.scrollY;
        const yPos = (star.y - scrollY * star.speed * 0.5) % canvas.height;
        const actualY = yPos < 0 ? yPos + canvas.height : yPos;

        // Twinkle effect
        const opacity = Math.abs(Math.sin(time * star.twinkleSpeed + star.opacity));

        ctx.beginPath();
        ctx.arc(star.x, actualY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

const Navbar = ({ isScrolled, toggleMenu, isMenuOpen, scrollToSection }) => (
  <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-lg py-4 border-b border-slate-800/50' : 'bg-transparent py-6'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div 
        className="flex items-center gap-2 text-2xl font-bold cursor-pointer group" 
        onClick={() => scrollToSection('home')}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 group-hover:from-purple-400 group-hover:to-blue-500 transition-all duration-500">
          Madhav
        </span>
        {/* The "Space" between names represented by a stylized planet/dot */}
        <div className="relative w-2 h-2 mx-1">
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-75"></div>
        </div>
        <span className="text-white group-hover:text-blue-200 transition-colors">Pandya</span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
        {['About', 'Certifications', 'Security', 'Projects', 'Contact'].map((item) => (
          <button 
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="hover:text-blue-400 transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </button>
        ))}
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white hover:text-blue-400">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </div>

    {isMenuOpen && (
      <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-700 absolute w-full">
        <div className="px-4 pt-2 pb-6 space-y-2">
          {['About', 'Certifications', 'Security', 'Projects', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="block w-full text-left px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-md"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    )}
  </nav>
);

const Hero = ({ scrollToSection }) => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent">
    {/* Dynamic Background Shapes */}
    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-slate-800/40 border border-slate-700/50 text-blue-400 text-sm font-semibold tracking-wide backdrop-blur-md hover:border-blue-500/50 transition-colors">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        AVAILABLE FOR HIRE
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
        Building Secure <span className="inline-block animate-float text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Cloud</span> Infrastructures <br/>
        & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 animate-glitch inline-block">Ethical Security</span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
        Certified <strong className="text-white">Prompt Engineer</strong> & <strong className="text-white">Cloud Specialist</strong> expanding into <strong className="text-green-400 font-mono">Cybersecurity</strong>. 
        I bridge the gap between AI innovation, robust hardware networking, and impenetrable security.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button 
          onClick={() => scrollToSection('security')}
          className="group relative px-8 py-4 bg-slate-900 text-green-400 border border-green-500/30 hover:border-green-400 hover:bg-green-950/30 rounded-lg font-mono font-bold transition-all overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Terminal size={18} />
             ./init_security_protocol
          </span>
          <div className="absolute inset-0 bg-green-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
        
        <button 
          onClick={() => scrollToSection('contact')}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Mail size={20} />
          Contact Me
        </button>
      </div>
    </div>
    
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500 cursor-pointer" onClick={() => scrollToSection('certifications')}>
      <ChevronDown size={32} />
    </div>
  </section>
);

const CertificationCard = ({ title, issuer, type, icon: Icon, color, isPursuing }) => (
  <div className={`group relative p-1 rounded-2xl transition-all duration-300 backdrop-blur-sm h-full ${isPursuing ? 'border-2 border-green-500/30 hover:border-green-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]' : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:from-blue-500 hover:to-purple-600'}`}>
    <div className={`relative h-full rounded-xl p-6 flex flex-col items-start ${isPursuing ? 'bg-slate-950 cyber-card' : 'bg-slate-900/80 backdrop-blur-md border border-slate-700/50'}`}>
      <div className={`p-3 rounded-lg mb-4 ${color} bg-opacity-20 ${type === 'Cybersecurity' ? 'animate-pulse' : ''}`}>
        <Icon size={32} className={color.replace('bg-', 'text-')} />
      </div>
      <h3 className={`text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors ${type === 'Cybersecurity' ? 'text-green-400 font-mono' : 'text-white'}`}>
        {title} {isPursuing && <span className="text-xs ml-2 align-top animate-ping text-green-500">●</span>}
      </h3>
      <p className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">{issuer}</p>
      
      {isPursuing ? (
        <div className="mt-auto w-full">
           <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
             <div className="h-full bg-green-500 w-2/3 animate-pulse"></div>
           </div>
           <p className="text-xs text-green-500 mt-2 font-mono text-right">IN PROGRESS...</p>
        </div>
      ) : (
        <div className="mt-auto pt-4 border-t border-slate-800 w-full flex items-center justify-between">
          <span className="text-xs text-slate-500 px-2 py-1 rounded bg-slate-800">{type}</span>
          <CheckCircle2 size={18} className="text-green-500" />
        </div>
      )}
    </div>
  </div>
);

const SecuritySection = () => (
  <section id="security" className="py-20 relative overflow-hidden">
    {/* Matrix-like background effect */}
    <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
            <div className="inline-block px-3 py-1 mb-4 border border-green-500/50 text-green-400 font-mono text-xs rounded bg-green-900/20">
                CURRENTLY PURSUING @ JETKING
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-mono">
                <span className="text-green-500">&lt;</span>Ethical Hacking<br/> & Pentesting<span className="text-green-500">/&gt;</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Cybersecurity is not just about defense; it's about understanding the offense. I am deepening my technical arsenal with advanced penetration testing, network defense, and vulnerability assessment.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { label: "Network Security", icon: Wifi },
                    { label: "Vulnerability Scanning", icon:  Shield},
                    { label: "System Hardening", icon: Lock },
                    { label: "Penetration Testing", icon: Terminal }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 border border-slate-800 bg-slate-900/50 rounded-lg hover:border-green-500/50 transition-colors group">
                        <item.icon size={20} className="text-slate-500 group-hover:text-green-400 transition-colors" />
                        <span className="text-slate-300 font-mono text-sm group-hover:text-white">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="flex-1 w-full flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 border-2 border-green-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-dashed border-green-500/40 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Shield size={80} className="text-green-500 animate-pulse" />
                </div>
                {/* Floating "security" particles */}
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                <div className="absolute bottom-10 right-10 w-2 h-2 bg-green-500 rounded-full animate-ping delay-700"></div>
            </div>
        </div>
      </div>
    </div>
  </section>
);

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Cloud Infrastructure",
      icon: <Cloud className="text-blue-400 animate-float" />,
      style: "cloud-card",
      skills: ["Oracle Cloud Infrastructure", "Virtualization (Jetking)", "Hardware & Networking", "Server Management"]
    },
    {
      title: "Cybersecurity (Focus)",
      icon: <Shield className="text-green-400 animate-pulse" />,
      style: "cyber-card border-green-500/20",
      skills: ["Ethical Hacking", "Penetration Testing", "Network Defense", "Vulnerability Assessment"]
    },
    {
      title: "AI & Prompt Engineering",
      icon: <Terminal className="text-purple-400" />,
      style: "bg-slate-900/60",
      skills: ["Generative AI", "LLM Optimization", "Prompt Design", "AI Foundations"]
    },
    {
      title: "Agile Leadership",
      icon: <Briefcase className="text-pink-400" />,
      style: "bg-slate-900/60",
      skills: ["Agile Methodology (HP)", "Scrum", "Workflow Optimization", "Team Leadership"]
    }
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className={`rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 ${cat.style || 'bg-slate-900/60 backdrop-blur-md'}`}>
              <div className="flex items-center gap-3 mb-6">
                {cat.icon}
                <h3 className="text-lg font-bold text-white">{cat.title}</h3>
              </div>
              <ul className="space-y-3">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2 text-slate-400 text-sm">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${cat.title.includes('Cyber') ? 'bg-green-500' : 'bg-blue-400'}`}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section id="contact" className="py-24 relative overflow-hidden">
     <div className="absolute top-0 left-0 w-full h-full bg-slate-900/80"></div>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div className="mb-8 flex justify-center">
        <div className="p-4 bg-slate-800 rounded-full border border-slate-700">
            <Globe size={40} className="text-blue-400 animate-spin-slow" style={{ animationDuration: '10s' }}/>
        </div>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to Secure Your Cloud?</h2>
      <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
        I am available for roles in Cloud Architecture, Security Analysis, and Prompt Engineering. Let's build something secure and intelligent.
      </p>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <a href="mailto:iammadhavpandya@gmail.com" className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3 transition-all hover:translate-y-[-2px]">
          <Mail size={20} />
          iammadhavpandya@gmail.com
        </a>
        <a href="https://www.linkedin.com/in/madhav-pandya-55b809364/" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-blue-500 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all hover:translate-y-[-2px]">
          <Linkedin size={20} />
          Connect on LinkedIn
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-950/90 backdrop-blur-xl py-12 border-t border-slate-900 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <h3 className="text-xl font-bold text-white mb-2">Madhav Pandya</h3>
        <p className="text-slate-500 text-sm">Cloud Specialist & Security Analyst</p>
      </div>
      <div className="flex space-x-6 text-slate-400">
        <a href="https://www.linkedin.com/in/madhav-pandya-55b809364/" target="_blank" className="hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
        <a href="mailto:iammadhavpandya@gmail.com" className="hover:text-white transition-colors"><Mail size={20} /></a>
      </div>
      <div className="text-slate-600 text-sm flex items-center gap-2">
        Made with <Code2 size={12} /> & <Zap size={12} className="text-yellow-500" />
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Inject styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        document.head.removeChild(styleSheet);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const certifications = [
    {
      title: "Certified Prompt Engineer",
      issuer: "Infosys",
      type: "AI & GenAI",
      icon: Terminal,
      color: "bg-purple-500",
      isPursuing: false
    },
    {
      title: "Ethical Hacking & Pentesting",
      issuer: "Jetking",
      type: "Cybersecurity",
      icon: Shield,
      color: "bg-green-500",
      isPursuing: true // Highlighting this as per request
    },
    {
      title: "Cloud & AI Foundations",
      issuer: "Oracle",
      type: "Cloud Computing",
      icon: Cloud,
      color: "bg-blue-500",
      isPursuing: false
    },
    {
      title: "Diploma in Cloud & Networking",
      issuer: "Jetking",
      type: "Infrastructure",
      icon: Server,
      color: "bg-indigo-500",
      isPursuing: false
    },
    {
      title: "Agile Project Management",
      issuer: "Hewlett Packard (HP)",
      type: "Management",
      icon: Briefcase,
      color: "bg-pink-500",
      isPursuing: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-green-500/30">
      <SpaceBackground />
      
      <div className="relative z-10">
        <Navbar 
          isScrolled={isScrolled} 
          toggleMenu={toggleMenu} 
          isMenuOpen={isMenuOpen} 
          scrollToSection={scrollToSection} 
        />
        
        <Hero scrollToSection={scrollToSection} />

        {/* Certifications Section */}
        <section id="certifications" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Certifications & Credentials</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Validated expertise by leading tech giants and institutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <CertificationCard key={index} {...cert} />
              ))}
              
              <div className="p-1 rounded-2xl border-2 border-dashed border-slate-700/50 bg-slate-900/30 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center hover:border-green-500/50 transition-colors min-h-[280px] group cursor-default">
                 <Cpu size={48} className="text-slate-600 mb-4 group-hover:text-green-500 transition-colors" />
                 <h3 className="text-xl font-bold text-white mb-2">Hardware Master</h3>
                 <p className="text-slate-400 text-sm">Deep understanding of physical infrastructure & servers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* New Dedicated Security Section */}
        <SecuritySection />

        <SkillsSection />
        
        <div id="about" className="py-20 bg-slate-900/50 backdrop-blur-md border-y border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-full mb-6 border border-slate-700">
                  <Code2 size={24} className="text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">About Madhav</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  I am a passionate technologist with a robust foundation in hardware and networking, elevated by specialized expertise in Cloud Computing and Artificial Intelligence. 
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                  Currently, I am leveling up my skillset with <strong className="text-green-400">Ethical Hacking & Penetration Testing</strong> at Jetking, ensuring that the cloud architectures I build are not just efficient, but invincible.
              </p>
          </div>
        </div>

        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default App;
