"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Zap, BarChart3, Cloud, MapPin, Layers, FastForward, ArrowRight, Sun, Moon, Car, Signal, Lightbulb, Map, Timer, Leaf, Siren, TrendingUp } from 'lucide-react';
import { Dashboard } from '@/components/dashboard';

export function LandingPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    setMounted(true);
  }, []);

  // Update document class when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const scrollToDashboard = () => {
    const element = document.getElementById('dashboard');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Header */}
      <header className="fixed top-4 inset-x-0 mx-auto max-w-5xl z-50">
        <div className="glass mx-4 px-6 h-16 rounded-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/20 text-primary p-1.5 rounded-full">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">BengalFlow AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#about" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="#features" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="#benefits" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Benefits</Link>
            <Link href="#roadmap" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Future</Link>
            <Link href="#dashboard" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Terminal</Link>
            
            <div className="h-5 w-px bg-border mx-1" />
            
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hover:bg-primary/10">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5 text-slate-700" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button onClick={scrollToDashboard} variant="default" className="rounded-full px-6 shadow-lg shadow-primary/20">
              Launch Dashboard
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-44 pb-32 px-4 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background border-b border-border/50">
          <div className="container mx-auto text-center max-w-5xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              West Bengal Traffic Intelligence v2.0
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95] text-balance">
              Redefining Urban <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Mobility Flow</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              An AI-powered infrastructure for West Bengal, dynamically optimizing traffic signals across 20+ districts using real-time IoT, vision, and environmental data.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={scrollToDashboard} size="lg" className="h-14 px-10 rounded-full text-lg font-bold shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-transform duration-300">
                <span className="flex items-center gap-2">
                  Enter Command Center <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-10 rounded-full text-lg font-bold hover:bg-muted/50 transition-colors" asChild>
                <Link href="#how-it-works">System Architecture</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className="bg-background transition-colors duration-500 py-12">
          <Dashboard theme={theme} toggleTheme={toggleTheme} />
        </section>

        {/* About Section */}
        <section id="about" className="py-24 border-y border-border/50 bg-muted/10 relative">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-400/[0.02] bg-[bottom_1px_center]" />
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight">Intelligence at the core.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                BengalFlow AI integrates real-time vehicle detection with environmental metrics to create a truly adaptive urban mobility ecosystem. Minimal delays, cleaner air.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { label: '20+', sub: 'Districts' },
                  { label: '100+', sub: 'Junctions' },
                  { label: 'Sub-second', sub: 'Latency' },
                  { label: '99.9%', sub: 'Uptime' },
                ].map((stat, i) => (
                  <div key={i} className="glass-panel p-6 rounded-[2rem]">
                    <div className="text-3xl font-black text-primary mb-1">{stat.label}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-[3rem] p-8 aspect-square flex flex-col justify-center space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 w-full bg-background/50 rounded-2xl flex items-center px-6 gap-4 border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary opacity-70" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className={`h-3 bg-primary/20 rounded-full ${i === 1 ? 'w-3/4' : i === 2 ? 'w-1/2' : 'w-5/6'}`} />
                    <div className="h-2 w-1/3 bg-muted-foreground/30 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">System Capabilities</h2>
              <p className="text-xl text-muted-foreground">Cutting-edge technologies working in harmony to reduce congestion and improve air quality.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Activity />, title: 'Real-time Vision', desc: 'Secure vision sensors count vehicles at every node with extreme accuracy.' },
                { icon: <Cloud />, title: 'AQI Integration', desc: 'Signal timers adapt based on local air quality index to minimize idling.' },
                { icon: <Layers />, title: 'Statewide Architecture', desc: 'Unified data framework covering multiple metropolitan sectors.' },
                { icon: <BarChart3 />, title: 'Throughput Metrics', desc: 'Integrated engines calculate network performance instantly.' },
                { icon: <Shield />, title: 'Emergency Protocol', desc: 'Preemptive routing for ambulances and crucial service vehicles.' },
                { icon: <FastForward />, title: 'AI Recommendation', desc: 'Adaptive models suggest timing changes before congestion occurs.' },
              ].map((feature, i) => (
                <div key={i} className="glass-panel p-8 rounded-[2rem] hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-24 bg-muted/5 border-t border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Impact Across West Bengal</h2>
              <p className="text-xl text-muted-foreground">Tangible improvements to urban mobility and environmental health.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Timer className="w-8 h-8" />, title: 'Reduced Congestion', desc: 'Up to 35% reduction in average vehicle wait time through adaptive signal optimization.' },
                { icon: <Leaf className="w-8 h-8" />, title: 'Better Air Quality', desc: 'AQI-driven signal cycles reduce vehicle idling, cutting roadside pollution by an estimated 20%.' },
                { icon: <Siren className="w-8 h-8" />, title: 'Emergency Routing', desc: 'Automatic green-wave corridors for ambulances and fire trucks, reducing emergency response time.' },
                { icon: <Zap className="w-8 h-8" />, title: 'Energy Saving', desc: 'Smart dimming and optimized cycle lengths reduce traffic infrastructure energy consumption by 18%.' },
                { icon: <Shield className="w-8 h-8" />, title: 'Accident Prevention', desc: 'Real-time anomaly detection alerts authorities within seconds, enabling rapid incident response.' },
                { icon: <TrendingUp className="w-8 h-8" />, title: 'Smart Signaling', desc: 'Machine learning models continuously improve signal timing using historical traffic patterns.' },
              ].map((benefit, i) => (
                <div key={i} className="glass-panel p-8 rounded-[2rem] flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="how-it-works" className="py-24 bg-primary/5 border-t border-border/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-20">Optimization Lifecycle</h2>
            <div className="grid md:grid-cols-4 gap-6 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-primary/20 -translate-y-1/2 hidden md:block" />
              {[
                { step: '01', title: 'Ingestion', desc: 'Sensors capture edge metrics.' },
                { step: '02', title: 'Context', desc: 'Historical overlays applied.' },
                { step: '03', title: 'Inference', desc: 'AI calculates timings.' },
                { step: '04', title: 'Pulse', desc: 'Edgenodes update instantly.' },
              ].map((item, i) => (
                <div key={i} className="relative z-10 p-8 rounded-[2rem] glass-panel text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-black shadow-lg shadow-primary/30">
                    {item.step}
                  </div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-24 bg-background border-t border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Roadmap & Future Vision</h2>
              <p className="text-xl text-muted-foreground">Expanding capabilities to transform West Bengal into India's first AI-native smart state.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Lightbulb className="w-24 h-24" />, phase: 'Phase 1 · 2025', title: 'Predictive AI', desc: '72-hour traffic forecast models using weather, event, and historical behavioral data.' },
                { icon: <Signal className="w-24 h-24" />, phase: 'Phase 2 · 2026', title: '5G Integration', desc: 'Ultra-low latency V2X communication over 5G networks for sub-10ms response times.' },
                { icon: <Car className="w-24 h-24" />, phase: 'Phase 3 · 2027', title: 'Autonomous Vehicles', desc: 'Full AV integration with dedicated communication lanes and priority routing protocols.' },
                { icon: <Map className="w-24 h-24" />, phase: 'Phase 4 · 2028', title: 'City-wide Coverage', desc: 'Expansion to every gram panchayat and rural arterial road across all 23 districts.' },
              ].map((item, i) => (
                <div key={i} className="glass-panel p-8 rounded-[2rem] hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                  <div className="absolute -right-4 -top-0 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
                    {item.icon}
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-primary mb-4">{item.phase}</div>
                  <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-xl font-black">BengalFlow</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-8">
            Adaptive infrastructure modeling.
          </p>
          <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
