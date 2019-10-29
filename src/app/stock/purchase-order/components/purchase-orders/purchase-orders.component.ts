import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PurchaseOrder, PurchaseOrderItem, Supplier } from "./../../../../models/index";
import { ProductService, PurchaseOrderService, PurchaseOrderItemService } from './../../../../services/app.services';
import { ToastrService } from 'ngx-toastr';
import { PaginationModel } from './../../../../models/common';
import { debounceTime, pluck, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "stk-purchase-orders",
  templateUrl: "./purchase-orders.component.html",
  styleUrls: ["./purchase-orders.component.scss"]
})

export class PurchaseOrdersComponent implements OnInit {
    public purchaseOrder: PurchaseOrder;
    purchaseOrderList: PurchaseOrder[] = [];
    SupplierList: Supplier[] = [];
    public paginationModel: PaginationModel = new PaginationModel();

    public modalHeader: string;
    public submitButton: string;
      constructor(
        private toastr: ToastrService,
        private poService: PurchaseOrderService,
        private PoItemServive: PurchaseOrderItemService,
        public productService: ProductService) { }

    ngOnInit() {
      this.purchaseOrder = new PurchaseOrder();
      this.listPurchaseOrders(this.paginationModel.pageNo, this.paginationModel.pageSize);
      this.searchFilter();

      this.modalHeader = "Add Purchase Order";
      this.submitButton = "Save";
    }

    async addOrUpdatePurchaseOrder() {
      let req$: any;
      let action = "Added";
      let name = this.purchaseOrder.orderReference;

      if (this.purchaseOrder.id) {
        action = "Updated";
        req$ = this.poService.update(this.purchaseOrder);
      } else {
        req$ = this.poService.create(this.purchaseOrder);
      }

      try {
        await this.poService.getResponseFromSource(req$);

        this.Cancel();
        this.listPurchaseOrders(this.paginationModel.pageNo, this.paginationModel.pageSize);
        this.toastr.success(`${name} ${action} successfully.`);
      } catch (e) {
        // handle error
      }
    }

    // clear fields
    Cancel() {
      this.purchaseOrder = new PurchaseOrder();

      this.modalHeader = "Add Purchase Order";
      this.submitButton = "Save";
    }

    async listPurchaseOrders(page, pageSize, searchQry = "") {
      this.paginationModel.search = searchQry || this.paginationModel.search;
      this.paginationModel.pageNo = page;
      this.paginationModel.pageSize = pageSize;

      let req$ = this.poService.list(this.paginationModel);

      try {
        let resp = await this.poService.getResponseFromSource(req$);
        this.purchaseOrderList = resp;
        this.initPaginationModel(resp.paging);
      } catch (e) {
      }
    }

    updatePurchaseOrder(item: PurchaseOrder) {
      this.purchaseOrder = item;

      this.modalHeader = "Update Purchase Order";
      this.submitButton = "update";
    }

    async deletePurchaseOrder(item: PurchaseOrder) {
      let isConfirm = confirm(`Delete This supplier ${item.orderReference} ?.`);
      let id = item.id;
      if (isConfirm && id) {
        let req$ = this.poService.delete(id);

        try {
          await this.poService.getResponseFromSource(req$);
          this.listPurchaseOrders(this.paginationModel.pageNo, this.paginationModel.pageSize);
          this.toastr.success(`${item.orderReference} deleted successfully.`);
        } catch (e) {

        }
      }
    }

    onPageChange(event) {
      this.paginationModel.pageNo = parseInt(event);
      this.listPurchaseOrders(this.paginationModel.pageNo, this.paginationModel.pageSize);
    }

    // searchFilter
    searchFilter() {
      let searchEle = document.querySelector("#searchFilter");
      let source = fromEvent(searchEle, "keyup");

      source = source.pipe(
        debounceTime(400),
        pluck("target", "value"),
        distinctUntilChanged(),
        // filter((text: string) => text.trim().length > 2),
        switchMap((searchTerm: string) => {
          this.paginationModel.search = searchTerm;
          return this.poService.list(this.paginationModel);
        })
      );

      source.subscribe(
        (resp: any) => {
          this.purchaseOrderList = resp;
          this.initPaginationModel(resp.paging);
        },
        (err: HttpErrorResponse) => this.poService.handleError(err)
      );
    }

    initPaginationModel(pagingModel: any) {
      this.paginationModel = pagingModel;
    }
  }
