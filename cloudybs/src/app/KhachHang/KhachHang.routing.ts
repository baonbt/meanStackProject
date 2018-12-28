import { Routes } from '@angular/router';

import { ChamSocKhachHangComponent } from "./ChamSocKhachHang/ChamSocKhachHang.component";
import { KhachBanBuonComponent } from "./KhachBanBuon/KhachBanBuon.component";
import { KhachBanLeComponent } from "./KhachBanLe/KhachBanLe.component";
import { NhaCungCapComponent } from "./NhaCungCap/NhaCungCap.component";


export const KhachHangRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'banbuon',
            component: KhachBanBuonComponent
        }]}, {
        path: '',
        children: [ {
            path: 'banle',
            component: KhachBanLeComponent
        }]}, {
        path: '',
        children: [ {
            path: 'chamsoc',
            component: ChamSocKhachHangComponent
        }]
        }, {
        path: '',
        children: [ {
            path: 'cungcap',
            component: NhaCungCapComponent
        }]
    }
];
