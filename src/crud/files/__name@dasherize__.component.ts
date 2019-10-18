import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableControl } from 'src/app/shared/table-control';
import Utils from 'src/app/shared/utils';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';
import { <%= classify(name) %> } from './<%= dasherize(name) %>.model';

@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: ['./<%= dasherize(name) %>.component.scss']
})
export class <%= classify(name) %>Component implements OnInit {

  @ViewChild('createFormDirective', { static: false })
  createFormDirective: FormGroupDirective;

  tableControl: TableControl = new TableControl(() => { this.search(); });

  searchForm: FormGroup;
  createForm: FormGroup;

  selectedRow: <%= classify(name) %>;
  dataSource: <%= classify(name) %>[];
  displayedColumns: string[] = ['col1', 'col2', 'col3', 'col4', 'action'];

  constructor(
    private formBuilder: FormBuilder,
    private <%= camelize(name) %>Service: <%= classify(name) %>Service,
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      col1: [''],
      col2: [''],
      col3: [''],
      col4: [''],
    });
    this.createForm = this.formBuilder.group({
      col1: ['', Validators.required],
      col2: ['', Validators.required],
      col3: [''],
      col4: [''],
    });
    this.search();
  }

  search() {
    this.selectedRow = null;
    const param = {
      ...this.searchForm.value
      , sortColumn: this.tableControl.sortColumn
      , sortDirection: this.tableControl.sortDirection
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
    this.selectedRow = row;
    this.createForm.patchValue(this.selectedRow);
  }

  onSave() {
    if (this.createForm.invalid) {
      return;
    }
    this.<%= camelize(name) %>Service.save<%= classify(name) %>({
      data: {
        ...this.createForm.value
      }
    }).then(result => {
      if (result.status) {
        Utils.assign(this.selectedRow, result.data);
        this.createForm.patchValue(result.data);
        Utils.alertSuccess({
          text: '<%= classify(name) %> has been saved.',
        });
        this.search();
      }
    }, error => {
      Utils.alertError({
        text: '<%= classify(name) %> has not been saved.',
      });
    });
  }

}
