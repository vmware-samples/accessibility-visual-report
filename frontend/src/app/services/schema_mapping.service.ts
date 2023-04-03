// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT


import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ReportDocs } from '../constant/docs';
import { Guide, GuideUtil, Doc, DocUtil, Defect, DefectUtil, Element, ElementUtil, Report, ReportUtil } from '../model/report';

//import { EnvironmentsService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class SchemaMappingService {

  /**
   * Now, we hardcode A11y Schema mapping to issue
   * In future, it should be able to read from schema mapping config to replace hardcode one
  **/
  static readonly baseUrl: string = environment.apiServiceUrl;
  private baseUrl: string;


  public reports: Report[] = [];
  public result_info: any[] = [];

  constructor(
    //private env: EnvironmentsService,
    private docs: ReportDocs) {
   // this.baseUrl = `${this.env.config.apiServiceUrl}`;
  }

  // configFile is hardcoded in PhaseI
  public mapReportPerConfig(result_entry, configFile=''): Report {
    let report: Report = ReportUtil.initReport();
    report.categories = this.categories;
    report.categoriesToView = this.categoriesToView;
    report.docs = this.docs.docs;
    Object.keys(report.docs).map(k=>{
      var doc = report.docs[k];
      doc["guideline_reference_url"] = "http://www.accessibility-visual-report.com:9003/document/accessibility/guideline/"+k+".html";
  });
    report.pageUrl = result_entry.url.url_to_accessibility;
    report.originalUrl = result_entry.url.original_url;
    report.pageTitle = result_entry.result.statistics.pagetitle;
    let [issues, elements] = this.mapReportIssuesAndElements(result_entry, configFile);
    report.defects = issues;
    report.elements = elements;
    return report;
  }

  // map categories to All Issues/Alerts per config
  categories = ["Issues","Alerts"];
  categoriesToView = ["Issues","Alerts"];
  mapCategories =   {
    error : "Issues",
    contrast : "Issues",
    alert : "Alerts",
    feature : "Features",
    structure : "Alerts",
    aria : "Alerts"
  }

  public mapReportIssuesAndElements(result_entry, configFile=''): [Defect[], Element[]] {
    let issues:Defect[] = [];
    let elements:Element[] = [];

    let categories_info = result_entry.result.categories;
    let categories_keys = Object.keys(categories_info);
    categories_keys.map(cat_key => {
      let cat_mapped = this.mapCategories[cat_key];
      if (this.categoriesToView.indexOf(cat_mapped)>-1) {
        let cat_info = categories_info[cat_key];
        let items_info = cat_info.items;
        let items_keys = Object.keys(items_info);
        items_keys.map(item_key =>  {
          let item_info = items_info[item_key];
          let issue: Defect = DefectUtil.initDefect();
          issue.category = cat_mapped;
          issue.name = item_key;
          issue.title = item_info.description;
          issue.sevirity = item_info.conformance_level;
          issue.elementIds = item_info.selectors || item_info.xpaths;
          issue.elementIds.map(elementId => {
            if (!elements.find(x => x.elementId === elementId ) ) {
              let element: Element = ElementUtil.initElement();
              element.elementId = elementId;
              element.elementLocator = elementId;
              element.code = '';
              element.elementObject = null;
              elements.push(element);
            };
          });
          issues.push(issue);
        });
      } else {
        console.log('Ignore this categories per config! ', cat_mapped);
      }
    });

    return [issues, elements];
  }

  // let report_json = require('../../assets/sample_data/report.json');
  public async parseReportFromJson(reportFile='https://localhost/assets/sample_data/report.json') {

    await fetch(reportFile)
    .then(res => res.json())
    .then((report_json) => {
      console.log('Checkout this JSON! ', report_json);
      this.result_info = report_json.result_info;
      this.result_info.map(result_entry => {
        let report = this.mapReportPerConfig(result_entry);
        this.reports.push(report);
      });

      console.log('Checkout this REPORTS! ', this.reports);
    })
    .catch(err => { throw err });

  }

}
