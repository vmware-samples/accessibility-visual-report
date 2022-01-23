// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HomeComponent } from './components/home/home.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'visual-report', component: HomeComponent },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, { useHash: false });
