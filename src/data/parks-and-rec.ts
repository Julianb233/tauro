import type { ParksAndRec } from "./neighborhoods";

/**
 * Parks & Recreation data for Philadelphia neighborhoods.
 * Keyed by neighborhood slug.
 */
export const parksAndRecData: Record<string, ParksAndRec> = {
  "center-city": {
    overview: "Center City offers iconic urban green spaces, from the tree-lined paths of Rittenhouse Square to the transformed rail park above ground level. The Schuylkill Banks trail system provides miles of waterfront running and cycling.",
    parks: [
      { name: "Rittenhouse Square", type: "Park", highlights: ["Historic fountain", "Outdoor art shows", "Dog-friendly paths", "Seasonal farmers market"], acreage: 6.5 },
      { name: "LOVE Park / JFK Plaza", type: "Park", highlights: ["Iconic LOVE sculpture", "City Hall views", "Fountain plaza"], acreage: 1.3 },
      { name: "Dilworth Park", type: "Park", highlights: ["Interactive fountain", "Winter ice rink", "Event programming"], acreage: 2 },
      { name: "Schuylkill Banks", type: "Trail", highlights: ["3-mile riverfront trail", "Kayak launches", "Boardwalk section"] },
      { name: "The Rail Park", type: "Park", highlights: ["Elevated green space", "Native plantings", "Art installations"], acreage: 0.25 },
    ],
    recreationPrograms: ["Free yoga in Rittenhouse Square", "Schuylkill Banks running clubs", "Dilworth Park fitness series"],
  },
  rittenhouse: {
    overview: "Rittenhouse is defined by its namesake square — one of Philadelphia's five original public parks planned by William Penn. The tree-canopied park is the neighborhood's living room.",
    parks: [
      { name: "Rittenhouse Square", type: "Park", highlights: ["Historic fountain", "Outdoor dining surrounds", "Year-round events"], acreage: 6.5 },
      { name: "Fitler Square", type: "Park", highlights: ["Quiet residential park", "Dog-friendly", "Community garden"], acreage: 1.5 },
      { name: "Schuylkill River Trail", type: "Trail", highlights: ["Waterfront jogging", "Bicycle path", "River views"] },
    ],
    recreationPrograms: ["Rittenhouse Square Flower Show (May)", "Jazz in the Square", "Outdoor fitness classes"],
  },
  fishtown: {
    overview: "Fishtown's parks reflect its creative, community-driven identity — from waterfront piers to pocket parks with public art installations.",
    parks: [
      { name: "Penn Treaty Park", type: "Park", highlights: ["Delaware River views", "Historic treaty site", "Community events", "Dog-friendly"], acreage: 5.3 },
      { name: "Palmer Park", type: "Playground", highlights: ["Renovated playground", "Basketball courts", "Community garden"] },
      { name: "Cramp Playground", type: "Playground", highlights: ["Spray ground", "Youth sports fields"] },
      { name: "Delaware River Trail", type: "Trail", highlights: ["Waterfront walking", "Public art", "Fishing piers"] },
    ],
    recreationPrograms: ["Penn Treaty Park summer concerts", "Community softball league", "Youth soccer programs"],
  },
  "northern-liberties": {
    overview: "Northern Liberties blends urban green spaces with the Spring Garden Greenway and access to the Delaware River waterfront trail.",
    parks: [
      { name: "Liberty Lands", type: "Park", highlights: ["Community-managed park", "Gardens and meadows", "Events space", "Dog run"], acreage: 1.5 },
      { name: "Orianna Hill Park", type: "Park", highlights: ["Hilltop views", "Native wildflower meadow", "Walking paths"] },
      { name: "Spring Garden Greenway", type: "Trail", highlights: ["Linear park", "Bike path", "Pollinator garden"] },
    ],
    recreationPrograms: ["Liberty Lands summer movie nights", "Community garden plots", "Neighborhood clean-up days"],
  },
  "old-city": {
    overview: "Old City's parks connect Philadelphia's founding history with modern waterfront recreation along the Delaware River.",
    parks: [
      { name: "Independence National Historical Park", type: "Park", highlights: ["Liberty Bell", "Independence Hall", "Constitutional Walking Tour"], acreage: 55 },
      { name: "Spruce Street Harbor Park", type: "Park", highlights: ["Hammocks on the river", "Floating gardens", "Food vendors", "Night lights"] },
      { name: "Race Street Pier", type: "Park", highlights: ["Elevated river overlook", "Public seating", "Sunset views"] },
      { name: "Arch Street Friends Burial Ground", type: "Garden", highlights: ["Historic green space", "Quiet reflection"] },
    ],
    recreationPrograms: ["Historic walking tours (free)", "Waterfront yoga", "2nd Friday gallery strolls"],
  },
  "south-philly": {
    overview: "South Philadelphia is home to the city's sprawling sports complex and FDR Park, one of the largest parks in the city with golf, lakes, and extensive trail systems.",
    parks: [
      { name: "FDR Park", type: "Park", highlights: ["Meadow Lake", "Tennis courts", "Golf course", "Skateboard park", "Wetlands trails"], acreage: 348 },
      { name: "Marconi Plaza", type: "Park", highlights: ["Italian Renaissance garden", "Playground", "Community events"], acreage: 10 },
      { name: "Mifflin Square Park", type: "Park", highlights: ["Community gathering space", "Playground", "Basketball"] },
      { name: "Columbus Square", type: "Playground", highlights: ["Renovated playground", "Splash pad", "Sports courts"], acreage: 3.5 },
    ],
    recreationPrograms: ["FDR Park running groups", "South Philly Little League", "Bocce leagues at Marconi Plaza", "Community soccer at FDR"],
  },
  "university-city": {
    overview: "University City benefits from Penn and Drexel's campus green spaces plus Clark Park, the neighborhood's beloved commons for markets and festivals.",
    parks: [
      { name: "Clark Park", type: "Park", highlights: ["Saturday farmers market", "Dickens statue", "Free concerts", "Community gathering"], acreage: 9 },
      { name: "Penn Park", type: "Sports Complex", highlights: ["Olympic-caliber track", "Tennis courts", "Multi-use fields", "Public access"], acreage: 24 },
      { name: "Cira Green", type: "Garden", highlights: ["Elevated park on parking garage", "City skyline views", "Event space"], acreage: 1.25 },
      { name: "The Woodlands", type: "Park", highlights: ["Historic cemetery and arboretum", "Walking trails", "Bird watching"], acreage: 54 },
    ],
    recreationPrograms: ["Clark Park farmers market (year-round)", "Penn Recreation summer camps", "Free fitness classes at Penn Park"],
  },
  manayunk: {
    overview: "Manayunk's dramatic setting along the Schuylkill River and its canal towpath make it a haven for runners, cyclists, and outdoor enthusiasts.",
    parks: [
      { name: "Schuylkill River Trail (Manayunk)", type: "Trail", highlights: ["Towpath cycling", "River views", "Connects to Valley Forge"] },
      { name: "Pretzel Park", type: "Park", highlights: ["Saturday farmers market", "Community events", "Dog-friendly"], acreage: 0.5 },
      { name: "Gorgas Park", type: "Park", highlights: ["Hilltop views", "Playground", "Picnic areas", "Tennis courts"], acreage: 6 },
      { name: "Venice Island Recreation Center", type: "Recreation Center", highlights: ["Pool", "Sports fields", "Community programs"] },
    ],
    recreationPrograms: ["Manayunk Bike Race (annual)", "Canal towpath running clubs", "Venice Island summer swim programs"],
  },
  "chestnut-hill": {
    overview: "Chestnut Hill is Philadelphia's garden district, with extensive Wissahickon Valley trails, historic gardens, and one of the largest urban forests in the country.",
    parks: [
      { name: "Wissahickon Valley Park", type: "Park", highlights: ["50+ miles of trails", "Forbidden Drive", "Historic bridges", "Creek swimming holes"], acreage: 1800 },
      { name: "Pastorius Park", type: "Park", highlights: ["Summer concerts", "Ice skating pond", "Playground"], acreage: 8 },
      { name: "Morris Arboretum", type: "Garden", highlights: ["92-acre public garden", "Tree canopy walkway", "Seasonal exhibits"], acreage: 92 },
      { name: "Cresheim Valley Trail", type: "Trail", highlights: ["Connects to Wissahickon", "Bird watching", "Forest bathing"] },
    ],
    recreationPrograms: ["Wissahickon trail running groups", "Morris Arboretum guided walks", "Pastorius Park summer concert series"],
  },
  "mt-airy": {
    overview: "Mt. Airy residents enjoy direct access to Wissahickon Valley Park and a strong tradition of community recreation with one of the city's most active rec centers.",
    parks: [
      { name: "Wissahickon Valley Park (Mt. Airy access)", type: "Park", highlights: ["Valley Green Inn trailhead", "Creek-side hiking", "Mountain biking"] },
      { name: "Cliveden Park", type: "Park", highlights: ["Historic Cliveden mansion", "Open meadows", "Community events"], acreage: 6 },
      { name: "Lovett Park", type: "Park", highlights: ["Tennis courts", "Playground", "Basketball"], acreage: 4 },
      { name: "Mt. Airy Playground", type: "Recreation Center", highlights: ["Pool", "Indoor gym", "After-school programs"] },
    ],
    recreationPrograms: ["Mt. Airy Day (annual festival)", "Wissahickon nature walks", "Community garden plots"],
  },
  germantown: {
    overview: "Germantown's parks showcase centuries of Philadelphia history alongside modern recreation, from colonial-era estates to vibrant community playgrounds.",
    parks: [
      { name: "Vernon Park", type: "Park", highlights: ["Historic monument", "Walking paths", "Community gathering space"], acreage: 3 },
      { name: "Awbury Arboretum", type: "Garden", highlights: ["55-acre estate", "Walking trails", "Community farm", "Bird sanctuary"], acreage: 55 },
      { name: "Wister Playground", type: "Recreation Center", highlights: ["Pool", "Sports courts", "Youth programs"] },
      { name: "Cliveden of the National Trust", type: "Park", highlights: ["Historic mansion grounds", "Colonial history", "Open to public"] },
    ],
    recreationPrograms: ["Awbury farm programs", "Germantown Outdoor Cinema", "Community basketball leagues"],
  },
  "west-philly": {
    overview: "West Philadelphia offers some of the city's largest green spaces, from Cobbs Creek Park to the Bartram's Garden waterfront.",
    parks: [
      { name: "Cobbs Creek Park", type: "Park", highlights: ["Golf course", "Environmental center", "Creek trails", "Playground"], acreage: 789 },
      { name: "Bartram's Garden", type: "Garden", highlights: ["America's oldest botanical garden", "River access", "Community farm", "Free events"], acreage: 50 },
      { name: "Malcolm X Park", type: "Park", highlights: ["Community hub", "Playground", "Basketball courts"], acreage: 6 },
      { name: "Cedar Park", type: "Park", highlights: ["Farmers market", "Community events", "Playground"], acreage: 3.5 },
    ],
    recreationPrograms: ["Cobbs Creek golf clinics", "Bartram's Garden kayaking", "Cedar Park farmers market"],
  },
  kensington: {
    overview: "Kensington is experiencing a parks renaissance with new green infrastructure projects transforming vacant lots into community green spaces.",
    parks: [
      { name: "Norris Square Park", type: "Park", highlights: ["Cultural gardens", "Community center", "Youth programs"], acreage: 3 },
      { name: "McPherson Square", type: "Park", highlights: ["Library branch", "Playground", "Community space"], acreage: 2.5 },
      { name: "Frankford Creek Greenway", type: "Trail", highlights: ["New green corridor", "Stormwater management", "Walking path"] },
    ],
    recreationPrograms: ["Norris Square community garden", "Youth sports leagues", "Free summer lunch programs"],
  },
  brewerytown: {
    overview: "Brewerytown sits on the doorstep of Fairmount Park — the largest urban park system in America — giving residents unrivaled access to nature, trails, and recreation.",
    parks: [
      { name: "Fairmount Park (East)", type: "Park", highlights: ["2,000+ acre urban park", "Please Touch Museum", "Historic mansions", "Horticulture Center"], acreage: 2050 },
      { name: "Brewerytown Trail", type: "Trail", highlights: ["Connects to MLK Drive", "River views", "Cycling loop"] },
      { name: "Smith Memorial Playground", type: "Playground", highlights: ["Giant wooden slide", "Free play space", "Family events"], acreage: 6.5 },
    ],
    recreationPrograms: ["Fairmount Park running groups", "Free kayaking at Boathouse Row", "Smith Playground summer camps"],
  },
  "point-breeze": {
    overview: "Point Breeze is growing its green infrastructure with new community gardens and improved access to the Schuylkill River Trail.",
    parks: [
      { name: "Wharton Square", type: "Park", highlights: ["Community gathering space", "Playground", "Basketball"], acreage: 2.5 },
      { name: "Point Breeze Avenue Greenway", type: "Trail", highlights: ["New walking path", "Street tree plantings", "Community art"] },
      { name: "Girard Park", type: "Playground", highlights: ["Renovated playground", "Spray ground", "Sports courts"] },
    ],
    recreationPrograms: ["Point Breeze community garden", "Youth basketball leagues", "Block party programs"],
  },
};
