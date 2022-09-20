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
    document.getElementById('report-tagged-iframe').style.width = window.innerWidth - 390 + 'px';
    const _this = this;
    window.frames["report-tagged-iframe"].document.addEventListener("scroll", function() {
      _this.changePositionOfSignpost();
    })

  }

  insertStyleIntoPage(){
    let allDocsOfPages:Document[] = Object.values(this.element_mapping.vavr.xpath.IframeDocs);
    allDocsOfPages.forEach( doc => {
      var meta = doc.querySelector("meta[http-equiv='Content-Security-Policy']");
      if(meta) {
        meta.setAttribute('content', "default-src *  data: blob: 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * data: blob: 'unsafe-inline'; font-src * data: blob: 'unsafe-inline';");
      }
      //insert style into iframe
      var style = doc.createElement("style");
      style.type = "text/css";
      try{
      　　style.appendChild(doc.createTextNode(".dashed-border-sign{outline:3px dashed #C92100!important}"));
          style.appendChild(doc.createTextNode(".solid-border-sign{outline:6px solid #C92100!important}"));
          style.appendChild(doc.createTextNode("button:focus,a:focus{5px auto -webkit-focus-ring-color!important}"));
          style.appendChild(doc.createTextNode("*{scroll-margin-top: 180px!important;}"));
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
            defectList[i].defectTypeElements.push({
              name: defectList[i].name,
              title: defectList[i].title,
              sevirity: defectList[i].sevirity,
              description: this.element_mapping.vavr.report.docs[defectList[i].name].summary,
              action: this.element_mapping.vavr.report.docs[defectList[i].name].actions,
              code: element_info.code,
              elementId: element_info.elementId,
              elementObject: element_info.elementObject,
            })
            
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
          showOrHideBreakdown: 'Show ' +key+' breakdown'  
        });
      
      m++;
    }
    this.notDisplayDefectTypeList = JSON.parse(JSON.stringify(this.defectTypeList));

    this.syncSelectionFromPanelToPage();
  }

  syncSelectionFromPanelToPage(defectTp=null) {
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
    this.setIdAttributeToEle(this.alldefects);
  }

  setIdAttributeToEle(alldefects) {
    this.element_mapping.vavr.report.elements.map(elt => {
      if (elt.elementId != "-1") {
        elt.elementObject.removeAttribute('element-id');
        elt.elementObject.classList.remove('dashed-border-sign');
        elt.elementObject.classList.remove('solid-border-sign');
        if(elt.elementObject.style.outline == '6px solid rgb(201, 33, 0)') {
          elt.elementObject.style.outline = null;
        }
      }
    });
    const signpostTriggersWrapper = document.getElementById('signpost-triggers-wrapper');
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
      ele.classList.add('dashed-border-sign');
      if(window.getComputedStyle(ele).opacity == '0') {
        ele.style.opacity = '1';
      }

      if(ele.tagName.toLowerCase() == 'a' && ele.innerText == '') {
        ele.style.display = 'block';
      }
      const parentEle = getComputedStyle(ele.parentElement, null);
      if(ele.getBoundingClientRect().width == ele.parentElement.getBoundingClientRect().width
        && parentEle.borderStyle == 'none' && parentEle.outlineStyle == 'none' && parentEle.padding == '0px') {   
        ele.parentElement.style.padding = '3px';
      }
      
      ele.setAttribute('element-id', m);
      ele.setAttribute('data-vavrid', key);
      m++;
      this.visibleEle.push(eleGrop[key][eleGrop[key].length - 1]);
    }
  }

  displaySignpost(event, currIframeOffsetLeft, currIframeOffsetTop) {
    const solidBorderSign = event.toElement || event.srcElement;
    if(solidBorderSign.hasAttribute('for')) {
      solidBorderSign.removeAttribute('for');
    }
    if(solidBorderSign && solidBorderSign.className && 
      ((typeof(solidBorderSign.className) == 'string' && solidBorderSign.className.indexOf('dashed-border-sign') !== -1)
      || (solidBorderSign.className.baseVal && solidBorderSign.className.baseVal.indexOf('dashed-border-sign') !== -1))) {
      this.removeClass(this.element_mapping.vavr.xpath.activeElement, 'solid-border-sign');
      if(this.element_mapping.vavr.xpath.activeElement.style.outline == 'rgb(201, 33, 0) solid 6px') {
        this.element_mapping.vavr.xpath.activeElement.style.outline = null;
      }
      this.element_mapping.vavr.xpath.activeElement = solidBorderSign;
      
      this.addClass(solidBorderSign, 'solid-border-sign');
      
      if(window.getComputedStyle(solidBorderSign).outlineStyle !== 'solid') {
        solidBorderSign.style = solidBorderSign.style.cssText + "outline:#C92100 solid 6px!important";
      }
      this.appendSignPostToEle(solidBorderSign, currIframeOffsetLeft, currIframeOffsetTop);
    } else if(solidBorderSign && (!solidBorderSign.className || solidBorderSign.className.baseVal == '' || (typeof(solidBorderSign.className) == 'string' 
          && solidBorderSign.className.indexOf('dashed-border-sign') == -1)
          || (solidBorderSign.className.baseVal && solidBorderSign.className.baseVal.indexOf('dashed-border-sign') == -1))
          && $(solidBorderSign).closest('.dashed-border-sign')[0] != null) {
      this.removeClass(this.element_mapping.vavr.xpath.activeElement, 'solid-border-sign');
      if(this.element_mapping.vavr.xpath.activeElement.style.outline == 'rgb(201, 33, 0) solid 6px') {
        this.element_mapping.vavr.xpath.activeElement.style.outline = null;
      }
      this.element_mapping.vavr.xpath.activeElement = solidBorderSign.closest('.dashed-border-sign');
      this.addClass(solidBorderSign.closest('.dashed-border-sign'), 'solid-border-sign');
      if(window.getComputedStyle(solidBorderSign.closest('.dashed-border-sign')).outlineStyle !== 'solid') {
        solidBorderSign.closest('.dashed-border-sign').style = solidBorderSign.closest('.dashed-border-sign').style.cssText + "outline:#C92100 solid 6px!important";
      }
      this.appendSignPostToEle(solidBorderSign.closest('.dashed-border-sign'), currIframeOffsetLeft, currIframeOffsetTop);
    }
  }

  appendSignPostToEle(solidBorderSign, currIframeOffsetLeft, currIframeOffsetTop) {
    const signpostTriggersWrapper = document.getElementById('signpost-triggers-wrapper');
    signpostTriggersWrapper.style.display = 'block';

    this.fixedSignpost(solidBorderSign, signpostTriggersWrapper, currIframeOffsetLeft, currIframeOffsetTop);
    this.numberSign = Number(solidBorderSign.getAttribute('element-id'));
    document.getElementById('numberSign').innerText = String(this.numberSign);
      
    this.defectName = this.visibleEle.find(d => d.elementId == this.element_mapping.vavr.xpath.activeElement.getAttribute('data-vavrid')).name;
    this.defectCategory = this.defectList.find(n => n.name == this.defectName).category;
  }

  fixedSignpost(solidBorderSign, signpostTriggersWrapper, currIframeOffsetLeft, currIframeOffsetTop) {
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

    if(document.getElementById('menu-content-fixed').offsetWidth == menuContentWidth) {
      if(this.floating || this.rightToPage) {
        subtractWidth = 10;
      } else if(document.getElementById('menu-content-fixed').offsetWidth == menuContentWidth) {
        subtractWidth = 17;
      }
    } else {
      subtractWidth = 10;
    }

    //页面元素是否是可见的
    const io = new IntersectionObserver(([obj]) => {
      //0为不可见，被遮挡了
      const isNotVisible = obj.intersectionRatio == 0;
      this.eleDisplay = '';
      if((window.getComputedStyle(solidBorderSign).position != 'fixed' && solidBorderSign.offsetParent === null) 
        || window.getComputedStyle(solidBorderSign).display == 'none'
        || (!isNotVisible && window.getComputedStyle(solidBorderSign).visibility == 'hidden')
        || (solidBorderSign.getBoundingClientRect().left + solidBorderSign.offsetWidth) < 0
        || isNotVisible
      ) {
        this.eleDisplay = 'none';
        this.signpostPosition = 'bottom-right';
        signpostTriggersWrapper.style.top = currIframeOffsetTop + 10 + 'px';
        signpostTriggersWrapper.style.left = currIframeOffsetLeft + 10 + 'px';
      } else if (totalHeight < windowHeight && solidBorderSign.getBoundingClientRect().left < 0 && solidBorderSign.getBoundingClientRect().left + solidBorderSign.offsetWidth > 0) {
        this.signpostPosition = 'right-bottom';
        signpostTriggersWrapper.style.top =  stwOffsetTop + stwOffsetHeight - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft + stwOffsetWidth - subtractWidth + 'px';
      } else if(totalHeight < windowHeight && totalWidth < windowWidth && stwOffsetleft !== 0 && stwOffsetleft !== menuContentWidth) {
        this.signpostPosition = 'bottom-right';
        signpostTriggersWrapper.style.top =  stwOffsetTop + stwOffsetHeight - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
      } else if(totalHeight < windowHeight && totalWidth < windowWidth && (stwOffsetleft == 0 || stwOffsetleft == menuContentWidth)) {
        this.signpostPosition = 'right-bottom';
        signpostTriggersWrapper.style.top =  stwOffsetTop + stwOffsetHeight - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft + stwOffsetWidth - subtractWidth + 'px';
      } else if(totalHeight > windowHeight && signpostHeight > stwOffsetTop && totalWidth > windowWidth) {
        this.signpostPosition = 'left-middle';
        signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
      } else if(totalHeight > windowHeight && signpostHeight > stwOffsetTop && totalWidth < windowWidth) {
        this.signpostPosition = 'right-middle';
        signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft + stwOffsetWidth - subtractWidth + 'px';
      } else if(totalHeight > windowHeight && signpostHeight < stwOffsetTop  && totalWidth < windowWidth && stwOffsetleft !== 0 && stwOffsetleft !== menuContentWidth) {
        this.signpostPosition = 'top-right';
        signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
      } else if(totalHeight > windowHeight && signpostHeight < stwOffsetTop  && totalWidth < windowWidth && (stwOffsetleft == 0 || stwOffsetleft == menuContentWidth)) {
        this.signpostPosition = 'top-right';
        signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft + stwOffsetWidth - subtractWidth + 'px';
      } else if(totalHeight > windowHeight && signpostHeight < stwOffsetTop && totalWidth > windowWidth && stwOffsetleft > signpostWidth) {
        this.signpostPosition = 'top-left';
        signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
      } else if(totalHeight > windowHeight && signpostHeight < stwOffsetTop && totalWidth > windowWidth && stwOffsetleft < signpostWidth) {
        this.signpostPosition = 'top-right';
        signpostTriggersWrapper.style.top =  stwOffsetTop - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
      } else if(totalHeight < windowHeight && totalWidth > windowWidth && stwOffsetleft > signpostWidth) {
        this.signpostPosition = 'bottom-left';
        signpostTriggersWrapper.style.top =  stwOffsetTop + stwOffsetHeight - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
      } else if(totalHeight < windowHeight && totalWidth > windowWidth && stwOffsetleft < signpostWidth) {
        this.signpostPosition = 'bottom-right';
        signpostTriggersWrapper.style.top =  stwOffsetTop + stwOffsetHeight - subtractHeight + 'px';
        signpostTriggersWrapper.style.left = stwOffsetleft - subtractWidth + 'px';
      }

      const sTWrapperLeft = signpostTriggersWrapper.style.left;
      const sTWrapperLeftNum = Number(sTWrapperLeft.substring(0, sTWrapperLeft.length -2));
      if(this.isMemuExpanded && !this.floating && !this.rightToPage) {
        if(sTWrapperLeftNum < menuContentWidth) {
          signpostTriggersWrapper.style.left = sTWrapperLeftNum + 20 + 'px';
        }
      } else if(!this.isMemuExpanded) {
        if(sTWrapperLeftNum < 0) {
          signpostTriggersWrapper.style.left = sTWrapperLeftNum + 20 + 'px';
        }
      }

      const e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      document.getElementById("numberSign").dispatchEvent(e);
      document.getElementById("numberSign").dispatchEvent(e);
    })
    io.observe(solidBorderSign);
  }

  addAndRemoveBorderStyle(allDashborderElement, elementId) {
    for(var i = 0; i< allDashborderElement.length; i++) {
      if(Number(allDashborderElement[i].elementObject.getAttribute('element-id')) == elementId){
        let beforeSolidEleTop = this.getActiveElePosition().y + this.element_mapping.vavr.xpath.activeElement.getBoundingClientRect().top;
        this.removeClass(this.element_mapping.vavr.xpath.activeElement, 'solid-border-sign');
        if(this.element_mapping.vavr.xpath.activeElement.style.outline == 'rgb(201, 33, 0) solid 6px') {
          this.element_mapping.vavr.xpath.activeElement.style.outline = null;
        }
        this.element_mapping.vavr.xpath.activeElement = allDashborderElement[i].elementObject;

        //页面元素是否是可见的
        const io = new IntersectionObserver(([obj]) => {
          //0为不可见，被遮挡了
          const isNotVisible = obj.intersectionRatio == 0;
          const activeElement = this.element_mapping.vavr.xpath.activeElement;
          this.addClass(activeElement, 'solid-border-sign');
          if(window.getComputedStyle(activeElement).outlineStyle !== 'solid') {
            activeElement.style = activeElement.style.cssText + "outline:#C92100 solid 6px!important";
          }

          let currSolidEleTop = this.getActiveElePosition().y + activeElement.getBoundingClientRect().top;
          const windowHeight = document.documentElement.clientHeight;
          
          if(!isNotVisible && ((beforeSolidEleTop < windowHeight && currSolidEleTop > windowHeight) 
            || (beforeSolidEleTop > 0 && currSolidEleTop < 0) || (beforeSolidEleTop < 0 && currSolidEleTop < 0))
            && (activeElement.getBoundingClientRect().left + activeElement.offsetWidth) > 0
          ) {
            activeElement.scrollIntoView({behavior: 'smooth'});
          }
          this.appendSignPostToEle(activeElement, this.getActiveElePosition().x, this.getActiveElePosition().y);
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
      return;
    }
    if(defectType.panelOpen) {
      defectType.panelOpen = false;
      this.removeClass(this.element_mapping.vavr.xpath.activeElement, 'solid-border-sign');
      const signpostTriggersWrapper = document.getElementById('signpost-triggers-wrapper');
      signpostTriggersWrapper.style.display = 'none';
    } else {
      defectType.panelOpen = true;
      for(let t of defectTp.defectList.filter(d => d.name !== defectType.name)){
        t.panelOpen = false;
      }
      this.setIdAttributeToEle(defectType.defectTypeElements);

      // const allDashborderElement:HTMLElement[] = [];
      // this.element_mapping.vavr.report.elements.map(elt => {
      //   if (elt.elementId != "-1") { allDashborderElement.push(elt.elementObject); }
      // });
      this.addAndRemoveBorderStyle(this.visibleEle, 1);
    }
    this.liveAnnouncer.announce("test")
  }
  openNotDisplayElePanel(defectType, defectTp) {
    if(defectType.panelOpen) {
      defectType.panelOpen = false;
    } else {
      defectType.panelOpen = true;
      for(let t of defectTp.defectList.filter(d => d.name !== defectType.name)){
        t.panelOpen = false;
      }
    }
    this.liveAnnouncer.announce("test")
  }
  announce(defectType) {
    this.liveAnnouncer.announce("test")
  }

  @HostListener('document:click', ['$event']) onClick(event) {
    if(this.originalUrl) {
      const displayedDefectsSections = document.getElementsByClassName('displayedDefectsSection');
      const signpostContainer = document.getElementsByClassName('signpost-container')[0];
      for(var i = 0; i < displayedDefectsSections.length; i++) {
        if(displayedDefectsSections[i].contains(event.srcElement) || (signpostContainer && signpostContainer.contains(event.srcElement))) {
          if(this.hasClass(event.srcElement, 'pagination-next', true)) {
            const nextElementId = Number(this.element_mapping.vavr.xpath.activeElement.getAttribute('element-id')) + 1;
            this.addAndRemoveBorderStyle(this.visibleEle, nextElementId);
          } else if(this.hasClass(event.srcElement, 'pagination-previous', true)) {
            const previousElementId = Number(this.element_mapping.vavr.xpath.activeElement.getAttribute('element-id')) - 1;
            console.log(previousElementId)
            this.addAndRemoveBorderStyle(this.visibleEle, previousElementId);
          } else if(this.hasClass(event.srcElement, 'pagination-first', true)) {
            console.log(1)
            this.addAndRemoveBorderStyle(this.visibleEle, 1);
          } else if(this.hasClass(event.srcElement, 'pagination-last', true)) {
            console.log(this.visibleEle.length)
            this.addAndRemoveBorderStyle(this.visibleEle, this.visibleEle.length);
          }
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
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " );
      } else if(typeof(elements.className) !== 'string' && elements.className.baseVal) {
        elements.className.baseVal = elements.className.baseVal.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " );
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
        this.fixedSignpost(this.element_mapping.vavr.xpath.activeElement, signpostTriggersWrapper, this.getActiveElePosition().x, this.getActiveElePosition().y);
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
