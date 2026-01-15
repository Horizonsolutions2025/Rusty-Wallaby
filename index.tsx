import React, { useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, Play, ArrowDown, Menu, X, Check, ArrowUpRight } from 'lucide-react';

// --- Assets & Data ---

const STUDIOS = [
  {
    id: '01',
    name: 'CYCLORAMA',
    specs: ['120m² SPACE', 'INFINITE CURVE', 'RGB LIGHT GRID'],
    image: 'https://images.unsplash.com/photo-1574706508304-44b4c81f7ba7?q=80&w=2000&auto=format&fit=crop',
    price: '€800/DAY'
  },
  {
    id: '02',
    name: 'KITCHEN',
    specs: ['MODULAR ISLAND', 'TOP-DOWN RIG', 'STYLING PREP'],
    image: 'https://images.unsplash.com/photo-1621275466542-6323497d41f6?q=80&w=2000&auto=format&fit=crop',
    price: '€650/DAY'
  },
  {
    id: '03',
    name: 'PODCAST',
    specs: ['ACOUSTIC TREATMENT', '4-CAM SETUP', 'CONTROL ROOM'],
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2000&auto=format&fit=crop',
    price: '€400/DAY'
  },
];

const PROJECTS = [
  {
    id: 1,
    title: "CHASE THE FUTURE",
    client: "PORSCHE",
    category: "AUTOMOTIVE",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    year: "2024"
  },
  {
    id: 2,
    title: "THROUGH THE GRID",
    client: "VOGUE",
    category: "FASHION",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    year: "2024"
  },
  {
    id: 3,
    title: "VOICES OF SILENCE",
    client: "SONY MUSIC",
    category: "MUSIC VIDEO",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80",
    year: "2023"
  }
];

// --- Custom Components ---

