class StadiumService {
  public async add(requestBody: any) {}

  // -------------------------------

  public async getPaginated({
    page,
    search,
  }: {
    page: number;
    search?: string;
  }) {}

  // -------------------------------

  public async getById(id: number) {}

  // -------------------------------

  public async update({ id, requestBody }: { id: number; requestBody: any }) {}

  // -------------------------------

  public async delete(id: number) {}

  // -------------------------------

  public async toggleActive(req: Request, res: Response) {}
}

export const stadiumService: StadiumService = new StadiumService();
