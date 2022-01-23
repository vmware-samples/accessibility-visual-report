// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DragDropComponent } from './drag-drop.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import {
    BrowserAnimationsModule,
    NoopAnimationsModule,
} from '@angular/platform-browser/animations';

describe("Tests Change Pool Unit Test", function () {

    let component: DragDropComponent;
    let fixture: ComponentFixture<DragDropComponent>;

    /**
     * do some init jobs
     * @method beforeEach
     * @public
     * @param function
     */
    beforeEach(function () {

        TestBed.configureTestingModule({
            declarations: [DragDropComponent],
            providers: [],
            imports: [ClarityModule, FormsModule, BrowserAnimationsModule, NoopAnimationsModule]
        });
        fixture = TestBed.createComponent(DragDropComponent);
        component = fixture.componentInstance;

        // init
        component.inputURLs = [];
    });


    afterEach(function () {

    })


    it('check function - textFilter', () => {

        fixture.detectChanges();    // wait for the change
        let mock = "https://www.baidu.com"
        component.textFilter(mock);

        expect(component.inputcontentArray).toContain(mock);
    });

    it('check function - textOnChange', () => {

        fixture.detectChanges();    // wait for the change
        component.inputURLs = ["https://www.baidu.com/", "ad.c"]
        component.inputExtraComments = "https://www.baidu.com/"
        component.textOnChange();
        let stub_valid = ["https://www.baidu.com/"];
        expect(component.validUrls).toEqual(stub_valid);

        component.inputExtraComments = "ad.c"
        component.textOnChange();
        let stub_invalid = ["ad.c"]
        expect(component.invalidUrls).toEqual(stub_invalid);
    });

});