import { AnnouncementTypes } from '@/generated/prisma/enums';

export interface AnnouncementDTO {
  annType: AnnouncementTypes;
  annNo: string;
  subject: string;
  isNew: string;
  startDate: Date | null;
  endDate: Date | null;
  filePath: string | null;
  fileName: string | null;
}

// -----------------------------

export interface AdvertisementDTO {
  title: string;
  description: string | null;
  adDate: Date | null;
}
