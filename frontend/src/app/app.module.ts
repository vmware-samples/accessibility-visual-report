// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { SummaryComponent } from './components/summary/summary.component';
import { HomeComponent } from './components/home/home.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { CodeSnippetComponent } from './components/code-snippet/code-snippet.component';
import { ConfigDialogComponent } from './components/dialogs/config-dialog/config-dialog.component';
import { HelpDialogComponent } from './components/dialogs/help-dialog/help-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ROUTING } from './app-routing.module';
import { ReportService } from './services/report.service';
import { HttpClientModule } from '@angular/common/http';
import { DragDropComponent } from './components/dialogs/drag-drop/drag-drop.component';
import { ContrastCheckerComponent } from './components/dialogs/contrast-checker/contrast-checker.component';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    HomeComponent,
    ConfigurationComponent,
    CodeSnippetComponent,
    ConfigDialogComponent,
    HelpDialogComponent,
    DragDropComponent,
    ContrastCheckerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    HttpClientModule,
    ROUTING
  ],
  providers: [
    ReportService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
