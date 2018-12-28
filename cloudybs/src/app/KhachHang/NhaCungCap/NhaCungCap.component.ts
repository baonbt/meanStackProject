import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TableData2} from "../../NhapHang/NhapHang.component";
import {CommunicationServices} from "../../services/communication.services";
import swal from "sweetalert2";
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
    selector: 'app-nhacungcap-cmp',
    templateUrl: './NhaCungCap.component.html'
})

export class NhaCungCapComponent implements OnInit , AfterViewInit {
    public dataTable: DataTable;

    name: string;
    address: string;
    phone: string;
    owe: string;
    oweNum: number;
    _id: string;

    cName: string = 'N/A';
    cPhone: string = 'N/A';
    cAddress: string = 'N/A';
    cBought: string = 'N/A';
    cLastBought: string = 'N/A';
    cPaid: string = 'N/A';
    cAvgPaid: string = 'N/A';
    cOwe: string = 'N/A';
    cLastPaid: string = 'N/A';

    constructor(
        private communicationServices: CommunicationServices
    ){}
    ngOnInit() {

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
    }

    onAddNewSupplier(){
        if(this.name === undefined || this.phone === undefined){
            swal({
                title: "Hãy Nhập Tên Và SĐT Khách Hàng",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success"
            }).catch(swal.noop)
        } else {
            const newSupplierFile = {
                name: this.name,
                address: this.address,
                phone: this.phone,
                owe: this.oweNum,
            };
            this.communicationServices.addNewSupplier(newSupplierFile).subscribe(data => {
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
        $('#danhSachNhaPhanPhoi').DataTable({
            ajax: {
                url: localhost + 'suppliers/all',
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
                emptyTable: "NPP Không Tồn Tại",
                "zeroRecords":    "Không Tìm Thấy",
                "lengthMenu": "Hiển Thị _MENU_ NPP 1 Trang",
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

    onUpdateButtonClick(){
        if(this.name === undefined || this.phone === undefined){
            swal({
                title: "Hãy Nhập Tên Và SĐT NPP",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success"
            }).catch(swal.noop)
        } else {
            const updateSupplierFile = {
                _id: this._id,
                name: this.name,
                address: this.address,
                phone: this.phone
            };
            this.communicationServices.updateSupplier(updateSupplierFile).subscribe(data => {
                if (data.success) {
                    this.cName = this.name;
                    this.cAddress = this.address;
                    this.cPhone = this.phone;
                    $('#myModal').modal('hide');
                    $('#danhSachNhaPhanPhoi').DataTable().ajax.reload();
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

        const table = $('#danhSachNhaPhanPhoi').DataTable();
        var _this = this;
        table.on( 'click', 'td', function (e) {
            var data = table.row( $(this).parents('tr') ).data();
            if(data !== undefined){
                _this.cName = _this.name = data.name;
                _this.cPhone = _this.phone = data.phone;
                _this.cAddress = _this.address = data.address;

                _this._id = data._id;

                _this.cBought = _this.moneySeparate(data.bought);
                _this.cPaid = _this.moneySeparate(data.paid);
                _this.cOwe = _this.moneySeparate(data.owe);
                $('.nav-pills a[href="#link2"]').tab('show');
            }
            e.preventDefault();


        } );

    }
}