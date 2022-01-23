// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ReportService {
    baseUrl: string = environment.baseUrl + '/result/a11y_task/';
    constructor(
        private http: HttpClient) {
    }

    public postTaskId(entriedUrls) {
        // types could be 'wave', 'crest', for opensource version, only crest supported
        // let payload = {urls: entriedUrls, types: ['wave', 'crest']};
        let payload = {urls: entriedUrls};
        console.log("postTaskId: ", this.baseUrl, payload);
        return this.http.post(this.baseUrl, payload);
    }

    public getTaskStatus(taskId) {
        let url = this.baseUrl + taskId
        let payload = {  "task_id": taskId, "task_for": "status" };
        console.log("getTaskStatus: ", this.baseUrl, payload, url);
        return this.http.post(this.baseUrl, payload);
    }

    public getReportUrl(taskId) {
        let url = this.baseUrl + `${taskId}/report`
        let payload = {  "task_id": taskId, "task_for": "report" };
        console.log("getReportUrl: ", this.baseUrl, payload, url);
        return this.http.post(this.baseUrl, payload);
    }
}
