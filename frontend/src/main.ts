// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'zone.js/dist/zone';
import * as $ from 'jquery';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // (function(){
  //   var head = document.getElementsByTagName("head")[0];
  //   for(var i = 0; i < 2; i++) {
  //     var clrCss = document.createElement("link");
  //     clrCss.type = "text/css";
  //     clrCss.rel = "stylesheet";
  //     var prevCss;
  //     if(i == 0) {
  //       clrCss.href = "https://unpkg.com/@clr/ui/clr-ui.min.css";
  //       clrCss.id = "clr-css";
  //       prevCss = document.getElementById("clr-css");
  //     } else if(i == 1) {
  //       clrCss.href = "https://unpkg.com/@clr/icons/clr-icons.min.css";
  //       clrCss.id = "clrIcon-css";
  //       prevCss = document.getElementById("clrIcon-css");
  //     }

  //     if(prevCss)//remove already inserted CSS to improve performance on consequtive favelet launches
  //       head.removeChild(prevCss);
  //     head.appendChild(clrCss);
  //   }

  //   //Preserve original body padding and margin
  //   var body_padding = "padding:"+$('body').css("padding-top")+" "+$('body').css("padding-right")+" "+$('body').css("padding-bottom")+" "+$('body').css("padding-left")+"; ";
  //   var body_margin = "margin:"+$('body').css("margin-top")+" 0px "+$('body').css("margin-bottom")+" 0px; ";

  //   var approot=document.createElement('visual-report-root');
  //   $('body').addClass('visual-testPage')
  //   .wrapInner("<div id='visual-testPage' style='"+body_padding+body_margin+"' ></div>")
  //   .prepend(approot);
  //   $('visual-report-root').attr('id', 'visualReport01');
  //   $('#visualReport01').css('width', '420px');

  //   setTimeout(function(){
  //     var testPage = $('#visual-testPage');
  //     var windonWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  //     var visualWidth = $("#visualReport01").outerWidth(true);
  //     var testPageWidth = windonWidth - visualWidth + 'px';
  //     var testPagePaddingTopAndBottomm = parseInt(testPage.css("padding-top")) + parseInt(testPage.css("padding-bottom"));
  //     var testPageHeight = (window.innerHeight - testPagePaddingTopAndBottomm) + "px";
  //     visualWidth = visualWidth + "px";

  //     $('#visualReport01')
  //     .css('position', 'fixed')
  //     .css('top', 0)
  //     .css('left', 0);

  //     //find fixed element and store the value of the original left distance and rigtt distance
  //     var testPageFixedElements = $('#visual-testPage *').filter(function () {
  //       return $(this).css('position') == 'fixed';
  //     });
  //     if(testPageFixedElements.length > 0) {
  //       for(var i = 0; i<testPageFixedElements.length; i++) {
  //         $(testPageFixedElements[i]).attr("data-test-origfixedleftRight", $(testPageFixedElements[i]).css("left")+" "+ $(testPageFixedElements[i]).css("right"));
  //       }
  //     }

  //     $('#visual-testPage')
  //     .css('width', testPageWidth)
  //     .css('height', testPageHeight)
  //     .css('margin-left', visualWidth)
  //     .find("[data-test-origfixedleftRight]").each(function(){
  //       //Adjust the left/right distance of any fixed elements in the test page
  //       var origFixedLeftRight = $(this).attr("data-test-origfixedleftRight").split(" ");
  //       var left = origFixedLeftRight[0];
  //       var right = origFixedLeftRight[1];
  //       if(left!="auto") //if attached to left
  //         $(this).css("left",parseInt(visualWidth) + parseInt(left) + "px"); //add the width together so there is no overlap
  //       else if(right === "auto") //if attached to right
  //         $(this).css("left",visualWidth);
  //     });
  //   })
  // })();
