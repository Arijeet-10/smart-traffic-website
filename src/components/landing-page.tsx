import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Zap, BarChart3, Cloud, MapPin, Layers, FastForward } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">BengalFlow AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#about" className="text-sm font-medium hover:text-primary">About</Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">Workflow</Link>
            <Link href="#tech-stack" className="text-sm font-medium hover:text-primary">Tech</Link>
            <Button asChild variant="default" size="sm">
              <Link href="/dashboard">Launch Dashboard</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Smart Traffic Optimization for West Bengal
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              A state-of-the-art AI-powered platform managing dynamic traffic signals across 20+ districts using real-time IoT and environmental data.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="px-8">
                <Link href="/dashboard">Go to Live Dashboard</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 border-t bg-muted/30">
          <div className="container mx-auto px-4 grid md:grid-rows-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About BengalFlow AI</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                BengalFlow AI is a conceptual smart city project designed to address the unique traffic challenges of West Bengal. By integrating vehicle detection with environmental monitoring, we create a truly adaptive urban mobility ecosystem.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform simulates a wide-scale deployment across metro hubs like Kolkata and industrial zones like Haldia, demonstrating scalability and intelligence in traffic management.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '20+', sub: 'Cities Covered' },
                { label: '100+', sub: 'Active Junctions' },
                { label: 'Real-time', sub: 'IoT Streaming' },
                { label: 'AQI-Aware', sub: 'Signal Control' },
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-card border rounded-xl text-center shadow-sm">
                  <div className="text-2xl font-bold text-primary">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Core Capabilities</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Activity />, title: 'YOLO Detection', desc: 'Simulated computer vision to accurately count vehicles at every node.' },
                { icon: <Cloud />, title: 'AQI Integration', desc: 'Dynamic adjustments to signal timers based on local air quality index.' },
                { icon: <Layers />, title: 'Statewide Coverage', desc: 'Comprehensive data architecture covering North to South Bengal.' },
                { icon: <BarChart3 />, title: 'Live Analytics', desc: 'Interactive dashboard with real-time updates and historical trends.' },
                { icon: <Shield />, title: 'Emergency Priority', desc: 'Built-in logic to handle congested routes and market traffic conditions.' },
                { icon: <FastForward />, title: 'Adaptive Timing', desc: 'AI flow optimization for traffic timers between 10s and 150s.' },
              ].map((feature, i) => (
                <div key={i} className="p-8 border rounded-2xl bg-card hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">The Intelligent Workflow</h2>
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/20 -translate-y-1/2 hidden md:block" />
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: '01', title: 'Data Ingestion', desc: 'IoT sensors and cameras capture traffic density and AQI levels.' },
                  { step: '02', title: 'Processing', desc: 'Data is categorized by city and specific junction parameters.' },
                  { step: '03', title: 'AI Analysis', desc: 'GenAI engine calculates optimal signal duration for efficiency.' },
                  { step: '04', title: 'Action', desc: 'Signal timers update instantly, reducing congestion and idle time.' },
                ].map((item, i) => (
                  <div key={i} className="relative z-10 bg-background p-6 border rounded-xl text-center">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      {item.step}
                    </div>
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Modern Technology Stack</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {['Next.js 15', 'Tailwind CSS', 'Shadcn UI', 'TypeScript', 'Firebase', 'Genkit AI', 'Lucide Icons'].map((tech) => (
                <span key={tech} className="px-6 py-3 bg-secondary rounded-full font-medium text-sm border">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Future Scope Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Future Road Map</h2>
            <p className="text-xl opacity-90 mb-8">
              Moving beyond simulation, our vision includes real-world GPS integration, public transit priority, and predictive traffic forecasting using historical patterns.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="p-4 bg-white/10 rounded-lg">✓ V2V Sensor Communication</div>
              <div className="p-4 bg-white/10 rounded-lg">✓ Emergency Vehicle Pre-emption</div>
              <div className="p-4 bg-white/10 rounded-lg">✓ Multi-modal Integration (Rail/Bus)</div>
              <div className="p-4 bg-white/10 rounded-lg">✓ Carbon Footprint Analytics</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-bold">BengalFlow AI</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Smart Traffic Optimization for West Bengal. Built for academic and technical demonstration.
          </p>
        </div>
      </footer>
    </div>
  );
}
