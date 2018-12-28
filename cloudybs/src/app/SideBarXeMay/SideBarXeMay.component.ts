import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import {BaseGuard} from "../services/base.guard";

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    accountType: string,
    accountLevel: number,
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
    accountType: string,
    accountLevel: number,
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/xemay/dashboard',
    title: 'Thống Kê',
    type: 'link',
    accountType: 'admin',
    accountLevel: 9,
    icontype: 'assessment'
},
//     {
//     path: '/xemay/banle',
//     title: 'Bán Lẻ',
//     type: 'link',
//     icontype: 'shopping_basket'
//
// },
    {
    path: '/xemay/banbuon',
    title: 'Tạo Hóa Đơn',
    type: 'link',
        accountType: 'staff',
        accountLevel: 9,
    icontype: 'shopping_cart'

},{
    path: '/xemay/khohang',
    title: 'Kho Hàng',
    type: 'link',
        accountType: 'staff',
        accountLevel: 1,
    icontype: 'account_balance'

},{
    path: '/xemay/khachhang',
    title: 'Khách Hàng',
    type: 'sub',
        accountType: 'staff',
        accountLevel: 1,
    icontype: 'group',
    collapse: 'khachhang',
    children: [
        {path: 'banbuon', title: 'Khách Hàng', ab:'DS', accountType: 'staff', accountLevel: 1},
        {path: 'cungcap', title: 'Nhà Phân Phối', ab:'NPP', accountType: 'admin', accountLevel: 1},
        {path: 'chamsoc', title: 'Chăm Sóc Khách Hàng', ab:'CSKH', accountType: 'admin', accountLevel: 9}
    ]
},{
        path: '/xemay/quanly',
        title: 'Quan Lý',
        type: 'sub',
        accountType: 'admin',
        accountLevel: 1,
        icontype: 'whatshot',
        collapse: 'quanly',
        children: [
            {path: 'nhanvien', title: 'Nhân Viên', ab:'NV', accountType: 'admin', accountLevel: 6},
            {path: 'hangncc', title: 'Hàng Hóa Từ NCC', ab:'HH', accountType: 'admin', accountLevel: 1}
        ]
    }
];
@Component({
    selector: 'app-sidebar-xemay-cmp',
    templateUrl: 'SideBarXeMay.component.html',
})

export class SideBarXeMayComponent implements OnInit {
    public menuItems: any[];

    accountType: string;
    accountLevel: number;
    constructor(
        private baseGuard: BaseGuard
    ){}
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.baseGuard.getUserTypeAndLevel().subscribe(res =>{
            this.accountType = res.accountType;
            this.accountLevel = res.accountLevel;
        })
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    onLogOutClick(){
        this.baseGuard.logout();
    }
    checkAccountTypeAndLevel(accountType, accountLevel){
        if(this.accountType === undefined){
            return false;
        }
        if(this.accountType.indexOf(accountType) >-1 || this.accountType === 'admin'){
            if(this.accountLevel >= accountLevel){
                return true;
            }
            return false;
        }
    }
}
