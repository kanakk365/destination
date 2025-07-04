import type { Location } from "@/components/map/types"

// Kings Park location
export const KINGS_PARK_LOCATION = {
  longitude: -73.2261,
  latitude: 40.8858,
  address: "Kings Park, NY",
}

// Long Island locations
export const longIslandLocations: Location[] = [
  {
    id: 1,
    name: "Jones Beach State Park",
    category: "beach",
    address: "1 Ocean Parkway, Wantagh, NY 11793",
    description: "One of the most popular beaches on Long Island with 6.5 miles of white sand beach.",
    lng: -73.5962,
    lat: 40.5964,
    highlighted: true,
  },
  {
    id: 2,
    name: "Robert Moses State Park",
    category: "beach",
    address: "600 Robert Moses State Pkwy, Babylon, NY 11702",
    description: "Five miles of beach offering swimming, fishing, picnicking and surfing.",
    lng: -73.2659,
    lat: 40.6282,
    highlighted: true,
  },
  {
    id: 3,
    name: "Smith Point County Park",
    category: "beach",
    address: "1 William Floyd Pkwy, Shirley, NY 11967",
    description: "Suffolk County's largest oceanfront park with a pristine white sand beach.",
    lng: -72.8651,
    lat: 40.7359,
    highlighted: true,
  },
  {
    id: 4,
    name: "Sunken Meadow State Park",
    category: "beach",
    address: "Sunken Meadow State Park, Kings Park, NY 11754",
    description: "Park with a long boardwalk, three miles of beach, and six miles of hiking trails.",
    lng: -73.2654,
    lat: 40.9082,
    highlighted: true,
  },
  // OTHER BEACHES - NOT HIGHLIGHTED
  {
    id: 5,
    name: "Main Beach",
    category: "beach",
    address: "101 Ocean Ave, East Hampton, NY 11937",
    description: "Pristine beach in the Hamptons with lifeguards and concessions.",
    lng: -72.1747,
    lat: 40.9556,
    highlighted: false,
  },
  {
    id: 6,
    name: "Coopers Beach",
    category: "beach",
    address: "268 Meadow Ln, Southampton, NY 11968",
    description: "Consistently ranked as one of America's top beaches with white sand and dunes.",
    lng: -72.3918,
    lat: 40.8841,
    highlighted: false,
  },
  {
    id: 7,
    name: "Long Beach",
    category: "beach",
    address: "Long Beach, NY 11561",
    description: "A 3.3-mile-long city beach with a boardwalk and surfing areas.",
    lng: -73.6573,
    lat: 40.5884,
    highlighted: false,
  },
  // ATTRACTIONS - HIGHLIGHTED
  {
    id: 8,
    name: "Adventureland",
    category: "attraction",
    address: "2245 Broadhollow Rd, Farmingdale, NY 11735",
    description: "Long Island's amusement park featuring rides, games, and entertainment for all ages.",
    lng: -73.4252,
    lat: 40.7513,
    highlighted: true,
  },
  {
    id: 9,
    name: "Splish Splash Water Park",
    category: "attraction",
    address: "2549 Splish Splash Dr, Calverton, NY 11933",
    description: "96-acre water park with slides, pools, and water attractions.",
    lng: -72.7184,
    lat: 40.9184,
    highlighted: true,
  },
  {
    id: 10,
    name: "Heartland Golf Park",
    category: "attraction",
    address: "1200 Long Island Ave, Deer Park, NY 11729",
    description: "Golf facility with driving range, mini-golf, and batting cages.",
    lng: -73.3294,
    lat: 40.7667,
    highlighted: true,
  },
  {
    id: 11,
    name: "The Adventure Park at Long Island",
    category: "attraction",
    address: "75 Colonial Springs Rd, Wheatley Heights, NY 11798",
    description: "Aerial forest adventure park with zip lines and rope courses in the trees.",
    lng: -73.3689,
    lat: 40.7584,
    highlighted: true,
  },
  {
    id: 12,
    name: "Urban Air Adventure Park",
    category: "attraction",
    address: "3147 Middle Country Rd, Lake Grove, NY 11755",
    description: "Indoor adventure park with trampolines, climbing walls, and obstacle courses.",
    lng: -73.1463,
    lat: 40.8554,
    highlighted: true,
  },
  {
    id: 13,
    name: "RPM Raceway",
    category: "attraction",
    address: "40 Daniel St, Farmingdale, NY 11735",
    description: "Indoor go-kart racing facility with high-speed electric karts.",
    lng: -73.4297,
    lat: 40.7307,
    highlighted: true,
  },
  {
    id: 14,
    name: "Topgolf",
    category: "attraction",
    address: "5231 Expressway Dr N, Holtsville, NY 11742",
    description: "Golf entertainment complex with high-tech driving range and food service.",
    lng: -73.0456,
    lat: 40.8152,
    highlighted: true,
  },
  // OTHER ATTRACTIONS - NOT HIGHLIGHTED
  {
    id: 15,
    name: "Long Island Aquarium",
    category: "attraction",
    address: "431 E Main St, Riverhead, NY 11901",
    description: "Aquarium featuring one of the largest all-living coral reef displays in the Western Hemisphere.",
    lng: -72.6574,
    lat: 40.9173,
    highlighted: false,
  },
  {
    id: 16,
    name: "Tanger Outlets Deer Park",
    category: "attraction",
    address: "152 The Arches Cir, Deer Park, NY 11729",
    description: "Large outdoor shopping center with over 100 brand-name outlet stores.",
    lng: -73.3293,
    lat: 40.7618,
    highlighted: false,
  },
  {
    id: 17,
    name: "Cradle of Aviation Museum",
    category: "attraction",
    address: "Charles Lindbergh Blvd, Garden City, NY 11530",
    description: "Air and space museum with exhibits on Long Island's aviation history.",
    lng: -73.5994,
    lat: 40.7299,
    highlighted: false,
  },
  // PARKS AND NATURE
  {
    id: 18,
    name: "Planting Fields Arboretum",
    category: "park",
    address: "1395 Planting Fields Rd, Oyster Bay, NY 11771",
    description: "409-acre state park with formal gardens, greenhouses, and historic mansion.",
    lng: -73.5562,
    lat: 40.8687,
    highlighted: false,
  },
  {
    id: 19,
    name: "Caumsett State Historic Park Preserve",
    category: "park",
    address: "25 Lloyd Harbor Rd, Huntington, NY 11743",
    description: "1,520-acre preserve offering hiking, biking, fishing, and bird watching.",
    lng: -73.4647,
    lat: 40.9272,
    highlighted: false,
  },
  // HISTORICAL SITES
  {
    id: 20,
    name: "Sagamore Hill National Historic Site",
    category: "historical",
    address: "20 Sagamore Hill Rd, Oyster Bay, NY 11771",
    description: "Home of Theodore Roosevelt, 26th President of the United States.",
    lng: -73.5043,
    lat: 40.8858,
    highlighted: false,
  },
  {
    id: 21,
    name: "Old Westbury Gardens",
    category: "historical",
    address: "71 Old Westbury Rd, Old Westbury, NY 11568",
    description: "Historic mansion with 200 acres of formal gardens, landscaped grounds, and woodlands.",
    lng: -73.5976,
    lat: 40.7729,
    highlighted: false,
  },
  {
    id: 22,
    name: "Vanderbilt Museum and Planetarium",
    category: "historical",
    address: "180 Little Neck Rd, Centerport, NY 11721",
    description: "Spanish-Revival mansion, marine and natural history museum, and planetarium.",
    lng: -73.5429,
    lat: 40.8954,
    highlighted: false,
  },
]
