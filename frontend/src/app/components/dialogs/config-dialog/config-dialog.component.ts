// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.css']
})
export class ConfigDialogComponent implements OnInit {

  @Output('onCloseDialog')
  onCloseDialogEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseDialog() {
    this.onCloseDialogEmitter.emit();
  }

}
