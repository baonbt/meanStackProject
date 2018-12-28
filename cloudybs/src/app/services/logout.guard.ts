import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {BaseGuard} from "./base.guard";

@Injectable()

export class LogoutGuard implements CanActivate {
    constructor(
        private baseGuard: BaseGuard,
        private router: Router
    ) {}

    canActivate() {
        if (this.baseGuard.loggedIn()) {
            this.router.navigate(['/pages/chon']);
            return false;
        } else {
            return true;
        }
    }
}
