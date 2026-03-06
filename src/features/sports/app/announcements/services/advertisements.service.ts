class AdvertisementsService {
  public async add({
    requestBody,
    file,
  }: {
    requestBody: any;
    file: Express.Multer.File;
  }) {}

  // -----------------------------

  public async getPaginated({
    page,
    search,
  }: {
    page: number;
    search?: string;
  }) {}

  // -----------------------------

  public async update({
    id,
    requestBody,
    file,
  }: {
    id: number;
    requestBody: any;
    file: Express.Multer.File | null;
  }) {}

  // -----------------------------

  public async delete(id: number) {}

  // -----------------------------

  public async toggleActive({
    id,
    checked,
  }: {
    id: number;
    checked: boolean;
  }) {}
}

export const advertisementsService: AdvertisementsService =
  new AdvertisementsService();
