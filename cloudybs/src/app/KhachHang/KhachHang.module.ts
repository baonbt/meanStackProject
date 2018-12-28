import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { KhachBanBuonComponent } from "./KhachBanBuon/KhachBanBuon.component";
import { KhachBanLeComponent } from "./KhachBanLe/KhachBanLe.component";
import { ChamSocKhachHangComponent } from "./ChamSocKhachHang/ChamSocKhachHang.component";
import { NhaCungCapComponent } from "./NhaCungCap/NhaCungCap.component";

import { KhachHangRoutes } from "./KhachHang.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(KhachHangRoutes),
        FormsModule,
        MaterialModule
    ],
    declarations: [
        KhachBanBuonComponent,
        KhachBanLeComponent,
        ChamSocKhachHangComponent,
        NhaCungCapComponent
    ]
})

export class KhachHangModule {}
