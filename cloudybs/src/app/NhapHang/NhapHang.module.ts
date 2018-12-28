import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';
import { MaterialModule } from '../app.module';

import { NhapHangComponent } from "./NhapHang.component";
import { NhapHangRoutes } from "./NhapHang.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(NhapHangRoutes),
        FormsModule,
        MaterialModule
    ],
    declarations: [NhapHangComponent]
})

export class NhapHangModule {}
