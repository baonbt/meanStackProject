import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';

import { KhoHangComponent } from "./KhoHang.component";
import { KhoHangRoutes } from "./KhoHang.routing";
import {MaterialModule} from "../app.module";
import { Ng2ImgMaxModule } from 'ng2-img-max';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(KhoHangRoutes),
        FormsModule,
        MaterialModule,
        Ng2ImgMaxModule
    ],
    declarations: [KhoHangComponent]
})

export class KhoHangModule {}
