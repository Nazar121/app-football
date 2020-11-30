import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';

// Components
import { TeamFormComponent } from './components/team-form/team-form.component';
import { TeamLogoComponent } from './components/team-logo/team-logo.component';

const modules = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule
];

const components = [
  TeamFormComponent,
  TeamLogoComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules,
    ...components
  ]
})
export class SharedModule { }
