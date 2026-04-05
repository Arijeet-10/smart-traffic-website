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
  mapUrl: string;
}

export type CityJunctions = Record<string, JunctionData>;
export type StateData = Record<string, CityJunctions>;

/**
 * These paths point to the 'public/videos' folder and 'public/maps' folder.
 * Ensure you have the corresponding .mp4 and .png files stored in their respective directories.
 */
export const citiesData: StateData = {
  "Kolkata": {
    "Park Circus 7-Point": { baseCount: 160, maxCount: 220, baseTimer: 75, maxTimer: 120, baseAqi: 150, road: "Congested", nodes: 8, videoUrl: "/videos/video.mp4", mapUrl: "/maps/video1.mp4" },
    "Shyam Bazar Five Point": { baseCount: 140, maxCount: 200, baseTimer: 60, maxTimer: 110, baseAqi: 140, road: "Busy", nodes: 5, videoUrl: "/videos/kolkata_shyam_bazar.mp4", mapUrl: "/maps/kolkata_shyam_bazar.png" },
    "Ultadanga Crossing": { baseCount: 180, maxCount: 250, baseTimer: 80, maxTimer: 130, baseAqi: 160, road: "Busy", nodes: 6, videoUrl: "/videos/kolkata_ultadanga.mp4", mapUrl: "/maps/kolkata_ultadanga.png" },
    "Gariahat Crossing": { baseCount: 150, maxCount: 210, baseTimer: 70, maxTimer: 115, baseAqi: 135, road: "Market Traffic", nodes: 4, videoUrl: "/videos/kolkata_gariahat.mp4", mapUrl: "/maps/kolkata_gariahat.png" },
    "Esplanade Junction": { baseCount: 200, maxCount: 280, baseTimer: 90, maxTimer: 150, baseAqi: 180, road: "Congested", nodes: 10, videoUrl: "/videos/kolkata_esplanade.mp4", mapUrl: "/maps/kolkata_esplanade.png" },
    "Behala Chowrasta": { baseCount: 130, maxCount: 190, baseTimer: 55, maxTimer: 100, baseAqi: 125, road: "Busy", nodes: 4, videoUrl: "/videos/kolkata_behala.mp4", mapUrl: "/maps/kolkata_behala.png" },
  },
  "Howrah": {
    "Station More": { baseCount: 210, maxCount: 300, baseTimer: 85, maxTimer: 140, baseAqi: 170, road: "Congested", nodes: 7, videoUrl: "/videos/howrah_station.mp4", mapUrl: "/maps/howrah_station.png" },
    "Kadamtala Crossing": { baseCount: 120, maxCount: 180, baseTimer: 50, maxTimer: 95, baseAqi: 110, road: "Busy", nodes: 4, videoUrl: "/videos/howrah_kadamtala.mp4", mapUrl: "/maps/howrah_kadamtala.png" },
    "Nabanna Intersection": { baseCount: 90, maxCount: 150, baseTimer: 45, maxTimer: 85, baseAqi: 90, road: "Clear", nodes: 5, videoUrl: "/videos/howrah_nabanna.mp4", mapUrl: "/maps/howrah_nabanna.png" },
    "Avani Mall Junction": { baseCount: 140, maxCount: 200, baseTimer: 60, maxTimer: 110, baseAqi: 130, road: "Busy", nodes: 4, videoUrl: "/videos/howrah_avani.mp4", mapUrl: "/maps/howrah_avani.png" },
  },
  "Siliguri": {
    "Venus More": { baseCount: 130, maxCount: 190, baseTimer: 55, maxTimer: 100, baseAqi: 115, road: "Market Traffic", nodes: 5, videoUrl: "/videos/siliguri_venus.mp4", mapUrl: "/maps/siliguri_venus.png" },
    "Hashmi Chowk": { baseCount: 110, maxCount: 170, baseTimer: 45, maxTimer: 90, baseAqi: 105, road: "Busy", nodes: 4, videoUrl: "/videos/siliguri_hashmi.mp4", mapUrl: "/maps/siliguri_hashmi.png" },
    "Darjeeling More": { baseCount: 170, maxCount: 240, baseTimer: 75, maxTimer: 125, baseAqi: 145, road: "Congested", nodes: 6, videoUrl: "/videos/siliguri_darjeeling_more.mp4", mapUrl: "/maps/siliguri_darjeeling_more.png" },
    "Sevoke Road Intersection": { baseCount: 150, maxCount: 210, baseTimer: 65, maxTimer: 115, baseAqi: 120, road: "Busy", nodes: 4, videoUrl: "/videos/siliguri_sevoke.mp4", mapUrl: "/maps/siliguri_sevoke.png" },
  },
  "Asansol": {
    "City Bus Stand Junction": { baseCount: 140, maxCount: 210, baseTimer: 65, maxTimer: 115, baseAqi: 155, road: "Busy", nodes: 4, videoUrl: "/videos/asansol_bus_stand.mp4", mapUrl: "/maps/asansol_bus_stand.png" },
    "Chelidanga More": { baseCount: 100, maxCount: 160, baseTimer: 50, maxTimer: 95, baseAqi: 130, road: "Clear", nodes: 4, videoUrl: "/videos/asansol_chelidanga.mp4", mapUrl: "/maps/asansol_chelidanga.png" },
    "Court Crossing": { baseCount: 90, maxCount: 140, baseTimer: 45, maxTimer: 85, baseAqi: 120, road: "Busy", nodes: 3, videoUrl: "/videos/asansol_court.mp4", mapUrl: "/maps/asansol_court.png" },
    "Hutton Road Junction": { baseCount: 120, maxCount: 180, baseTimer: 55, maxTimer: 105, baseAqi: 145, road: "Busy", nodes: 4, videoUrl: "/videos/asansol_hutton.mp4", mapUrl: "/maps/asansol_hutton.png" },
  },
  "Durgapur": {
    "City Centre More": { baseCount: 150, maxCount: 220, baseTimer: 70, maxTimer: 120, baseAqi: 160, road: "Busy", nodes: 6, videoUrl: "/videos/durgapur_city_centre.mp4", mapUrl: "/maps/durgapur_city_centre.png" },
    "Station More": { baseCount: 160, maxCount: 230, baseTimer: 75, maxTimer: 125, baseAqi: 170, road: "Congested", nodes: 5, videoUrl: "/videos/durgapur_station.mp4", mapUrl: "/maps/durgapur_station.png" },
    "Muchipara Crossing": { baseCount: 120, maxCount: 190, baseTimer: 60, maxTimer: 110, baseAqi: 140, road: "Busy", nodes: 4, videoUrl: "/videos/durgapur_muchipara.mp4", mapUrl: "/maps/durgapur_muchipara.png" },
    "Steel Plant Gate": { baseCount: 110, maxCount: 170, baseTimer: 50, maxTimer: 95, baseAqi: 180, road: "Damaged", nodes: 4, videoUrl: "/videos/durgapur_steel_plant.mp4", mapUrl: "/maps/durgapur_steel_plant.png" },
  },
  "Kharagpur": {
    "Gole Bazar Crossing": { baseCount: 130, maxCount: 200, baseTimer: 60, maxTimer: 110, baseAqi: 110, road: "Market Traffic", nodes: 5, videoUrl: "/videos/kharagpur_gole_bazar.mp4", mapUrl: "/maps/kharagpur_gole_bazar.png" },
    "IIT Gate Junction": { baseCount: 80, maxCount: 140, baseTimer: 40, maxTimer: 80, baseAqi: 85, road: "Clear", nodes: 4, videoUrl: "/videos/kharagpur_iit_gate.mp4", mapUrl: "/maps/kharagpur_iit_gate.png" },
    "Inda More": { baseCount: 110, maxCount: 170, baseTimer: 50, maxTimer: 95, baseAqi: 100, road: "Busy", nodes: 4, videoUrl: "/videos/kharagpur_inda.mp4", mapUrl: "/maps/kharagpur_inda.png" },
    "Railway Station More": { baseCount: 150, maxCount: 220, baseTimer: 70, maxTimer: 120, baseAqi: 120, road: "Busy", nodes: 4, videoUrl: "/videos/kharagpur_station.mp4", mapUrl: "/maps/kharagpur_station.png" },
  },
  "Haldia": {
    "Durgachak More": { baseCount: 120, maxCount: 180, baseTimer: 60, maxTimer: 110, baseAqi: 190, road: "Busy", nodes: 4, videoUrl: "/videos/haldia_durgachak.mp4", mapUrl: "/maps/haldia_durgachak.png" },
    "Akash Ganga Crossing": { baseCount: 100, maxCount: 160, baseTimer: 50, maxTimer: 95, baseAqi: 175, road: "Clear", nodes: 4, videoUrl: "/videos/haldia_akash_ganga.mp4", mapUrl: "/maps/haldia_akash_ganga.png" },
    "Port Junction": { baseCount: 140, maxCount: 210, baseTimer: 70, maxTimer: 130, baseAqi: 210, road: "Congested", nodes: 4, videoUrl: "/videos/haldia_port.mp4", mapUrl: "/maps/haldia_port.png" },
    "City Centre Crossing": { baseCount: 110, maxCount: 170, baseTimer: 55, maxTimer: 105, baseAqi: 165, road: "Busy", nodes: 4, videoUrl: "/videos/haldia_city_centre.mp4", mapUrl: "/maps/haldia_city_centre.png" },
  },
  "Bardhaman": {
    "Curzon Gate Crossing": { baseCount: 140, maxCount: 210, baseTimer: 65, maxTimer: 115, baseAqi: 130, road: "Busy", nodes: 5, videoUrl: "/videos/bardhaman_curzon_gate.mp4", mapUrl: "/maps/bardhaman_curzon_gate.png" },
    "Station More": { baseCount: 160, maxCount: 230, baseTimer: 75, maxTimer: 125, baseAqi: 145, road: "Congested", nodes: 4, videoUrl: "/videos/bardhaman_station.mp4", mapUrl: "/maps/bardhaman_station.png" },
    "Golapbag More": { baseCount: 110, maxCount: 170, baseTimer: 50, maxTimer: 95, baseAqi: 115, road: "Clear", nodes: 4, videoUrl: "/videos/bardhaman_golapbag.mp4", mapUrl: "/maps/bardhaman_golapbag.png" },
    "Town Hall Junction": { baseCount: 120, maxCount: 180, baseTimer: 55, maxTimer: 105, baseAqi: 125, road: "Busy", nodes: 4, videoUrl: "/videos/bardhaman_town_hall.mp4", mapUrl: "/maps/bardhaman_town_hall.png" },
  },
  "Malda": {
    "Rathbari More": { baseCount: 150, maxCount: 220, baseTimer: 70, maxTimer: 120, baseAqi: 120, road: "Congested", nodes: 5, videoUrl: "/videos/malda_rathbari.mp4", mapUrl: "/maps/malda_rathbari.png" },
    "English Bazar Junction": { baseCount: 130, maxCount: 200, baseTimer: 65, maxTimer: 115, baseAqi: 110, road: "Market Traffic", nodes: 4, videoUrl: "/videos/malda_english_bazar.mp4", mapUrl: "/maps/malda_english_bazar.png" },
    "Foyara More": { baseCount: 110, maxCount: 170, baseTimer: 55, maxTimer: 105, baseAqi: 105, road: "Busy", nodes: 4, videoUrl: "/videos/malda_foyara.mp4", mapUrl: "/maps/malda_foyara.png" },
    "Bus Stand Crossing": { baseCount: 140, maxCount: 210, baseTimer: 65, maxTimer: 120, baseAqi: 130, road: "Busy", nodes: 4, videoUrl: "/videos/malda_bus_stand.mp4", mapUrl: "/maps/malda_bus_stand.png" },
  },
  "Berhampore": {
    "Mohona More": { baseCount: 120, maxCount: 190, baseTimer: 60, maxTimer: 110, baseAqi: 115, road: "Busy", nodes: 4, videoUrl: "/videos/berhampore_mohona.mp4", mapUrl: "/maps/berhampore_mohona.png" },
    "Cantonment Crossing": { baseCount: 100, maxCount: 160, baseTimer: 50, maxTimer: 95, baseAqi: 100, road: "Clear", nodes: 4, videoUrl: "/videos/berhampore_cantonment.mp4", mapUrl: "/maps/berhampore_cantonment.png" },
    "Girja Crossing": { baseCount: 130, maxCount: 200, baseTimer: 65, maxTimer: 115, baseAqi: 125, road: "Market Traffic", nodes: 4, videoUrl: "/videos/berhampore_girja.mp4", mapUrl: "/maps/berhampore_girja.png" },
    "NH Intersection": { baseCount: 140, maxCount: 210, baseTimer: 70, maxTimer: 125, baseAqi: 135, road: "Busy", nodes: 4, videoUrl: "/videos/berhampore_nh.mp4", mapUrl: "/maps/berhampore_nh.png" },
  },
  "Darjeeling": {
    "Chowrasta More": { baseCount: 80, maxCount: 140, baseTimer: 45, maxTimer: 90, baseAqi: 45, road: "Market Traffic", nodes: 3, videoUrl: "/videos/darjeeling_chowrasta.mp4", mapUrl: "/maps/darjeeling_chowrasta.png" },
    "Ghum Station More": { baseCount: 90, maxCount: 150, baseTimer: 50, maxTimer: 95, baseAqi: 55, road: "Busy", nodes: 4, videoUrl: "/videos/darjeeling_ghum.mp4", mapUrl: "/maps/darjeeling_ghum.png" },
    "Motor Stand Junction": { baseCount: 110, maxCount: 170, baseTimer: 55, maxTimer: 105, baseAqi: 65, road: "Busy", nodes: 4, videoUrl: "/videos/darjeeling_motor_stand.mp4", mapUrl: "/maps/darjeeling_motor_stand.png" },
    "Hill Cart Road More": { baseCount: 100, maxCount: 160, baseTimer: 50, maxTimer: 100, baseAqi: 60, road: "Busy", nodes: 4, videoUrl: "/videos/darjeeling_hill_cart.mp4", mapUrl: "/maps/darjeeling_hill_cart.png" },
  }
};