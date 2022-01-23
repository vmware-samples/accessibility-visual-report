// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import { ElementMappingService } from '../../services/element_mapping.service'
import { SchemaMappingService } from '../../services/schema_mapping.service'
import { ReportService } from '../../services/report.service'

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let elementMappingServiceSpy: any;
  let schemaMappingServiceSpy: any;
  let reportServiceSpy: any;

  beforeEach(async(() => {
    elementMappingServiceSpy = jasmine.createSpyObj('ElementMappingService', ['getUrlParams', 'vavr']);
    schemaMappingServiceSpy = jasmine.createSpyObj('SchemaMappingService', ['parseReportFromJson', 'reports']);
    reportServiceSpy = jasmine.createSpyObj('ReportService', ['postTaskId', 'getTaskStatus', 'getReportUrl']);
    let mockVavr = {
      allTags: null,
      init: async function (reports, url = "") {
        if (reports.length == 0) {
          console.log("Invalid Reports:", reports);
          return;
        }

        // load new report after override url
        if (url) { this.url = url; }
        console.log("Target URL:", this.url);
        await this.fn.getHashURL(this);
        console.log("Checkout this VAVR! ", this);
        await this.mapReport(reports);
      },
      page: null,
      report: null,
      url: "https://localhost/tagged-iframe",
      pageIframeId: '#report-tagged-iframe',
      pageUrl: '',
      xpath: {
        Locator: {},
        IframeDocs: { doc: '<html>' },
        activeElement: '<html>'
      },
    }
    elementMappingServiceSpy.getUrlParams.and.returnValue('?url=https://localhost/&report=https://localhost/assets/sample_data/report.json');
    elementMappingServiceSpy.vavr.and.returnValue(mockVavr);
    schemaMappingServiceSpy.parseReportFromJson.and.returnValue([{
      defects: [{
        name: "h3",
        sevirity: "A",
        panelOpen: false
      }],
      originalUrl: "https:// www.accessibility-visual-report.com/",
      pageTitle: "vTaaS",
      pageUrl: "https:// www.accessibility-visual-report.com/"
    }]);
    schemaMappingServiceSpy.reports.and.returnValue([{
      defects: [{
        name: "h3",
        sevirity: "A",
        panelOpen: false
      }],
      originalUrl: "https:// www.accessibility-visual-report.com/",
      pageTitle: "vTaaS",
      pageUrl: "https:// www.accessibility-visual-report.com/"
    }]);
    reportServiceSpy.postTaskId.and.returnValue('id123');
    reportServiceSpy.getTaskStatus.and.returnValue('status');
    reportServiceSpy.getReportUrl.and.returnValue('https://testurl');

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: ElementMappingService, useValue: elementMappingServiceSpy },
      { provide: SchemaMappingService, useValue: schemaMappingServiceSpy },
      { provide: ReportService, useValue: reportServiceSpy }],
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('test function popOutAndIn() return value if', () => {
    component.popOut = true
    component.popOutAndIn();
    expect(component.popOut).toBe(false)
    expect(component.popOutInImg).toEqual('images/expand.svg');
  });

  it('test function popOutAndIn() return value else', () => {
    component.popOut = false
    component.popOutAndIn();
    expect(component.popOut).toBe(true)
    expect(component.popOutInImg).toEqual('images/collapse.svg');
  });

  it('test function clickLeftToPage()', () => {
    component.clickLeftToPage()
    expect(component.floating).toBe(false)
    expect(component.rightToPage).toBe(false)
  });

  it('test function clickRightToPage()', () => {
    component.clickRightToPage()
    expect(component.floating).toBe(false)
    expect(component.rightToPage).toBe(true)
  });

  it('test function clickFloatToPage()', () => {
    component.clickFloatToPage()
    expect(component.floating).toBe(true)
    expect(component.rightToPage).toBe(false)
  });

  it('test function changePositionOfSignpost()', () => {
    var dummyElement = document.createElement('div');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    dummyElement.style.display = 'block'
    component.changePositionOfSignpost()
  });

  it('test function onMousemove()', () => {
    let mockEvent = {
      timeStamp: '',
      clientX: 100,
      clientY: 356,
      toElement: {
        id: 1
      }
    }
    component.isDown = true
    component.floating = false
    component.diffX = 65
    component.diffY = 35
    component.onMousemove(mockEvent)
    expect(component.moveX).toBe(35)
  });

  // it('test function onMousemove(), this.moveX < 0', () => {
  //   let mockEvent = {
  //     timeStamp: '',
  //     clientX: 5,
  //     clientY: 8,
  //     toElement: {
  //       id:undefined
  //     }
  //   }
  //   component.isDown = true
  //   component.floating = true
  //   component.diffX = 65
  //   component.diffY = 35
  //   component.onMousemove(mockEvent)
  //   expect(component.moveX).toBe(0)
  // });
  it('test function onMouseup()', () => {
    let mockEvent
    component.isDown = true
    component.onMouseup(mockEvent)
    expect(component.isDown).toBe(false)
    expect(component.startTime).toBe(0)
  });

  it('test function selectUrl()', () => {
    let mockReport = {
      pageUrl: 'https:// www.accessibility-visual-report.com',
      pageTitle: 'vtaas test title',
      originalUrl: 'https:// www.accessibility-visual-report.com'
    }
    component.selectUrl(mockReport)
    expect(component.selectedUrl).toEqual('https:// www.accessibility-visual-report.com')
    expect(component.pageTitle).toEqual('vtaas test title')
    expect(component.originalUrl).toEqual('https:// www.accessibility-visual-report.com')
  });

  // it('test function refreshPage()', () => {
  //   component.selectedUrl = 'https:// www.accessibility-visual-report.com'
  //   component.refreshPage()
  // });
  it('test function closeMenu()', () => {
    component.closeMenu()
    expect(component.isMenuClosed).toBe(true)
  });

  it('test function showOrHideIssueList()', () => {
    let mockDefectTp = {
      isShowIssueList: true,
      showOrHideBreakdown: 'show breakdown'
    }
    component.showOrHideIssueList(mockDefectTp)
    expect(mockDefectTp.isShowIssueList).toBe(false)
    expect(mockDefectTp.showOrHideBreakdown).toEqual('show breakdown')
  });

  it('test function showOrHideIssueList()', () => {
    let mockDefectTp = {
      isShowIssueList: false,
      showOrHideBreakdown: 'hide breakdown'
    }
    component.showOrHideIssueList(mockDefectTp)
    expect(mockDefectTp.isShowIssueList).toBe(true)
    expect(mockDefectTp.showOrHideBreakdown).toEqual('hide breakdown')
  });

  it('test function expandMenu()', () => {
    var dummyElement = document.createElement('div');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    component.expandMenu()
    expect(component.isMenuClosed).toBe(false)
  });

  it('test function collapse(),if isMemuExpanded', () => {
    var dummyElement = document.createElement('div');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    component.isMemuExpanded = true
    component.rightToPage = true
    component.collapse()
    expect(component.isMemuExpanded).toBe(false)
  });

  it('test function collapse(),if isMemuExpanded', () => {
    var dummyElement = document.createElement('div');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    component.isMemuExpanded = false
    component.rightToPage = true
    component.collapse()
    expect(component.isMemuExpanded).toBe(true)
  });

  it('test function getTestResults()', () => {
    elementMappingServiceSpy.vavr = {
      report: {
        defects: [
          {
            category: "Issues",
            name: "label_missing",
            sevirity: "A",
            defectTypeElements: [],
            elementIds: ["3", "3"],
            panelOpen: false
          },
          {
            category: "Alerts",
            name: "label_missing",
            sevirity: "A",
            defectTypeElements: [],
            elementIds: ["3", "3"],
            panelOpen: false
          }
        ],
        elements: [
          {
            code: "",
            elementId: "-1",
            elementLocator: "HTML > HEAD:first-child + BODY > MY-APP:first-child > CLR-MAIN-CONTAINER:first-child > CLR-MODAL:first-child + CLR-MODAL + DIV > FORM:first-child > LABEL:first-child + DIV > INPUT#user",
            elementObject: null
          }
        ]
      }
    }
    component.getTestResults()
    expect(component.defectList).toEqual([
      {
        category: "Issues",
        name: "label_missing",
        sevirity: "A",
        defectTypeElements: [],
        elementIds: ["3", "3"],
        panelOpen: false
      },
      {
        category: "Alerts",
        name: "label_missing",
        sevirity: "A",
        defectTypeElements: [],
        elementIds: ["3", "3"],
        panelOpen: false
      }
    ])
  });

  it('test function syncSelectionFormPanelToPage()', () => {
    component.defectTypeList = [{
      category: 'Issues',
      defectList: [
        {
          category: 'Issues',
          name: 'label_missing',
          sevirity: 'A',
          defectTypeElements: [],
          elementIds: [ '-1', '-1' ],
          panelOpen: false
        }
      ],
      totalDefect: 0,
      defectNumBgColor: 'red',
      defectNumFontColor: 'red',
      eyeHide: false,
      isShowIssueList: false,
      showOrHideBreakdown: 'show breakdown'
    }]
    elementMappingServiceSpy.vavr = {
      report: {
        defects: [
          {
            category: "Issues",
            name: "label_missing",
            sevirity: "A",
            defectTypeElements: [],
            elementIds: ["3", "3"],
            panelOpen: false
          },
          {
            category: "Alerts",
            name: "label_missing",
            sevirity: "A",
            defectTypeElements: [],
            elementIds: ["3", "3"],
            panelOpen: false
          }
        ],
        elements: [
          {
            code: "",
            elementId: "-1",
            elementLocator: "HTML > HEAD:first-child + BODY > MY-APP:first-child > CLR-MAIN-CONTAINER:first-child > CLR-MODAL:first-child + CLR-MODAL + DIV > FORM:first-child > LABEL:first-child + DIV > INPUT#user",
            elementObject: null
          }
        ]
      }
    }
    component.syncSelectionFormPanelToPage()
  });

  it('test function hasClass()', () => {
    let mockelEment = {
      className: ''
    }
    let mockcName = 'cName'
    component.hasClass(mockelEment, mockcName)
    //expect(component.isMemuExpanded).toBe(false)
  });

  it('test function addClass()', () => {
    let mockelEment = {
      className: ''
    }
    let mockcName = 'cName'
    component.addClass(mockelEment, mockcName)
    //expect(component.isMemuExpanded).toBe(false)
  });

  it('test function removeClass()', () => {
    let mockelEment = {
      className: ' '
    }
    let mockcName = 'cName'
    component.removeClass(mockelEment, mockcName)
    //expect(component.isMemuExpanded).toBe(false)
  });
});
