export class Credentials {
  public status: string;
  public data: {
    user: [
      {
        cellPhone: number,
        city: string,
        cpf: number,
        createdAt: {
          seconds: number,
          nanoseconds: number
        },
        curriculum: string,
        email: string,
        id: string,
        idealSalary?: number,
        minSalary?: number,
        name?: string,
        position?: string,
        segment?: string,
        state: string,
        storeTypePreference?: any,
        type: string,
        idToken: string
      }
    ],
    token: string
  }
}