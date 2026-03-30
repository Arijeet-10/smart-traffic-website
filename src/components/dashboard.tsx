"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { citiesData, JunctionData, RoadCondition } from '@/app/lib/cities-data';
import { getAQIStatus, fluctuateValue, getCongestionColor, calculateSumoMetrics } from '@/app/lib/simulation';
import { suggestTrafficSignalOptimization } from '@/ai/flows/suggest-traffic-signal-optimization-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Wind, Timer, MapPin, Activity, Loader2, Moon, Sun, Zap, LineChart, Cpu, LayoutDashboard, Settings } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  speed: {
    label: "Avg Speed (km/h)",
    color: "hsl(var(--primary))",
  },
  throughput: {
    label: "Throughput (vpm)",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function Dashboard() {
  const [selectedCity, setSelectedCity] = useState("Kolkata");
  const [selectedJunction, setSelectedJunction] = useState("Park Circus 7-Point");
  const [liveData, setLiveData] = useState<JunctionData | null>(null);
  const [isAIUpdating, setIsAIUpdating] = useState(false);
  const [aiRationale, setAiRationale] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [simulationHistory, setSimulationHistory] = useState<any[]>([]);
  const { toast } = useToast();

  const cities = useMemo(() => Object.keys(citiesData), []);
  const junctions = useMemo(() => Object.keys(citiesData[selectedCity] || {}), [selectedCity]);

  // Handle City Change
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    const firstJunction = Object.keys(citiesData[city])[0];
    setSelectedJunction(firstJunction);
    setSimulationHistory([]);
  };

  // Initial and reset state
  useEffect(() => {
    const data = citiesData[selectedCity][selectedJunction];
    setLiveData({ ...data });
    setSimulationHistory([]);
  }, [selectedCity, selectedJunction]);

  // Simulation Logic & SUMO History Update
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => {
        if (!prev) return null;
        const newData = {
          ...prev,
          baseCount: fluctuateValue(prev.baseCount, 12, 10),
          baseAqi: fluctuateValue(prev.baseAqi, 8, 20),
        };
        
        // Update simulation history
        const metrics = calculateSumoMetrics(newData.baseCount, newData.baseTimer, newData.maxCount);
        setSimulationHistory(h => {
          const next = [...h, metrics];
          return next.slice(-15); // Keep last 15 data points
        });

        return newData;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedCity, selectedJunction]);

  // AI Signal Optimization Logic
  const runAIOptimization = useCallback(async () => {
    if (!liveData) return;
    setIsAIUpdating(true);
    try {
      const result = await suggestTrafficSignalOptimization({
        vehicleCount: liveData.baseCount,
        aqi: liveData.baseAqi,
        roadCondition: liveData.road,
        baseTimer: citiesData[selectedCity][selectedJunction].baseTimer,
        maxTimer: citiesData[selectedCity][selectedJunction].maxTimer,
        nodes: liveData.nodes,
      });

      setLiveData(prev => prev ? ({ ...prev, baseTimer: result.recommendedTimer }) : null);
      setAiRationale(result.rationale);
    } catch (error: any) {
      toast({
        title: "AI Optimization Error",
        description: "Failed to connect to the traffic optimization engine.",
        variant: "destructive",
      });
    } finally {
      setIsAIUpdating(false);
    }
  }, [liveData, selectedCity, selectedJunction, toast]);

  // Periodic AI Sync
  useEffect(() => {
    const aiInterval = setInterval(() => {
      runAIOptimization();
    }, 12000);
    return () => clearInterval(aiInterval);
  }, [runAIOptimization]);

  if (!liveData) return null;

  const aqiInfo = getAQIStatus(liveData.baseAqi);
  const congestionColor = getCongestionColor(liveData.baseCount, liveData.maxCount);

  return (
    <div className={`min-h-screen font-body transition-all duration-500 ${isDarkMode ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
      <Toaster />
      
      {/* Sidebar navigation simulation */}
      <nav className="fixed left-0 top-0 h-full w-20 hidden lg:flex flex-col items-center py-8 border-r bg-card z-50">
        <div className="mb-12 bg-primary p-2.5 rounded-2xl glow-primary">
          <Zap className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex flex-col gap-8">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-primary/10 text-primary">
            <LayoutDashboard className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl">
            <Activity className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl">
            <MapPin className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
        <div className="mt-auto">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      <div className="lg:pl-20">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b px-8 py-4">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                BengalFlow <Badge variant="secondary" className="font-black px-3 py-0.5">COMMAND CENTER</Badge>
              </h1>
              <p className="text-sm text-muted-foreground font-medium">Real-time optimization engine active for {selectedCity}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full border border-green-500/20 text-xs font-black uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                System Healthy
              </div>
              <div className="text-sm font-bold text-muted-foreground hidden md:block">
                {new Date().toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-8 py-8 space-y-8">
          {/* Top Controls & Feed Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Selection Panel */}
            <div className="lg:col-span-3 space-y-6">
              <Card className="border-none shadow-2xl shadow-primary/5 overflow-hidden">
                <CardHeader className="bg-primary/5 border-b pb-4">
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Target Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">District</label>
                    <Select value={selectedCity} onValueChange={handleCityChange}>
                      <SelectTrigger className="h-12 rounded-xl border-2 focus:ring-primary shadow-sm font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {cities.map(city => (
                          <SelectItem key={city} value={city} className="font-bold">{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Intersection</label>
                    <Select value={selectedJunction} onValueChange={setSelectedJunction}>
                      <SelectTrigger className="h-12 rounded-xl border-2 focus:ring-primary shadow-sm font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {junctions.map(j => (
                          <SelectItem key={j} value={j} className="font-bold">{j}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={runAIOptimization} disabled={isAIUpdating} className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                    {isAIUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Zap className="h-5 w-5 mr-2" />}
                    Sync Intelligence
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-primary border-none text-primary-foreground overflow-hidden glow-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 opacity-80">
                    <Activity className="h-4 w-4" />
                    Pulse Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-xs font-medium opacity-70 italic">Current Traffic Load:</span>
                    <Badge variant="secondary" className="font-black bg-white/20 hover:bg-white/30 text-white border-none">{liveData.road}</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-medium opacity-70 italic">Active Hub Nodes:</span>
                    <span className="text-xl font-black">{liveData.nodes}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Feed Card */}
            <Card className="lg:col-span-9 border-none shadow-2xl shadow-black/5 overflow-hidden relative group rounded-3xl">
               <div className="absolute top-6 left-6 z-10 flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-2xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">YOLO LIVE FEED</span>
              </div>
              <div className="absolute top-6 right-6 z-10 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-2xl">
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{selectedJunction} CAMERA ID-722</span>
              </div>
              <CardContent className="p-0 h-[450px] bg-slate-900 flex items-center justify-center relative overflow-hidden">
                <video 
                  key={liveData.videoUrl}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2000ms] opacity-60 group-hover:opacity-100"
                >
                  <source src={liveData.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 pointer-events-none border-[1.5rem] border-transparent shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
                {/* Simulated Overlay Graphics */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-black/60 backdrop-blur-lg p-6 rounded-3xl border border-white/10 max-w-md">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="text-[8px] font-black text-white/50 uppercase">Cars</div>
                        <div className="text-lg font-black text-primary">{(liveData.baseCount * 0.7).toFixed(0)}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[8px] font-black text-white/50 uppercase">Buses</div>
                        <div className="text-lg font-black text-accent">{(liveData.baseCount * 0.2).toFixed(0)}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[8px] font-black text-white/50 uppercase">Other</div>
                        <div className="text-lg font-black text-white">{(liveData.baseCount * 0.1).toFixed(0)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metrics Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Vehicle Density', icon: <Users className="h-5 w-5" />, value: liveData.baseCount, sub: `Max: ${liveData.maxCount}`, color: congestionColor, progress: (liveData.baseCount/liveData.maxCount)*100 },
              { title: 'Air Quality Index', icon: <Wind className="h-5 w-5" />, value: liveData.baseAqi, sub: aqiInfo.label, color: aqiInfo.color, progress: (liveData.baseAqi/300)*100 },
              { title: 'Current Phase', icon: <Timer className="h-5 w-5" />, value: `${liveData.baseTimer}s`, sub: 'AI Optimized Cycle', color: 'text-foreground', progress: (liveData.baseTimer/liveData.maxTimer)*100 },
              { title: 'Flow Velocity', icon: <Cpu className="h-5 w-5" />, value: simulationHistory.length > 0 ? `${simulationHistory[simulationHistory.length-1].speed} km/h` : '--', sub: 'SUMO Calculated', color: 'text-primary', progress: 65 },
            ].map((metric, i) => (
              <Card key={i} className="border-none shadow-xl shadow-black/5 hover:scale-[1.02] transition-transform duration-300 rounded-3xl overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{metric.title}</CardTitle>
                  <div className="p-2 bg-muted rounded-xl">{metric.icon}</div>
                </CardHeader>
                <CardContent>
                  <div className={`text-4xl font-black tracking-tighter ${metric.color} mb-1`}>{metric.value}</div>
                  <p className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider">{metric.sub}</p>
                  <Progress value={metric.progress} className="h-2 rounded-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance & Logic Section */}
          <div className="grid lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-8 border-none shadow-2xl shadow-black/5 rounded-3xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-muted/30 pb-6">
                <div>
                  <CardTitle className="text-lg font-black flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    SUMO Engine Analytics
                  </CardTitle>
                  <CardDescription className="font-medium">Continuous network performance monitoring</CardDescription>
                </div>
                <Badge variant="outline" className="font-mono bg-background px-4 py-1 rounded-full border-2 font-black text-[10px]">
                  SIM_NODE_{selectedJunction.slice(0, 3).toUpperCase()}_PRIME
                </Badge>
              </CardHeader>
              <CardContent className="pt-8">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <AreaChart data={simulationHistory}>
                    <defs>
                      <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="5 5" className="stroke-muted" />
                    <XAxis dataKey="timestamp" hide />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Area
                      type="step"
                      dataKey="speed"
                      stroke="hsl(var(--primary))"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorSpeed)"
                      isAnimationActive={false}
                    />
                    <Area
                      type="step"
                      dataKey="throughput"
                      stroke="hsl(var(--accent))"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorThroughput)"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ChartContainer>
                <div className="flex justify-center gap-12 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Velocity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Throughput</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4 border-none shadow-2xl shadow-primary/5 rounded-3xl overflow-hidden flex flex-col">
              <CardHeader className="bg-primary pb-6 text-primary-foreground">
                <CardTitle className="text-lg font-black flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Intelligence Log
                </CardTitle>
                <CardDescription className="text-primary-foreground/70 font-medium">Real-time reasoning stream</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-8">
                <div className="relative h-full flex flex-col">
                   <div className="p-6 bg-muted border rounded-[2rem] flex-1 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                      <LayoutDashboard className="h-20 w-20" />
                    </div>
                    {aiRationale ? (
                      <p className="text-sm font-bold leading-relaxed text-foreground animate-in fade-in duration-1000">
                        {aiRationale}
                      </p>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="text-[10px] uppercase font-black tracking-[0.3em] animate-pulse">Analyzing Pattern Data...</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-2">
                     <div className={`aspect-square rounded-full shadow-lg ${liveData.baseTimer > 60 ? 'bg-red-500 shadow-red-500/50' : 'bg-red-950/30'}`} />
                     <div className={`aspect-square rounded-full shadow-lg ${liveData.baseTimer > 30 && liveData.baseTimer <= 60 ? 'bg-yellow-500 shadow-yellow-500/50' : 'bg-yellow-950/30'}`} />
                     <div className={`aspect-square rounded-full shadow-lg ${liveData.baseTimer <= 30 ? 'bg-green-500 shadow-green-500/50' : 'bg-green-950/30'}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* District Grid Overview */}
          <Card className="border-none shadow-2xl shadow-black/5 rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/30 pb-6">
              <CardTitle className="text-lg font-black uppercase tracking-tight">Regional Hub Health</CardTitle>
              <CardDescription className="font-medium">Active junctions in the {selectedCity} area</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
              {junctions.map(j => {
                const data = citiesData[selectedCity][j];
                const info = getAQIStatus(data.baseAqi);
                const isActive = j === selectedJunction;
                return (
                  <div 
                    key={j} 
                    className={`group relative flex items-center justify-between p-5 border-2 rounded-[2rem] transition-all duration-300 cursor-pointer ${isActive ? 'bg-primary border-primary shadow-xl shadow-primary/20 scale-105' : 'hover:border-primary/30 hover:bg-card'}`}
                    onClick={() => setSelectedJunction(j)}
                  >
                    <div className="flex flex-col">
                      <span className={`text-sm font-black tracking-tight ${isActive ? 'text-primary-foreground' : ''}`}>{j}</span>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{data.road}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full border-2 border-white/20 ${info.hex.includes('22c55e') ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={`text-xs font-black ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>{data.baseCount}v</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </main>

        <footer className="border-t py-12 px-8 bg-card">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              BENGALFLOW AI OPERATIONAL SYSTEM
            </div>
            <div>STATUS: SYNCHRONIZED • PULSE: {new Date().toLocaleTimeString()}</div>
            <div className="flex gap-8">
              <Link href="/" className="hover:text-primary transition-colors">BACK TO TERMINAL</Link>
              <Link href="#" className="hover:text-primary transition-colors">SUPPORT</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
