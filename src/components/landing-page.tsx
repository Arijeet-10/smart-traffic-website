import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Zap, BarChart3, Cloud, MapPin, Layers, FastForward, ArrowRight } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              BengalFlow AI
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="#features" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Workflow</Link>
            <Button asChild variant="default" size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
              <Link href="/dashboard">Launch Dashboard</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
          <div className="container mx-auto text-center max-w-5xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              West Bengal Traffic Intelligence v2.0
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-balance">
              Redefining Urban <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">Mobility Flow</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              An AI-powered infrastructure for West Bengal, dynamically optimizing traffic signals across 20+ districts using real-time IoT, YOLO vision, and environmental data.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild size="xl" className="h-14 px-10 rounded-full text-lg font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform">
                <Link href="/dashboard" className="flex items-center gap-2">
                  Enter Command Center <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="h-14 px-10 rounded-full text-lg font-bold border-2" asChild>
                <Link href="#how-it-works">Watch the Workflow</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 border-y bg-muted/20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight">Intelligence at the heart of Bengal.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                BengalFlow AI integrates vehicle detection with environmental monitoring to create a truly adaptive urban mobility ecosystem. We're building more than just timers—we're building smarter cities.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { label: '20+', sub: 'Districts' },
                  { label: '100+', sub: 'Junctions' },
                  { label: 'YOLO v8', sub: 'Detection' },
                  { label: '99.9%', sub: 'Uptime' },
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-card border rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-3xl font-black text-primary mb-1">{stat.label}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-gradient-to-tr from-primary to-accent p-1 shadow-2xl">
              <div className="w-full h-full bg-card rounded-[2.8rem] flex items-center justify-center p-8">
                <div className="space-y-6 w-full">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 w-full bg-muted rounded-2xl flex items-center px-6 gap-4 animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-primary/20" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 bg-primary/10 rounded" />
                        <div className="h-2 w-1/2 bg-primary/5 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">The Future of Traffic Management</h2>
              <p className="text-xl text-muted-foreground">Cutting-edge technologies working in harmony to reduce congestion and improve air quality.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Activity />, title: 'YOLO Detection', desc: 'Computer vision counts vehicles at every node with simulated real-time accuracy.' },
                { icon: <Cloud />, title: 'AQI Integration', desc: 'Signal timers adjust based on local air quality index to minimize idling in high-pollution zones.' },
                { icon: <Layers />, title: 'Statewide Coverage', desc: 'A unified data architecture covering everything from Kolkata to the Hills of Darjeeling.' },
                { icon: <BarChart3 />, title: 'SUMO Simulation', desc: 'Integrated SUMO engine visualizes network performance and throughput metrics.' },
                { icon: <Shield />, title: 'Emergency Mode', desc: 'Advanced priority logic for ambulances and emergency response vehicles.' },
                { icon: <FastForward />, title: 'Genkit AI Logic', desc: 'Next-generation AI flows determine the optimal timing for maximum efficiency.' },
              ].map((feature, i) => (
                <div key={i} className="group p-10 border rounded-[2rem] bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="how-it-works" className="py-24 bg-primary text-primary-foreground overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-20">Intelligent Optimization Flow</h2>
            <div className="grid md:grid-cols-4 gap-4 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/20 -translate-y-1/2 hidden md:block" />
              {[
                { step: '01', title: 'Data Ingestion', desc: 'IoT sensors and YOLO cameras capture vehicle density and AQI levels.' },
                { step: '02', title: 'District Context', desc: 'Regional parameters and historical patterns are applied to the raw data.' },
                { step: '03', title: 'AI Recommendation', desc: 'Genkit AI models calculate optimal timers based on the current state.' },
                { step: '04', title: 'Dynamic Pulse', desc: 'Signal controllers update instantly, maintaining optimal throughput.' },
              ].map((item, i) => (
                <div key={i} className="relative z-10 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl text-center group hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-6 font-black text-xl shadow-xl shadow-black/20 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-2xl font-black">BengalFlow AI</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-12">
            A state-wide smart infrastructure project dedicated to reducing urban congestion through artificial intelligence.
          </p>
          <div className="flex justify-center gap-12 text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">API Docs</Link>
          </div>
          <p className="text-muted-foreground/60 text-xs">
            © {new Date().getFullYear()} BengalFlow AI Optimization. Developed for technical demonstration purposes.
          </p>
        </div>
      </footer>
    </div>
  );
}
