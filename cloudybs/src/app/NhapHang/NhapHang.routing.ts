import { Routes } from '@angular/router';

import { NhapHangComponent } from "./NhapHang.component";

export const NhapHangRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: NhapHangComponent
        }]
    }
];