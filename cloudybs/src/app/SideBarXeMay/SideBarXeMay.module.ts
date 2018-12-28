import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideBarXeMayComponent } from "./SideBarXeMay.component";

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SideBarXeMayComponent ],
    exports: [ SideBarXeMayComponent ]
})

export class SideBarXeMayModule {}
