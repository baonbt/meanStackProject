import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

import {localhost} from "./base.guard";

@Injectable()
export class CommunicationServices {

    authToken: any;
    user: any;
    constructor(private http: Http) { }
//Good
    addNewGood(newGoodFile, goodImage) {
        const headers = new Headers();
        const fd = new FormData();
        fd.append('goodImage', goodImage);
        for ( var key in newGoodFile ) {
            fd.append(key, newGoodFile[key]);
        }
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.post(localhost + 'goods/creategood', fd, {headers: headers}).map(res => res.json());
    }

    updateGood(newGoodFile, goodImage) {
        const headers = new Headers();
        const fd = new FormData();
        fd.append('goodImage', goodImage);
        for ( var key in newGoodFile ) {
            fd.append(key, newGoodFile[key]);
        }
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.post(localhost + 'goods/updategood', fd, {headers: headers}).map(res => res.json());
    }

//Customer
    addNewCustomer(newCustomerFile) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('content-Type', 'application/json');
        return this.http.post(localhost + 'customers/addnew', newCustomerFile, {headers: headers}).map(res => res.json());
    }
    updateCustomerInfo(updateCustomerFile) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('content-Type', 'application/json');
        return this.http.post(localhost + 'customers/updateinfo', updateCustomerFile, {headers: headers}).map(res => res.json());
    }

    //supplier
    addNewSupplier(addNewSupplierFile) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('content-Type', 'application/json');
        return this.http.post(localhost + 'suppliers/addnew', addNewSupplierFile, {headers: headers}).map(res => res.json());
    }
    updateSupplier(updateSupplierFile) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('content-Type', 'application/json');
        return this.http.post(localhost + 'suppliers/update', updateSupplierFile, {headers: headers}).map(res => res.json());
    }
    getListSupplier() {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.get(localhost + 'suppliers/list', {headers: headers}).map(res => res.json());
    }

    tellAddedGoodNpp(_id) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.get(localhost + 'goodnpps/addedgoodnpps/'+_id, {headers: headers}).map(res => res.json());
    }

    permission(type, level) {
        const headers = new Headers();
        const required = {
            type: type,
            level: level
        };
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('content-Type', 'application/json');
        return this.http.post(localhost + 'users/permission', required, {headers: headers}).map(res => res.json());
    }

    getPermission() {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('content-Type', 'application/json');
        return this.http.get(localhost + 'users/typeandlevel', {headers: headers}).map(res => res.json());
    }
    loadToken() {
        this.authToken = localStorage.getItem('id_token');
    }
}