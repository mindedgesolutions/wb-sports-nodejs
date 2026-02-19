export interface AchievementsDTO {
  title: string;
  description?: string;
  achievementDate?: Date;
}

// ----------------------

export interface AdminStructureDTO {
  name: string;
}

// ----------------------

export interface AdminStructureShowOrderDTO {
  id: number;
  show: number;
}

// ----------------------

export interface KeyPersonnelDTO {
  name: string;
  rank: string | null;
  designation: string;
  img: string | null;
}
