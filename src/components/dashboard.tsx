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
import { Users, Wind, Timer, MapPin, Activity, Loader2, Moon, Sun, Zap, LineChart, Cpu, LayoutDashboard, Settings, AlertCircle, Car, Cloud, Route, Radio } from 'lucide-react';
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

interface DashboardProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Dashboard({ theme, toggleTheme }: DashboardProps) {
  const [selectedCity, setSelectedCity] = useState("Kolkata");
  const [selectedJunction, setSelectedJunction] = useState("Park Circus 7-Point");
  const [liveData, setLiveData] = useState<JunctionData | null>(null);
  const [isAIUpdating, setIsAIUpdating] = useState(false);
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
      const junctionConfig = citiesData[selectedCity][selectedJunction];
      
      const result = await suggestTrafficSignalOptimization({
        vehicleCount: liveData.baseCount,
        aqi: liveData.baseAqi,
        roadCondition: liveData.road,
        baseTimer: junctionConfig.baseTimer,
        maxTimer: junctionConfig.maxTimer,
        nodes: liveData.nodes,
      });

      setLiveData(prev => prev ? ({ ...prev, baseTimer: result.recommendedTimer }) : null);
    } catch (error: any) {
      toast({
        title: "AI Optimization Error",
        description: "Failed to connect to the traffic optimization engine. Retrying automatically.",
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
    <div className="transition-all duration-700 py-16 px-4 bg-gradient-to-b from-background to-background/50 relative">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-400/[0.02] bg-[bottom_1px_center] pointer-events-none" />
      <div className="container mx-auto space-y-8 relative z-10">
        <Toaster />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/50 pb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
              BengalFlow <Badge variant="secondary" className="font-black px-3 py-1 text-sm">COMMAND CENTER</Badge>
            </h2>
            <p className="text-sm text-muted-foreground font-medium mt-1">Real-time optimization engine active for {selectedCity}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-xl" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full border border-green-500/20 text-[10px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Synchronized
            </div>
          </div>
        </div>

        {/* Top Controls & Feed Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Selection Panel */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="glass-panel overflow-hidden rounded-[2rem]">
              <CardHeader className="bg-primary/5 dark:bg-primary/10 border-b border-border/50 pb-4">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Target Location
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">District</label>
                  <Select value={selectedCity} onValueChange={handleCityChange}>
                    <SelectTrigger className="h-12 rounded-xl border-2 focus:ring-primary shadow-sm font-bold bg-background">
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
                    <SelectTrigger className="h-12 rounded-xl border-2 focus:ring-primary shadow-sm font-bold bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {junctions.map(j => (
                        <SelectItem key={j} value={j} className="font-bold">{j}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* <Button onClick={runAIOptimization} disabled={isAIUpdating} className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                  {isAIUpdating ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Zap className="h-5 w-5 mr-2" />}
                  Manual AI Sync
                </Button> */}
              </CardContent>
            </Card>

            <Card className="glass-panel bg-primary/90 text-primary-foreground overflow-hidden glow-primary rounded-[2rem]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 opacity-80">
                  <Activity className="h-4 w-4" />
                  Hub Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-xs font-medium opacity-70 italic">Load State:</span>
                  <Badge variant="secondary" className="font-black bg-white/20 hover:bg-white/30 text-white border-none">{liveData.road}</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-medium opacity-70 italic">Nodes:</span>
                  <span className="text-xl font-black">{liveData.nodes}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Feed Card */}
          <Card className="lg:col-span-9 glass-panel overflow-hidden relative rounded-[2rem] hud-border">
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-2xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">YOLO VISION ACTIVE</span>
            </div>
            <div className="absolute top-6 right-6 z-20 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-2xl">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">{selectedJunction} CCTV-ID:722</span>
            </div>
            <CardContent className="p-0 h-[500px] bg-slate-900 flex items-center justify-center relative overflow-hidden">
              <video 
                key={liveData.videoUrl}
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={liveData.videoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 pointer-events-none border-[1.5rem] border-transparent shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
            </CardContent>
          </Card>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {[
            { title: 'Vehicle Count', icon: <Car className="h-5 w-5" />, value: liveData.baseCount, sub: `Max: ${liveData.maxCount} vehicles`, color: congestionColor, progress: (liveData.baseCount/liveData.maxCount)*100 },
            { title: 'Air Quality Index', icon: <Cloud className="h-5 w-5" />, value: liveData.baseAqi, sub: aqiInfo.label, color: aqiInfo.color, progress: (liveData.baseAqi/300)*100 },
            { title: 'Signal Timer', icon: <Timer className="h-5 w-5" />, value: `${liveData.baseTimer}s`, sub: `Max: ${liveData.maxTimer}s adaptive`, color: 'text-foreground', progress: (liveData.baseTimer/liveData.maxTimer)*100 },
            { title: 'Road Condition', icon: <Route className="h-5 w-5" />, value: liveData.road, sub: 'Traffic Status', color: 'text-orange-500', progress: 100 },
            { title: 'Active Nodes', icon: <Radio className="h-5 w-5" />, value: liveData.nodes, sub: 'IoT nodes online', color: 'text-primary', progress: 100 },
          ].map((metric, i) => (
            <Card key={i} className="glass-panel transition-transform duration-500 hover:-translate-y-1 rounded-[2rem] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{metric.title}</CardTitle>
                <div className="p-2 bg-primary/10 text-primary rounded-xl">{metric.icon}</div>
              </CardHeader>
              <CardContent>
                <div className={`text-4xl font-black tracking-tighter ${metric.color} mb-1`}>{metric.value}</div>
                <p className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider">{metric.sub}</p>
                <Progress value={metric.progress} className="h-2 rounded-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SUMO Simulation Feature Section */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          <Card className="lg:col-span-12 glass-panel rounded-[2rem] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-background/30 border-b border-border/50 pb-6">
              <div>
                <CardTitle className="text-lg font-black flex items-center gap-2 text-primary">
                  <Cpu className="h-5 w-5 text-primary" />
                  SUMO Simulation & AI Detection Feed
                </CardTitle>
                <CardDescription className="font-medium">Pre-recorded SUMO agent simulation for {selectedJunction}</CardDescription>
              </div>
              <Badge variant="outline" className="font-mono bg-red-500/10 text-red-500 border-red-500/20 px-4 py-1 rounded-full border-2 font-black text-[10px] animate-pulse">
                LIVE SIMULATION
              </Badge>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Section */}
              <div className="lg:col-span-2 rounded-[1.5rem] overflow-hidden border-2 border-border/50 bg-black relative h-[300px] lg:h-[400px]">
                <video 
                  key={liveData.mapUrl + "_sumo"}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={liveData.mapUrl} type="video/mp4" />
                </video>
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">SUMO VISION</span>
                </div>
              </div>

              {/* Detections & Controls */}
              <div className="flex flex-col justify-between space-y-4">
                {/* 5. Vehicle Classification */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <Car className="h-5 w-5 text-green-400" />
                    <h4 className="text-[11px] font-black uppercase tracking-widest leading-tight">5. Vehicle Classification <br/><span className="text-[9px] text-muted-foreground opacity-70">(EV, Fossil Fuel)</span></h4>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium mb-3">Real-time detection and count of EVs vs Fossil Fuel vehicles.</p>
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded-md">EV: {Math.round(liveData.baseCount * 0.3)}</span>
                    <span className="text-orange-400 bg-orange-400/10 px-2 py-1 rounded-md">Fossil: {Math.round(liveData.baseCount * 0.7)}</span>
                  </div>
                </div>

                {/* 6. Red Light Stop */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <Timer className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-[11px] font-black uppercase tracking-widest leading-tight">6. Red Light Stop <br/><span className="text-[9px] text-muted-foreground opacity-70">(Dynamic Timer)</span></h4>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium mb-3">Time increases/decreases dynamically as per traffic requirement.</p>
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-muted-foreground">Active Allocation</span>
                    <span className="text-yellow-400 px-2 py-1 bg-yellow-400/10 rounded-md">{liveData.baseTimer}s (+{Math.floor(liveData.baseCount % 12)}s Adj)</span>
                  </div>
                </div>

                {/* 7. Emergency Incident */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 transition-colors flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <h4 className="text-[11px] font-black uppercase tracking-widest leading-tight">7. Emergency Incident <br/><span className="text-[9px] text-muted-foreground opacity-70">(Ambulance)</span></h4>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium mb-3">Ambulance tracking requesting immediate signal priority routing.</p>
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-muted-foreground">Incident Status</span>
                    {liveData.baseCount > 175 ? (
                      <span className="text-red-500 bg-red-500/10 px-2 py-1 rounded-md animate-pulse border border-red-500/30">DETECTED (LANE 2)</span>
                    ) : (
                      <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/30">MONITORING CLEAR</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance & Logic Section */}
        <div className="grid lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-12 glass-panel rounded-[2rem] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-background/30 border-b border-border/50 pb-6">
              <div>
                <CardTitle className="text-lg font-black flex items-center gap-2 text-primary">
                  <LineChart className="h-5 w-5 text-primary" />
                  SUMO Network Analytics
                </CardTitle>
                <CardDescription className="font-medium">Real-time throughput simulation</CardDescription>
              </div>
              <Badge variant="outline" className="font-mono bg-background px-4 py-1 rounded-full border-2 font-black text-[10px]">
                NODE_SIM_{selectedJunction.slice(0, 3).toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent className="pt-8">
              <ChartContainer config={chartConfig} className="h-[350px] w-full">
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
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Flow Speed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Volume</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Hub Health Grid */}
        <Card className="glass-panel rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-background/30 border-b border-border/50 pb-6">
            <CardTitle className="text-lg font-black uppercase tracking-tight text-primary">Regional Hub Pulse</CardTitle>
            <CardDescription className="font-medium text-muted-foreground">Junction networks in {selectedCity}</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
            {junctions.map(j => {
              const data = j === selectedJunction && liveData ? liveData : citiesData[selectedCity][j];
              const info = getAQIStatus(data.baseAqi);
              const isActive = j === selectedJunction;
              return (
                <div 
                  key={j} 
                  className={`group relative flex items-center justify-between p-5 border-2 rounded-[2rem] transition-all duration-300 cursor-pointer ${isActive ? 'bg-primary/20 border-primary glow-primary shadow-xl scale-105' : 'hover:border-primary/30 hover:bg-white/5 border-border bg-transparent'}`}
                  onClick={() => setSelectedJunction(j)}
                >
                  <div className="flex flex-col">
                    <span className={`text-sm font-black tracking-tight ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>{j}</span>
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

        {/* Area-Wise Pollution Monitoring Grid */}
        <Card className="glass-panel rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-background/30 border-b border-border/50 pb-6">
            <CardTitle className="text-lg font-black uppercase tracking-tight text-primary flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              Area-Wise Pollution Monitoring
            </CardTitle>
            <CardDescription className="font-medium text-muted-foreground">Real-time environmental stats across {selectedCity} parameters</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {junctions.map(j => {
              const data = j === selectedJunction && liveData ? liveData : citiesData[selectedCity][j];
              const info = getAQIStatus(data.baseAqi);
              
              const pm25 = Math.round(data.baseAqi * 0.45);
              const pm10 = Math.round(data.baseAqi * 0.85);
              const no2 = Math.round(data.baseAqi * 0.35);
              const co2 = Math.round(400 + data.baseAqi * 1.2);

              return (
                <div key={`${j}-pollution`} className="relative flex flex-col p-5 border-2 rounded-[2rem] bg-background/40 border-border/50 hover:border-primary/40 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-sm font-black tracking-tight">{j}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{data.road}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-3xl font-black ${info.color}`}>{data.baseAqi}</span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full mt-1 ${info.bg} ${info.color}`}>{info.label}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="bg-background/60 rounded-xl p-3 border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Wind className="h-3 w-3 text-muted-foreground" />
                        <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">PM2.5</div>
                      </div>
                      <div className="text-sm font-black">{pm25} <span className="text-[8px] opacity-50">µg/m³</span></div>
                    </div>
                    <div className="bg-background/60 rounded-xl p-3 border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Wind className="h-3 w-3 text-muted-foreground" />
                        <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">PM10</div>
                      </div>
                      <div className="text-sm font-black">{pm10} <span className="text-[8px] opacity-50">µg/m³</span></div>
                    </div>
                    <div className="bg-background/60 rounded-xl p-3 border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="h-3 w-3 text-muted-foreground" />
                        <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">NO2</div>
                      </div>
                      <div className="text-sm font-black">{no2} <span className="text-[8px] opacity-50">ppb</span></div>
                    </div>
                    <div className="bg-background/60 rounded-xl p-3 border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Cloud className="h-3 w-3 text-muted-foreground" />
                        <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">CO2</div>
                      </div>
                      <div className="text-sm font-black">{co2} <span className="text-[8px] opacity-50">ppm</span></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* <footer className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-[10px] font-black tracking-[0.2em] text-muted-foreground gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            STATUS: SYNCHRONIZED • PULSE: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex gap-8">
            <Link href="/" className="hover:text-primary transition-colors">BACK TO TERMINAL</Link>
            <Link href="#" className="hover:text-primary transition-colors">SUPPORT</Link>
          </div>
        </footer> */}
      </div>
    </div>
  );
}
