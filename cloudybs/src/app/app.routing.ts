import {Route, Routes} from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { XeMayLayoutComponent } from "./layouts/XeMay/XeMay-layout.component";
import {AuthGuard} from "./services/auth.guard";
import {LevelGuard} from "./services/level.guard";

const fallbackRoutes : Route = {
    path: '**',
    canActivate: [AuthGuard],
    redirectTo: 'pages/chon'
};

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'xemay/khohang',
      pathMatch: 'full',
    }, {
      path: 'xemay',
      component: XeMayLayoutComponent,
        canActivate: [AuthGuard],
      children: [
          {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
          },{
              path: 'banbuon',
              loadChildren: './BanBuon/BanBuon.module#BanBuonModule'
          },{
              path: 'khohang',
              loadChildren: './KhoHang/KhoHang.module#KhoHangModule'
          }, {
        path: 'khachhang',
        loadChildren: './KhachHang/KhachHang.module#KhachHangModule'
          }, {
              path: 'quanly',
              loadChildren: './QuanLy/QuanLy.module#QuanLyModule'
          }
  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    },
    fallbackRoutes
];
