import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {
    path: '', pathMatch:'full', redirectTo: '/auth/login'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'auth',
    loadChildren: () => 
        import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'chat',
    loadChildren: () => 
        import('./chat/chat.module').then((m) => m.ChatModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
