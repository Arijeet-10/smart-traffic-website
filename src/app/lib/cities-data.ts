export type RoadCondition = 'Clear' | 'Busy' | 'Congested' | 'Damaged' | 'Market Traffic';

export interface JunctionData {
  baseCount: number;
  maxCount: number;
  baseTimer: number;
  maxTimer: number;
  baseAqi: number;
  road: RoadCondition;
  nodes: number;
}

export type CityJunctions = Record<string, JunctionData>;
export type StateData = Record<string, CityJunctions>;

export const citiesData: StateData = {
  "Kolkata": {
    "Park Circus 7-Point": { baseCount: 160, maxCount: 220, baseTimer: 75, maxTimer: 120, baseAqi: 150, road: "Congested", nodes: 8 },
    "Shyam Bazar Five Point": { baseCount: 140, maxCount: 200, baseTimer: 60, maxTimer: 110, baseAqi: 140, road: "Busy", nodes: 5 },
    "Ultadanga Crossing": { baseCount: 180, maxCount: 250, baseTimer: 80, maxTimer: 130, baseAqi: 160, road: "Busy", nodes: 6 },
    "Gariahat Crossing": { baseCount: 150, maxCount: 210, baseTimer: 70, maxTimer: 115, baseAqi: 135, road: "Market Traffic", nodes: 4 },
    "Esplanade Junction": { baseCount: 200, maxCount: 280, baseTimer: 90, maxTimer: 150, baseAqi: 180, road: "Congested", nodes: 10 },
    "Behala Chowrasta": { baseCount: 130, maxCount: 190, baseTimer: 55, maxTimer: 100, baseAqi: 125, road: "Busy", nodes: 4 },
  },
  "Howrah": {
    "Station More": { baseCount: 210, maxCount: 300, baseTimer: 85, maxTimer: 140, baseAqi: 170, road: "Congested", nodes: 7 },
    "Kadamtala Crossing": { baseCount: 120, maxCount: 180, baseTimer: 50, maxTimer: 95, baseAqi: 110, road: "Busy", nodes: 4 },
    "Nabanna Intersection": { baseCount: 90, maxCount: 150, baseTimer: 45, maxTimer: 85, baseAqi: 90, road: "Clear", nodes: 5 },
    "Avani Mall Junction": { baseCount: 140, maxCount: 200, baseTimer: 60, maxTimer: 110, baseAqi: 130, road: "Busy", nodes: 4 },
  },
  "Siliguri": {
    "Venus More": { baseCount: 130, maxCount: 190, baseTimer: 55, maxTimer: 100, baseAqi: 115, road: "Market Traffic", nodes: 5 },
    "Hashmi Chowk": { baseCount: 110, maxCount: 170, baseTimer: 45, maxTimer: 90, baseAqi: 105, road: "Busy", nodes: 4 },
    "Darjeeling More": { baseCount: 170, maxCount: 240, baseTimer: 75, maxTimer: 125, baseAqi: 145, road: "Congested", nodes: 6 },
    "Sevoke Road Intersection": { baseCount: 150, maxCount: 210, baseTimer: 65, maxTimer: 115, baseAqi: 120, road: "Busy", nodes: 4 },
  },
  "Asansol": {
    "City Bus Stand Junction": { baseCount: 140, maxCount: 210, baseTimer: 65, maxTimer: 115, baseAqi: 155, road: "Busy", nodes: 4 },
    "Chelidanga More": { baseCount: 100, maxCount: 160, baseTimer: 50, maxTimer: 95, baseAqi: 130, road: "Clear", nodes: 4 },
    "Court Crossing": { baseCount: 90, maxCount: 140, baseTimer: 45, maxTimer: 85, baseAqi: 120, road: "Busy", nodes: 3 },
    "Hutton Road Junction": { baseCount: 120, maxCount: 180, baseTimer: 55, maxTimer: 105, baseAqi: 145, road: "Busy", nodes: 4 },
  },
  "Durgapur": {
    "City Centre More": { baseCount: 150, maxCount: 220, baseTimer: 70, maxTimer: 120, baseAqi: 160, road: "Busy", nodes: 6 },
    "Station More": { baseCount: 160, maxCount: 230, baseTimer: 75, maxTimer: 125, baseAqi: 170, road: "Congested", nodes: 5 },
    "Muchipara Crossing": { baseCount: 120, maxCount: 190, baseTimer: 60, maxTimer: 110, baseAqi: 140, road: "Busy", nodes: 4 },
    "Steel Plant Gate": { baseCount: 110, maxCount: 170, baseTimer: 50, maxTimer: 95, baseAqi: 180, road: "Damaged", nodes: 4 },
  },
  "Kharagpur": {
    "Gole Bazar Crossing": { baseCount: 130, maxCount: 200, baseTimer: 60, maxTimer: 110, baseAqi: 110, road: "Market Traffic", nodes: 5 },
    "IIT Gate Junction": { baseCount: 80, maxCount: 140, baseTimer: 40, maxTimer: 80, baseAqi: 85, road: "Clear", nodes: 4 },
    "Inda More": { baseCount: 110, maxCount: 170, baseTimer: 50, maxTimer: 95, baseAqi: 100, road: "Busy", nodes: 4 },
    "Railway Station More": { baseCount: 150, maxCount: 220, baseTimer: 70, maxTimer: 120, baseAqi: 120, road: "Busy", nodes: 4 },
  },
  "Haldia": {
    "Durgachak More": { baseCount: 120, maxCount: 180, baseTimer: 60, maxTimer: 110, baseAqi: 190, road: "Busy", nodes: 4 },
    "Akash Ganga Crossing": { baseCount: 100, maxCount: 160, baseTimer: 50, maxTimer: 95, baseAqi: 175, road: "Clear", nodes: 4 },
    "Port Junction": { baseCount: 140, maxCount: 210, baseTimer: 70, maxTimer: 130, baseAqi: 210, road: "Congested", nodes: 4 },
    "City Centre Crossing": { baseCount: 110, maxCount: 170, baseTimer: 55, maxTimer: 105, baseAqi: 165, road: "Busy", nodes: 4 },
  },
  "Bardhaman": {
    "Curzon Gate Crossing": { baseCount: 140, maxCount: 210, baseTimer: 65, maxTimer: 115, baseAqi: 130, road: "Busy", nodes: 5 },
    "Station More": { baseCount: 160, maxCount: 230, baseTimer: 75, maxTimer: 125, baseAqi: 145, road: "Congested", nodes: 4 },
    "Golapbag More": { baseCount: 110, maxCount: 170, baseTimer: 50, maxTimer: 95, baseAqi: 115, road: "Clear", nodes: 4 },
    "Town Hall Junction": { baseCount: 120, maxCount: 180, baseTimer: 55, maxTimer: 105, baseAqi: 125, road: "Busy", nodes: 4 },
  },
  "Malda": {
    "Rathbari More": { baseCount: 150, maxCount: 220, baseTimer: 70, maxTimer: 120, baseAqi: 120, road: "Congested", nodes: 5 },
    "English Bazar Junction": { baseCount: 130, maxCount: 200, baseTimer: 65, maxTimer: 115, baseAqi: 110, road: "Market Traffic", nodes: 4 },
    "Foyara More": { baseCount: 110, maxCount: 170, baseTimer: 55, maxTimer: 105, baseAqi: 105, road: "Busy", nodes: 4 },
    "Bus Stand Crossing": { baseCount: 140, maxCount: 210, baseTimer: 65, maxTimer: 120, baseAqi: 130, road: "Busy", nodes: 4 },
  },
  "Berhampore": {
    "Mohona More": { baseCount: 120, maxCount: 190, baseTimer: 60, maxTimer: 110, baseAqi: 115, road: "Busy", nodes: 4 },
    "Cantonment Crossing": { baseCount: 100, maxCount: 160, baseTimer: 50, maxTimer: 95, baseAqi: 100, road: "Clear", nodes: 4 },
    "Girja Crossing": { baseCount: 130, maxCount: 200, baseTimer: 65, maxTimer: 115, baseAqi: 125, road: "Market Traffic", nodes: 4 },
    "NH Intersection": { baseCount: 140, maxCount: 210, baseTimer: 70, maxTimer: 125, baseAqi: 135, road: "Busy", nodes: 4 },
  },
  "Darjeeling": {
    "Chowrasta More": { baseCount: 80, maxCount: 140, baseTimer: 45, maxTimer: 90, baseAqi: 45, road: "Market Traffic", nodes: 3 },
    "Ghum Station More": { baseCount: 90, maxCount: 150, baseTimer: 50, maxTimer: 95, baseAqi: 55, road: "Busy", nodes: 4 },
    "Motor Stand Junction": { baseCount: 110, maxCount: 170, baseTimer: 55, maxTimer: 105, baseAqi: 65, road: "Busy", nodes: 4 },
    "Hill Cart Road More": { baseCount: 100, maxCount: 160, baseTimer: 50, maxTimer: 100, baseAqi: 60, road: "Busy", nodes: 4 },
  }
};
