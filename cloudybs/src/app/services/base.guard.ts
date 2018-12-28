import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import {Router} from "@angular/router";

// export const localhost: String = 'http://localhost:80/';
export const localhost: String = '';

@Injectable()
export class BaseGuard {
    authToken: any;
    user: any;
    constructor(private http: Http,
                private router: Router) { }

    loggedIn() {
        const token1 = window.localStorage.getItem('id_token');
        if (token1 == null) {
            return false;
        } else {
            return tokenNotExpired('id_token');
        }
    }

    logout() {
        this.authToken = null;
        this.user = null;
        window.localStorage.clear();
        this.router.navigate(['/pages/login']);
    }

    authenticateUser(user) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(localhost + 'users/authenticate', user, {headers: headers}).map(res => res.json());
    }

    getUserTypeAndLevel() {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.get(localhost + 'users/typeandlevel', {headers: headers}).map(res => res.json());
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }
}