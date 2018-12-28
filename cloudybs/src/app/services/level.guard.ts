import { Injectable } from '@angular/core';
import {Router, CanActivate, CanActivateChild} from '@angular/router';
import {BaseGuard} from "./base.guard";

@Injectable()

export class LevelGuard implements CanActivate, CanActivateChild {
    key: any;
    constructor(
        private baseGuard: BaseGuard,
        private router: Router
    ) {}

    canActivate(required) {
        return this.baseGuard.getUserTypeAndLevel().map((res) => {
            if (res.accountLevel >= required) {
                return true;
            }
            this.router.navigate(['/pages/chon']);
            return false
        });
    }
    canActivateChild(required) {
        return this.baseGuard.getUserTypeAndLevel().map((res) => {
            if (res.accountLevel >= required) {
                return true;
            }
            this.router.navigate(['/pages/chon']);
            return false
        });
    }
}
