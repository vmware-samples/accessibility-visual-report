// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {
  file: File;
  text = "";
  inputExtraComments = null;
  inputcontentArray = [];
  invalidUrls : any = [];
  validUrls: any =[];

  @Input() inputURLs;
  @Output() dragDropEvent = new EventEmitter();

  constructor(
    private ariaLiveService: LiveAnnouncer,
  ) { }
  /**
   * init
   * @method ngOnInit
   * @public
   */
  ngOnInit() {
    console.log("init drag", this.inputURLs);
    // this.inputURLs.join('\n');
    this.textFilter(this.inputURLs.join('\n'));
    // this.inputExtraComments = this.inputURLs;
  }

  /**
   * text filter
   * @method testfilter
   * @param {any} text
   * @public
   */
  textFilter(text) {
    // \r\n-> \n\n -> \n
    let data = text.replace(/\r/g, '\n').replace(/\n\n/g, '\n');
    let result = data.split('\n').filter((word, i, arr) => arr.indexOf(word) === i);
    result = result.filter(function (element) {
      // console.log((element !== null) && (element !== ""))
      return (element !== null) && (element !== "");
    });

    result = result.map(function (element) {
      return element.trim();
    });

    this.inputcontentArray = result;
    this.inputExtraComments = result.join('\n');
  }

  /**
   * drag over event
   * @method dragOverHandler
   * @param {any} ev
   * @public
   */
  dragOverHandler(ev) {
    console.log('File(s) in drop zone');
    $('#drop_zone').css('border', '2px solid #6699FF');
    ev.preventDefault();
  }

  /**
   * drag leave event
   * @method dragleaveHandler
   * @param {any} ev
   * @public
   */
  dragleaveHandler(ev) {
    console.log('File(s) in drop zone');
    // $('#drop_zone').css('border', '0px');
  }

  /**
   * drop event
   * @method drop handler
   * @param {any} ev
   * @public
   */
  dropHandler(ev) {
    console.log('File(s) dropped');
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          let file = ev.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
          this.fileSelected(file);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
    }
    $('#drop_zone').css('border', '1px solid #6699FF');
    // Pass event to removeDragData for cleanup
    this.removeDragData(ev);
  }

  /**
   * remove drag data
   * @method removeDragData
   * @param {any} ev
   * @public
   */
  removeDragData(ev) {
    console.log('Removing drag data')
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to remove the drag data
      ev.dataTransfer.items.clear();
    } else {
      // Use DataTransfer interface to remove the drag data
      ev.dataTransfer.clearData();
    }
  }

  /**
   * select file
   * @method fileSelected
   * @param {any} file
   * @public
   */
  fileSelected(file) {
    console.log(file)
    if (file) {
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      let _this = this
      reader.onload = function (evt) {
        _this.textFilter((<FileReader>evt.target).result);
      }
      reader.onloadend = function (evt) {
        _this.textOnChange();
      }
      // this.textFilter(result)
      reader.onerror = function (evt) {
        console.log("error reading file");
      }
    }
  }

  /**
   * text on change
   * @method textOnChange
   * @param {any} replay
   * @public
   */
  textOnChange() {
    this.validUrls = [];
    this.invalidUrls = [];
    this.textFilter(this.inputExtraComments);
    // this.dragDropEvent.emit(this.inputcontentArray);
    for(let url of this.inputcontentArray){
      let temp = this.IsURL(url);
      if(!temp){
        this.invalidUrls.push(url);
        this.ariaLiveService.announce("There are invalid url you inputed, there are  " + url)
      } else {
        this.validUrls.push(url);
      }
    }
    let obj = {
      validUrls : this.validUrls,
      invalidUrls: this.invalidUrls,
      allUrls: this.inputcontentArray,
    }
    this.dragDropEvent.emit(obj);
  }

  /**
   * check if url
   * @method IsURL
   * @param {any} str_url
   * @public
   * @return {Boolean}
   */
  IsURL(str_url) {
    let strRegex = "^((https|http|ftp|rtsp|mms)?://)"
      + "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@
      + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
      + "|" // 允许IP和DOMAIN（域名）
      + "([0-9a-zA-Z_!~*'()-]+\.)*" // 域名- www.
      + "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\." // 二级域名
      + "[a-zA-Z]{2,6})" // first level domain- .com or .museum
      + "(:[0-9]{1,4})?" // 端口- :80
      + "((/?)|" // a slash isn't required if there is no file name
      + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    let re = new RegExp(strRegex);
    if (re.test(str_url)) {
      return (str_url.includes("."));
    } else {
      return (false);
    }
  }
}
