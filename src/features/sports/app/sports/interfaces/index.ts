export interface SportsPersonnelDTO {
  sport: string;
  name: string;
  address: string | null;
  dob: string | null;
  contactOne: string | null;
  contactTwo: string | null;
}

// --------------------------------

export interface SportsEventsDTO {
  title: string;
  startDate: string | null;
}
