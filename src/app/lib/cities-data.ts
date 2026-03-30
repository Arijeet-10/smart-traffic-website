export type RoadCondition = 'Clear' | 'Busy' | 'Congested' | 'Damaged' | 'Market Traffic';

export interface JunctionData {
  baseCount: number;
  maxCount: number;
  baseTimer: number;
  maxTimer: number;
  baseAqi: number;
  road: RoadCondition;
  nodes: number;
  videoUrl: string;
}

export type CityJunctions = Record<string, JunctionData>;
export type StateData = Record<string, CityJunctions>;

// Using a generic traffic video for simulation. 
// In a real scenario, these would point to specific files like '/videos/kolkata_park_circus.mp4'
const SAMPLE_TRAFFIC_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-traffic-at-night-in-a-city-4328-large.mp4";

export const citiesData: StateData = {
  "Kolkata": {
    "Park Circus 7-Point": { baseCount: 160, maxCount: 220, baseTimer: 75, maxTimer: 120, baseAqi: 150, road: "Congested", nodes: 8, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Shyam Bazar Five Point": { baseCount: 140, maxCount: 200, baseTimer: 60, maxTimer: 110, baseAqi: 140, road: "Busy", nodes: 5, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Ultadanga Crossing": { baseCount: 180, maxCount: 250, baseTimer: 80, maxTimer: 130, baseAqi: 160, road: "Busy", nodes: 6, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Gariahat Crossing": { baseCount: 150, maxCount: 210, baseTimer: 70, maxTimer: 115, baseAqi: 135, road: "Market Traffic", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Esplanade Junction": { baseCount: 200, maxCount: 280, baseTimer: 90, maxTimer: 150, baseAqi: 180, road: "Congested", nodes: 10, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Behala Chowrasta": { baseCount: 130, maxCount: 190, baseTimer: 55, maxTimer: 100, baseAqi: 125, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
  },
  "Howrah": {
    "Station More": { baseCount: 210, maxCount: 300, baseTimer: 85, maxTimer: 140, baseAqi: 170, road: "Congested", nodes: 7, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Kadamtala Crossing": { baseCount: 120, maxCount: 180, baseTimer: 50, maxTimer: 95, baseAqi: 110, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Nabanna Intersection": { baseCount: 90, maxCount: 150, baseTimer: 45, maxTimer: 85, baseAqi: 90, road: "Clear", nodes: 5, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Avani Mall Junction": { baseCount: 140, maxCount: 200, baseTimer: 60, maxTimer: 110, baseAqi: 130, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
  },
  "Siliguri": {
    "Venus More": { baseCount: 130, maxCount: 190, baseTimer: 55, maxTimer: 100, baseAqi: 115, road: "Market Traffic", nodes: 5, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Hashmi Chowk": { baseCount: 110, maxCount: 170, baseTimer: 45, maxTimer: 90, baseAqi: 105, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Darjeeling More": { baseCount: 170, maxCount: 240, baseTimer: 75, maxTimer: 125, baseAqi: 145, road: "Congested", nodes: 6, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Sevoke Road Intersection": { baseCount: 150, maxCount: 210, baseTimer: 65, maxTimer: 115, baseAqi: 120, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
  },
  "Asansol": {
    "City Bus Stand Junction": { baseCount: 140, maxCount: 210, baseTimer: 65, maxTimer: 115, baseAqi: 155, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Chelidanga More": { baseCount: 100, maxCount: 160, baseTimer: 50, maxTimer: 95, baseAqi: 130, road: "Clear", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Court Crossing": { baseCount: 90, maxCount: 140, baseTimer: 45, maxTimer: 85, baseAqi: 120, road: "Busy", nodes: 3, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Hutton Road Junction": { baseCount: 120, maxCount: 180, baseTimer: 55, maxTimer: 105, baseAqi: 145, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
  },
  "Durgapur": {
    "City Centre More": { baseCount: 150, maxCount: 220, baseTimer: 70, maxTimer: 120, baseAqi: 160, road: "Busy", nodes: 6, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Station More": { baseCount: 160, maxCount: 230, baseTimer: 75, maxTimer: 125, baseAqi: 170, road: "Congested", nodes: 5, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Muchipara Crossing": { baseCount: 120, maxCount: 190, baseTimer: 60, maxTimer: 110, baseAqi: 140, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Steel Plant Gate": { baseCount: 110, maxCount: 170, baseTimer: 50, maxTimer: 95, baseAqi: 180, road: "Damaged", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
  },
  "Kharagpur": {
    "Gole Bazar Crossing": { baseCount: 130, maxCount: 200, baseTimer: 60, maxTimer: 110, baseAqi: 110, road: "Market Traffic", nodes: 5, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "IIT Gate Junction": { baseCount: 80, maxCount: 140, baseTimer: 40, maxTimer: 80, baseAqi: 85, road: "Clear", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Inda More": { baseCount: 110, maxCount: 170, baseTimer: 50, maxTimer: 95, baseAqi: 100, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Railway Station More": { baseCount: 150, maxCount: 220, baseTimer: 70, maxTimer: 120, baseAqi: 120, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
  },
  "Haldia": {
    "Durgachak More": { baseCount: 120, maxCount: 180, baseTimer: 60, maxTimer: 110, baseAqi: 190, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Akash Ganga Crossing": { baseCount: 100, maxCount: 160, baseTimer: 50, maxTimer: 95, baseAqi: 175, road: "Clear", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Port Junction": { baseCount: 140, maxCount: 210, baseTimer: 70, maxTimer: 130, baseAqi: 210, road: "Congested", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "City Centre Crossing": { baseCount: 110, maxCount: 170, baseTimer: 55, maxTimer: 105, baseAqi: 165, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
  },
  "Bardhaman": {
    "Curzon Gate Crossing": { baseCount: 140, maxCount: 210, baseTimer: 65, maxTimer: 115, baseAqi: 130, road: "Busy", nodes: 5, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Station More": { baseCount: 160, maxCount: 230, baseTimer: 75, maxTimer: 125, baseAqi: 145, road: "Congested", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Golapbag More": { baseCount: 110, maxCount: 170, baseTimer: 50, maxTimer: 95, baseAqi: 115, road: "Clear", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Town Hall Junction": { baseCount: 120, maxCount: 180, baseTimer: 55, maxTimer: 105, baseAqi: 125, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
  },
  "Malda": {
    "Rathbari More": { baseCount: 150, maxCount: 220, baseTimer: 70, maxTimer: 120, baseAqi: 120, road: "Congested", nodes: 5, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "English Bazar Junction": { baseCount: 130, maxCount: 200, baseTimer: 65, maxTimer: 115, baseAqi: 110, road: "Market Traffic", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Foyara More": { baseCount: 110, maxCount: 170, baseTimer: 55, maxTimer: 105, baseAqi: 105, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Bus Stand Crossing": { baseCount: 140, maxCount: 210, baseTimer: 65, maxTimer: 120, baseAqi: 130, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
  },
  "Berhampore": {
    "Mohona More": { baseCount: 120, maxCount: 190, baseTimer: 60, maxTimer: 110, baseAqi: 115, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Cantonment Crossing": { baseCount: 100, maxCount: 160, baseTimer: 50, maxTimer: 95, baseAqi: 100, road: "Clear", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Girja Crossing": { baseCount: 130, maxCount: 200, baseTimer: 65, maxTimer: 115, baseAqi: 125, road: "Market Traffic", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "NH Intersection": { baseCount: 140, maxCount: 210, baseTimer: 70, maxTimer: 125, baseAqi: 135, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
  },
  "Darjeeling": {
    "Chowrasta More": { baseCount: 80, maxCount: 140, baseTimer: 45, maxTimer: 90, baseAqi: 45, road: "Market Traffic", nodes: 3, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Ghum Station More": { baseCount: 90, maxCount: 150, baseTimer: 50, maxTimer: 95, baseAqi: 55, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Motor Stand Junction": { baseCount: 110, maxCount: 170, baseTimer: 55, maxTimer: 105, baseAqi: 65, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
    "Hill Cart Road More": { baseCount: 100, maxCount: 160, baseTimer: 50, maxTimer: 100, baseAqi: 60, road: "Busy", nodes: 4, videoUrl: SAMPLE_TRAFFIC_VIDEO },
  }
};