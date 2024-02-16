export class User{
  id!: string;
  email!: string;
  name!: string;
  address!: string;
  imageUrl!: string;
  isAdmin!: boolean;
  token!: string;
}


export interface GoogleAccess {
  googleAccess: boolean;
}

export type NewUser = Pick <User, 'id' | 'name' | 'isAdmin'> & GoogleAccess & {
  updatedAt: Date | string;
}
