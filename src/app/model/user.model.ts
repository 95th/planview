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
  username: string;
  password: string;
}
