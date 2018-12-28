import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TableData2} from "../../NhapHang/NhapHang.component";
import swal from "sweetalert2";
import {CommunicationServices} from "../../services/communication.services";
import {localhost} from "../../services/base.guard";

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}
declare interface TableWithCheckboxes {
    id?: number;
    ischecked?: boolean;
    product_name: string;
    type: string;
    quantity: number;
    price: any;
    amount: string;
}
export interface TableData2 {
    headerRow: string[];
    dataRows: TableWithCheckboxes[];
}

declare const $: any;

@Component({
    selector: 'app-khachbanbuon-cmp',
    templateUrl: './KhachBanBuon.component.html'
})

export class KhachBanBuonComponent implements OnInit , AfterViewInit {
    public dataTable: DataTable;
    public tableData2: TableData2;

    name: string;
    address: string;
    phone: string;
    owe: string;
    oweNum: number;
    type: string = 'khachLe';
    reduction: number = 0;
    _id: string;

    cName: string = 'N/A';
    cPhone: string = 'N/A';
    cAddress: string = 'N/A';
    cType: string = 'N/A';
    cReduction: number = 0;
    cBought: string = 'N/A';
    cLastBought: string = 'N/A';
    cPaid: string = 'N/A';
    cAvgPaid: string = 'N/A';
    cOwe: string = 'N/A';
    cLastPaid: string = 'N/A';


    customerTypes = [
        {value: 'tho', viewValue: 'Thợ'},
        {value: 'cayXang', viewValue: 'Cây Xăng'},
        {value: 'khachLe', viewValue: 'Khách Lẻ'}
    ];