// The Brand's specific "Spark" symbol from the PDF
const SparkIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
    <path d="M20 20 L80 80 M80 20 L20 80" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`font-black tracking-tighter uppercase flex items-baseline select-none ${className}`}>
    TROIS<sup className="text-[0.6em] -top-[0.2em] mx-[0.05em]">6</sup>IXNEUF
  </span>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Glass Navbar */}
      <nav className="fixed top-6 left-0 right-0 mx-auto w-[92%] max-w-[1800px] z-50 flex justify-between items-center px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300">
        
        {/* White Text Logo for High Contrast */}
        <div className="text-white">
            <Logo className="text-xl md:text-2xl" />
        </div>
        
        <div className="flex items-center gap-6">
            {/* Primary Action: Book Studio */}
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block bg-[#C1272D] text-white px-6 py-2.5 rounded-full font-mono text-xs font-bold tracking-widest hover:bg-[#a02018] transition-colors"
            >
                BOOK STUDIO
            </motion.button>

            {/* Magnetic Menu Trigger */}
            <motion.button 
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-colors"
            >
                <Menu className="w-5 h-5 text-white transition-colors" />
            </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-black/95 z-[60] backdrop-blur-xl flex flex-col justify-center items-center text-white"
          >
            <motion.button 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-brand-red hover:border-brand-red transition-all"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="flex flex-col items-center gap-2">
              {['STUDIOS', 'EQUIPMENT', 'WORK', 'CONTACT'].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                  className="text-[12vw] leading-[0.85] font-black tracking-tighter hover:text-brand-red transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            <div className="absolute bottom-12 font-mono text-xs flex gap-12 text-brand-gray tracking-widest">
              <span>CASABLANCA</span>
              <span>PARIS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const GridPattern = () => (
  <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.15] bg-grid-pattern bg-[length:40px_40px]" />
);

// --- Sections ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-black flex items-center justify-center">
      {/* 
        Layer 1: The Video (Background)
      */}
      <div className="absolute inset-0 z-0">
         <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-40" 
        >
          {/* Using a high-fashion/studio vibe video */}
          <source src="https://videos.pexels.com/video-files/5309381/5309381-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/30 via-transparent to-brand-black/90" />
      </div>

      {/* 
        Layer 2: Spotlight Effect (Deep Red Glow)
        Added #C1272D radial gradient behind text
      */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[40vw] h-[40vw] bg-[#C1272D] rounded-full blur-[150px] opacity-15" />
      </div>

      {/* 
        Layer 3: Main Content
      */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-[95vw]"
      >
        <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-white text-[10vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter uppercase mb-8 drop-shadow-2xl font-sans"
        >
            The Sequence<br/>
            Is Not Random<span className="text-[#C1272D]">.</span>
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="font-mono text-[#C1272D] text-xs md:text-sm tracking-[0.25em] uppercase font-bold mb-10"
        >
            Light. Space. Equipment. The Equation is missing you.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-6"
        >
            {/* Button A: Watch Reel */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
                <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span className="font-mono text-xs font-bold tracking-widest uppercase">Watch Reel</span>
            </motion.button>

            {/* Button B: Explore Spaces */}
            <motion.button
                whileHover={{ x: 5 }}
                className="group relative px-4 py-2 text-brand-gray hover:text-white transition-colors"
            >
                <span className="font-mono text-xs font-bold tracking-widest uppercase">Explore Spaces</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
            </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="text-white w-6 h-6 opacity-70" />
      </motion.div>
    </section>
  );
};

const SelectedWorks = () => {
  return (
    <section className="bg-brand-black py-32 px-6 relative z-10">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4 mb-24">
            <div className="w-2 h-2 bg-[#C1272D] rounded-full animate-pulse" />
            <h2 className="font-mono text-xs tracking-[0.3em] text-brand-gray uppercase">Selected Works</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
            {PROJECTS.map((project, index) => (
                <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className={`group cursor-pointer ${index === 1 ? 'md:mt-32' : ''} ${index === 2 ? 'md:-mt-24' : ''}`}
                >
                    <div className="relative overflow-hidden mb-6 aspect-[4/5] md:aspect-[3/4]">
                        <motion.img 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    
                    <div className="flex justify-between items-start border-b border-white/10 pb-4">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-sans group-hover:text-[#C1272D] transition-colors">{project.title}</h3>
                            <div className="flex gap-4 font-mono text-xs text-brand-gray">
                                <span>{project.client}</span>
                                <span>/</span>
                                <span>{project.category}</span>
                            </div>
                        </div>
                        <span className="font-mono text-xs text-white opacity-50 group-hover:opacity-100">{project.year}</span>
                    </div>
                </motion.div>
            ))}
            
            {/* Call to Action Card */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center items-center text-center p-12 border border-white/10 md:mt-32 aspect-[3/4] hover:bg-white/5 transition-colors group cursor-pointer"
            >
                <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-8 group-hover:bg-[#C1272D] group-hover:border-[#C1272D] transition-all duration-300">
                    <ArrowUpRight className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-white mb-4 font-sans">VIEW ALL<br/>PROJECTS</h3>
                <p className="font-mono text-xs text-brand-gray tracking-widest">ARCHIVE 2020-2025</p>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

const Manifesto = () => {
  return (
    <section className="py-32 px-6 bg-brand-black relative z-10 border-t border-brand-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-32">
          <div className="md:w-1/3">
            <span className="text-[#C1272D] font-mono text-xs tracking-widest border border-[#C1272D] px-2 py-1 rounded-full">BRAND STRATEGY</span>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-4xl md:text-6xl font-black font-sans leading-[1.1] tracking-tight mb-8 text-white">
              WE ARE SEEKING A <span className="text-[#C1272D]">SUPERHERO</span>.
            </h2>
            <p className="font-mono text-brand-gray text-sm md:text-base max-w-xl leading-relaxed">
              We define the visual language of the future. From the first spark of ignition to a bird's-eye dance through modern infrastructure, we merge style, performance, and smart mobility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const StudioCard: React.FC<{ studio: typeof STUDIOS[number], index: number }> = ({ studio, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative w-full border-t border-brand-white/20 py-16 hover:bg-brand-white/5 transition-colors duration-500 cursor-pointer overflow-hidden"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 px-6 max-w-[1800px] mx-auto">
        <div className="flex items-baseline gap-8 md:gap-16 transform transition-transform duration-500 group-hover:translate-x-4">
          <span className="font-mono text-brand-gray text-xl group-hover:text-[#C1272D] transition-colors">0{index + 1}</span>
          {/* Typography fixed: Solid White by default, Red on hover */}
          <h3 className="text-6xl md:text-8xl font-black font-sans uppercase tracking-tighter text-white group-hover:text-[#C1272D] transition-colors duration-300">
            {studio.name}
          </h3>
        </div>
        
        <div className="hidden md:flex flex-col items-end gap-2 mt-4 md:mt-0 transform transition-transform duration-500 group-hover:-translate-x-4">
            <div className="flex gap-4 font-mono text-xs text-brand-gray">
                {studio.specs.map(spec => (
                    <span key={spec} className="border border-brand-white/20 px-3 py-1 rounded-full">{spec}</span>
                ))}
            </div>
            <span className="font-mono text-[#C1272D] text-sm mt-2 font-bold">{studio.price}</span>
        </div>
      </div>
      
      {/* Cinematic Hover Image - Reduced width to not obscure text completely */}
      <div className="absolute top-0 right-0 h-full w-[30vw] opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-l from-brand-black via-transparent to-transparent z-10" />
          <img src={studio.image} alt={studio.name} className="w-full h-full object-cover filter grayscale contrast-125" />
      </div>
    </motion.div>
  );
};

const Studios = () => {
  return (
    <section className="bg-brand-black relative z-10 pb-32">
      <div className="px-6 mb-16 flex justify-between items-end max-w-[1800px] mx-auto">
        <div className="flex gap-3 items-center">
          <SparkIcon className="w-6 h-6 text-[#C1272D] animate-spin-slow" />
          <span className="font-mono text-xs tracking-widest uppercase text-brand-gray">Available Spaces</span>
        </div>
        <button className="hidden md:flex items-center gap-2 bg-brand-white text-brand-black px-8 py-4 font-bold text-sm hover:bg-[#C1272D] hover:text-white transition-colors uppercase tracking-tight rounded-sm">
          <ArrowDown className="w-4 h-4" /> Download Floorplan
        </button>
      </div>

      <div>
        {STUDIOS.map((studio, i) => (
          <StudioCard key={studio.id} studio={studio} index={i} />
        ))}
      </div>
    </section>
  );
};

const SequenceMarquee = () => {
  return (
    <div className="bg-[#C1272D] py-6 overflow-hidden flex items-center border-y border-brand-black">
      <motion.div 
        className="flex whitespace-nowrap gap-12"
        animate={{ x: "-50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 opacity-80 hover:opacity-100 transition-opacity">
            <span className="text-brand-black font-black text-6xl uppercase tracking-tighter font-sans">Chase The Future</span>
            <SparkIcon className="w-8 h-8 text-brand-black animate-pulse" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-black pt-32 pb-12 px-6 border-t border-brand-white/10 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 max-w-[1800px] mx-auto">
        <div>
          <Logo className="text-[15vw] leading-none text-brand-white/10 mb-8 select-none" />
          <div className="flex gap-4 items-center">
            <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse shadow-[0_0_10px_#569043]"></div>
            <span className="font-mono text-sm text-brand-green uppercase tracking-widest">Studios Available Today</span>
          </div>
        </div>

        <div className="flex flex-col gap-8 items-start md:items-end mt-12 md:mt-0">
          <a href="#" className="group text-4xl font-bold text-white hover:text-[#C1272D] transition-colors flex items-center gap-4 font-sans">
            BOOK A SESSION 
            <span className="group-hover:translate-x-2 transition-transform duration-300">
                <ArrowRight className="w-8 h-8" />
            </span>
          </a>
          <div className="flex flex-col md:items-end font-mono text-xs text-brand-gray gap-2 tracking-wide uppercase">
            <p>123 Main Street</p>
            <p>Casablanca, Morocco</p>
            <p>+212 6 56 04 88 88</p>
            <p className="text-brand-white border-b border-brand-white/20 pb-1">contact@s369.ma</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-brand-white/10 font-mono text-[10px] text-brand-gray uppercase max-w-[1800px] mx-auto">
        <div className="flex gap-6">
            <a href="#" className="hover:text-[#C1272D] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#C1272D] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[#C1272D] transition-colors">Vimeo</a>
        </div>
        <span>© 2025 TroisSixNeuf</span>
      </div>
    </footer>
  );
};

// --- App ---

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    }
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-[#C1272D] selection:text-white overflow-x-hidden font-sans">
      <GridPattern />
      <Navbar />
      
      {/* Custom Cursor Follower */}
      <motion.div 
        className="fixed top-0 left-0 w-4 h-4 bg-[#C1272D] rounded-full pointer-events-none mix-blend-difference z-[100] hidden md:block"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      <main>
        <Hero />
        {/* Inserted Selected Works here */}
        <SelectedWorks />
        <SequenceMarquee />
        <Manifesto />
        <Studios />
      </main>
      
      <Footer />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

export default App;
