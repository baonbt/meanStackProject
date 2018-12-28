import { Routes } from '@angular/router';

import { BanLeComponent } from './BanLe.component';

export const BanLeRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: BanLeComponent
        }]
    }
];