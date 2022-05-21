// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { Component, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';
import '@cds/core/accordion/register.js';
import { SchemaMappingService } from '../../services/schema_mapping.service';
import { ElementMappingService } from '../../services/element_mapping.service';
import { Defect } from '../../model/report';
import { groupBy, remove, concat } from 'lodash';
import { ReportService } from '../../services/report.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DragDropComponent } from '../dialogs/drag-drop/drag-drop.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isMenuClosed: boolean = false;
  showConfigDialog = false;
  showHelpDialog = false;
  isDown = false;
  floating = false;
  popOut = true;
  rightToPage = false;

  diffX: number; // The location of the click event X
  diffY: number; // The location of the click event Y

  moveX: number;
  moveY: number;

  startTime = 0;

  selectedUrl: string;
  selectedReport: string = null;
  pageTitle: string = null;
  originalUrl: string = null;
  popOutInImg: string;
  isLoading: boolean = false;

  issues: any;
  eyeHide: boolean = false;
  isShowIssueList: boolean = false;
  defectTypeList: any[];
  defectList: Defect[];
  totalIssue: number = 0;
  alldefects: any[];
  visibleEle: any[];
  numberSign: number = 1;
  defectName: string;
  signpostPosition: string = 'bottom-right';
  isMemuExpanded: boolean = true;
  isTabPanelTopage: boolean = false;
  selectElement: any;

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private schema_mapping: SchemaMappingService,
    private element_mapping: ElementMappingService,
    private reportService: ReportService) {
   }

  async ngOnInit() {
    this.isLoading = true;
    // URL Params
    // Expected URL example: localhosts/?url=https://localhost/assets/sample_data/sample.html&report=https://localhost/assets/sample_data/report.json
    let urlParams = this.element_mapping.getUrlParams(window.location.href);
    let url = urlParams.has('url')? urlParams.get('url'): '';
    let report = urlParams.has('report')?urlParams.get('report'):'';
    report = decodeURIComponent(report);
    this.selectedReport = report;

    /**
     * OnInit Fetech JSON report
     * Get reports from this.schema_mapping.reports
     */
    if(report) {
      await this.schema_mapping.parseReportFromJson(report);
    }

    /**
     * This section could be moved to function against "Confirm" button
     * Get report against this url from this.element_mapping.vavr.report
     * To get issue list, please access
     *    issues = this.element_mapping.vavr.report.issues
     * To get issue details, please access
     *    issue_doc = this.element_mapping.vavr.report.docs.<issue_name>
     *    issue_summary = issue_doc.summary;
     *    issue_actions = issue_doc.actions;
     *    issue_details = issue_doc.details;
     *    guideline_reference_url = issue_doc.guideline_reference_url;
     * To get each element, please access
     *    oneElementId = issues.elementIds[0]
     *    element_info = elements.find(element => { return element.elementId == oneElementId; })
     *    if found;
     *    elementCode = element_info.code
     *    elementLocator = element_info.elementLocator  // raw locator get from JSON report
     */
    if(url) {
      url = decodeURIComponent(url);
      this.selectedUrl = url;
      await this.element_mapping.vavr.init(this.schema_mapping.reports, this.selectedUrl);
      this.pageTitle = this.element_mapping.vavr.report.pageTitle;
      this.originalUrl = this.element_mapping.vavr.report.originalUrl;
      // query default results
      this.getTestResults();
    }
    this.isLoading = false;

    // insert style into iframe
    this.insertStyleIntoPage();

    // display SignpostToPage
    this.displaySignpostToPage();

    this.popOutInImg = 'images/collapse.svg';
    document.getElementById('report-tagged-iframe').style.width = window.innerWidth - 390 + 'px';
  }

  insertStyleIntoPage(){
    let allDocsOfPages:Document[] = Object.values(this.element_mapping.vavr.xpath.IframeDocs);
    allDocsOfPages.forEach( doc => {
      //insert style into iframe
      var style = doc.createElement("style");
      style.type = "text/css";
      try{
      　　style.appendChild(doc.createTextNode(".dashed-border-sign{outline:#C92100 dashed 2px!important}"));
          style.appendChild(doc.createTextNode(".solid-border-sign{outline:#C92100 solid 6px!important}"));
          style.appendChild(doc.createTextNode("button:focus,a:focus{5px auto -webkit-focus-ring-color!important}"));
      }catch(ex){
          console.log("Visual Report is not supported by Browser.")
      　　// style.styleSheet.cssText = ".dashed-border-sign{outline:#C92100 dashed 2px!important;};.solid-border-sign{outline:#C92100 solid 6px!important;}";//IE
      }
      var head = doc.getElementsByTagName("head")[0];
      head.appendChild(style);
      //prevent defalt event of <a> tags in iframe
      $(doc.getElementsByTagName("a")).each(function () {
        $(this).css("cursor", "default");
        $(this).attr('href', 'JavaScript：void(0)');
        $(this).click(function (event) {
          event.preventDefault();
        });
      });
      $(doc.querySelectorAll("input[type='submit']")).each(function () {
        $(this).click(function (event) {
          event.preventDefault();
        });
      })
    });
  }

  displaySignpostToPage(){
    const _this = this;
    let allDocsOfPages:Document[] = Object.values(this.element_mapping.vavr.xpath.IframeDocs);
    allDocsOfPages.forEach( doc => {
      doc.addEventListener("click",function(event) {
        _this.displaySignpost(event);
      });
      doc.addEventListener("keydown",function(event) {
        if(event.keyCode == 27 && _this.isTabPanelTopage){
          _this.selectElement.focus();
          _this.isTabPanelTopage = false;
        }
      })
     });

  }

  getTestResults() {
    this.defectList = this.element_mapping.vavr.report.defects;
    const categoryGroup = groupBy(this.defectList, d => d.category);

    this.defectTypeList = [];
    let m = 0;
    for(let key in categoryGroup) {
      let defectList: Defect[] = categoryGroup[key];
      let totalDefect = 0;
      for(var i = 0; i<defectList.length; i++) {
        defectList[i].defectTypeElements = [];
        totalDefect += defectList[i].elementIds.filter(e => e !== "-1").length;
        for(var j = 0; j<defectList[i].elementIds.length; j++) {
          const element_info = this.element_mapping.vavr.report.elements.find(ele => {return ele.elementId == defectList[i].elementIds[j]});
          if(element_info && element_info.elementId !== "-1") {
            defectList[i].defectTypeElements.push({
              name: defectList[i].name,
              title: defectList[i].title,
              sevirity: defectList[i].sevirity,
              description: this.element_mapping.vavr.report.docs[defectList[i].name].summary,
              action: this.element_mapping.vavr.report.docs[defectList[i].name].actions,
              code: element_info.code,
              elementId: element_info.elementId,
              elementObject: element_info.elementObject
            })
            defectList[i].panelOpen = false;
          }
        }
      }
      let eyeHide = true;
      let defectNumBgColor = '#FFB565';
      let defectNumFontColor ='#000000';
      if(m == 0) {
        eyeHide = false;
        defectNumBgColor = '#C92100';
        defectNumFontColor = '#FFFFFF';
      }
      remove(defectList, d => d.defectTypeElements.length == 0);
      this.defectTypeList.push({
          category: key,
          defectList: defectList,
          totalDefect: totalDefect,
          defectNumBgColor: defectNumBgColor,
          defectNumFontColor: defectNumFontColor,
          eyeHide: eyeHide,
          eyeHideArialLabel: (eyeHide?'Show ':'Hide ')+ totalDefect +' '+ key +' on page',
          eyeHideDoneArialLabel:  totalDefect +' '+ key +' '+(eyeHide?'shown':'hidden'),
          isShowIssueList: false,
          showOrHideBreakdown: 'Show ' +key+' breakdown'  
        });
      m++;
    }

    this.syncSelectionFormPanelToPage();
  }

  syncSelectionFormPanelToPage(defectTp=null) {
    if (defectTp) {
      defectTp.eyeHideArialLabel= (defectTp.eyeHide?'Hide ':'Show ')+ defectTp.totalDefect +' '+ defectTp.category +' on page';
      defectTp.eyeHideDoneArialLabel= defectTp.totalDefect +' '+ defectTp.category +' '+(defectTp.eyeHide?'shown':'hidden');  
      this.liveAnnouncer.announce( defectTp.eyeHideDoneArialLabel)
      defectTp.eyeHide=!defectTp.eyeHide;
    }
    const visibleTypeDefects = this.defectTypeList.filter(d => !d.eyeHide);
    this.alldefects = [];
    for(var i = 0; i < visibleTypeDefects.length; i++) {
      for(var j = 0; j < visibleTypeDefects[i].defectList.length; j++) {
        this.alldefects = concat(this.alldefects, visibleTypeDefects[i].defectList[j].defectTypeElements);
      }
    }
    this.removeAddAndborderStyleToEle(this.alldefects);
  }

  removeAddAndborderStyleToEle(alldefects) {
    this.element_mapping.vavr.report.elements.map(elt => {
      if (elt.elementId != "-1") {
        elt.elementObject.removeAttribute('element-id');
        elt.elementObject.classList.remove('dashed-border-sign');
        elt.elementObject.classList.remove('solid-border-sign');
      }
    });

    const eleGrop = groupBy(alldefects, d => d.elementId);
    let m = 1;
    this.visibleEle = [];
    for(let key in eleGrop) {
      // const ele = window.frames["report-tagged-iframe"].document.querySelector(`[data-vavrid='${key}']`);
      const ele = eleGrop[key][0]["elementObject"];
      if (m==1) {
        this.element_mapping.vavr.xpath.activeElement = ele;
      }
      ele.classList.add('dashed-border-sign');
      ele.setAttribute('element-id', m);
      ele.setAttribute('data-vavrid', key);
      m++;
      this.visibleEle.push(eleGrop[key][eleGrop[key].length - 1]);
    }
  }

  displaySignpost(event) {
    const solidBorderSign = event.toElement || event.srcElement;
    if(solidBorderSign && solidBorderSign.className.indexOf('dashed-border-sign') !== -1) {
      this.removeClass(this.element_mapping.vavr.xpath.activeElement, 'solid-border-sign');
      this.element_mapping.vavr.xpath.activeElement = solidBorderSign;
      this.addClass(solidBorderSign, 'solid-border-sign');
      this.appendSignPostToEle(solidBorderSign);
    }
  }

  appendSignPostToEle(solidBorderSign) {
    const signpostTriggersWrapper = document.getElementById('signpost-triggers-wrapper');
    signpostTriggersWrapper.style.display = 'block';

    this.fixedSignpost(solidBorderSign, signpostTriggersWrapper);

    this.numberSign = Number(solidBorderSign.getAttribute('element-id'));
    document.getElementById('numberSign').innerText = String(this.numberSign);
    this.defectName = this.visibleEle.find(d => d.elementId == this.element_mapping.vavr.xpath.activeElement.getAttribute('data-vavrid')).name;
  }



  fixedSignpost(solidBorderSign, signpostTriggersWrapper) {
    let stwOffsetleft;
    if(this.floating == false && this.rightToPage == false && this.isMemuExpanded) {
      stwOffsetleft = solidBorderSign.getBoundingClientRect().left + 390;
    } else {
      stwOffsetleft = solidBorderSign.getBoundingClientRect().left;
    }

    const stwOffsetTop = solidBorderSign.getBoundingClientRect().top;
    const stwOffsetHeight = solidBorderSign.offsetHeight;
    const stwOffsetWidth = solidBorderSign.offsetWidth;
    const signpostHeight = 480;
    const signpostWidth = 370;
    const totalHeight = stwOffsetTop + stwOffsetHeight + signpostHeight;
    const totalWidth = stwOffsetleft + stwOffsetWidth + signpostWidth;
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    let subtractWidth;
    if(document.getElementById('menu-content-fixed').offsetWidth == 390) {
      if(this.floating || this.rightToPage) {
        subtractWidth = 10;
      } else if(document.getElementById('menu-content-fixed').offsetWidth == 390) {
        subtractWidth = 17;
      }
    } else {
      subtractWidth = 10;
    }

    if(totalHeight < windowHeight && totalWidth < windowWidth) {
      this.signpostPosition = 'bottom-right';
      signpostTriggersWrapper.style.top =  stwOffsetTop + stwOffsetHeight - 10 + 'px';
      signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
    } else if(totalHeight > windowHeight && signpostHeight > stwOffsetTop && totalWidth > windowWidth) {
      this.signpostPosition = 'left-middle';
      signpostTriggersWrapper.style.top =  stwOffsetTop - 10 + 'px';
      signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
    } else if(totalHeight > windowHeight && signpostHeight > stwOffsetTop && totalWidth < windowWidth) {
      this.signpostPosition = 'right-middle';
      signpostTriggersWrapper.style.top =  stwOffsetTop - 10 + 'px';
      signpostTriggersWrapper.style.left = stwOffsetleft + stwOffsetWidth - subtractWidth + 'px';
    } else if(totalHeight > windowHeight && signpostHeight < stwOffsetTop  && totalWidth < windowWidth) {
      this.signpostPosition = 'top-right';
      signpostTriggersWrapper.style.top =  stwOffsetTop - 10 + 'px';
      signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
    } else if(totalHeight > windowHeight && signpostHeight < stwOffsetTop && totalWidth > windowWidth) {
      this.signpostPosition = 'top-left';
      signpostTriggersWrapper.style.top =  stwOffsetTop - 10 + 'px';
      signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
    } else if(totalHeight < windowHeight && totalWidth > windowWidth) {
      this.signpostPosition = 'bottom-left';
      signpostTriggersWrapper.style.top =  stwOffsetTop + stwOffsetHeight - 10 + 'px';
      signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
    }
    const e = document.createEvent("MouseEvents");
    e.initEvent("click", true, true);
    document.getElementById("numberSign").dispatchEvent(e);
    document.getElementById("numberSign").dispatchEvent(e);
  }

  addAndRemoveBorderStyle(allDashborderElement, elementId) {
    this.removeClass(this.element_mapping.vavr.xpath.activeElement, 'solid-border-sign');
    for(var i = 0; i< allDashborderElement.length; i++) {
      if(Number(allDashborderElement[i].getAttribute('element-id')) == elementId){
        this.element_mapping.vavr.xpath.activeElement = allDashborderElement[i];
        this.addClass(allDashborderElement[i], 'solid-border-sign');
        this.appendSignPostToEle(allDashborderElement[i]);
      }
    }
    this.defectName = this.visibleEle.find(d => d.elementId == this.element_mapping.vavr.xpath.activeElement.getAttribute('data-vavrid')).name;
  }

  openPanel(defectType, defectTypes) {
    if(defectType.panelOpen) {
      defectType.panelOpen = false;
      this.removeClass(this.element_mapping.vavr.xpath.activeElement, 'solid-border-sign');
      const signpostTriggersWrapper = document.getElementById('signpost-triggers-wrapper');
      signpostTriggersWrapper.style.display = 'none';
    } else {
      defectType.panelOpen = true;
      for(let t of defectTypes.filter(d => d.name !== defectType.name)){
        t.panelOpen = false;
      }
      this.removeAddAndborderStyleToEle(defectType.defectTypeElements);

      const allDashborderElement:HTMLElement[] = [];
      this.element_mapping.vavr.report.elements.map(elt => {
        if (elt.elementId != "-1") { allDashborderElement.push(elt.elementObject); }
      });
      this.addAndRemoveBorderStyle(allDashborderElement, 1);
    }
    this.liveAnnouncer.announce("test")
  }
  announce(defectType) {
    this.liveAnnouncer.announce("test")
  }

  @HostListener('document:click', ['$event']) onClick(event) {
    // const allDashborderElement = window.frames["report-tagged-iframe"].document.getElementsByClassName('dashed-border-sign');
    const allDashborderElement:HTMLElement[] = [];
    if(this.originalUrl) {
      this.element_mapping.vavr.report.elements.map(elt => {
        if (elt.elementId != "-1") { allDashborderElement.push(elt.elementObject); }
      });
      if(this.hasClass(event.srcElement, 'pagination-next', true)) {
        const nextElementId = Number(this.element_mapping.vavr.xpath.activeElement.getAttribute('element-id')) + 1;
        console.log(nextElementId)
        this.addAndRemoveBorderStyle(allDashborderElement, nextElementId);
      } else if(this.hasClass(event.srcElement, 'pagination-previous', true)) {
        const previousElementId = Number(this.element_mapping.vavr.xpath.activeElement.getAttribute('element-id')) - 1;
        console.log(previousElementId)
        this.addAndRemoveBorderStyle(allDashborderElement, previousElementId);
      } else if(this.hasClass(event.srcElement, 'pagination-first', true)) {
        console.log(1)
        this.addAndRemoveBorderStyle(allDashborderElement, 1);
      } else if(this.hasClass(event.srcElement, 'pagination-last', true)) {
        console.log(allDashborderElement.length)
        this.addAndRemoveBorderStyle(allDashborderElement, allDashborderElement.length);
      }
    }
  }

  hasClass( element,cName,checkAncestor=false){
    if (!checkAncestor) {
      return !!(element? element.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ): false);
    } else {
      if (!element) {
        return false;
      } else {
        if (element.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ) ) {
          return true;
        } else {
          return this.hasClass(element.parentElement,cName,true);
        }
      }
    }
  }

  addClass( element,cName ){
    if( !this.hasClass( element,cName ) ){
      element.className += " " + cName;
    };
  }

  removeClass( elements,cName ){
    if( this.hasClass( elements,cName ) ){
      elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " );
    }
  }

  popOutAndIn() {
    if(this.popOut) {
      this.popOut = false;
      this.popOutInImg = 'images/expand.svg';
    } else {
      this.popOut = true;
      this.popOutInImg = 'images/collapse.svg';
    }
  }

  clickLeftToPage() {
    this.floating = false;
    this.rightToPage = false;
    this.changePositionOfSignpost();
  }

  clickRightToPage() {
    this.floating = false;
    this.rightToPage = true;
    this.changePositionOfSignpost();
    document.getElementById('report-tagged-iframe').style.width = window.innerWidth - 390 + 'px';
    document.getElementById('menu-content-fixed').style.left = window.innerWidth - 390 + 'px';
  }

  clickFloatToPage() {
    this.floating = true;
    this.rightToPage = false;
    this.changePositionOfSignpost();
    document.getElementById('report-tagged-iframe').style.width = '100%';
    document.getElementById('menu-content-fixed').style.left = '120px';
  }

  changePositionOfSignpost() {
    const signpostTriggersWrapper = document.getElementById('signpost-triggers-wrapper');
    if(signpostTriggersWrapper.style.display == 'block') {
      setTimeout(() => {
        this.fixedSignpost(this.element_mapping.vavr.xpath.activeElement, signpostTriggersWrapper);
      }, 500)
    }
  }

  @HostListener('document:mousedown', ['$event']) onMousedown(event) {
    this.isDown = true;
    var event = event || window.event;

    this.startTime = event.timeStamp;
    const dragRef = document.getElementById('menu-content-fixed');
    this.diffX = event.clientX - dragRef.offsetLeft;
    this.diffY = event.clientY - dragRef.offsetTop;

    event.stopPropagation();
    // 获取需要排除的元素
    const solidBorderSign = event.toElement || event.srcElement;
    var elemCancel = solidBorderSign.id == 'pop-out-in' || solidBorderSign.id == 'pop-outIn-img';
    // 如果拖拽的是排除元素，函数返回
    if (elemCancel) {
      return true;
    }
  }

  @HostListener('document:mousemove', ['$event']) onMousemove(event) {
    if (this.isDown) {
      var event = event || window.event;
      this.moveX = event.clientX - this.diffX;
      this.moveY = event.clientY - this.diffY;

      const dragRef = document.getElementById('menu-content-fixed');
      // 获取需要排除的元素
      const solidBorderSign = event.toElement || event.srcElement;
      var elemCancel = solidBorderSign.id == 'pop-out-in' || solidBorderSign.id == 'pop-outIn-img';
      if (!this.floating || elemCancel) {
        return true;
      }

      if(this.moveX < 0){
        this.moveX = 0
      }else if(this.moveX > window.innerWidth - dragRef.offsetWidth){
        this.moveX = window.innerWidth - dragRef.offsetWidth
      }
      if(this.moveY < 0){
        this.moveY = 0
      }else if(this.moveY > window.innerHeight - dragRef.offsetHeight){
        this.moveY =  window.innerHeight - dragRef.offsetHeight
      }

      dragRef.style.left = this.moveX + 'px';
      dragRef.style.top = this.moveY + 'px';
    }
  }

  @HostListener('document:mouseup', ['$event']) onMouseup(event) {
    if (this.isDown) {
      this.isDown = false;
    }
    this.startTime = 0;
  }

  selectUrl(report) {
    this.selectedUrl = report.pageUrl;
    this.pageTitle = report.pageTitle;
    this.originalUrl = report.originalUrl;
  }

  isHaveInvalidUrls = false;
  invalidUrls: any = [];
  entriedUrl: string[] = [];
  /**
   * drag drop file
   * @method dragDropFile
   * @param {any} event
   * @public
   */
  dragDropFile(event) {
      this.isHaveInvalidUrls = false;
      let validUrls = event.validUrls;
      this.invalidUrls = event.invalidUrls;
      this.entriedUrl = event.allUrls;

      this.isInputURLsEmpty();
      if (this.invalidUrls.length > 0) {
          this.isHaveInvalidUrls = true;
      }
  }

  /**
   * reset input urls
   * @method resetInputUrls
   * @public
   */
  resetInputUrls() {
      this.entriedUrl = [];
      this.isHaveInvalidUrls = false;
  }

  /**
   * check if input url is empty
   * @method isInputURLsEmpty
   * @public
   */
  isInputURLsEmpty() {
      if (this.entriedUrl.length <= 0) {
          this.isHaveInvalidUrls = true;
      } else {
          this.isHaveInvalidUrls = false;
      }
  }

  a11y_start_time=null
  a11y_stop_time=null
  refreshPage() {
    let targetUrl;
    if(this.selectedUrl) {
      targetUrl =  window.location.origin + window.location.pathname + '?url=' + this.selectedUrl + '&report=' + this.selectedReport;
      console.log("targetUrl: ", targetUrl);
      window.open(targetUrl, '_self');
    } else {
      // get input value
      this.a11y_start_time = new Date();
      console.log("started at: ", this.a11y_start_time);
      this.postTaskId(this.entriedUrl);
    }
  }

  // 1: API to create task
  postTaskId(url) {
    this.isLoading = true;
    this.reportService.postTaskId(url).subscribe(res => {
      console.log("postTaskId result: ", res);
      const taskId = res['task_id'];
      if (res['message']=='success') {
        this.getTaskStatus(taskId);
      } else {
        console.log('error_message: ',res['error_message'])
        this.isLoading = false;
        alert('error_code: '+res['error_code']+'. \n'+res['error_message'])
      }
    }, error => {
      console.error(error);
      this.isLoading = false;
    })
  }

  // 2: API to query task status
  getTaskStatus(taskId) {
    this.reportService.getTaskStatus(taskId).subscribe(status => {
      //get report
      console.log("getTaskStatus result: ", status);
      if (status['message']=='success') {
        if (status['task_status']=='task_done') {
          this.getReportUrl(taskId);
        } else {
          // retry 5s later
          setTimeout(()=>{
            this.getTaskStatus(taskId);
          },5000);
        }
      } else {
        console.log('error_message: ',status['error_message'])
        this.isLoading = false;
        alert('error_code: '+status['error_code']+'. F12 to view console log for detail and contact administrator.')
      }
    }, error => {
      console.error(error);
      this.isLoading = false;
    })
  }

  // 3: API to query task report url
  getReportUrl(taskId) {
    this.reportService.getReportUrl(taskId).subscribe(report => {
      console.log("getReportUrl result: ", report);
      const targetUrl = report['task_report_url'];
      if (report['message']=='success') {
        this.isLoading = false;
        window.open(targetUrl, '_self');
        console.log("targetUrl: ", targetUrl);
        this.a11y_stop_time = new Date();
        console.log("stopped at: ", this.a11y_stop_time);
        let time_duration = this.a11y_stop_time - this.a11y_start_time
        console.log("A11y task duration(s): ", Math.round(time_duration/1000));
      } else {
        console.log('error_message: ',report['error_message'])
        this.isLoading = false;
        alert('error_code: '+report['error_code']+'. F12 to view console log for detail and contact administrator.')
      }
    }, error => {
      console.error(error);
      this.isLoading = false;
    })
  }

  closeMenu() {
    this.isMenuClosed = true;
  }

  showOrHideIssueList(defectTp) {
    this.liveAnnouncer.announce("You clicked " + defectTp.showOrHideBreakdown)
    if(defectTp.isShowIssueList) {
      defectTp.isShowIssueList = false;
      defectTp.showOrHideBreakdown = 'Show '+ defectTp.category+' Breakdown';
      defectTp.eyeHideArialLabel = 'Show '+ defectTp.totalDefect + defectTp.category +' on page';
    } else {
      defectTp.isShowIssueList = true;
      defectTp.showOrHideBreakdown = 'Hide '+ defectTp.category+' Breakdown';
      defectTp.eyeHideArialLabel = 'Hide '+ defectTp.totalDefect + defectTp.category +' on page';
    }
  }

  codeMapping() {
    $('#report-tagged-iframe').contents().find('.soutu-btn').css('border', '1px solid red')
    $($("#report-tagged-iframe").get(0).contentDocument).find('.soutu-btn').css('border', '1px solid red')
  }

  @HostListener('document:keydown', ['$event']) onKeydown(event) {
    if(event.ctrlKey && event.keyCode == 13 && event.target.className == 'clr-accordion-header-button') {
      this.selectElement = event.target
      const selectDefectTypeName = event.target.getElementsByClassName('defectTypeName')[0].innerText;
      this.defectTypeList.forEach(defectTp => {
        const defectType = defectTp.defectList.find(e => e.name == selectDefectTypeName);
        if(defectType) {
          this.removeAddAndborderStyleToEle(defectType.defectTypeElements);
          this.element_mapping.vavr.xpath.activeElement.setAttribute('tabindex', 0);
          this.element_mapping.vavr.xpath.activeElement.focus();
          this.isTabPanelTopage = true;
        }
      })
    } else if(event.keyCode == 13 && event.target.className == 'clr-accordion-header-button') {
      const selectDefectTypeName = event.target.getElementsByClassName('defectTypeName')[0].innerText;
      this.defectTypeList.forEach(defectTp => {
        const defectType = defectTp.defectList.find(e => e.name == selectDefectTypeName);
        if(defectType) {
          this.openPanel(defectType, defectTp.defectList);
        }
      })
    }
  }

  expandMenu(){
    this.isMenuClosed = false;
    var dragRef = document.getElementById('dragRef');
    dragRef.style.left = '0px';
    dragRef.style.top = '30%';
  }

  collapse() {
    if(this.isMemuExpanded) {
      this.isMemuExpanded = false;
      document.getElementById('report-tagged-iframe').style.width = '100%';
      if(this.rightToPage) {
        document.getElementById('menu-content-fixed').style.left = window.innerWidth + 'px';
      }
    } else {
      this.isMemuExpanded = true;
      document.getElementById('report-tagged-iframe').style.width = window.innerWidth - 390 + 'px';
      if(this.rightToPage) {
        document.getElementById('menu-content-fixed').style.left = window.innerWidth - 390 + 'px';
      }
    }
    this.changePositionOfSignpost();
  }

}
