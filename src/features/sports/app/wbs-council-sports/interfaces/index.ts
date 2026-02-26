export interface WbsCouncilDesignationsDTO {
  boardType: string;
  name: string;
}

// ----------------------

export interface WbsCouncilDesignationsShowOrderDTO {
  id: number;
  show: number;
}

// ----------------------

export interface WbsCouncilMemberDTO {
  boardType: string;
  designationId: string;
  name: string;
  designationLabel: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  fax: string | null;
}
