  // Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

// Guide =  guideline, it is the standard to report an issue, for A11y, it is WACG
  export interface Guide {
    guideline_id: string;
    code: string;
    name: string;
    level_id: string;
    level_name: string;
    link: string;
  }

  export class GuideUtil{
    static initGuide(): Guide{
      return {
        guideline_id: "",
        code: "",
        name: "",
        level_id: "",
        level_name: "",
        link: ""
      }
    }
  }

  // Doc - reference documentation, it defines all supported issue types, for A11y, we have 115 by wave and 5 by crest.
  // Doc refers to Guide
  export interface Doc {
    id: string;
    name: string;
    icon_name: string;
    title: string;
    category: string;
    cat_code: string;
    summary: string;
    purpose: string;
    actions: string;
    details: string;
    resources: string;
    icon_order: string;
    position: string;
    page_rule: string;
    guidelines: object;
    levels: object;
  }

  export class DocUtil{
    static initDoc(): Doc{
      return {
        id: "",
        name: "",
        icon_name: "",
        title: "",
        category: "",
        cat_code: "",
        summary: "",
        purpose: "",
        actions: "",
        details: "",
        resources: "",
        icon_order: "",
        position: "",
        page_rule: "",
        guidelines: {},
        levels: {}
      }
    }
  }

  // Issue - single issue mapping to elementId, we will be able to check/uncheck certain issue type
  export interface Defect {
    name: string;
    title: string,
    category: string;
    sevirity: string;
    elementIds: string[];
    defectTypeElements: defectTypelement[];
    panelOpen: boolean;
    notDisplayElements: defectTypelement[];
    xpath: string[]
  }

  export interface defectTypelement {
    name: string;
    title: string,
    sevirity: string;
    description: string;
    action: string;
    code?: string;
    xpath?: string;
    elementId: string;
    elementObject: object;
    contrast?: any[];
  }

  export class DefectUtil{
    static initDefect(): Defect{
      return {
        name: '',
        title: '',
        sevirity: '',
        category: '',
        elementIds: [],
        defectTypeElements: [],
        panelOpen: false,
        notDisplayElements: [],
        xpath: []
      }
    }
  }

  // Element - single element mapping to elementId and code snippet
  export interface Element {
    elementId: string;
    elementLocator: string;
    code: string;
    elementObject: object;
  }

  export class ElementUtil{
    static initElement(): Element{
      return {
      elementId: '',
      elementLocator: '',
      code: '',
      elementObject: null
      }
    }
  }

  // Report - single entry to paire element with issue icons
  export interface Report {
    pageTitle: string;
    pageUrl: string;
    originalUrl: string;
    categories: string[];
    categoriesToView: string[];
    docs: object;
    defects: Defect[];
    elements: Element[];
  }

  export class ReportUtil{
    static initReport(): Report{
      return {
        pageTitle: '',
        pageUrl: '',
        originalUrl: '',
        categories: [],
        categoriesToView: [],
        docs: {},
        defects: [],
        elements: []
      }
    }
  }


