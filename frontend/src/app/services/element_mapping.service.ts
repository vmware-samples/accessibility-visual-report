// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class ElementMappingService {

    /**
     * Now, we hardcode A11y Schema mapping to issue
     * In future, it should be able to read from schema mapping config to replace hardcode one
     **/


    constructor() {

    }

    /**
     * get URL params
     * @method getUrlParams
     * @param {any} url_string
     * @public
     * @return {any} params
     */
    getUrlParams(url_string) {
        console.log(url_string)
        var url = new URL(url_string);
        var urlParams = url.searchParams;
        return urlParams;
    }

    public vavr = {
        allTags: null,
        fn: {
            getHashURL : async function (_this) {
                _this.url = decodeURIComponent(_this.url);
                await _this.fn.newReport(_this);
            },
            newReport : async function (_this) {
                let url = null;
                if ( _this.url.startsWith("http://") || _this.url.startsWith("https://") ) { url = _this.url; } else { url = window.location.origin+_this.url; }
                console.log("Got url: ", url);
                // remap to /api/getpage/xxx
                _this.pageUrl = url.includes(window.location.origin)?url:window.location.origin + "/result/get_page/" + encodeURIComponent(url);
                console.log("Got pageUrl: ", _this.pageUrl);
                await _this.fn.loadPage(_this);
                _this.page = $(_this.pageIframeId)[0].contentDocument
                _this.xpath.IframeDocs[_this.pageIframeId] = _this.page;
            },
            loadPage : async function (_this) {
                var e = $.Deferred();
                return $(_this.pageIframeId).on("load", function (t) {
                    console.log("report iframe loaded");
                    $(_this.pageIframeId).unbind(t), e.resolve()
                }),
                setTimeout(function () { console.log("report iframe loading timeout"); e.resolve();}, 30000),
                $(_this.pageIframeId)[0].contentWindow.location.replace(_this.pageUrl), e.promise()
            },
            getElementLocator: function(locator) {
                let xpaths = locator.split(",");
                let elementLocator = xpaths.pop();
                let iframeLocator = xpaths.join(",");
                return [xpaths, elementLocator, iframeLocator];
            },
            getElementInReport: async function(locator, _this) {
                let [xpaths, elementLocator, iframeLocator] = _this.fn.getElementLocator(locator);
                let doc = _this.page;
                let element = null;
                if (iframeLocator!="") {
                    if (iframeLocator in _this.xpath.IframeDocs) {
                        doc = _this.xpath.IframeDocs[iframeLocator];
                    } else {
                        for (let i=0; i<xpaths.length; i++) {
                            // iframe is xpath, need to use getElementByXpath
                            let doc_found = getElementByLocator(xpaths[i], doc);
                            console.log(xpaths[i],doc, elementLocator, iframeLocator, doc_found)
                            if (doc_found) {
                                doc = doc_found["contentDocument"];
                            } else {
                                console.log("Invalid Reports:", xpaths[i], doc);
                                break;
                            }
                        }
                        _this.xpath.IframeDocs[iframeLocator] = doc;
                    }
                }

                // locate the element
                if (elementLocator.startsWith("/")) {
                    // Do not use fuzzy match since too many nodes
                    element = getElementByXpath(elementLocator, doc);
                } else {
                    let element_found = $(elementLocator, doc);
                    if (element_found.length>0) {
                        element = element_found[0];
                    }
                }
                return [element, doc];
            }
        },
        page: null,
        report: null,
        url: "https://localhost/tagged-iframe",
        pageIframeId: '#report-tagged-iframe',
        pageUrl: '',
        xpath: {
            Locator: {},
            IframeDocs: {},
            activeElement : null
        },
        init: async function (reports, url = "") {
            if (reports.length==0) {
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
        mapReport: async function (reports) {
            // filter current report
            console.log("Filter Report for URL:", this.url, this.pageUrl);
            let report_current = reports.find(e=>{ return e.pageUrl==this.url || e.pageUrl==this.pageUrl; });
            if (!report_current) {
                console.log("0, Unable to find Report for ", this.url)
            } else {
                let tempElementId = 1;
                for (let i=0; i<report_current.elements.length; i++) {
                    let element = report_current.elements[i];
                    try {
                        console.log("Now: ", i, element.elementLocator)
                        let [element_found, doc] = await this.fn.getElementInReport(element.elementLocator, this);
                        // -1 means not found
                        if (element_found) {
                            element.elementId = String(tempElementId);
                            tempElementId+=1;
                            element.elementObject = element_found;
                            element.code = element_found.outerHTML;
                            // console.log(element, doc)
                        } else {
                            console.log("-3, Unable to locate ", i , element.elementLocator, doc)
                            element.elementId = "-1";
                        }
                    } catch {
                        console.log("-4, Error to locate ", i , element.elementLocator)
                        element.elementId = "-1";
                    }
                    this.xpath.Locator[element.elementLocator]=element.elementId;
                }

                let issues = report_current.defects.map(issue => {
                    issue.elementIds = issue.elementIds.map(elementId=>{
                        return this.xpath.Locator[elementId];
                    });
                    return issue;
                });
                report_current.issues = issues;
                this.report = report_current;
                console.log("Got report for ",this.report)
            }

        }
    };

}


function getCountTagWithIndex(path){
    return path.split("]/").length;
}

function getXpath2Fuzzy(path, index){
    let n = index;
    let reg = "((\\/.*?){"+index+"})(\\[\\d\\])(\\/.*)"
    let re = new RegExp(reg);
    //console.log(path.match(re));
    return path.replace(re,"$1$4");
}

function getElementByXpath(path, doc) {
  return doc.evaluate(path, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getElementsByXpath(path, doc) {
  return doc.evaluate(path, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getElementByXpathFuzzy(path, doc){
    let skipTags=["NULL","HTML","BODY"];
    let index = getCountTagWithIndex(path);
    //console.log("Max Fuzzy Index: ",index);
    let element = getElementByXpath(path, doc);
    if (!element) {
        for (let i=1; i<=index; i++){
            // get and test xpath2Fuzzy
            let xpath2Fuzzy = getXpath2Fuzzy(path, i);
            let element = getElementByXpath(xpath2Fuzzy, doc);
            if (element) {
                //console.log("Index: ",i," xpath2Fuzzy: ",xpath2Fuzzy," element",element);
                return element;
            }
        }
    } else {
        return element;
    }
}


function getXpath2(element) {
    if (element.tagName == 'HTML')
        return '/HTML[1]';
    if (element.tagName == 'BODY')
        return '/HTML[1]/BODY[1]';
    if (!element.parentNode)
        return ''

    var ix= 0;
    var siblings= element.parentNode.childNodes;
    for (var i= 0; i<siblings.length; i++) {
        var sibling= siblings[i];
        if (sibling===element)
            return getXpath2(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
        if (sibling.nodeType===1 && sibling.tagName===element.tagName)
            ix++;
    }
}

function getElementByLocator(xp, doc) {
    return getElementByXpathFuzzy(xp, doc);
}

