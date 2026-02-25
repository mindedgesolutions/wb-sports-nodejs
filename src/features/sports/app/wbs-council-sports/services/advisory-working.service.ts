class AdvisoryWorkingService {
  public async add(requestBody: any) {}

  // ----------------------------

  public async getPaginated({
    page,
    search,
  }: {
    page: number;
    search: string;
  }) {}

  // ----------------------------

  public async update(id: number, requestBody: any) {}

  // ----------------------------

  public async delete(id: number) {}

  // ----------------------------

  public async toggleActive(id: number, active: boolean) {}
}

export const advisoryWorkingService: AdvisoryWorkingService =
  new AdvisoryWorkingService();
