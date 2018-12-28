import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import {BaseGuard} from "../../services/base.guard";
import swal from "sweetalert2";
import {Router} from "@angular/router";

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    username: String;
    password: String;
    authToken: any;
    user: any;

    constructor(private element: ElementRef,
                private baseGuard: BaseGuard,
                private router: Router) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }


    onLetsGoClick() {
        if (!this.showSwal()) {
            return false;
        }
        const user = {
            username: this.username,
            password: this.password
        };
        this.baseGuard.authenticateUser(user).subscribe(data => {
            if (data.success) {
                this.storeUserData(data.token, data.user);
                this.showAuthSwal(data.success, data.msg);
                this.router.navigate(['/pages/chon']);
            } else {
                this.showAuthSwal(data.success, data.msg);
            }
        });
    }

    showSwal() {
        if (this.username === undefined || this.password === undefined) {
            swal({
                text: "Vui Lòng Điền Đầy Đủ Tài Khoản Và Mật Khẩu!",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-info"
            }).catch(swal.noop)
            return false;
        }
        return true;
    }

    showAuthSwal(dataSuccess, dataMsg) {
        console.log(dataMsg);
        if (dataSuccess) {
            swal({
                title: "Đăng Nhập Thành Công",
                text: 'Chào Mừng Đến Với Hệ Mặt Trời',
                buttonsStyling: false,
                confirmButtonClass: "btn btn-info"
            }).catch(swal.noop);
            return true;
        } else {
            swal({
                title: "Đăng Nhập Thất Bại",
                text: dataMsg,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-info"
            }).catch(swal.noop)
            return false;
        }
    }

    onEnterHit(event){
        if(event.which == 13 || event.keyCode == 13){
            this.onLetsGoClick();
        }
        return false;
    }

    storeUserData(token, user){
        window.localStorage.setItem('id_token', token);
        window.localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }
}
