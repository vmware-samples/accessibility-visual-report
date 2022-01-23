// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent implements OnInit {

  @Output('onCloseDialog')
  onCloseDialogEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseDialog() {
    this.onCloseDialogEmitter.emit();
  }

}
