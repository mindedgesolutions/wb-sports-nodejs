export interface SportsPersonnelDTO {
  sport: string;
  name: string;
  address: string | null;
  dob: Date | null;
  contactOne: string | null;
  contactTwo: string | null;
}

// --------------------------------

export interface SportsEventsDTO {
  title: string;
  startDate: Date | null;
}