    constructor(
        private communicationServices: CommunicationServices
    ){}
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
        this.dataTable = {
            headerRow: [ 'Tên Hàng', 'Giá', 'Số Lượng', 'Mã Đơn Hàng' ],
            footerRow: [ 'Tên Hàng', 'Giá', 'Số Lượng', 'Mã Đơn Hàng' ],

            dataRows: [
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
                ['yếm', '100.000', '10', 'dh001'],
            ]
        };

    }


    onOweChange() {
        if (this.owe !== undefined) {

            this.owe = this.moneySeparate(this.owe.replace(/[^0-9]+/g, ""));
            this.oweNum = parseInt(this.owe.replace(/[^0-9]+/g, ""));
        }
    }

    moneySeparate(amount) {
        if(amount === undefined || amount === null){
            return "0";
        } else {
            const parts = amount.toString().split(",");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return parts.join(",");
        }
    }

    onResetNewCustomer(){
        this.name = undefined;
        this.address = undefined;
        this.phone = undefined;
        this.owe = undefined;
        this.oweNum = undefined;
        this.type = 'khachLe';
        this.reduction = 0;
    }

    onAddNewCustomer(){
        if(this.name === undefined || this.phone === undefined){
            swal({
                title: "Hãy Nhập Tên Và SĐT Khách Hàng",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success"
            }).catch(swal.noop)
        } else {
            const newCustomerFile = {
                name: this.name,
                address: this.address,
                phone: this.phone,
                owe: this.oweNum,
                type: this.type
            };
            this.communicationServices.addNewCustomer(newCustomerFile).subscribe(data => {
                if (data.success) {
                    this.onResetNewCustomer();
                    $('#datatables').DataTable().ajax.reload();
                    swal(
                        {
                            title: data.msg,
                            type: 'success',
                            confirmButtonClass: "btn btn-success",
                            buttonsStyling: false
                        }
                    );
                } else {
                    swal(
                        {
                            title: data.msg,
                            type: 'error',
                            confirmButtonClass: "btn btn-success",
                            buttonsStyling: false
                        }
                    )
                }
            });
        }
    }

    initialCustomerTable(){
        const _this = this;
        $('#danhSachKhachHang').DataTable({
            ajax: {
                url: localhost + 'customers/all',
                type: 'GET',
                beforeSend: function (request) {
                    const token = window.localStorage.getItem('id_token');
                    request.setRequestHeader("Authorization", token);
                }
            },
            "columns": [
                { "data": "name" ,
                    title: "Tên"},
                { "data": "address" ,
                    'className': 'not-mobile',
                    title: "Địa Chỉ"},
                { "data": "phone" ,
                    title: "SĐT"},
                { "data": "type" ,
                    'className': 'not-mobile',
                    title: "Phân Loại"},
                { "data": "bought" ,
                    'className': 'not-mobile',
                    "render": function(data, type, row) {
                        return _this.moneySeparate(data);
                    },
                    title: "Đã Mua(VNĐ)"},
                { "data": "paid" ,
                    'className': 'not-mobile',
                    "render": function(data, type, row) {
                        return _this.moneySeparate(data);
                    },
                    title: "Đã Thanh Toán(VNĐ)"},
                { "data": "owe" ,
                    'className': 'not-mobile',
                    "render": function(data, type, row) {
                        return _this.moneySeparate(data);
                    },
                    title: "Đang Nợ(VNĐ)"},


            ],
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            "responsive": {
                "details": false,
                'breakpoints': [
                    { 'name': 'mobile',  'width': 800 }
                ]
            },
            language: {
                search: '',
                searchPlaceholder: "Tìm Kiếm",
                emptyTable: "Khách Hàng Không Tồn Tại",
                "zeroRecords":    "Không Tìm Thấy",
                "lengthMenu": "Hiển Thị _MENU_ Khách 1 Trang",
                "info":           "Từ _START_ Đến _END_ Của _TOTAL_",
                "paginate": {
                    "first":      "Đầu",
                    "last":       "Cuối",
                    "next":       false,
                    "previous":   false
                },
            },
            "order": [[ 0, "desc" ]],
            // initComplete: function(settings, json){
            //     var api = new $.fn.dataTable.Api(settings);
            //
            //     api.columns([-1]).visible(true);
            // }
        });
    }

    prettyType(type){
        if(type === 'tho'){
            return 'Thợ';
        } else if (type === 'cayXang'){
            return 'Cây Xăng';
        } else if (type === 'khachLe'){
            return 'Khách Lẻ';
        }
    }

    onUpdateButtonClick(){
        if(this.name === undefined || this.phone === undefined){
            swal({
                title: "Hãy Nhập Tên Và SĐT Khách Hàng",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success"
            }).catch(swal.noop)
        } else {
            const updateCustomerFile = {
                _id: this._id,
                name: this.name,
                address: this.address,
                phone: this.phone,
                type: this.type,
                reduction: this.reduction
            };
            this.communicationServices.updateCustomerInfo(updateCustomerFile).subscribe(data => {
                if (data.success) {
                    this.cName = this.name;
                    this.cAddress = this.address;
                    this.cPhone = this.phone;
                    this.cType= this.prettyType(this.type);
                    this.reduction = this.cReduction;
                    $('#myModal').modal('hide');
                    $('#danhSachKhachHang').DataTable().ajax.reload();
                    swal(
                        {
                            title: data.msg,
                            type: 'success',
                            confirmButtonClass: "btn btn-success",
                            buttonsStyling: false
                        }
                    );
                } else {
                    swal(
                        {
                            title: data.msg,
                            type: 'error',
                            confirmButtonClass: "btn btn-success",
                            buttonsStyling: false
                        }
                    )
                }
            });
        }
    }

    ngAfterViewInit() {
        $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
            $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
        } );
        this.initialCustomerTable();

        $('#lichsumuahang').DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records",
            }

        });

        const table = $('#danhSachKhachHang').DataTable();
        var _this = this;
        table.on( 'click', 'td', function (e) {
            var data = table.row( $(this).parents('tr') ).data();
            if(data !== undefined){
                _this.cName = _this.name = data.name;
                _this.cPhone = _this.phone = data.phone;
                _this.cAddress = _this.address = data.address;
                _this.cType =  _this.prettyType(data.type);

                _this.type = data.type;
                _this._id = data._id;

                _this.cReduction = _this.reduction = data.reduction;
                _this.cBought = _this.moneySeparate(data.bought);
                _this.cPaid = _this.moneySeparate(data.paid);
                _this.cOwe = _this.moneySeparate(data.owe);
                $('.nav-pills a[href="#link2"]').tab('show');
            }
            e.preventDefault();


        } );

    }
}