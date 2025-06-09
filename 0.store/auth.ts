// atoms/authAtom.ts
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const authAtom = atomWithStorage<{
  id?: string;
  email?: string;
  name?: string;
  image?: string;
  role?: string;
  isAuthenticated: boolean;
}>('auth', {
  isAuthenticated: false,
});

// export const authResetAtom = atom(null, (_get, set) => {
//   set(authAtom, {
//     isAuthenticated: false,
//   });
// });
