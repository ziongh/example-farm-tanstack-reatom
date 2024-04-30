import type { IUserForm } from '@/types/auth';
import { action, atom } from '@reatom/framework';
import { withLocalStorage } from '@reatom/persist-web-storage';
import { urlAtom } from '@reatom/url';

export const isLoggedAtom = atom(true, 'isLoggedAtom').pipe(
	withLocalStorage('isLogged'),
);

export const login = action((ctx, user: IUserForm) => {
	isLoggedAtom(ctx, true);
	urlAtom.go(ctx, '/home');
}, 'login');

export const logout = action((ctx) => {
	isLoggedAtom(ctx, false);
	urlAtom.go(ctx, '/');
}, 'logout');
