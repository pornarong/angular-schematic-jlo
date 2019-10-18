import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';
import { SharedModule } from 'src/app/shared/module/shared.module';

const <%= classify(name) %>Routes: Routes = [
  {
    path: '',
    component: <%= classify(name) %>Component
  }
];

@NgModule({
  declarations: [<%= classify(name) %>Component],
  imports: [
    RouterModule.forChild(<%= classify(name) %>Routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class <%= classify(name) %>Module { }
