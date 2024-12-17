import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/user-list', pathMatch: 'full' },
  { path: 'user-list', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule) },
];
