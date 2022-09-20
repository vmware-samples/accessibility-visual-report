// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { Component, OnInit, HostListener } from '@angular/core';
import { Input, EventEmitter } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  // @Input()
  currentPage: number;

  @Input()
  defectTypeElements;

  @Input()
  category;

  @Input()
  defectTypeXpath: string[];

  element : any = null;
  issueOnTitle : string = "";

  allElements = [
    {
      sevirity: 'A',
      description: 'A link contains no text.',
      code: '<span>iris_circle</span>',
      actions: 'Remove the empty link or provide text within the link that describes the functionality and/or target of that link.'
    },
    {
      sevirity: 'AA',
      description: 'A link contains no text.',
      code: '<span>description portrait</span>',
      actions: 'Sescribes the functionality and/or target of that link.'
    },
    {
      sevirity: 'A',
      description: 'A link contains no text.',
      code: '<span>missing alternative text.</span>',
      actions: 'Remove the empty link or provide text within the link/'
    }
  ]

  constructor(
    private liveAnnouncer: LiveAnnouncer,

  ) {
   }

  ngOnInit(): void {
    // delay 300ms to avoid out of sync
    setTimeout(()=>{
      let newCurrentPage = Number(document.getElementById('numberSign').innerText);
      if (newCurrentPage != this.currentPage) {
        this.gotoPage(newCurrentPage);
      }
    },300)
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
    this.element = this.defectTypeElements[this.currentPage-1];
    this.issueOnTitle = this.category + ' ' + this.currentPage +"/" + lenPage
    this.liveAnnouncer.announce( "You are now on: "+ this.issueOnTitle.replace("/"," of "))
  }
}
