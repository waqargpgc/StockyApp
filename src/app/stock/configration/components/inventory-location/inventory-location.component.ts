import { InventoryLocationService } from './../../../../services/app.services';
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from "./../../../../models/index";


@Component({
  selector: "stk-inventory-location",
  templateUrl: "./inventory-location.component.html",
  styleUrls: ["./inventory-location.component.scss"]
})
export class InventoryLocationComponent implements OnInit {
  public location: Location = new Location();

  public modalHeader: string;
  public submitButton: string;

  inventoryList: Location[] = [];
  public totalElements = 0;
  public page: number = 1;
  public pageSize: number = 13;
  public Search: string;

  // public metaObj = {
  //   firstRecordOnPage: 0,
  //   lastRecordOnPage: 0,
  //   hasNext: 0,
  //   hasPrevious: 0,
  //   totalPages: 0,
  //   totalRecords: 0,
  // }

  constructor(
    private toastr: ToastrService,
    private invLocationService: InventoryLocationService) { }

  ngOnInit() {
    this.GetInventoryLocations(this.page, this.pageSize, this.Search);
    this.modalHeader = "Add Location";
    this.submitButton = "Save";
  }

  async AddOrUpdateLocation() {
    let req$: any;
    let action = "Added";
    let loc = this.location.name;

    if (this.location.id) {
      action = "Updated";
      req$ = this.invLocationService.update(this.location);
    } else {
      req$ = this.invLocationService.create(this.location);
    }

    try {
      await this.invLocationService.getResponseFromSource(req$);

      this.Cancel();
      this.GetInventoryLocations(this.page, this.pageSize);
      this.toastr.success(`${loc} ${action} successfully.`);
    } catch (error) {
    }

  }

  // clear fields
  Cancel() {
    this.location = new Location();

    this.modalHeader = "Add Location";
    this.submitButton = "Save";
  }

  Update(loc: Location) {
    this.location = loc;

    this.modalHeader = "Update Supplier";
    this.submitButton = "update";
  }

  async Delete(invLocation: Location) {
    let isConfirm = confirm(`Delete This supplier ${invLocation.name} ?.`);
    let id = invLocation.id;
    if (isConfirm && id) {
      let req$ = this.invLocationService.delete(id);

      try {
        await this.invLocationService.getResponseFromSource(req$);


        this.GetInventoryLocations(this.page, this.pageSize);
        this.toastr.success(`${invLocation.name} deleted successfully.`);
      } catch (error) {
      }

    }

  }

  async GetInventoryLocations(page, pageSize, searchQry = "") {
    searchQry = searchQry || this.Search;
    // let req$ = this.InvLocationService.getAll(page, pageSize, searchQry);
    let req$ = this.invLocationService.list();
    try {
      this.inventoryList=  await this.invLocationService.getResponseFromSource(req$);

    } catch (error) {
    }
  }
}
