import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { NhanVienComponent } from "./NhanVien/NhanVien.component";

import { QuanLyRoutes } from "./QuanLy.routing";
import { HangNCCComponent } from "./HangNCC/HangNCC.component";
import {Ng2ImgMaxModule} from "ng2-img-max";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(QuanLyRoutes),
        FormsModule,
        MaterialModule,
        Ng2ImgMaxModule
    ],
    declarations: [
        NhanVienComponent,
        HangNCCComponent
    ]
})

export class QuanLyModule {}
