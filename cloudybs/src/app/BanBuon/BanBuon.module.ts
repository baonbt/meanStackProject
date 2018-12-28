import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';

import { BanBuonComponent } from "./BanBuon.component";
import { BanBuonRoutes } from "./BanBuon.routing";
import {MaterialModule} from "../app.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BanBuonRoutes),
        FormsModule,
        MaterialModule
    ],
    declarations: [BanBuonComponent]
})

export class BanBuonModule {}
