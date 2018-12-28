import { Component, OnInit } from '@angular/core';

import * as Chartist from 'chartist';
import {TableData} from "../md/md-table/md-table.component";
import {FormControl} from "@angular/forms";
import {TableData2} from "../NhapHang/NhapHang.component";

@Component({
    selector: 'app-BanBuon-cmp',
    templateUrl: './BanBuon.component.html'
})

export class BanBuonComponent implements OnInit {

    cities = [
        {value: 'paris-0', viewValue: 'Paris'},
        {value: 'miami-1', viewValue: 'Miami'},
        {value: 'bucharest-2', viewValue: 'Bucharest'},
        {value: 'new-york-3', viewValue: 'New York'},
        {value: 'london-4', viewValue: 'London'},
        {value: 'barcelona-5', viewValue: 'Barcelona'},
        {value: 'moscow-6', viewValue: 'Moscow'},
    ];

    tabs = ['First', 'Second', 'Third'];
    selected = new FormControl(0);
    public tableData2: TableData2;
    ngOnInit() {
        this.tableData2 = {
            headerRow: [ '#', '', 'Product Name', 'Type', 'Qty', 'Price', 'Amount'],
            dataRows: [
                {id: 1, ischecked: true, product_name: 'Moleskine Agenda', type: 'Office', quantity: 25, price: 49, amount: '1,225'},
                {id: 2, ischecked: true, product_name: 'Stabilo Pen', type: 'Office', quantity: 30, price: 10.99, amount: '109'},
                {id: 3, ischecked: true, product_name: 'A4 Paper Pack', type: 'Office', quantity: 50, price: 49, amount: '1,225'},
                {id: 4, ischecked: false, product_name: 'Apple iPad', type: 'Meeting', quantity: 10, price: 499.00, amount: '4,990'},
                {id: 5, ischecked: false, product_name: 'Apple iPhone', type: 'Communication', quantity: 10,
                    price: 599.00, amount: '5,999'}
            ]
        };
    }
    addTab(selectAfterAdding: boolean){
        this.tabs.push("New");
        if(selectAfterAdding){
            this.selected.setValue(this.tabs.length - 1)
        }
    }
    removeTab(index: number){
        this.tabs.splice(index, 1);
    }
}
