export type UserRole = 'admin' | 'regular';

export interface User {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  address: {
    line_1?: string;
    line_2?: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  id: string;
  password: string;
  role: UserRole;
  locked: boolean;
  failed_tries: number;
}
