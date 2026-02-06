
export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  role: Role;
  text: string;
}

export interface TrailStop {
  id: string;
  name: string;
  region: string;
  highlights: string[];
  description: string;
}
