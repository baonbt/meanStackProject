import { Routes } from '@angular/router';

import { BanBuonComponent } from "./BanBuon.component";

export const BanBuonRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: BanBuonComponent
        }]
    }
];