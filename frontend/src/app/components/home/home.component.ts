// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';
import '@cds/core/accordion/register.js';
import { SchemaMappingService } from '../../services/schema_mapping.service';
import { ElementMappingService } from '../../services/element_mapping.service';
import { Defect } from '../../model/report';
import { groupBy, sortBy, concat } from 'lodash';
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
  notDisplayDefectTypeList: any[];
  defectList: Defect[];
  totalIssue: number = 0;
  alldefects: any[];
  visibleEle: any[];
  numberSign: number = 1;
  defectName: string;
  defectCategory: string;
  signpostPosition: string = 'bottom-right';
  isMemuExpanded: boolean = true;
  isTabPanelTopage: boolean = false;
  selectElement: any;
  isIncorrectUrl: boolean = false;
  eleDisplay: string = '';
  testHistories: string[];

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private schema_mapping: SchemaMappingService,
    private element_mapping: ElementMappingService,
    private reportService: ReportService,
    private elementRef: ElementRef) {
   }

  async ngOnInit() {
    this.isLoading = true;
    // URL Params
    // Expected URL example: https://localhost/?url=https://localhost/assets/sample_data/sample.html&report=https://localhost/assets/sample_data/report.json
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
      if(this.originalUrl.indexOf('http') == -1) {
        this.isIncorrectUrl = true;
      }
      // query default results
      this.getTestResults();
    }
    this.isLoading = false;
    // insert style into iframe
    this.insertStyleIntoPage();

    // display SignpostToPage
    this.displaySignpostToPage();

    this.popOutInImg = 'images/collapse.svg';
    let reportIframe = this.elementRef.nativeElement.querySelector('#report-tagged-iframe');
    reportIframe.style.width = window.innerWidth - 390 + 'px';
    
    setTimeout(() => {
      const issueAccordionTitles: any = this.elementRef.nativeElement.querySelectorAll('.issue-accordion-title');
      let firstTypeIssues = [];
      $(issueAccordionTitles).each(function() {
        if($(this).parents('clr-accordion-panel') && $(this).parents('clr-accordion-panel').css('display') !== 'none') {
          firstTypeIssues.push($(this));
        }
      })
      if(firstTypeIssues.length > 0) {
        firstTypeIssues[0].click();
      }
    }, 300);
  }

  insertStyleIntoPage(){
    let allDocsOfPages:Document[] = Object.values(this.element_mapping.vavr.xpath.IframeDocs);
    allDocsOfPages.forEach( (doc, index) => {
      //insert style into iframe
      var style = doc.createElement("style");
      style.type = "text/css";
      try{
      　　style.appendChild(doc.createTextNode(".dashed-border-sign{border:3px dashed #C92100!important}"));
          style.appendChild(doc.createTextNode(".solid-border-sign{border:5px solid #C92100!important}"));
          style.appendChild(doc.createTextNode("button:focus,a:focus{5px auto -webkit-focus-ring-color!important}"));
          style.appendChild(doc.createTextNode("*{-webkit-appearance:none}"));
          // style.appendChild(doc.createTextNode("*{pointer-events:auto!important}"));
      }catch(ex){
          console.log("Visual Report is not supported by Browser.")
      　　// style.styleSheet.cssText = ".dashed-border-sign{border:#C92100 dashed 2px!important;};.solid-border-sign{border:#C92100 solid 6px!important;}";//IE
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
      $(doc.querySelectorAll("input, button")).each(function () {
        $(this).click(function (event) {
          event.preventDefault();
        });
      })
      $(doc.querySelectorAll("[type='submit']")).each(function () {
        $(this).closest("form").submit(function(e){
          e.preventDefault();
        })
      });
    });
  }

  displaySignpostToPage(){
    const _this = this;
    let allDocsOfPages:Document[] = Object.values(this.element_mapping.vavr.xpath.IframeDocs);
    allDocsOfPages.forEach( (doc, index) => {
      doc.addEventListener("click",function(event) {
        event.preventDefault();
        const currentFrameAbsolutePosition = _this.currentFrameAbsolutePosition(doc);
        _this.displaySignpost(event, currentFrameAbsolutePosition.x, currentFrameAbsolutePosition.y);
        
      });
      doc.addEventListener("keydown",function(event) {
        if(event.keyCode == 27 && _this.isTabPanelTopage){
          _this.selectElement.focus();
          _this.isTabPanelTopage = false;
        }
      });

      doc.addEventListener("scroll", function() {
        _this.changePositionOfSignpost();
      })
      const elems = doc.body.getElementsByTagName("*");
      const len = elems.length;
      for (var i=0;i<len;i++) {
        elems[i].addEventListener("scroll", function() {
          _this.changePositionOfSignpost();
        })
      }
     });

  }
  //当前iframe相对于浏览器的位置
  currentFrameAbsolutePosition(doc) {
    var ele = doc.getElementById("newCreatScript");
    var top = doc.getElementById('currIframeOffsetTop');
    var left = doc.getElementById('currIframeOffsetLeft');
    if(ele) {
      ele.parentNode.removeChild(top);
      ele.parentNode.removeChild(left);
      ele.parentNode.removeChild(ele);
    }

    var script = doc.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute("id", "newCreatScript");
    var content = '(function() {'
    + 'let currentWindow = window;'
    + 'let currentParentWindow;'
    + 'let positions = [];'
    + 'let rect;'
    + 'while (currentWindow !== window.top) {'
    +   'currentParentWindow = currentWindow.parent;'
    +   'for (let idx = 0; idx < currentParentWindow.frames.length; idx++)'
    +     'if (currentParentWindow.frames[idx] === currentWindow) {'
    +       "for (let frameElement of currentParentWindow.document.getElementsByTagName('iframe')) {"
    +         'if (frameElement.contentWindow === currentWindow) {'
    +           'rect = frameElement.getBoundingClientRect();'
    +           'positions.push({x: rect.x, y: rect.y});'
    +         '}'
    +       '}'
    +       'currentWindow = currentParentWindow;'
    +       'break;'
    +     '}'
    + '}'
    + 'positions.reduce((accumulator, currentValue) => {'
    +   'return {'
    +    'x: accumulator.x + currentValue.x,'
    +     'y: accumulator.y + currentValue.y'
    +   '};'
    + '}, { x: 0, y: 0 });'
    + 'let xList = [];'
    + 'let yList = [];'
    + 'positions.forEach(value => {'
    +   'xList.push(value.x);'
    +   'yList.push(value.y);'
    + '});'
    + 'let sumX;'
    + 'let sumY;'
    + 'sumX = xList.reduce((total, value) => {'
    +   'return total + value;'
    + '}, 0);'
    + 'sumY = yList.reduce((total, value) => {'
    +   'return total + value;'
    + '}, 0);'
    + 'var div1=document.createElement("div");'
    + 'div1.id = "currIframeOffsetLeft";'
    + 'div1.innerText = sumX;'
    + 'var div2=document.createElement("div");'
    + 'div2.id = "currIframeOffsetTop";'
    + 'div2.innerText = sumY;'
    + 'document.body.appendChild(div1);'
    + 'document.body.appendChild(div2);'
    + "div1.style.opacity = '0';"
    + "div2.style.opacity = '0';"
    + '})()'
              
    script.text = content;
    doc.body.appendChild(script); 
    const currIframeOffsetLeft = Number(doc.getElementById('currIframeOffsetLeft').innerText);
    const currIframeOffsetTop = Number(doc.getElementById('currIframeOffsetTop').innerText);
    return {x: currIframeOffsetLeft, y: currIframeOffsetTop};
  }

  backToHomePage() {
    this.pageTitle = '';
    this.originalUrl = '';
    const targetUrl =  window.location.origin + window.location.pathname;
    window.open(targetUrl, '_self');
  }

  getTestResults() {
    this.defectList = this.element_mapping.vavr.report.defects;
    if(this.defectList.length > 0) {
      const contrast = this.schema_mapping.result_info.find(i => i.url.original_url == this.originalUrl).result.categories.contrast?.items.contrast;
      const contrastdata = contrast?.contrastdata;
      const selectors = contrast?.selectors;
      const categoryGroup = groupBy(this.defectList, d => d.category);
      this.defectTypeList = [];
      let m = 0;
      for(let key in categoryGroup) {
        let defectList: Defect[] = categoryGroup[key];
        let totalDefect = 0;
        let notDisplayTotalDefect = 0;
        for(var i = 0; i<defectList.length; i++) {
          defectList[i].defectTypeElements = [];
          defectList[i].notDisplayElements = [];

          for(var j = 0; j < Array.from(new Set(defectList[i].elementIds)).length; j++) {
            const element_info = this.element_mapping.vavr.report.elements.find(ele => {return ele.elementId == Array.from(new Set(defectList[i].elementIds))[j]});
            if(element_info && element_info.elementId !== "-1") {
              const defectTypeElement = {
                name: defectList[i].name,
                title: defectList[i].title,
                sevirity: defectList[i].sevirity,
                description: this.element_mapping.vavr.report.docs[defectList[i].name].summary,
                action: this.element_mapping.vavr.report.docs[defectList[i].name].actions,
                code: element_info.code.length > 1000? element_info.code.substring(0, 100) + element_info.code.substring(element_info.code.length - 50): element_info.code,
                elementId: element_info.elementId,
                elementObject: element_info.elementObject,
                contrast: null
              }
              if(contrastdata && defectList[i].name == 'contrast') {
                for(var d = 0; d < selectors.length; d++) {
                  if(element_info.elementLocator == selectors[d]) {
                    defectTypeElement.contrast = contrastdata[d];
                  }
                }
              }
              
              defectList[i].defectTypeElements.push(defectTypeElement);
              defectList[i].panelOpen = false;
            } else {
              for(var n = 0; n < defectList[i].xpath.length; n++) {
                defectList[i].notDisplayElements.push({
                  name: defectList[i].name,
                  title: defectList[i].title,
                  sevirity: defectList[i].sevirity,
                  description: this.element_mapping.vavr.report.docs[defectList[i].name].summary,
                  action: this.element_mapping.vavr.report.docs[defectList[i].name].actions,
                  xpath: defectList[i].xpath[n],
                  elementId: element_info.elementId,
                  elementObject: element_info.elementObject,
                })
              }
            }
          } 
          defectList[i].defectTypeElements = sortBy(defectList[i].defectTypeElements, item => {return Number(item.elementId)});
          totalDefect += defectList[i].defectTypeElements.length;
          notDisplayTotalDefect += defectList[i].notDisplayElements.length;
        }
        let eyeHide = true;
        let defectNumBgColor = '#FFB565';
        let defectNumFontColor ='#000000';
        if(m == 0) {
          eyeHide = false;
        }
        if(key == 'Issues') {
          defectNumBgColor = '#C92100';
          defectNumFontColor = '#FFFFFF';
        } else if(key == 'Alerts') {
          defectNumBgColor = '#FFB565';
          defectNumFontColor ='#000000';
        }
        // remove(defectList, d => d.defectTypeElements.length == 0);
        this.defectTypeList.push({
            category: key,
            defectList: defectList,
            totalDefect: totalDefect,
            notDisplayTotalDefect: notDisplayTotalDefect,
            defectNumBgColor: defectNumBgColor,
            defectNumFontColor: defectNumFontColor,
            eyeHide: eyeHide,
            eyeHideArialLabel: (eyeHide?'Show ':'Hide ')+ totalDefect +' '+ key +' on page',
            eyeHideDoneArialLabel:  totalDefect +' '+ key +' '+(eyeHide?'shown':'hidden'),
            isShowIssueList: false,
            showOrHideBreakdown:'Show ' + key + ' breakdown'  
          });
        
        m++;
      }
      this.notDisplayDefectTypeList = JSON.parse(JSON.stringify(this.defectTypeList));
      this.defectTypeList[0].isShowIssueList = true;
      this.defectTypeList[0].showOrHideBreakdown = 'Hide ' + this.defectTypeList[0].category + ' breakdown';

      this.syncSelectionFromPanelToPage();
    }
  }

  syncSelectionFromPanelToPage(defectTp=null) {
    if (defectTp) {
      defectTp.eyeHideArialLabel= (defectTp.eyeHide?'Hide ':'Show ')+ defectTp.totalDefect +' '+ defectTp.category +' on page';
      defectTp.eyeHideDoneArialLabel= defectTp.totalDefect +' '+ defectTp.category +' '+(defectTp.eyeHide?'shown':'hidden');  
      this.liveAnnouncer.announce( defectTp.eyeHideDoneArialLabel)
      defectTp.eyeHide = !defectTp.eyeHide;
      if(defectTp.eyeHide == true) {
        this.alldefects = [];
      }
    }
    if(defectTp && defectTp.isShowIssueList) {
      const visibleTypeDefects = this.defectTypeList.filter(d => !d.eyeHide);
      this.alldefects = [];
      for(var i = 0; i < visibleTypeDefects.length; i++) {
        for(var j = 0; j < visibleTypeDefects[i].defectList.length; j++) {
          if(visibleTypeDefects[i].defectList[j].panelOpen) {
            this.alldefects = concat(this.alldefects, visibleTypeDefects[i].defectList[j].defectTypeElements);
          }
        }
      }
      this.setIdAttributeToEle(this.alldefects);
    }
  }

  setIdAttributeToEle(alldefects) {
    this.element_mapping.vavr.report.elements.map(elt => {
      if (elt.elementId != "-1") {
        elt.elementObject.removeAttribute('element-id');
        elt.elementObject.classList.remove('dashed-border-sign');
        elt.elementObject.classList.remove('solid-border-sign');
      }
    });

    this.element_mapping.vavr.xpath.activeElement = null;
    const signpostTriggersWrapper = this.elementRef.nativeElement.querySelector('#signpost-triggers-wrapper');
    signpostTriggersWrapper.style.display = 'none';
    
    const eleGrop = groupBy(alldefects, d => d.elementId);
    let m = 1;
    this.visibleEle = [];
    for(let key in eleGrop) {
      // const ele = window.frames["report-tagged-iframe"].document.querySelector(`[data-vavrid='${key}']`);
      const ele = eleGrop[key][0]["elementObject"];
      if (m==1) {
        this.element_mapping.vavr.xpath.activeElement = ele;
      }

      if(ele.getBoundingClientRect().top + ele.offsetHeight > -6 &&  ele.getBoundingClientRect().top + ele.offsetHeight < 0) {
        ele.style.top = -ele.offsetHeight + 10 + 'px';
      }
      if(ele.getBoundingClientRect().left + ele.offsetWidth > -6 && ele.getBoundingClientRect().left + ele.offsetWidth < 0) {
        ele.style.left = -ele.offsetWidth + 10 + 'px';
      }
      
      if(window.getComputedStyle(ele).opacity == '0') {
        ele.style.opacity = '1';
      }
      
      if(window.getComputedStyle(ele).display == 'inline' && ele.children[0] && ele.innerText == '' && window.getComputedStyle(ele).width == 'auto') {
        ele.style.display = 'inline-block';
        if(window.getComputedStyle(ele).width == '0px') {
          ele.style.display = 'block';
        }
      }
 
      ele.classList.add('dashed-border-sign');
      
      if(window.getComputedStyle(ele).opacity !== '0' && window.getComputedStyle(ele)['pointer-events'] == 'none'
      && this.hasClass(ele, 'dashed-border-sign')) {
        ele.style['pointer-events'] = 'auto';
      }
      
      ele.setAttribute('element-id', m);
      ele.setAttribute('data-vavrid', key);
      m++;
      this.visibleEle.push(eleGrop[key][eleGrop[key].length - 1]);
    }
  }



  displaySignpost(event, currIframeOffsetLeft, currIframeOffsetTop) {
    const solidBorderSign = event.toElement || event.srcElement;
    if((solidBorderSign && solidBorderSign.className && 
      ((typeof(solidBorderSign.className) == 'string' && solidBorderSign.className.indexOf('dashed-border-sign') !== -1)
      || (solidBorderSign.className.baseVal && solidBorderSign.className.baseVal.indexOf('dashed-border-sign') !== -1)))
    ){
        this.addBorderToCurrElement(solidBorderSign, currIframeOffsetLeft, currIframeOffsetTop);
    } else if(solidBorderSign && (!solidBorderSign.className || solidBorderSign.className.baseVal == '' || (typeof(solidBorderSign.className) == 'string' 
        && solidBorderSign.className.indexOf('dashed-border-sign') == -1)
        || (solidBorderSign.className.baseVal && solidBorderSign.className.baseVal.indexOf('dashed-border-sign') == -1))
        && $(solidBorderSign).closest('.dashed-border-sign')[0] != null
    ){
        this.addBorderToCurrElement(solidBorderSign.closest('.dashed-border-sign'), currIframeOffsetLeft, currIframeOffsetTop);
    }
  }

  addBorderToCurrElement(solidBorderSign, currIframeOffsetLeft, currIframeOffsetTop) {
    const beforeSolidEle = this.element_mapping.vavr.xpath.activeElement;
    this.removeClass(beforeSolidEle, 'solid-border-sign');
    this.element_mapping.vavr.xpath.activeElement = solidBorderSign;
    const currSolidEle = solidBorderSign;
    if(currSolidEle.hasAttribute('for')) {
      currSolidEle.removeAttribute('for');
    }
    this.addClass(currSolidEle, 'solid-border-sign');
    this.appendSignPostToEle(currSolidEle, currIframeOffsetLeft, currIframeOffsetTop, false);
  }

  appendSignPostToEle(solidBorderSign, currIframeOffsetLeft, currIframeOffsetTop, isNotVisible) {
    const signpostTriggersWrapper = this.elementRef.nativeElement.querySelector('#signpost-triggers-wrapper');
    signpostTriggersWrapper.style.display = 'block';

    this.fixedSignpost(solidBorderSign, signpostTriggersWrapper, currIframeOffsetLeft, currIframeOffsetTop, isNotVisible);
    this.numberSign = Number(solidBorderSign.getAttribute('element-id'));
    this.elementRef.nativeElement.querySelector('#numberSign').innerText = String(this.numberSign);
      
    this.defectName = this.visibleEle.find(d => d.elementId == this.element_mapping.vavr.xpath.activeElement.getAttribute('data-vavrid')).name;
    this.defectCategory = this.defectList.find(n => n.name == this.defectName).category;
  }

  fixedSignpost(solidBorderSign, signpostTriggersWrapper, currIframeOffsetLeft, currIframeOffsetTop, isNotVisible) {
    const menuContentWidth = 420;
    const stwOffsetleft = currIframeOffsetLeft + solidBorderSign.getBoundingClientRect().left;
    const stwOffsetTop = currIframeOffsetTop + solidBorderSign.getBoundingClientRect().top;
    const stwOffsetHeight = solidBorderSign.offsetHeight? solidBorderSign.offsetHeight: 0;
    const stwOffsetWidth = solidBorderSign.offsetWidth? solidBorderSign.offsetWidth: 0;
    const signpostHeight = 490;
    const signpostWidth = 440;
    const totalHeight = stwOffsetTop + stwOffsetHeight + signpostHeight;
    const totalWidth = stwOffsetleft + stwOffsetWidth + signpostWidth;
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    let subtractWidth;
    const subtractHeight = 10;

    if(this.elementRef.nativeElement.querySelector('#menu-content-fixed').offsetWidth == menuContentWidth) {
      if(this.floating || this.rightToPage) {
        subtractWidth = 10;
      } else if(this.elementRef.nativeElement.querySelector('#menu-content-fixed').offsetWidth == menuContentWidth) {
        subtractWidth = 17;
      }
    } else {
      subtractWidth = 10;
    }

    let allDocsOfPages:Document[] = Object.values(this.element_mapping.vavr.xpath.IframeDocs);
    this.eleDisplay = '';
    if((!isNotVisible && ((window.getComputedStyle(solidBorderSign).position != 'fixed' && solidBorderSign.offsetParent === null)
      || window.getComputedStyle(solidBorderSign).display == 'none'
      || window.getComputedStyle(solidBorderSign).visibility == 'hidden'
      ||((solidBorderSign.getBoundingClientRect().left + solidBorderSign.offsetWidth + allDocsOfPages[0].documentElement.scrollLeft) < 0
      || (window.getComputedStyle(solidBorderSign).position == 'static' && solidBorderSign.getBoundingClientRect().left + solidBorderSign.offsetWidth < 0)
      || solidBorderSign.getBoundingClientRect().left > allDocsOfPages[0].documentElement.scrollWidth
      || (solidBorderSign.getBoundingClientRect().top + solidBorderSign.offsetHeight + allDocsOfPages[0].documentElement.scrollTop) < 0
      || (window.getComputedStyle(solidBorderSign).position == 'static' && solidBorderSign.getBoundingClientRect().top + solidBorderSign.offsetHeight < 0)
      || solidBorderSign.getBoundingClientRect().top > allDocsOfPages[0].documentElement.scrollHeight)))
      || (isNotVisible && window.getComputedStyle(solidBorderSign).position == 'fixed')
    ) {
      this.eleDisplay = 'none';
      this.signpostPosition = 'bottom-right';
      signpostTriggersWrapper.style.top = currIframeOffsetTop + 10 + 'px';
      signpostTriggersWrapper.style.left = currIframeOffsetLeft + 10 + 'px';
    } else if(solidBorderSign.getBoundingClientRect().left <= 0 && solidBorderSign.getBoundingClientRect().left + solidBorderSign.offsetWidth >= 0) {
        if(totalHeight <= windowHeight) {
          this.signpostPosition = 'right-bottom';
          signpostTriggersWrapper.style.top =  stwOffsetTop + stwOffsetHeight - subtractHeight + 'px';
          signpostTriggersWrapper.style.left = stwOffsetleft + stwOffsetWidth - subtractWidth + 'px';
        } else {
          this.signpostPosition = 'right-top';
          signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
          signpostTriggersWrapper.style.left = stwOffsetleft + stwOffsetWidth - subtractWidth + 'px';
        }
    } else if(totalHeight <= windowHeight && totalWidth <= windowWidth) {
        if(stwOffsetleft !== 0 && stwOffsetleft !== menuContentWidth) {
          this.signpostPosition = 'bottom-right';
          signpostTriggersWrapper.style.top =  stwOffsetTop + stwOffsetHeight - subtractHeight + 'px';
          signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
        } else {
          this.signpostPosition = 'right-bottom';
          signpostTriggersWrapper.style.top =  stwOffsetTop + stwOffsetHeight - subtractHeight + 'px';
          signpostTriggersWrapper.style.left = stwOffsetleft + stwOffsetWidth - subtractWidth + 'px';
        }
    } else if(totalHeight >= windowHeight && signpostHeight >= stwOffsetTop && totalWidth >= windowWidth) {
        if(this.floating == false && this.rightToPage == false) {
          if((stwOffsetleft - menuContentWidth) <= signpostWidth) {
            this.signpostPosition = 'right-bottom';
          } else {
            this.signpostPosition = 'left-middle';
          }
        } else if((this.floating || this.rightToPage) && stwOffsetleft <= signpostWidth){
          this.signpostPosition = 'right-bottom';
        }
        signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
    } else if(totalHeight >= windowHeight && signpostHeight <= stwOffsetTop  && totalWidth <= windowWidth) {
        if(stwOffsetleft !== 0 && stwOffsetleft !== menuContentWidth) {
          this.signpostPosition = 'top-right';
          signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
          signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
        } else {
          this.signpostPosition = 'top-right';
          signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
          signpostTriggersWrapper.style.left = stwOffsetleft + stwOffsetWidth - subtractWidth + 'px';
        }
    } else if(totalHeight >= windowHeight && signpostHeight <= stwOffsetTop && totalWidth >= windowWidth) {
        if(stwOffsetleft >= signpostWidth) {
          this.signpostPosition = 'top-left';
          signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
          signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
        } else {
          this.signpostPosition = 'top-right';
          signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
          signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
        }
    } else if(totalHeight <= windowHeight && totalWidth >= windowWidth) {
        if(stwOffsetleft >= signpostWidth) {
          this.signpostPosition = 'bottom-left';
          signpostTriggersWrapper.style.top =  stwOffsetTop + stwOffsetHeight - subtractHeight + 'px';
          signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
        } else {
          this.signpostPosition = 'bottom-right';
          signpostTriggersWrapper.style.top =  stwOffsetTop + stwOffsetHeight - subtractHeight + 'px';
          signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
        }
    } else if(totalHeight >= windowHeight && signpostHeight >= stwOffsetTop && totalWidth <= windowWidth) {
        this.signpostPosition = 'right-middle';
        signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft + stwOffsetWidth - subtractWidth + 'px';
    }

    const sTWrapperLeft = signpostTriggersWrapper.style.left;
    const sTWrapperLeftNum = Number(sTWrapperLeft.substring(0, sTWrapperLeft.length -2));
    if(this.isMemuExpanded && !this.floating && !this.rightToPage) {
      if(sTWrapperLeftNum <= menuContentWidth) {
        signpostTriggersWrapper.style.left = sTWrapperLeftNum + 20 + 'px';
      }
    } else if(!this.isMemuExpanded) {
      if(sTWrapperLeftNum <= 0) {
        signpostTriggersWrapper.style.left = sTWrapperLeftNum + 20 + 'px';
      }
    }

    const e = document.createEvent("MouseEvents");
    e.initEvent("click", true, true);
    this.elementRef.nativeElement.querySelector("#numberSign").dispatchEvent(e);
    this.elementRef.nativeElement.querySelector("#numberSign").dispatchEvent(e); 
  }

  addAndRemoveBorderStyle(allDashborderElement, elementId) {
    for(var i = 0; i< allDashborderElement.length; i++) {
      if(Number(allDashborderElement[i].elementObject.getAttribute('element-id')) == elementId){
        const beforeSolidEle = this.element_mapping.vavr.xpath.activeElement;
        let beforeSolidEleTop = this.getActiveElePosition().y + beforeSolidEle.getBoundingClientRect().top;
        this.removeClass(beforeSolidEle, 'solid-border-sign');
        
        this.element_mapping.vavr.xpath.activeElement = allDashborderElement[i].elementObject;
        //页面元素是否是可见的
        const io = new IntersectionObserver(([obj]) => {
          //0为不可见，被遮挡了
          const isNotVisible = obj.intersectionRatio == 0;
          const currActiveElement = this.element_mapping.vavr.xpath.activeElement;
          this.addClass(currActiveElement, 'solid-border-sign');
          
          let currSolidEleTop = this.getActiveElePosition().y + currActiveElement.getBoundingClientRect().top;
          const windowHeight = document.documentElement.clientHeight;
 
          let allDocsOfPages:Document[] = Object.values(this.element_mapping.vavr.xpath.IframeDocs);
          const elems = allDocsOfPages[0].body.getElementsByTagName("*");
          const len = elems.length;
          let fixedTopEle = null, fixedBottomEle = null;
          for (var i=0;i<len;i++) {
            const computedStyle = window.getComputedStyle(elems[i],null);
            if (computedStyle.getPropertyValue('position') == 'fixed'
              && computedStyle.getPropertyValue('display') !== 'none' && Number(computedStyle.getPropertyValue('z-index')) > 0
              && computedStyle.getPropertyValue('opacity') !== '0'
              && computedStyle.getPropertyValue('height') !== allDocsOfPages[0].documentElement.clientHeight + 'px') 
            {
              if(computedStyle.getPropertyValue('top') == '0px') {
                fixedTopEle = elems[i];
              } else if(computedStyle.getPropertyValue('bottom') == '0px') {
                fixedBottomEle = elems[i];
              }  
            }       
          }
          if(fixedTopEle && currSolidEleTop > 0 && currSolidEleTop < fixedTopEle.offsetHeight) {
            allDocsOfPages[0].documentElement.scrollTop = allDocsOfPages[0].documentElement.scrollTop - fixedTopEle.offsetHeight;
          } else if(fixedBottomEle && currSolidEleTop > fixedBottomEle.offsetTop) {
            allDocsOfPages[0].documentElement.scrollTop = allDocsOfPages[0].documentElement.scrollTop + fixedBottomEle.offsetHeight;
          }

          if(((isNotVisible && window.getComputedStyle(currActiveElement).position !== 'fixed') || (beforeSolidEleTop < windowHeight && currSolidEleTop > windowHeight) 
            || (beforeSolidEleTop > 0 && currSolidEleTop < 0) || (beforeSolidEleTop < 0 && currSolidEleTop < 0))
            && window.getComputedStyle(currActiveElement).visibility == 'visible' 
          ) {
            currActiveElement.scrollIntoView({block: 'center', behavior: 'instant'});
            if(this.getActiveElePosition().x + currActiveElement.getBoundingClientRect().left > document.documentElement.clientWidth) { 
              allDocsOfPages[0].documentElement.scrollLeft = allDocsOfPages[0].documentElement.scrollLeft + 10;
            }    
          }
          this.appendSignPostToEle(currActiveElement, this.getActiveElePosition().x, this.getActiveElePosition().y, false);
        })
        io.observe(this.element_mapping.vavr.xpath.activeElement);
      }
    }
    setTimeout(() => {
      const activeDefect = this.visibleEle.find(d => d.elementId == this.element_mapping.vavr.xpath.activeElement.getAttribute('data-vavrid'));
      this.defectName = activeDefect?.name;
    }, 300);
  }

  getActiveElePosition() {
    let solidElePosition;
    let allDocsOfPages:Document[] = Object.values(this.element_mapping.vavr.xpath.IframeDocs);
    allDocsOfPages.forEach((doc, index) => {
      const eleId = String(this.element_mapping.vavr.xpath.activeElement.getAttribute('element-id'));
      if(doc.querySelectorAll('[element-id="' + eleId + '"]').length > 0) {
        solidElePosition = this.currentFrameAbsolutePosition(doc);
      } 
    })
    return solidElePosition;
  }

  openPanel(defectType, defectTp) {
    if(defectTp.eyeHide){
      if(defectType.panelOpen) {
        defectType.panelOpen = false;
      } else {
        defectType.panelOpen = true;
      }
      return;
    }
    if(defectType.panelOpen) {
      this.hideAllShowIssues(defectType);
    } else {
      defectType.panelOpen = true;
      for(let d of this.defectTypeList) {
        for(let t of d.defectList.filter(d => d.name !== defectType.name)){
          if(t.panelOpen) {
            t.panelOpen = false;
          }
        }
      }
      let  otherTypeIssues = this.defectTypeList.filter(d => d.category !== defectTp.category);
      otherTypeIssues.forEach(value =>{
        value.isShowIssueList = false;
        value.eyeHide = true;
        value.showOrHideBreakdown = 'Show ' + value.category + ' breakdown'  
      })
      this.notDisplayDefectTypeList.forEach(value =>{
        value.isShowIssueList = false;
        value.showOrHideBreakdown = 'Show ' + value.category + ' breakdown'  
      })
      
      this.setIdAttributeToEle(defectType.defectTypeElements);

      this.elementRef.nativeElement.querySelector('#numberSign').innerText = '1';
      this.addAndRemoveBorderStyle(this.visibleEle, 1);
    }
    this.liveAnnouncer.announce("test")
  }

  hideAllShowIssues(defectType) {
    defectType.panelOpen = false;
    const beforeSolidEle = this.element_mapping.vavr.xpath.activeElement;
    this.removeClass(beforeSolidEle, 'solid-border-sign');

    defectType.defectTypeElements.forEach(element => {
      element.elementObject.classList.remove("dashed-border-sign");
    });
    this.element_mapping.vavr.xpath.activeElement = null;
    const signpostTriggersWrapper = this.elementRef.nativeElement.querySelector('#signpost-triggers-wrapper');
    signpostTriggersWrapper.style.display = 'none';
  }
  openNotDisplayElePanel(defectType, defectTp) {
    if(defectType.panelOpen) {
      defectType.panelOpen = false;
    } else {
      defectType.panelOpen = true;
      for(let t of defectTp.defectList.filter(d => d.name !== defectType.name)){
        t.panelOpen = false;
      }

      this.defectTypeList.forEach(value =>{
        value.isShowIssueList = false;
        value.eyeHide = true;
        value.showOrHideBreakdown = 'Show ' + value.category + ' breakdown';
        for(let t of value.defectList.filter(d => d.panelOpen == true)){
          t.panelOpen = false;
        } 
      })  
      this.alldefects = [];
      this.setIdAttributeToEle(this.alldefects);
    }
    this.liveAnnouncer.announce("test")
  }
  announce(defectType) {
    this.liveAnnouncer.announce("test")
  }

  @HostListener('document:click', ['$event']) onClick(event) {
    if(this.originalUrl) {
      const displayedDefectsSections = this.elementRef.nativeElement.querySelectorAll('.displayedDefectsSection');
      const signpostContainer = this.elementRef.nativeElement.querySelectorAll('.signpost-container')[0];
      for(var i = 0; i < displayedDefectsSections.length; i++) {
        if(displayedDefectsSections[i].contains(event.srcElement) || (signpostContainer && signpostContainer.contains(event.srcElement))) {
          if(this.hasClass(event.srcElement, 'pagination-next', true)) {
            const nextElementId = Number(this.element_mapping.vavr.xpath.activeElement.getAttribute('element-id')) + 1;
            this.addAndRemoveBorderStyle(this.visibleEle, nextElementId);
            this.isContrastCheck = false;
          } else if(this.hasClass(event.srcElement, 'pagination-previous', true)) {
            const previousElementId = Number(this.element_mapping.vavr.xpath.activeElement.getAttribute('element-id')) - 1;
            this.addAndRemoveBorderStyle(this.visibleEle, previousElementId);
            this.isContrastCheck = false;
          } else if(this.hasClass(event.srcElement, 'pagination-first', true)) {
            this.addAndRemoveBorderStyle(this.visibleEle, 1);
            this.isContrastCheck = false;
          } else if(this.hasClass(event.srcElement, 'pagination-last', true)) {
            this.addAndRemoveBorderStyle(this.visibleEle, this.visibleEle.length);
            this.isContrastCheck = false;
          }
          return false;
        }
      }
    }
  }

  hasClass( element,cName,checkAncestor=false){
    if (!checkAncestor) {
      return !!(element && typeof(element.className) == 'string'? element.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ): element && typeof(element.className) !== 'string' && element.className.baseVal? element.className.baseVal.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ): false);
    } else {
      if (!element) {
        return false;
      } else {
        if ((typeof(element.className) == 'string' && element.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ))  || (element.className.baseVal && element.className.baseVal.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ))) {
          return true;
        } else {
          return this.hasClass(element.parentElement,cName,true);
        }
      }
    }
  }

  addClass( element,cName ){
    if( !this.hasClass( element,cName ) ){
      if(typeof(element.className) == 'string') {
        element.className += " " + cName;
      } else if(typeof(element.className) !== 'string' && element.className.baseVal) {
        element.className.baseVal += " " + cName;
      }
      
    };
  }

  removeClass( elements,cName ){
    if( this.hasClass( elements,cName ) ){
      if(typeof(elements.className) == 'string') {
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ),"" );
      } else if(typeof(elements.className) !== 'string' && elements.className.baseVal) {
        elements.className.baseVal = elements.className.baseVal.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ),"" );
      }
      
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
    this.elementRef.nativeElement.querySelector('#report-tagged-iframe').style.width = window.innerWidth - 390 + 'px';
    this.elementRef.nativeElement.querySelector('#menu-content-fixed').style.left = window.innerWidth - 390 + 'px';
  }

  clickFloatToPage() {
    this.floating = true;
    this.rightToPage = false;
    this.changePositionOfSignpost();
    this.elementRef.nativeElement.querySelector('#report-tagged-iframe').style.width = '100%';
    this.elementRef.nativeElement.querySelector('#menu-content-fixed').style.left = '120px';
  }

  changePositionOfSignpost() {
    const signpostTriggersWrapper = this.elementRef.nativeElement.querySelector('#signpost-triggers-wrapper');
    if(signpostTriggersWrapper.style.display == 'block' && this.element_mapping.vavr.xpath.activeElement) {
      setTimeout(() => {
        this.fixedSignpost(this.element_mapping.vavr.xpath.activeElement, signpostTriggersWrapper, this.getActiveElePosition().x, this.getActiveElePosition().y, false);
      }, 500)
    }
  }

  @HostListener('document:mousedown', ['$event']) onMousedown(event) {
    this.isDown = true;
    var event = event || window.event;

    this.startTime = event.timeStamp;
    const dragRef = this.elementRef.nativeElement.querySelector('#menu-content-fixed');
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

      const dragRef = this.elementRef.nativeElement.querySelector('#menu-content-fixed');
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
    if(this.originalUrl.indexOf('http') == -1) {
      this.isIncorrectUrl = true;
    } else {
      this.isIncorrectUrl = false;
    }
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

      const panelOpenedIssues = defectTp.defectList.find(d => d.panelOpen == true);
      if(panelOpenedIssues) {
        this.hideAllShowIssues(panelOpenedIssues);
      }
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
          this.setIdAttributeToEle(defectType.defectTypeElements);
          this.element_mapping.vavr.xpath.activeElement.setAttribute('tabindex', 0);
          this.element_mapping.vavr.xpath.activeElement.scrollIntoView();
          this.element_mapping.vavr.xpath.activeElement.focus();
          this.isTabPanelTopage = true;
        }
      })
    } else if(event.keyCode == 13 && event.target.className == 'clr-accordion-header-button') {
      const selectDefectTypeName = event.target.getElementsByClassName('defectTypeName')[0].innerText;
      this.defectTypeList.forEach(defectTp => {
        const defectType = defectTp.defectList.find(e => e.name == selectDefectTypeName);
        if(defectType) {
          this.openPanel(defectType, defectTp);
        }
      })
    }
  }

  expandMenu(){
    this.isMenuClosed = false;
    var dragRef = this.elementRef.nativeElement.querySelector('#dragRef');
    dragRef.style.left = '0px';
    dragRef.style.top = '30%';
  }

  collapse() {
    if(this.isMemuExpanded) {
      this.isMemuExpanded = false;
      this.elementRef.nativeElement.querySelector('#report-tagged-iframe').style.width = '100%';
      if(this.rightToPage) {
        this.elementRef.nativeElement.querySelector('#menu-content-fixed').style.left = window.innerWidth + 'px';
      }
    } else {
      this.isMemuExpanded = true;
      this.elementRef.nativeElement.querySelector('#report-tagged-iframe').style.width = window.innerWidth - 390 + 'px';
      if(this.rightToPage) {
        this.elementRef.nativeElement.querySelector('#menu-content-fixed').style.left = window.innerWidth - 390 + 'px';
      }
    }
    this.changePositionOfSignpost();
  }

  activeContrastEleStyle = null;
  onContrastCheck() {
    this.isContrastCheck = true;
    let activeElement = this.element_mapping.vavr.xpath.activeElement;
    this.activeContrastEleStyle = {
      c: window.getComputedStyle(activeElement).getPropertyValue('color'),
      b: window.getComputedStyle(activeElement).getPropertyValue('background-color')
    }
  }

  isContrastCheck: boolean = false;
  updateActiveEleColor(event) {
    let activeElement = this.element_mapping.vavr.xpath.activeElement;
    activeElement.style.color = event.f;
    activeElement.style['background-color'] = event.b;
  }
}
