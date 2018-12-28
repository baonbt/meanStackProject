// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit } from '@angular/core';
import {CommunicationServices} from "../../services/communication.services";
import swal from "sweetalert2";
import {localhost} from "../../services/base.guard";
import { Ng2ImgMaxService } from 'ng2-img-max';
import {DomSanitizer} from '@angular/platform-browser';


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

export interface TableData2 {
    headerRow: string[];
    dataRows: TableWithCheckboxes[];
}
declare const $: any;


@Component({
    selector: 'app-hangncc-cmp',
    templateUrl: 'HangNCC.component.html'
})

export class HangNCCComponent implements OnInit, AfterViewInit {
    public dataTable: DataTable;
    public tableData2: TableData2;

    goodUpdateMode: boolean = false;
    importMode: boolean = true;
    addNewGoodMode: boolean = false;

    imagePreview: string;
    suppliers: any = [];
    type: string;
    level: number;

    _id: string;
    goodCode: string;
    supplyCode: string;
    goodName: string;
    goodTags: string;
    DVT: string;
    importPrice: string;
    retailPrice: string;
    salePriceLevelOne: string;
    salePriceLevelTwo: string;
    replacementFee: string;
    importPriceNum: number = 1;
    retailPriceNum: number = 1;
    salePriceLevelOneNum: number = 1;
    salePriceLevelTwoNum: number = 1;
    replacementFeeNum: number = 1000;
    warranty: number = 0;
    remaining: number;
    location: string;
    description: string;
    supplier: string;
    imageLink: string;
    goodImageSelected: File = null;
    searchText: string;
    warranties = [
        {value: 0, viewValue: 'Không Bảo Hành'},
        {value: 86400000, viewValue: '1 Ngày'},
        {value: 259200000, viewValue: '3 Ngày'},
        {value: 604800000, viewValue: '7 Ngày'},
        {value: 2592000000, viewValue: '1 Tháng'},
        {value: 7776000000, viewValue: '3 Tháng'},
        {value: 15552000000, viewValue: '6 Tháng'},
        {value: 31104000000, viewValue: '1 Năm'},
        {value: 62208000000, viewValue: '2 Năm'},
        {value: 93312000000, viewValue: '3 Năm'},
    ];
    cities = [
        {value: 'paris-0', viewValue: 'Paris'},
        {value: 'miami-1', viewValue: 'Miami'},
        {value: 'bucharest-2', viewValue: 'Bucharest'},
        {value: 'new-york-3', viewValue: 'New York'},
        {value: 'london-4', viewValue: 'London'},
        {value: 'barcelona-5', viewValue: 'Barcelona'},
        {value: 'moscow-6', viewValue: 'Moscow'},
    ];
    constructor(
        private communicationServices: CommunicationServices,
        private ng2ImgMax: Ng2ImgMaxService,
        private sanitizer:DomSanitizer
    ){
    }
    ngOnInit() {
        this.communicationServices.getPermission().subscribe(data =>{
            if(data){
                this.type = data.accountType;
                this.level = data.accountLevel;
            }
        });
        this.onResetAddNewGood();
        this.communicationServices.getListSupplier().subscribe(data =>{
            if(data){
                for(let x of data.suppliers){
                    this.suppliers.push(x);
                }
            }
        });

    }

    onPriceChange(){
        if(this.importPrice !== undefined){

            this.importPrice = this.moneySeparate(this.importPrice.replace(/[^0-9]+/g, ""));
            this.importPriceNum = parseInt(this.importPrice.replace(/[^0-9]+/g, ""));
        }
        if(this.retailPrice !== undefined){

            this.retailPrice = this.moneySeparate(this.retailPrice.replace(/[^0-9]+/g, ""));
            this.retailPriceNum = parseInt(this.retailPrice.replace(/[^0-9]+/g, ""));
        }
        if(this.salePriceLevelOne !== undefined){

            this.salePriceLevelOne = this.moneySeparate(this.salePriceLevelOne.replace(/[^0-9]+/g, ""));
            this.salePriceLevelOneNum = parseInt(this.salePriceLevelOne.replace(/[^0-9]+/g, ""));
        }
        if(this.salePriceLevelTwo !== undefined){

            this.salePriceLevelTwo = this.moneySeparate(this.salePriceLevelTwo.replace(/[^0-9]+/g, ""));
            this.salePriceLevelTwoNum = parseInt(this.salePriceLevelTwo.replace(/[^0-9]+/g, ""));
        }
        if(this.replacementFee !== undefined){
            this.replacementFee = this.moneySeparate(this.replacementFee.replace(/[^0-9]+/g, ""));
            this.replacementFeeNum = parseInt(this.replacementFee.replace(/[^0-9]+/g, ""));
        }

    }


