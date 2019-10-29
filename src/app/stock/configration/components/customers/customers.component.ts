import { Component, OnInit } from "@angular/core";
import { Customer } from "./../../../../models/index";
import { PaginationModel } from "./../../../../models/common";
import { CustomerService } from './../../../../services/app.services';
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "stk-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"]
})

export class CustomersComponent implements OnInit {
  public customer: Customer;
  public paginationModel: PaginationModel;
  customerList: Customer[] = [];

  public modalHeader: string;
  public submitButton: string;
  constructor(private customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit() {
    this.customer = new Customer();
    this.paginationModel = new PaginationModel();
    this.GetAllCustomers(this.paginationModel.currentPage, this.paginationModel.pageSize, this.paginationModel.search);


    this.modalHeader = "Add Customer";
    this.submitButton = "Save";
  }

  async AddOrUpdateCustomer() {
    let req$: any;
    let action = "Added";
    let name = this.customer.name;

    if (this.customer.id) {
      action = "Updated";
      req$ = this.customerService.update(this.customer);
    } else {
      req$ = this.customerService.create(this.customer);
    }

    try {
      await this.customerService.getResponseFromSource(req$);

      this.Cancel();
      this.GetAllCustomers(this.paginationModel.currentPage, this.paginationModel.pageSize);
      this.toastr.success(`${name} ${action} successfully.`);
    } catch (error) {

    }
  }


  // clear fields
  Cancel() {
    //@ts-ignore
    this.customer = new Customer()

    this.modalHeader = "Add Customer";
    this.submitButton = "Save";
  }

  Update(cust: Customer) {
    this.customer = cust;

    this.modalHeader = "Update Supplier";
    this.submitButton = "update";
  }

  async Delete(cust: Customer) {
    let custName = `${cust.name} ${cust.name}`;
    let isConfirm = confirm(`Delete This supplier ${custName}?.`);
    let id = cust.id;

    if (isConfirm && id) {
      let req$ = this.customerService.delete(id);

      try {
        await this.customerService.getResponseFromSource(req$);

        this.GetAllCustomers(this.paginationModel.currentPage, this.paginationModel.pageSize);
        this.toastr.success(`${custName} deleted successfully.`);
      } catch (error) {

      }
    }

  }

  async GetAllCustomers(page, pageSize, searchQry = "") {
    searchQry = searchQry || "";

    // let req$ = this.InvLocationService.getAll(page, pageSize, searchQry);
    let req$ = this.customerService.list();

    try {
      this.customerList = await this.customerService.getResponseFromSource(req$);
    } catch (error) {

    }
  }
}
