import { Routes } from '@angular/router';

import { KhoHangComponent } from "./KhoHang.component";

export const KhoHangRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: KhoHangComponent
        }]
    }
];