import { Routes } from '@angular/router';

import { NhanVienComponent } from "./NhanVien/NhanVien.component";
import { HangNCCComponent } from "./HangNCC/HangNCC.component";


export const QuanLyRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'nhanvien',
            component: NhanVienComponent
        },
            {
                path: 'hangncc',
                component: HangNCCComponent
            }
        ]}
];
