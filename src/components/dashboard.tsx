"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { citiesData, JunctionData, RoadCondition } from '@/app/lib/cities-data';
import { getAQIStatus, fluctuateValue, getCongestionColor } from '@/app/lib/simulation';
import { suggestTrafficSignalOptimization } from '@/ai/flows/suggest-traffic-signal-optimization-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Wind, Timer, MapPin, Route, Activity, Loader2, Moon, Sun, AlertTriangle, Zap, Video } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

export function Dashboard() {
  const [selectedCity, setSelectedCity] = useState("Kolkata");
  const [selectedJunction, setSelectedJunction] = useState("Park Circus 7-Point");
  const [liveData, setLiveData] = useState<JunctionData | null>(null);
  const [isAIUpdating, setIsAIUpdating] = useState(false);
  const [aiRationale, setAiRationale] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  const cities = useMemo(() => Object.keys(citiesData), []);
  const junctions = useMemo(() => Object.keys(citiesData[selectedCity] || {}), [selectedCity]);

  // Handle City Change
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    const firstJunction = Object.keys(citiesData[city])[0];
    setSelectedJunction(firstJunction);
  };

  // Initial and reset state
  useEffect(() => {
    const data = citiesData[selectedCity][selectedJunction];
    setLiveData({ ...data });
  }, [selectedCity, selectedJunction]);

  // Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          baseCount: fluctuateValue(prev.baseCount, 12, 10),
          baseAqi: fluctuateValue(prev.baseAqi, 8, 20),
        };
      });
    }, 6000);

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
    } catch (error) {
      console.error("AI Optimization failed", error);
      toast({
        title: "AI Optimization Error",
        description: "Failed to connect to the traffic optimization engine.",
        variant: "destructive",
      });
    } finally {
      setIsAIUpdating(false);
    }
  }, [liveData, selectedCity, selectedJunction, toast]);

  // Run AI optimization whenever traffic significant changes occur or periodic
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
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-background' : 'bg-background'}`}>
      <Toaster />
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">BengalFlow <span className="text-primary">Dashboard</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Feed Active
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Controls and Video Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Location Settings</CardTitle>
                <CardDescription>Select a district and junction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block">District</label>
                  <Select value={selectedCity} onValueChange={handleCityChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block">Junction</label>
                  <Select value={selectedJunction} onValueChange={setSelectedJunction}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Junction" />
                    </SelectTrigger>
                    <SelectContent>
                      {junctions.map(j => (
                        <SelectItem key={j} value={j}>{j}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={runAIOptimization} disabled={isAIUpdating} className="w-full">
                  {isAIUpdating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Zap className="h-4 w-4 mr-2" />}
                  Sync AI
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5" />
                  Live Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">Active Nodes:</span>
                    <Badge variant="secondary" className="font-bold">{liveData.nodes}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">Condition:</span>
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">{liveData.road}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="md:col-span-2 overflow-hidden relative group">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live YOLO Detection</span>
            </div>
            <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">{selectedJunction} Feed</span>
            </div>
            <CardContent className="p-0 h-full min-h-[300px] bg-black flex items-center justify-center">
              <video 
                key={liveData.videoUrl}
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <source src={liveData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 pointer-events-none border-[12px] border-black/5 flex items-center justify-center">
                <div className="w-full h-full border border-primary/20 rounded-sm" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Vehicle Count */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vehicle Density</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${congestionColor}`}>
                {liveData.baseCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Max Capacity: {liveData.maxCount}
              </p>
              <Progress 
                value={(liveData.baseCount / liveData.maxCount) * 100} 
                className="h-2 mt-4" 
              />
            </CardContent>
          </Card>

          {/* AQI */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Air Quality Index</CardTitle>
              <Wind className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${aqiInfo.color}`}>
                {liveData.baseAqi}
              </div>
              <p className="text-xs font-semibold mt-1">
                Status: {aqiInfo.label}
              </p>
              <div className="mt-4 flex gap-1 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-green-500" style={{ width: '15%' }} />
                <div className="h-full bg-yellow-500" style={{ width: '15%' }} />
                <div className="h-full bg-orange-500" style={{ width: '20%' }} />
                <div className="h-full bg-red-500" style={{ width: '20%' }} />
                <div className="h-full bg-purple-500" style={{ width: '30%' }} />
              </div>
            </CardContent>
          </Card>

          {/* Timer */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Signal Timer</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {liveData.baseTimer}<span className="text-sm ml-1 text-muted-foreground">seconds</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Optimized by AI engine
              </p>
              <div className="mt-4 flex items-center justify-center py-2 bg-muted/50 rounded-lg">
                <div className="flex gap-2">
                  <div className={`w-4 h-4 rounded-full ${liveData.baseTimer > 60 ? 'bg-red-500 animate-pulse' : 'bg-red-900'}`} />
                  <div className={`w-4 h-4 rounded-full ${liveData.baseTimer > 30 && liveData.baseTimer <= 60 ? 'bg-yellow-500 animate-pulse' : 'bg-yellow-900'}`} />
                  <div className={`w-4 h-4 rounded-full ${liveData.baseTimer <= 30 ? 'bg-green-500 animate-pulse' : 'bg-green-900'}`} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Road Node Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Ingress</CardTitle>
              <Route className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{liveData.nodes}</div>
              <p className="text-xs text-muted-foreground mt-1">Operational Lane Groups</p>
              <div className="flex flex-wrap gap-1 mt-4">
                {Array.from({ length: liveData.nodes }).map((_, i) => (
                  <div key={i} className="w-4 h-6 bg-primary/20 border border-primary/30 rounded flex items-center justify-center text-[8px] font-bold text-primary">
                    N{i+1}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insight Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Adaptive AI Intelligence Rationale
              </CardTitle>
              <CardDescription>
                Live decision-making breakdown from the traffic optimization core
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted/30 border rounded-xl min-h-[120px]">
                {aiRationale ? (
                  <p className="text-sm leading-relaxed text-foreground">
                    {aiRationale}
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="text-xs uppercase font-bold tracking-widest">Awaiting Simulation Feed...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">District Overview</CardTitle>
              <CardDescription>Junction health in {selectedCity}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {junctions.map(j => {
                const data = citiesData[selectedCity][j];
                const info = getAQIStatus(data.baseAqi);
                return (
                  <div key={j} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => setSelectedJunction(j)}>
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${j === selectedJunction ? 'text-primary' : ''}`}>{j}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{data.road}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${info.bg.replace('bg-', 'bg-')}`} />
                      <span className="text-xs font-medium">{data.baseCount} veh</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t py-6 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            BengalFlow AI Operational: {selectedCity} Region
          </div>
          <div>Last System Pulse: {new Date().toLocaleTimeString()}</div>
        </div>
      </footer>
    </div>
  );
}