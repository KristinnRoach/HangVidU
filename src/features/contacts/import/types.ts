export type ImportContact = {
  name: string;
  email: string;
  user?: { uid: string; displayName: string };
  isAlreadySaved?: boolean;
};
