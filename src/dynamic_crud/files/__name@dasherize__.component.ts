import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableControl } from 'src/app/shared/table-control';
import Utils from 'src/app/shared/utils';
import { ApiService } from 'src/app/services/api.service';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';
import { <%= classify(name) %> } from './<%= dasherize(name) %>.model';
import { ApiResponse } from 'src/app/model/api-response.model';
<% if (columnListJson.filter(c => c.el_type === 'dropdown_codebook').length > 0) { %>import { Dropdown } from 'src/app/model/dropdown.model';<% } %>

@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: ['./<%= dasherize(name) %>.component.scss']
})
export class <%= classify(name) %>Component implements OnInit {

  @ViewChild('createFormDirective', { static: false })
  createFormDirective: FormGroupDirective;

  tableControl: TableControl = new TableControl(() => { this.search(); });
<% for (let column of columnListJson.filter(c => c.el_type === 'dropdown_codebook')) { %>
  <%= camelize(column.column_name.toLowerCase()) %>List: Dropdown[];<% } %>

  searchForm: FormGroup;
  createForm: FormGroup;

  isUpdate = false;
  selectedRow: <%= classify(name) %>;
  dataSource: <%= classify(name) %>[];
  displayedColumns: string[] = [<%= columnListJson.filter(c => c.is_table === 'Y').map(c => "'" + camelize(c.column_name.toLowerCase()) + "'").join(", ") %>, 'action'];

  constructor(
    public api: ApiService,
    private formBuilder: FormBuilder,
    private <%= camelize(name) %>Service: <%= classify(name) %>Service,
  ) { }

  ngOnInit() {<% if (columnListJson.filter(c => c.el_type === 'dropdown_codebook').length > 0) { %>
    api.getMultipleCodebookByCodeType({
      data: [<%= columnListJson.filter(c => c.el_type === 'dropdown_codebook').map(c => "'" + c.type_codebook + "'").join(", ") %>]
    }).then(
      result => {<% for (let column of columnListJson.filter(c => c.el_type === 'dropdown_codebook')) { %>
        this.<%= camelize(column.column_name.toLowerCase()) %>List = result.data['<%= column.type_codebook %>'];<% } %>
      }
    );<% } %>
    this.searchForm = this.formBuilder.group({<% for (let column of columnListJson.filter(c => c.is_searchable === 'Y')) { %><%= "\n      " + camelize(column.column_name.toLowerCase()) + ": ['']," %><% } %>
    });
    this.createForm = this.formBuilder.group({<% for (let column of columnListJson.filter(c => !system_fields.includes(c.column_name.toLowerCase()))) { %><%= "\n      " + camelize(column.column_name.toLowerCase()) + ": [''" + (column.is_require === 'Y' && column.is_identity === 'false' ? ', Validators.required' : '') + "]," %><% } %>
    });
    this.search();
  }

  search() {
    this.selectedRow = null;
    const param = {
      ...this.searchForm.value
      , sortColumn: this.tableControl.sortColumn
      , sortDirection: this.tableControl.sortDirection<% for (let column of columnListJson.filter(c => c.el_type === 'date' && !system_fields.includes(c.column_name.toLowerCase()))) { %><%= "\n      , " + camelize(column.column_name.toLowerCase()) + ": Utils.getDateString(this.searchForm.value['" + camelize(column.column_name.toLowerCase()) + "'])" %><% } %>
    };
    this.<%= camelize(name) %>Service.get<%= classify(name) %>List({
      pageSize: this.tableControl.pageSize,
      pageNo: this.tableControl.pageNo,
      data: param
    }).then(result => {
      this.dataSource = result.data;
      this.tableControl.total = result.total;
    }, error => {
      Utils.alertError({
        text: 'Please try again later.',
      });
    });
  }

  create() {
    this.isUpdate = false;
    this.selectedRow = {};
    this.createForm.reset();
    if (this.createFormDirective) {
      this.createFormDirective.resetForm();
    }
  }

  onSearch() {
    this.search();
  }

  onDelete(row) {
    Utils.confirmDelete().then(confirm => {
      if (confirm.value) {
        this.<%= camelize(name) %>Service.delete<%= classify(name) %>({
          data: row
        }).then(result => {
          if (result.status) {
            Utils.alertSuccess({
              text: '<%= classify(name) %> has been deleted.',
            });
            this.search();
          } else {
            Utils.alertError({
              text: '<%= classify(name) %> has not been deleted.',
            });
          }
        });
      }
    });
  }

  onSelectRow(row) {
    this.isUpdate = true;
    this.selectedRow = row;
    this.createForm.patchValue({
      ...this.selectedRow
    });
    <% for (let column of columnListJson.filter(c => c.el_type === 'date' && !system_fields.includes(c.column_name.toLowerCase()))) { %>
    if (this.selectedRow.<%= camelize(column.column_name.toLowerCase()) %>) {
      this.createForm.get('<%= camelize(column.column_name.toLowerCase()) %>').setValue(Utils.getStringForDate(this.selectedRow.<%= camelize(column.column_name.toLowerCase()) %>));
    }<% } %>
  }

  onSave() {
    if (this.createForm.invalid) {
      return;
    }

    let response: Promise<ApiResponse<any>>;
    const param = {
      ...this.createForm.value<% for (let column of columnListJson.filter(c => c.el_type === 'date' && !system_fields.includes(c.column_name.toLowerCase()))) { %><%= "\n      , " + camelize(column.column_name.toLowerCase()) + ": Utils.getDateString(this.createForm.value['" + camelize(column.column_name.toLowerCase()) + "'])" %><% } %>
    };
    if (this.isUpdate) {
      response = this.<%= camelize(name) %>Service.update<%= classify(name) %>({
        data: param
      });
    } else {
      response = this.<%= camelize(name) %>Service.create<%= classify(name) %>({
        data: param
      });
    }
    response.then(result => {
      if (result.status) {
        Utils.assign(this.selectedRow, result.data);
        this.createForm.patchValue(result.data);
        Utils.alertSuccess({
          text: '<%= classify(name) %> has been saved.',
        });
        this.search();
      } else {
        Utils.alertError({
          text: '<%= classify(name) %> has not been saved.',
        });
      }
    }, error => {
      Utils.alertError({
        text: '<%= classify(name) %> has not been saved.',
      });
    });
  }

}
