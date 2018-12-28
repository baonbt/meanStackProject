import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';

import { BanLeComponent} from "./BanLe.component";
import { BanLeRoutes} from "./BanLe.routing";
import {MaterialModule} from "../app.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BanLeRoutes),
        FormsModule,
        MaterialModule
    ],
    declarations: [BanLeComponent]
})

export class BanLeModule {}
