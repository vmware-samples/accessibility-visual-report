// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input()
  currentPage: number;

  @Input()
  defectTypeElements;

  @Input()
  category;

  @Input()
  defectTypeXpath: string[];

  @Input()
  isSignpost: boolean;

  @Input()
  elementDisplay: string;

  @Input()
  isNotDisplayElements: boolean;

  @Output() public onContrastCheck: EventEmitter<any> = new EventEmitter();

  isContrastCheck: boolean = false;

  constructor(
    private liveAnnouncer: LiveAnnouncer,

  ) {
   }

  ngOnInit(): void {
    if(this.isNotDisplayElements) {
      this.currentPage = 1;
    }
    this.gotoPage(this.currentPage)
  }

  gotoPage(i) {
    let lenPage = this.defectTypeElements.length;
    if (i < 1) {
      i = 1;
    } else if ( i > lenPage) {
      i = lenPage;
    }
    console.log("Will got to page: "+ String(i));
    this.currentPage = i;
    this.liveAnnouncer.announce( "You are now on: "+ this.category + this.currentPage +"of" + this.defectTypeElements.length);
  }

  openContrastDialog() {
    this.onContrastCheck.emit();
  }
}
