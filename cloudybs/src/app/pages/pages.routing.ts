import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { PricingComponent } from './pricing/pricing.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { ChonCuaHangComponent } from "./ChonCuaHang/ChonCuaHang.component";
import {AuthGuard} from "../services/auth.guard";

export const PagesRoutes: Routes = [

    {
        path: '',
        children: [ {
            path: 'login',
            component: LoginComponent
        }, {
            path: 'chon',
            canActivate: [AuthGuard],
            component: ChonCuaHangComponent
        }]
    }
];
