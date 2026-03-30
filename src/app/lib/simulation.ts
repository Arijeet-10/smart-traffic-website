import { RoadCondition } from './cities-data';

export const getAQIStatus = (aqi: number) => {
  if (aqi <= 50) return { label: 'Good', color: 'text-green-500', bg: 'bg-green-100', hex: '#22c55e' };
  if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-100', hex: '#eab308' };
  if (aqi <= 150) return { label: 'Unhealthy (Sensitive)', color: 'text-orange-500', bg: 'bg-orange-100', hex: '#f97316' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-500', bg: 'bg-red-100', hex: '#ef4444' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-purple-500', bg: 'bg-purple-100', hex: '#a855f7' };
  return { label: 'Hazardous', color: 'text-rose-900', bg: 'bg-rose-200', hex: '#881337' };
};

export const fluctuateValue = (base: number, range: number, min: number = 0) => {
  const diff = Math.floor(Math.random() * (range * 2 + 1)) - range;
  return Math.max(min, base + diff);
};

export const getCongestionColor = (count: number, max: number) => {
  const ratio = count / max;
  if (ratio < 0.4) return 'text-green-500';
  if (ratio < 0.7) return 'text-yellow-500';
  return 'text-red-500';
};

/**
 * Simulates SUMO performance metrics based on traffic density and signal efficiency.
 */
export const calculateSumoMetrics = (count: number, timer: number, maxCount: number) => {
  const density = count / maxCount;
  // Speed decreases as density increases, but signal efficiency (timer) helps
  const baseSpeed = 50; // km/h
  const speed = Math.max(5, baseSpeed * (1 - density * 0.8) + (timer / 150) * 10);
  
  // Throughput (vehicles per minute)
  const throughput = Math.floor((speed / 10) * (count / 20));
  
  return {
    speed: Math.round(speed),
    throughput: Math.round(throughput),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };
};
