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
  @Input()
  currentPage: number;

  @Input()
  defectTypeElements;

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

  }

}