    onResetAddNewGood(){
        this.goodCode = undefined;
        this.supplyCode = undefined;
        this.goodName = undefined;
        this.goodTags = undefined;
        this.DVT = undefined;
        this.retailPrice = undefined;
        this.importPrice = undefined;
        this.salePriceLevelOne = undefined;
        this.salePriceLevelTwo = undefined;
        this.replacementFee = undefined;
        this.warranty = 0;
        this.goodImageSelected = null;
        this.location = "...";
        this.description = "...";
        this.remaining = 0;
        this.goodUpdateMode = false;
        this.imageLink = undefined;
        this._id = undefined;

        $('#myModal').modal('hide');
        $(".fileinput").fileinput("clear");
    }

    moneySeparate(amount) {
        if(amount === undefined || amount === null){
            return "0";
        } else {
            if(amount.toString().charAt(0)==="0" && amount.length>1){
                amount = amount.substring(1);
            }
            const parts = amount.toString().split(",");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return parts.join(",");
        }
    }


    onAddToWareHouse(){
        if(this.goodName === undefined || this.goodTags === undefined){
            swal({
                title: "Hãy Nhập Tên Mặt Hàng Và Phân Loại Chúng",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success"
            }).catch(swal.noop)
        } else {
            $('#updateGoodButton').prop('disabled', true);
            let _supplier = "";
            if(this.supplier === undefined || this.supplier.length == 0){
                _supplier = "chưa xác định";
            } else {
                _supplier = this.supplier;
            }
            const newGoodFile = {
                code: this.goodCode,
                supplyCode: this.supplyCode,
                name: this.goodName,
                tags: this.goodTags,
                DVT: this.DVT,
                retailPrice: this.retailPriceNum,
                salePriceLevelOne: this.salePriceLevelOneNum,
                salePriceLevelTwo: this.salePriceLevelTwoNum,
                replacementFee: this.replacementFeeNum,
                warranty: this.warranty,
                remaining: this.remaining,
                location: this.location,
                description: this.description,
                supplier: _supplier
            };
            this.communicationServices.addNewGood(newGoodFile, this.goodImageSelected).subscribe(data => {
                if (data.success) {
                    this.communicationServices.tellAddedGoodNpp(this._id).subscribe(data=>{
                        this.onResetAddNewGood();
                        $('#datatables').DataTable().ajax.reload();
                        $('#updateGoodModal').hide();
                    });
                    $('#updateGoodButton').prop('disabled', false);
                    if(this.supplier.indexOf('chưa xác định')){
                        this.supplier = undefined;
                    }
                    swal(
                        {
                            title: data.msg,
                            type: 'success',
                            confirmButtonClass: "btn btn-success",
                            buttonsStyling: false
                        }
                    );
                } else {
                    $('#updateGoodButton').prop('disabled', false);
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

    test(){
        console.log(this.supplier);
    }

    oneGoodImageSelected(event){
        $('#addNewButton').prop('disabled', true);
        this.ng2ImgMax.resizeImage(<File>event.target.files[0], 500, 500).subscribe(
            result => {
                $('#addNewButton').prop('disabled', false);
                this.goodImageSelected = new File([result], result.name, {type: result.type});
            },
            error => {
                $('#addNewButton').prop('disabled', false);
                console.log('😢 Oh no!', error);
            }
        );
    }

    onEditClick(){
        this.goodUpdateMode = true;
        $('#updateGoodModal').show();
    }

    initialTable(){
        const _this = this;
        $('#datatables').DataTable({
            ajax: {
                url: localhost + 'goodnpps/getgoodnpps/ABC',
                type: 'GET',
                beforeSend: function (request) {
                    const token = window.localStorage.getItem('id_token');
                    request.setRequestHeader("Authorization", token);
                }
            },
            "columns": [
                { "data": "supplyCode" ,
                    title: "Mã",
                    'className': 'not-mobile',
                    "width": "10%"},
                { "data": "name" ,
                    title: "Tên",
                    "width": "20%"},
                { "data": "importPrice" ,
                    "render": function(data, type, row) {
                        return _this.moneySeparate(data);
                    },
                    title: "Giá Nhập",
                    "width": "10%"},
                { "data": "DVT" ,
                    title: "DVT",
                    'className': 'not-mobile',
                    "width": "10%"},
                { "data": "supplier" ,
                    'className': 'not-mobile',
                    title: "NPP"},
                { "data": "description" ,
                    'className': 'not-mobile',
                    title: "Mô Tả"},


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
            "searching": false,
            language: {
                search: '',
                searchPlaceholder: "Tìm Kiếm",
                emptyTable: "Tìm Kiếm 1 Từ Bất Kỳ",
                "zeroRecords":    "Không Tìm Thấy",
                "lengthMenu": "Hiển Thị _MENU_ Mặt Hàng 1 Trang",
                "info":           "Từ _START_ Đến _END_ Của _TOTAL_",
                "paginate": {
                    "first":      "Đầu",
                    "last":       "Cuối",
                    "next":       false,
                    "previous":   false
                },
            },
            "order": [],
            "createdRow": function( row, data, dataIndex){
                if( data.isAdded ){
                    $(row).css('background-color', '#ffb3b3');
                }
            }
            // initComplete: function(settings, json){
            //     var api = new $.fn.dataTable.Api(settings);
            //
            //     api.columns([-1]).visible(true);
            // }
        });
    }

    prettyWarranty(warranty){
        switch(warranty) {
            case 93312000000:
                return '3 Năm';
            case 62208000000:
                return '2 Năm';
            case 31104000000:
                return '1 Năm';
            case 15552000000:
                return '6 Tháng';
            case 7776000000:
                return '3 Tháng';
            case 2592000000:
                return '1 Tháng';
            case 604800000:
                return '7 Ngày';
            case 259200000:
                return '3 Ngày';
            case 86400000:
                return 'Trong Ngày';
            default:
                return 'Không Bảo Hành';
        }
    }

    searchChange(){
        let newAjaxUrl;
        if(this.searchText === undefined || this.searchText === null || this.searchText.length == 0){
            newAjaxUrl = localhost + "goodnpps/getgoodnpps/" +"ABC____"
        } else {
            newAjaxUrl = localhost + "goodnpps/getgoodnpps/" + encodeURIComponent(this.searchText);
        }
        $('#datatables').DataTable().ajax.url(newAjaxUrl);
        $('#datatables').DataTable().ajax.reload();
    }

    ngAfterViewInit() {
        $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
            $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
        } );

        this.initialTable();

        const table = $('#datatables').DataTable();
        var _this = this;
        table.on( 'click', 'td', function (e) {
            var data = table.row( $(this).parents('tr') ).data();
            if(data !== undefined){
                $('#myModal').modal();
                if(data.imageLocation === null){
                    $("#imageOnDetailModal").attr({
                        "src" : "./assets/img/image_placeholder.jpg"
                    });
                } else {
                    $("#imageOnDetailModal").attr({
                        "src" : localhost + data.imageLocation
                    });

                    $("#imageOnUpdateGoodModal").attr({
                        "src" : localhost + data.imageLocation
                    });
                    $("#updateGoodImage").text('Đổi Ảnh');
                }

                $("#detailModalCode").text(":   "+data.code);
                $("#detailModalSupplyCode").text(":   "+data.supplyCode);
                $("#detailModalName").text(":   "+data.name);
                $("#detailModalTags").text(":   "+data.tags);
                $("#detailModalDVT").text(":   "+data.DVT);
                $("#detailModalLocation").text(":   "+data.location);
                $("#detailModalDescription").text(":   "+data.description);
                $("#detailModalRemaining").text(":   "+data.remaining);
                $("#detailModalWarranty").text(":   "+_this.prettyWarranty(data.warranty));
                $("#detailModalRetailPrice").text(":   "+_this.moneySeparate(data.retailPrice));
                $("#detailModalReplacementFree").text(":   "+_this.moneySeparate(data.replacementFee));
                $("#detailModalSalePriceLevelOne").text(":   "+_this.moneySeparate(data.salePriceLevelOne));
                $("#detailModalSalePriceLevelTwo").text(":   "+_this.moneySeparate(data.salePriceLevelTwo));



                _this.retailPriceNum = data.retailPrice;
                _this.salePriceLevelOneNum = data.salePriceLevelOne;
                _this.salePriceLevelTwoNum = data.salePriceLevelTwo;
                _this.replacementFeeNum = data.replacementFee;

                _this.goodCode = data.code;
                _this.supplyCode = data.supplyCode;
                _this.goodName = data.name;
                _this.goodTags = data.tags;
                _this.DVT = data.DVT;
                _this.supplier = data.supplier;
                _this.retailPrice = _this.moneySeparate(data.retailPrice);
                _this.salePriceLevelOne = _this.moneySeparate(data.salePriceLevelOne);
                _this.salePriceLevelTwo = _this.moneySeparate(data.salePriceLevelTwo);
                _this.replacementFee = _this.moneySeparate(data.replacementFee);
                _this.warranty = data.warranty;
                _this.goodImageSelected = null;
                _this.location = data.location;
                _this.description = data.description;
                _this.remaining = data.remaining;
                _this.imageLink = localhost + data.imageLocation;
                _this._id = data._id;
                console.log(
                    _this._id
                );
                $('#updateGoodModal').hide();
            }
            e.preventDefault();


        } );


        $('#myModal').on('hidden.bs.modal', function () {
            _this.onResetAddNewGood();
            $("#imageOnUpdateGoodModal").attr({
                "src" : "./assets/img/image_placeholder.jpg"
            });
            $("#updateGoodImage").text('Chọn 1 Ảnh');
        });

        $('.card .material-datatables label').addClass('form-group');
    }
}
