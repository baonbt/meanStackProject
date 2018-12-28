import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {BaseGuard} from "./base.guard";

@Injectable()

export class AuthGuard implements CanActivate {
    key: any;
    constructor(
        private baseGuard: BaseGuard,
        private router: Router
    ) {}

    canActivate(required) {
        if (this.baseGuard.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['/pages/login']);
            return false;
        }
    }
}
