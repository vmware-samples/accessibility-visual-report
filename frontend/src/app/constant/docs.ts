// Copyright 2022 VMware, Inc.
// SPDX-License-Identifier: MIT

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ReportDocs {
    public docs = {
        // 110 Wave Docs
        alt_missing: {
            id: "1",
            name: "alt_missing",
            icon_name: "alt_missing",
            title: "Missing alternative text",
            category: "Errors",
            cat_code: "error",
            summary: "Image alternative text is not present.",
            purpose: "Each image must have an alt attribute. Without alternative text, the content of an image will not be available to screen reader users or when the image is unavailable.",
            actions: 'Add an alt attribute to the image. The attribute value should accurately and succinctly present the content and function of the image. If the content of the image is conveyed in the context or surroundings of the image, or if the image does not convey content or have a function, it should be given empty/null alternative text (alt="").',
            details: "An image does not have an alt attribute.",
            resources: "https://webaim.org/techniques/alttext/ Appropriate Use of Alternative Text [WebAIM]",
            icon_order: "1",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_link_missing: {
            id: "21",
            name: "alt_link_missing",
            icon_name: "alt_link_missing",
            title: "Linked image missing alternative text",
            category: "Errors",
            cat_code: "error",
            summary: "An image without alternative text results in an empty link.",
            purpose: "Images that are the only thing within a link must have descriptive alternative text. If an image is within a link that contains no text and that image does not provide alternative text, a screen reader has no content to present to the user regarding the function of the link.",
            actions: "Add appropriate alternative text that presents the content of the image and/or the function of the link.",
            details: "An image without alternative text (missing alt attribute or an alt value that is null/empty or only space characters) is within a link that does not contain text and an image with alternative text.",
            resources: "",
            icon_order: "2",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                52: {
                    guideline_id: "52",
                    code: "2.4.4",
                    name: "2.4.4 Link Purpose (In Context) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.4"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_spacer_missing: {
            id: "8",
            name: "alt_spacer_missing",
            icon_name: "alt_spacer_missing",
            title: "Spacer image missing alternative text",
            category: "Errors",
            cat_code: "error",
            summary: "A layout spacer image (which should have null/empty alternative text) does not have an alt attribute.",
            purpose: 'Spacer images are used to maintain layout. They do not convey content and should be given null/empty alternative text (alt="") so they are not presented to users and are ignored by screen readers.',
            actions: 'If the image is a spacer image, give the image null/empty alternative text (alt=""). Alternatively, consider using CSS instead of spacer images to control positioning and layout.',
            details: 'An image is missing an alt attribute and has a width or height of 3 pixels or less or has a file name starting with "spacer.*", "space.*", or "blank.*". ',
            resources: "",
            icon_order: "3",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_input_missing: {
            id: "22",
            name: "alt_input_missing",
            icon_name: "alt_input_missing",
            title: "Image button missing alternative text",
            category: "Errors",
            cat_code: "error",
            summary: "Alternative text is not present for a form image button.",
            purpose: "Image buttons provide important functionality that must be presented in alternative text. Without alternative text, the function of an image button is not made available to screen reader users or when images are disabled or unavailable.",
            actions: 'Add appropriate alternative text that presents the function of the image button (e.g., &lt;input src="button.gif" type="image" alt="Submit search"&gt;).',
            details: 'An image button (&lt;input type="image"&gt;) does not have an alt attribute or has an alt value that is null/empty (alt="") or only space characters.',
            resources: "",
            icon_order: "4",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                52: {
                    guideline_id: "52",
                    code: "2.4.4",
                    name: "2.4.4 Link Purpose (In Context) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.4"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_area_missing: {
            id: "2",
            name: "alt_area_missing",
            icon_name: "alt_area_missing",
            title: "Image map area missing alternative text",
            category: "Errors",
            cat_code: "error",
            summary: "Alternative text is not present for an image map area (hot spot).",
            purpose: "Image map areas or clickable hot spots provide important functionality that must be provided in alternative text. Without alternative text, the function of the area is not made available to screen reader users or when images are unavailable.",
            actions: "Add a descriptive alt attribute value to each area element. Additionally, ensure that the area elements are listed in the code in a logical, intuitive order (e.g., matching the visual order, alphabetically, etc.).",
            details: 'An area element does not have the alt attribute or has an alt value that is null/empty (alt="") or only space characters.',
            resources: "",
            icon_order: "5",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                52: {
                    guideline_id: "52",
                    code: "2.4.4",
                    name: "2.4.4 Link Purpose (In Context) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.4"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_map_missing: {
            id: "23",
            name: "alt_map_missing",
            icon_name: "alt_map_missing",
            title: "Image map missing alternative text",
            category: "Errors",
            cat_code: "error",
            summary: "An image that has hot spots does not have an alt attribute.",
            purpose: "Any content or function of an image that uses an image map (hot spots) and does not have an alt attribute will not be available to screen reader users or if the image is unavailable.",
            actions: 'Add an alt attribute to the image. Ensure the alt attribute value for the image map image is appropriate. The alternative text is typically null/empty (alt=""), unless the image conveys content not conveyed in the hot spot areas (e.g., "Map of the United States").',
            details: "An image element has the usemap attribute and no alt attribute.",
            resources: "",
            icon_order: "6",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        longdesc_invalid: {
            id: "34",
            name: "longdesc_invalid",
            icon_name: "longdesc_invalid",
            title: "Invalid longdesc",
            category: "Errors",
            cat_code: "error",
            summary: "The longdesc attribute is not a URL.",
            purpose: "The longdesc attribute of an image must be a valid URL of a page that contains a description of the image content. A longdesc value that contains image description text will not provide any accessibility information. Due to poor support, a link to the long description content should be used instead of longdesc.",
            actions: "Remove the longdesc attribute and provide a link to the long description content. If the longdesc attribute is maintained, ensure the attribute value is a valid URL/filename.",
            details: "The longdesc attribute value:\n<ul>\n<li>is empty</li>\n<li>is not a URL or filename</li>\n<li>is a URL or filename with an extension of .jpg, .gif, or .png</li>\n</ul>",
            resources: "",
            icon_order: "7",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        label_missing: {
            id: "29",
            name: "label_missing",
            icon_name: "label_missing",
            title: "Missing form label",
            category: "Errors",
            cat_code: "error",
            summary: "A form control does not have a corresponding label.",
            purpose: "If a form control does not have a properly associated text label, the function or purpose of that form control may not be presented to screen reader users. Form labels also provide visible descriptions and larger clickable targets for form controls.",
            actions: "If a text label for a form control is visible, use the &lt;label&gt; element to associate it with its respective form control. If there is no visible label, either provide an associated label, add a descriptive title attribute to the form control, or reference the label(s) using aria-labelledby. Labels are not required for image, submit, reset, button, or hidden form controls.",
            details: "An &lt;input&gt; (except types of image, submit, reset, button, or hidden), &lt;select&gt;, or &lt;textarea&gt; does not have a properly associated label. A properly associated label is:\n<ul>\n<li>a &lt;label&gt; element with a for attribute value that is equal to the id of a unique form control\n<li>a &lt;label&gt; element that surrounds the form control, does not surround any other form controls, and does not reference another element with its for attribute\n<li>a non-empty title attribute, or\n<li>a non-empty aria-labelledby attribute.\n</ul>",
            resources: "",
            icon_order: "8",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                },
                71: {
                    guideline_id: "71",
                    code: "3.3.2",
                    name: "3.3.2 Labels or Instructions (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc3.3.2"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        label_empty: {
            id: "28",
            name: "label_empty",
            icon_name: "label_empty",
            title: "Empty form label",
            category: "Errors",
            cat_code: "error",
            summary: "A form label is present, but does not contain any content.",
            purpose: "A &lt;label&gt; element that is associated to a form control but does not contain text will not present any information about the form control to the user.",
            actions: "Ensure that the form label contains text that describes the function of the associated form control. Labels are not required for image, submit, reset, button, or hidden form controls. If a label is not necessary visually, a descriptive title attribute may be added to the form control.",
            details: "A form label is present and associated with an existing form control (using for/id or surrounds the form control), but does not contain any text or images with alternative text.",
            resources: "",
            icon_order: "9",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                },
                71: {
                    guideline_id: "71",
                    code: "3.3.2",
                    name: "3.3.2 Labels or Instructions (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc3.3.2"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        label_multiple: {
            id: "30",
            name: "label_multiple",
            icon_name: "label_multiple",
            title: "Multiple form labels",
            category: "Errors",
            cat_code: "error",
            summary: "A form control has more than one label associated with it.",
            purpose: "A form control should have at most one associated label element. If more than one label element is associated to the control, assistive technology may not read the appropriate label.",
            actions: "Ensure that at most one label element is associated to the form control. If multiple form labels are necessary, use aria-labelledby.",
            details: "Two or more &lt;label&gt;s are associated to a single &lt;input&gt; (except types of image, submit, reset, button, or hidden), &lt;select&gt;, or &lt;textarea&gt;.",
            resources: "",
            icon_order: "10",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                },
                71: {
                    guideline_id: "71",
                    code: "3.3.2",
                    name: "3.3.2 Labels or Instructions (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc3.3.2"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        aria_reference_broken: {
            id: "131",
            name: "aria_reference_broken",
            icon_name: "aria_reference_broken",
            title: "Broken ARIA reference",
            category: "Errors",
            cat_code: "error",
            summary: "An aria-labelledby or aria-describedby reference exists, but the target for the reference does not exist.",
            purpose: "ARIA labels and descriptions will not be presented if the element referenced does not exist in the page.",
            actions: "Ensure the element referenced in the aria-labelledby or aria-describedby attribute value is present within the page and presents a proper label or description.",
            details: "An element has an aria-labelledby or aria-describedby value that does not match the id attribute value of another element in the page.",
            resources: "",
            icon_order: "11",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                77: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "4.1.2",
                    name: "4.1.2 Name, Role, Value (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc4.1.2",
                    guideline_id: "77"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        aria_menu_broken: {
            name: "aria_menu_broken",
            category: "Errors",
            cat_code: "error",
            title: "Broken ARIA menu",
            summary: "An ARIA menu does not contain required menu items.",
            purpose: "ARIA menus are application menus (like those used in software menu) with a specific keyboard interactions. They are NOT for navigation links on a web site and must contain at least one menuitem, menuitemcheckbox, or menuitemradio element.",
            actions: "Ensure that the menu is an application menu and has the appropriate keyboard interactions (menu items are navigated via the arrow keys, not via the Tab key) and internal menu items, otherwise remove the menu role.",
            details: 'An element with role="menu" does not contain at least one element with role="menuitem", role="menuitemcheckbox", or role="menuitemradio".',
            resources: "",
            icon_order: "12",
            position: "first",
            page_rule: "0",
            icon_name: "aria_menu_broken",
            api_type: "WAVE", guidelines: {
                39: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "2.1.1",
                    name: "2.1.1 Keyboard (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.1.1",
                    guideline_id: "39"
                },
                77: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "4.1.2",
                    name: "4.1.2 Name, Role, Value (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc4.1.2",
                    guideline_id: "77"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        title_invalid: {
            id: "58",
            name: "title_invalid",
            icon_name: "title_invalid",
            title: "Missing or uninformative page title",
            category: "Errors",
            cat_code: "error",
            summary: "The page title is missing or not descriptive.",
            purpose: "A descriptive title helps users understand a page's purpose or content. Without a proper title, many users (especially those using screen readers or other assistive technology) may have difficulty orienting themselves to the page.",
            actions: "Add a brief, descriptive page title.",
            details: 'The page title is missing, empty, contains only whitespace characters, or begins with "untitled".',
            resources: "",
            icon_order: "13",
            position: "last",
            page_rule: "1",
            api_type: "WAVE", guidelines: {
                50: {
                    guideline_id: "50",
                    code: "2.4.2",
                    name: "2.4.2 Page Titled (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.2"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        language_missing: {
            id: "116",
            name: "language_missing",
            icon_name: "language_missing",
            title: "Language missing or invalid",
            category: "Errors",
            cat_code: "error",
            summary: "The language of the document is not identified or a lang attribute value is invalid.",
            purpose: "Identifying the language of the page or page elements allows screen readers to read the content in the appropriate language. It also facilitates automatic translation of content.",
            actions: 'Identify the document language using the &lt;html lang&gt; attribute with a valid value (e.g., &lt;html lang="en"&gt;). Ensure that all lang attribute values are valid.',
            details: "The &lt;html lang&gt; attribute is missing or is empty, or a lang attribute value is not a valid language identifier.",
            resources: "",
            icon_order: "14",
            position: "last",
            page_rule: "1",
            api_type: "WAVE", guidelines: {
                59: {
                    guideline_id: "59",
                    code: "3.1.1",
                    name: "3.1.1 Language of Page (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc3.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        meta_refresh: {
            id: "69",
            name: "meta_refresh",
            icon_name: "meta_refresh",
            title: "Page refreshes or redirects",
            category: "Errors",
            cat_code: "error",
            summary: "The page is set to automatically change location or refresh using a &lt;meta&gt; tag.",
            purpose: "Pages that automatically change location or refresh pose significant usability issues, particularly for screen reader and keyboard users.",
            actions: "Remove the &lt;meta&gt; refresh and give the user control over time-sensitive content changes.",
            details: 'A &lt;meta http-equiv="refresh"&gt; tag is present.',
            resources: "",
            icon_order: "15",
            position: "last",
            page_rule: "1",
            api_type: "WAVE", guidelines: {
                42: {
                    guideline_id: "42",
                    code: "2.2.1",
                    name: "2.2.1 Timing Adjustable (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.2.1"
                },
                43: {
                    guideline_id: "43",
                    code: "2.2.2",
                    name: "2.2.2 Pause, Stop, Hide (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.2.2"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        heading_empty: {
            id: "49",
            name: "heading_empty",
            icon_name: "heading_empty",
            title: "Empty heading",
            category: "Errors",
            cat_code: "error",
            summary: "A heading contains no content.",
            purpose: "Some users, especially keyboard and screen reader users, often navigate by heading elements. An empty heading will present no information and may introduce confusion.",
            actions: "Ensure that all headings contain informative content.",
            details: "A heading element is present that contains no text (or only spaces) and no images with alternative text.",
            resources: "",
            icon_order: "16",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        button_empty: {
            id: "121",
            name: "button_empty",
            icon_name: "button_empty",
            title: "Empty button",
            category: "Errors",
            cat_code: "error",
            summary: "A button is empty or has no value text.",
            purpose: "When navigating to a button, descriptive text must be presented to screen reader users to indicate the function of the button.",
            actions: "Place text content within the &lt;button&gt; element or give the &lt;input&gt; element a value attribute.",
            details: 'A &lt;button&gt; element is present that contains no text content (or alternative text), or an &lt;input type="submit"&gt;, &lt;input type="button"&gt;, or &lt;input type="reset"&gt; has an empty or missing value attribute.',
            resources: "",
            icon_order: "17",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                52: {
                    guideline_id: "52",
                    code: "2.4.4",
                    name: "2.4.4 Link Purpose (In Context) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.4"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        link_empty: {
            id: "50",
            name: "link_empty",
            icon_name: "link_empty",
            title: "Empty link",
            category: "Errors",
            cat_code: "error",
            summary: "A link contains no text.",
            purpose: "If a link contains no text, the function or purpose of the link will not be presented to the user. This can introduce confusion for keyboard and screen reader users.",
            actions: "Remove the empty link or provide text within the link that describes the functionality and/or target of that link.",
            details: "An anchor element has an href attribute, but contains no text (or only spaces) and no images with alternative text.",
            resources: "",
            icon_order: "18",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                52: {
                    guideline_id: "52",
                    code: "2.4.4",
                    name: "2.4.4 Link Purpose (In Context) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.4"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        link_skip_broken: {
            id: "47",
            name: "link_skip_broken",
            icon_name: "link_skip_broken",
            title: "Broken skip link",
            category: "Errors",
            cat_code: "error",
            summary: "A skip navigation link exists, but the target for the link does not exist or the link is not keyboard accessible.",
            purpose: "A link to jump over navigation or jump to the main content of the page assists keyboard users only if the link is properly functioning and is keyboard accessible.",
            actions: "Ensure that the target for the link exists and that the link is not hidden with CSS display:none or visibility:hidden.",
            details: 'An in-page link contains the words "skip" or "jump" and is hidden with CSS display:none or visibility:hidden, or the link has an href attribute that does not match the id value of another element within the page or the name attribute value of an anchor element within the page.',
            resources: "",
            icon_order: "19",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                39: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "2.1.1",
                    name: "2.1.1 Keyboard (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.1.1",
                    guideline_id: "39"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        th_empty: {
            id: "32",
            name: "th_empty",
            icon_name: "th_empty",
            title: "Empty table header",
            category: "Errors",
            cat_code: "error",
            summary: "A &lt;th&gt; (table header) contains no text.",
            purpose: "The &lt;th&gt; element helps associate table cells with the correct row/column headers. A &lt;th&gt; that contains no text may result in cells with missing or incorrect header information.",
            actions: "If the table cell is a header, provide text within the cell that describes the column or row. If the cell is not a header or must remain empty (such as the top-left cell in a data table), make the cell a &lt;td&gt; rather than a &lt;th&gt;.",
            details: "A &lt;th&gt; element does not contain any text (or contains only spaces) and no images with alternative text.",
            resources: "",
            icon_order: "20",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        blink: {
            id: "57",
            name: "blink",
            icon_name: "blink",
            title: "Blinking content",
            category: "Errors",
            cat_code: "error",
            summary: "Blinking content is present.",
            purpose: "Blinking content can be distracting and confusing to users, particularly those with certain cognitive disabilities.",
            actions: "Remove the blinking effect (&lt;blink&gt; element or text-decoration:blink style). Important text can be styled in other ways.",
            details: "A non-empty &lt;blink&gt; element or other text has CSS text-decoration:blink styling.",
            resources: "",
            icon_order: "21",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                43: {
                    guideline_id: "43",
                    code: "2.2.2",
                    name: "2.2.2 Pause, Stop, Hide (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.2.2"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        marquee: {
            id: "56",
            name: "marquee",
            icon_name: "marquee",
            title: "Marquee",
            category: "Errors",
            cat_code: "error",
            summary: "A &lt;marquee&gt; element is present.",
            purpose: "A marquee element presents scrolling text that the user cannot stop. Scrolling animated content can be distracting and confusing to users, particularly for those with certain cognitive disabilities.",
            actions: "Remove the marquee element. If content must scroll, use an alternative scrolling mechanism that allows the user to pause or stop the animation.",
            details: "A &lt;marquee&gt; element is present.",
            resources: "",
            icon_order: "22",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                43: {
                    guideline_id: "43",
                    code: "2.2.2",
                    name: "2.2.2 Pause, Stop, Hide (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.2.2"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        contrast: {
            id: "126",
            name: "contrast",
            icon_name: "contrast",
            title: "Very low contrast",
            category: "Contrast Errors",
            cat_code: "contrast",
            summary: "Very low contrast between text and background colors.",
            purpose: "Adequate contrast of text is necessary for all users, especially users with low vision.",
            actions: "Increase the contrast between the foreground (text) color and the background color. Large text (larger than 18 point or 14 point bold) does not require as much contrast as smaller text.",
            details: "Text is present that has a contrast ratio less than 4.5:1, or large text (larger than 18 point or 14 point bold) has a contrast ratio less than 3:1. WCAG requires that page elements have both foreground AND background colors defined (or inherited) that provide sufficient contrast. When text is presented over a background image, the text must have a background color defined (typically in CSS) that provides adequate text contrast when the background image is disabled or unavailable. WAVE does not identify contrast issues in text with CSS transparency, gradients, or filters.",
            resources: "",
            icon_order: "1",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                32: {
                    guideline_id: "32",
                    code: "1.4.3",
                    name: "1.4.3 Contrast (Minimum) (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.4.3"
                }
            },
            levels: {
                2: "WCAG 2 AA"
            }
        },
        alt_suspicious: {
            id: "27",
            name: "alt_suspicious",
            icon_name: "alt_suspicious",
            title: "Suspicious alternative text",
            category: "Alerts",
            cat_code: "alert",
            summary: "Alternative text is likely insufficient or contains extraneous information.",
            purpose: "If the alternative text for an image does not provide the same content or information conveyed by the image, that content will not be available to screen reader users and when images are unavailable.",
            actions: 'Ensure that the alternative text for the image or image input provides a succinct, yet equivalent alternative to the content and function of the image. Screen readers and browser presentation inform the user that the object is an image, so alternative text of "image of..." (and similar) should be avoided. If the image does not convey content or if the content is presented in nearby text (e.g., a caption), null/empty alternative text (alt="") is appropriate.',
            details: 'The alt text value of an image or image button:\r\n<ul>\r\n<li>begins with "graphic of", "bullet", or "image of",\r\n<li>ends with "image" or "graphic",\r\n<li>contains only space characters (alt=" "),\r\n<li>is an image file name (e.g. alt="photo.gif"), or\r\n<li>is one of the following: "image", "graphic", "photo", "photograph", "drawing", "painting", "artwork", "logo", "bullet", "button", "arrow", "more", "spacer", "blank", "chart", "table", "diagram", "graph", or "*".\r\n</ul>',
            resources: "",
            icon_order: "1",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_redundant: {
            id: "31",
            name: "alt_redundant",
            icon_name: "alt_redundant",
            title: "Redundant alternative text",
            category: "Alerts",
            cat_code: "alert",
            summary: "The alternative text for an image is the same as nearby or adjacent text.",
            purpose: "Alternative text that is the same as nearby or adjacent text will be presented multiple times to screen readers or when images are unavailable.",
            actions: 'Change either the alternative text or the adjacent text to eliminate the redundancy. In most cases, you can give the image empty/null alternative text (alt="") because the content of the image is already provided in context through text. Linked images may often be combined with the adjacent text into one link, in which case the image may be given null/empty alternative text (alt="").',
            details: "The alternative text is the same as text that is within 15 characters of the image.",
            resources: "",
            icon_order: "2",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_duplicate: {
            id: "36",
            name: "alt_duplicate",
            icon_name: "alt_duplicate",
            title: "A nearby image has the same alternative text",
            category: "Alerts",
            cat_code: "alert",
            summary: "Two images near each other have the same alternative text.",
            purpose: "When two images have the same alternative text, this often causes redundancy or indicates incorrect alternative text.",
            actions: 'Ensure that the alternative text for each image or image button is appropriate while removing unnecessary redundancy. If the content of the image is already conveyed elsewhere (through text or the alternative text of a nearby image) or if the image does not convey content, the image may generally be given empty/null alternative text (alt=""). Image buttons always convey a specific function, and thus cannot be given null alternative text.',
            details: "The same alternative text (case insensitive, but not null/empty) is present for two images or image buttons (&lt;input type='image'&gt;) near each other (no more than 2 other images separate them).",
            resources: "",
            icon_order: "3",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_long: {
            id: "41",
            name: "alt_long",
            icon_name: "alt_long",
            title: "Long alternative text",
            category: "Alerts",
            cat_code: "alert",
            summary: "An image has very long alternative text.",
            purpose: "Alternative text should be succinct, yet descriptive of the content and function of an image. Lengthy alternative text (more than around 100 characters) often indicates that extraneous content or content that is not available to sighted users is being presented.",
            actions: "Ensure the alternative text is succinct, yet descriptive. Ensure that no content is being presented in alternative text that is not available to sighted users viewing the image. When possible, either shorten the alternative text or provide the text alternative via another method (e.g., in text near the image, through a separate description page, etc.).",
            details: "The image's alt attribute value is more than 100 characters. Note that the 100 character limit is a rough and somewhat arbitrary length. For images that present complex content or lengthy text, alternative text longer than 100 characters may be appropriate.",
            resources: "",
            icon_order: "4",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        longdesc: {
            id: "43",
            name: "longdesc",
            icon_name: "longdesc",
            title: "Long description",
            category: "Alerts",
            cat_code: "alert",
            summary: "The longdesc attribute is present.",
            purpose: "Because of poor support, the longdesc attribute should not be used.",
            actions: "Because of poor browser support for longdesc, it should not be used to provide the description of complex images. The description may be provided:\n<ul>\n<li>in the alt attribute, if possible. Alt text should be succinct (generally no more than ~100 characters).\n<li>in nearby text (e.g., a caption, data table, etc.)\n<li>via a link to a separate description page that contains an accurate and equivalent description.\n</ul>",
            details: "An image has a longdesc attribute containing a valid URL.",
            resources: "",
            icon_order: "5",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        image_title: {
            name: "image_title",
            category: "Alerts",
            cat_code: "alert",
            title: "Image with title",
            summary: "An image has a title attribute value but no alt value.",
            purpose: "The title attribute value for images that lack an alt attribute value will be presented to screen reader users. However, providing image content in the alt attribute typically value provides better accessibility, and should be used in most cases. The title attribute will generate a mouse hover tooltip which more or may not be desired - this tooltip will not be presented to touch screen or keyboard users.",
            actions: "Ensure the title attribute value presents the content and function of the image. For better accessibility, the alt attribute should be used when possible.",
            details: "An image is present that does not have an alt attribute or alt attribute value, but does have a title attribute value.",
            resources: "",
            icon_order: "6",
            position: "after",
            page_rule: "0",
            icon_name: "image_title",
            api_type: "WAVE", guidelines: {
                17: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1",
                    guideline_id: "17"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        label_orphaned: {
            id: "35",
            name: "label_orphaned",
            icon_name: "label_orphaned",
            title: "Orphaned form label",
            category: "Alerts",
            cat_code: "alert",
            summary: "A form label is present, but it is not correctly associated with a form control.",
            purpose: "An incorrectly associated label does not provide functionality or information about the form control to the user. It usually indicates a coding or other form labeling issues.",
            actions: "Properly associate the label with its corresponding form control. If there is no corresponding form control, remove the label. Labels are not appropriate for image, submit, reset, button, or hidden form controls.",
            details: "A &lt;label&gt; element:\r\n<ul>\r\n<li>does not surround a form control and the for attribute is missing/empty\r\n<li>references an element that is not present in the page\r\n<li>references an element that is not an &lt;input&gt;, &lt;select&gt; or &lt;textarea&gt; element\r\n<li>references an &lt;input&gt; element with image, submit, reset, button, or hidden type\r\n</ul>",
            resources: "",
            icon_order: "7",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                },
                71: {
                    guideline_id: "71",
                    code: "3.3.2",
                    name: "3.3.2 Labels or Instructions (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc3.3.2"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        label_title: {
            id: "51",
            name: "label_title",
            icon_name: "label_title",
            title: "Unlabeled form control with title",
            category: "Alerts",
            cat_code: "alert",
            summary: "A form control does not have a label, but has a title.",
            purpose: "The title attribute value for unlabeled form controls will be presented to screen reader users. However, a properly associated text label provides better usability and accessibility and should be used unless the purpose of the form control is intuitive without the label.",
            actions: "If a visible text label is available for the form control, associate the text label to the form control using the label element. This provides additional functionality for end users because if the label is clicked it will set focus to the form control. If the form control is intuitive without a &lt;label&gt;, the title attribute value may be used. Note that the title attribute value will not generally be read by a screen reader if the control has a label and may not be available to sighted users, particularly keyboard-only users.",
            details: "An &lt;input&gt; (except types of image, submit, reset, button, or hidden), &lt;textarea&gt;, or &lt;select&gt; element has a non-empty title attribute value and is missing a label or valid aria-labelledby reference.",
            resources: "",
            icon_order: "8",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                },
                71: {
                    guideline_id: "71",
                    code: "3.3.2",
                    name: "3.3.2 Labels or Instructions (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc3.3.2"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        select_missing_label: {
            name: "select_missing_label",
            category: "Alerts",
            cat_code: "alert",
            title: "Select missing label",
            summary: "A select element does not have an associated label",
            purpose: "&lt;select&gt; elements must provide descriptive text about their function. This is typically provided via associated label text. If visual label text is not present and if the default select option adequately presents the purpose of the select menu, then an associated label is not necessary.",
            actions: "Ensure that the default option of the select menu presents the purpose of the select menu. If visible label text is present, it is best to associate this text to the select menu.",
            details: "A &lt;select&gt; element is present that does not have an associated label or ARIA label.",
            resources: "",
            icon_order: "9",
            position: "after",
            page_rule: "0",
            icon_name: "select_missing_label",
            api_type: "WAVE", guidelines: {
                27: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1",
                    guideline_id: "27"
                },
                54: {
                    level_id: 2,
                    level_name: "WCAG 2 AA",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6",
                    guideline_id: "54"
                },
                71: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "3.3.2",
                    name: "3.3.2 Labels or Instructions (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc3.3.2",
                    guideline_id: "71"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        fieldset_missing: {
            id: "7",
            name: "fieldset_missing",
            icon_name: "fieldset_missing",
            title: "Missing fieldset",
            category: "Alerts",
            cat_code: "alert",
            summary: "A group of check boxes or radio buttons is not enclosed in a fieldset.",
            purpose: "A fieldset provides a visual and structural grouping of related form elements. It is typically necessary for groups of check boxes or radio buttons where a higher level description (called a legend) is necessary to understand the function of the check boxes or radio buttons. The description will be identified by a screen reader only if provided in a fieldset legend.",
            actions: "Determine whether the grouping of check boxes or radio buttons has or needs text that explains the purpose of the check boxes or radio button grouping. If so, mark up the group within a fieldset and put the group description in a legend element.",
            details: "Two or more checkbox or radio input elements within a form have the same name value, but are not enclosed in a fieldset.",
            resources: "",
            icon_order: "10",
            position: "before",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                },
                71: {
                    guideline_id: "71",
                    code: "3.3.2",
                    name: "3.3.2 Labels or Instructions (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc3.3.2"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        legend_missing: {
            id: "3",
            name: "legend_missing",
            icon_name: "legend_missing",
            title: "Fieldset missing legend",
            category: "Alerts",
            cat_code: "alert",
            summary: "A fieldset does not have a legend.",
            purpose: "A fieldset legend presents a description of the form elements within a fieldset and is especially useful to screen reader users. A legend should be provided when a higher level description is necessary for groups of check boxes, radio buttons, or other form controls.",
            actions: "If a higher level description is necessary for the user to understand the function or purpose of the controls within the fieldset, provide this description within the &lt;legend&gt;. If this description or grouping is not necessary, the fieldset should probably be removed. Note that the legend is repeated to screen reader users for each form control within the fieldset.",
            details: "A fieldset does not have a legend or the legend is empty.",
            resources: "",
            icon_order: "11",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                },
                71: {
                    guideline_id: "71",
                    code: "3.3.2",
                    name: "3.3.2 Labels or Instructions (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc3.3.2"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        heading_missing: {
            id: "70",
            name: "heading_missing",
            icon_name: "heading_missing",
            title: "No heading structure",
            category: "Alerts",
            cat_code: "alert",
            summary: "The page has no headings.",
            purpose: "Headings (&lt;h1&gt;-&lt;h6&gt;) provide important document structure, outlines, and navigation functionality to assistive technology users.",
            actions: "Provide a clear, consistent heading structure, generally one &lt;h1&gt; and sub-headings as appropriate. Except for very simple pages, most web pages should have a heading structure.",
            details: "No &lt;h1&gt;-&lt;h6&gt; elements are present in the page.",
            resources: "",
            icon_order: "12",
            position: "last",
            page_rule: "1",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        h1_missing: {
            id: "119",
            name: "h1_missing",
            icon_name: "h1_missing",
            title: "Missing first level heading",
            category: "Alerts",
            cat_code: "alert",
            summary: "A page does not have a first level heading.",
            purpose: "Headings facilitate page navigation for users of many assistive technologies. They also provide semantic and visual meaning and structure to the document. A first level heading (&lt;h1&gt;) should be present on nearly all pages. It should contain the most important heading on the page (generally the document title).",
            actions: "If the page presents a main heading, place it within an &lt;h1&gt; element. Add other sub-headings as necessary.",
            details: "A page does not have an &lt;h1&gt; element.",
            resources: "",
            icon_order: "13",
            position: "last",
            page_rule: "1",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        region_missing: {
            name: "region_missing",
            category: "Alerts",
            cat_code: "alert",
            title: "No page regions",
            summary: "No page regions or ARIA landmarks were found.",
            purpose: "Regions and ARIA landmarks identify significant page areas. Most web pages should have regions defined, particularly for the main content area.",
            actions: "If the page has visual regions or significant page areas, ensure the regions are defined with header, nav, main, footer, etc. elements.",
            details: "No header, nav, main, footer, or aside HTML regions, or banner, navigation, main, or contentinfo landmark roles were present in the page.",
            resources: "",
            icon_order: "14",
            position: "last",
            page_rule: "1",
            icon_name: "region_missing",
            api_type: "WAVE", guidelines: {
                27: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1",
                    guideline_id: "27"
                },
                49: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1",
                    guideline_id: "49"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        heading_skipped: {
            id: "62",
            name: "heading_skipped",
            icon_name: "heading_skipped",
            title: "Skipped heading level",
            category: "Alerts",
            cat_code: "alert",
            summary: "A heading level is skipped.",
            purpose: "Headings provide document structure and facilitate keyboard navigation by users of assistive technology. These users may be confused or experience difficulty navigating when heading levels are skipped.",
            actions: "Restructure the document headings to ensure that heading levels are not skipped.",
            details: "A heading level is skipped (e.g., an &lt;h1&gt; is followed by an &lt;h3&gt;, with no intermediate &lt;h2&gt;). Note that an &lt;h1&gt; is not required to be the first heading within the document.",
            resources: "",
            icon_order: "15",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        heading_possible: {
            id: "61",
            name: "heading_possible",
            icon_name: "heading_possible",
            title: "Possible heading",
            category: "Alerts",
            cat_code: "alert",
            summary: "Text appears to be a heading but is not a heading element.",
            purpose: "Heading elements (&lt;h1&gt;-&lt;h6&gt;) provide important document structure, outlines, and navigation functionality to assistive technology users. If heading text is not a true heading, this information and functionality will not be available for that text.",
            actions: "If the paragraph is a section heading, use a heading element instead (&lt;h1&gt;-&lt;h6&gt;).",
            details: "A &lt;p&gt; element contains less than 50 characters and is either:\n<ul>\n<li>20 pixels or bigger, or\n<li>16 pixels or bigger and bold and/or italicized.\n</ul>",
            resources: "",
            icon_order: "16",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        table_layout: {
            id: "81",
            name: "table_layout",
            icon_name: "table_layout",
            title: "Layout table",
            category: "Alerts",
            cat_code: "alert",
            summary: "A layout table is present.",
            purpose: "Layout tables exist merely to position content visually - to create columns, insert spacing, or align content neatly for sighted users. Their content is not at all tabular in nature. Layout tables should not be used in HTML5. They can introduce reading and navigation order issues. Screen readers may interpret them as data tables (i.e., announcing column and row numbers), especially if they contain table header (&lt;th&gt;) cells. This introduces significant overhead on screen reader users.",
            actions: 'In almost every case, layout tables can be replaced with other HTML elements and styled with CSS to achieve the desired visual presentation. If the table contains tabular data, provide appropriate header (&lt;th&gt;) cells. If the layout table remains, verify that the reading and navigation order of table content (based on underlying source code order) is logical and give it role="presentation" to ensure it is not identified as a table to screen reader users.',
            details: "A &lt;table&gt; element is present that does not contain any header (&lt;th&gt;) cells.",
            resources: "",
            icon_order: "17",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                28: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "1.3.2",
                    name: "1.3.2 Meaningful Sequence (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.2",
                    guideline_id: "28"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        table_caption_possible: {
            id: "114",
            name: "table_caption_possible",
            icon_name: "table_caption_possible",
            title: "Possible table caption",
            category: "Alerts",
            cat_code: "alert",
            summary: "Text appears to be a table caption, but is not a caption element.",
            purpose: "A table caption should be associated with a table using the &lt;caption&gt; element so it will be read by a screen reader with the table content.",
            actions: "If the text is a description of the table, associate the text with the table using the &lt;caption&gt; element (&lt;caption&gt; should be the first element within the &lt;table&gt;).",
            details: "A data table (has at least one table header) that does not already have a caption has:\r\n- A colspan attribute value of 3 or greater on the first cell of the table.\r\n- A <p> element immediately before the table that contains less than 50 characters or contains less than 100 characters and is bold and/or centered.\r\n",
            resources: "",
            icon_order: "18",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        list_possible: {
            name: "list_possible",
            category: "Alerts",
            cat_code: "alert",
            title: "Possible list",
            summary: "Text is structured like a list but lacks proper list semantics.",
            purpose: "Ordered and unordered lists, when properly defined, provide useful information to users, such as an indication of the list type and number of list items. When text alone is used to present list structures and content, these benefits are lost.",
            actions: "If list content is presented, use &lt;ul&gt; or &lt;ol&gt; markup to semantically define the list.",
            details: "Text is used to present list-type content, such as:<br>\n* text<br>\n1. text<br>\na. text<br>\n1) text<br>\na) text<br>\n- text",
            resources: "",
            icon_order: "19",
            position: "first",
            page_rule: "0",
            icon_name: "list_possible",
            api_type: "WAVE", guidelines: {
                27: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1",
                    guideline_id: "27"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        link_internal_broken: {
            id: "104",
            name: "link_internal_broken",
            icon_name: "link_internal_broken",
            title: "Broken same-page link",
            category: "Alerts",
            cat_code: "alert",
            summary: "A link to another location within the page is present but does not have a corresponding target.",
            purpose: "A link to jump to another position within the the page assists users in navigating the web page, but only if the link target exists.",
            actions: "Ensure that the target for the link exists or remove the the same-page link.",
            details: "An in-page link has an href attribute (starting with a #), but does not match either the id value of another element or the name attribute value of an anchor element within the page.",
            resources: "",
            icon_order: "20",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                39: {
                    guideline_id: "39",
                    code: "2.1.1",
                    name: "2.1.1 Keyboard (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        link_suspicious: {
            id: "48",
            name: "link_suspicious",
            icon_name: "link_suspicious",
            title: "Suspicious link text",
            category: "Alerts",
            cat_code: "alert",
            summary: "Link text contains extraneous text or may not make sense out of context.",
            purpose: 'Links, which are often read out of context, should clearly describe the destination or function of the link. Ambiguous text, text that does not make sense out of context, and extraneous text (such as "click here") can cause confusion and should be avoided.',
            actions: 'Where appropriate, reword the link text so that it is more descriptive of its destination when read out of context. Remove any extraneous text (such as "click here").',
            details: 'A link (including alt text of linked images) contains the phrase "click here" or "click", or the link text is "click here", "here", "more", "more...", "details", "more details", "link", "this page", "continue", "continue reading", "read more", or "button".',
            resources: "",
            icon_order: "21",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                52: {
                    guideline_id: "52",
                    code: "2.4.4",
                    name: "2.4.4 Link Purpose (In Context) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.4"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        link_redundant: {
            id: "120",
            name: "link_redundant",
            icon_name: "link_redundant",
            title: "Redundant link",
            category: "Alerts",
            cat_code: "alert",
            summary: "Adjacent links go to the same URL.",
            purpose: "When adjacent links go to the same location (such as a linked product image and an adjacent linked product name that go to the same product page) this results in additional navigation and repetition for keyboard and screen reader users.",
            actions: 'If possible, combine the redundant links into one link and remove any redundant text or alternative text (for example, if a product image and product name are in the same link, the image can usually be given alt="").',
            details: "Two adjacent links go to the same URL.",
            resources: "",
            icon_order: "22",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                52: {
                    guideline_id: "52",
                    code: "2.4.4",
                    name: "2.4.4 Link Purpose (In Context) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.4"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        link_word: {
            id: "75",
            name: "link_word",
            icon_name: "link_word",
            title: "Link to Word document",
            category: "Alerts",
            cat_code: "alert",
            summary: "A link to a Microsoft Word document is present.",
            purpose: "Unless authored with accessibility in mind, Microsoft Word documents often have accessibility issues. Additionally, Word documents are typically viewed using a separate application, and can thus cause confusion and navigation difficulties.",
            actions: "Ensure that the Word document is natively accessible. Additionally, inform the user that the link will open a Word document. Because Word documents have limitations in accessibility (particularly for complex content) and require a separate program, HTML content should usually be used in place of or in addition to the Word document.",
            details: "A link to a .doc or .docx file is present.",
            resources: "",
            icon_order: "23",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: {}
        },
        link_excel: {
            id: "83",
            name: "link_excel",
            icon_name: "link_excel",
            title: "Link to Excel spreadsheet",
            category: "Alerts",
            cat_code: "alert",
            summary: "A link to a Microsoft Excel spreadsheet is present.",
            purpose: "Unless authored with accessibility in mind, Microsoft Excel spreadsheets often have accessibility issues. Additionally, Excel documents are typically viewed using a separate application, and can thus cause confusion and navigation difficulties.",
            actions: "Ensure the Excel spreadsheet is natively accessible. Additionally, inform the user that the link will open an Excel spreadsheet. Because Excel spreadsheets have limitations in accessibility (particularly for complex content) and require a separate program, HTML content should usually be used in place of or in addition to the Excel spreadsheet.",
            details: "A link to a .xls or .xlsx file is present.",
            resources: "",
            icon_order: "24",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: {}
        },
        link_powerpoint: {
            id: "84",
            name: "link_powerpoint",
            icon_name: "link_powerpoint",
            title: "Link to PowerPoint document",
            category: "Alerts",
            cat_code: "alert",
            summary: "A link to a Microsoft PowerPoint presentation is present.",
            purpose: "Unless authored with accessibility in mind, PowerPoint documents often have accessibility issues. Additionally, PowerPoint documents are typically viewed using a separate application, and can thus cause confusion and navigation difficulties.",
            actions: "Ensure the PowerPoint presentation is natively accessible. Additionally, inform the user that the link will open a PowerPoint document. Because PowerPoint documents have limitations in accessibility (particularly for complex content) and require a separate program, HTML content or an alternative accessible version (e.g., tagged PDF) should usually be used in place of or in addition to the PowerPoint presentation.",
            details: "A link to a .ppt, .pptx, .pps, or .ppsx file is present.",
            resources: "",
            icon_order: "25",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: {}
        },
        link_pdf: {
            id: "82",
            name: "link_pdf",
            icon_name: "link_pdf",
            title: "Link to PDF document",
            category: "Alerts",
            cat_code: "alert",
            summary: "A link to a PDF document is present.",
            purpose: "Unless authored with accessibility in mind, PDF documents often have accessibility issues. Additionally, PDF documents are typically viewed using a separate application or plug-in, and can thus cause confusion and navigation difficulties.",
            actions: "Ensure the PDF document is natively accessible. Additionally, inform the user that the link will open a PDF document. Because PDF documents may have limitations in accessibility (particularly for complex content) and require a separate program, HTML content should often be used in place of or in addition to the PDF document.",
            details: "A link to a .pdf file is present.",
            resources: "",
            icon_order: "26",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: {}
        },
        link_document: {
            id: "95",
            name: "link_document",
            icon_name: "link_document",
            title: "Link to document",
            category: "Alerts",
            cat_code: "alert",
            summary: "A link to a non-HTML document is present.",
            purpose: "Unless authored with accessibility in mind, documents that are not HTML often have accessibility issues. Additionally, these documents are typically viewed using a separate application, and can thus cause confusion and navigation difficulties.",
            actions: "Ensure the document is authored to be accessible, if possible. Additionally, inform the user that the link will open in a separate program. Because these documents have limitations in accessibility (particularly for complex content) and require a separate program, an accessible format should usually be used in place of or in addition to the document.",
            details: "A link to a .rtf, .wpd, .ods, .odt, .odp, .sxw, .sxc, .sxd, .sxi, .pages, or .key file is present. Word, PowerPoint, Excel, and PDF are identified with separate icons.",
            resources: "",
            icon_order: "27",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: {}
        },
        audio_video: {
            id: "73",
            name: "audio_video",
            icon_name: "audio_video",
            title: "Audio/Video",
            category: "Alerts",
            cat_code: "alert",
            summary: "An audio or video file or link is present.",
            purpose: "Audio content must be presented in a text format to be fully accessible to users who are deaf and hard of hearing. Video content with audio must have synchronized captions and a transcript. Audio-only content must have a transcript.",
            actions: "For video content, ensure that synchronized captioning and a transcript is provided. For audio-only content, ensure that a transcript is provided.",
            details: "An embedded QuickTime, Windows Media Player, or RealPlayer movie is present or a link is present to a file with one of the following extensions: 3gp, aif, aiff, asf, asx, avi, flv, m4a, m4p, mov, mp2, mp3, mp4, mpa, mpeg, mpeg2, mpg, mpv, ogg, ogv, qtl, ra, ram, smi, smil, wav, wax, webm, wma, wmp, or wmx.",
            resources: "",
            icon_order: "28",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                18: {
                    guideline_id: "18",
                    code: "1.2.1",
                    name: "1.2.1 Prerecorded Audio-only and Video-only (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.1"
                },
                19: {
                    guideline_id: "19",
                    code: "1.2.2",
                    name: "1.2.2 Captions (Prerecorded) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.2"
                },
                20: {
                    guideline_id: "20",
                    code: "1.2.3",
                    name: "1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.3"
                },
                22: {
                    guideline_id: "22",
                    code: "1.2.5",
                    name: "1.2.5 Audio Description (Prerecorded) (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.5"
                },
                31: {
                    guideline_id: "31",
                    code: "1.4.2",
                    name: "1.4.2 Audio Control (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.4.2"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        html5_video_audio: {
            id: "110",
            name: "html5_video_audio",
            icon_name: "html5_video_audio",
            title: "HTML5 video or audio",
            category: "Alerts",
            cat_code: "alert",
            summary: "A &lt;video&gt; or &lt;audio&gt; element is present.",
            purpose: "&lt;video&gt; defines video, such as a movie clip or other video streams. &lt;audio&gt; defines sound, such as music or other audio streams. Audio content must be presented in a text format to be fully accessible to users who are deaf and hard of hearing. Video content with audio must have synchronized captions and a transcript. Audio-only content must have a transcript.",
            actions: "For video content with audio, ensure that synchronized captioning and a transcript is provided. For audio-only content, ensure that a transcript is provided.",
            details: "A &lt;video&gt; or &lt;audio&gt; element is present. Note that WAVE does not analyze fall-back content within the &lt;video&gt; or &lt;audio&gt; element. This content should be accessible because it will be presented to the user if the video or audio content is not supported.",
            resources: "",
            icon_order: "29",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                18: {
                    guideline_id: "18",
                    code: "1.2.1",
                    name: "1.2.1 Prerecorded Audio-only and Video-only (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.1"
                },
                19: {
                    guideline_id: "19",
                    code: "1.2.2",
                    name: "1.2.2 Captions (Prerecorded) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.2"
                },
                20: {
                    guideline_id: "20",
                    code: "1.2.3",
                    name: "1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.3"
                },
                22: {
                    guideline_id: "22",
                    code: "1.2.5",
                    name: "1.2.5 Audio Description (Prerecorded) (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.5"
                },
                31: {
                    guideline_id: "31",
                    code: "1.4.2",
                    name: "1.4.2 Audio Control (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.4.2"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        youtube_video: {
            name: "youtube_video",
            category: "Alerts",
            cat_code: "alert",
            title: "YouTube video",
            summary: "An embedded or linked YouTube video is present.",
            purpose: "For video content with audio, ensure that synchronized captioning is available. While YouTube can auto-generate captions using voice recognition, these are typically not of sufficient quality to be considered equivalent.",
            actions: "Ensure that YouTube video presents equivalent, synchronized captions.",
            details: "An embedded (within an iframe) YouTube video is present, or a link to a YouTube video is present.",
            resources: "",
            icon_order: "30",
            position: "after",
            page_rule: "0",
            icon_name: "youtube_video",
            api_type: "WAVE", guidelines: {
                18: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "1.2.1",
                    name: "1.2.1 Prerecorded Audio-only and Video-only (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.1",
                    guideline_id: "18"
                },
                19: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "1.2.2",
                    name: "1.2.2 Captions (Prerecorded) (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.2",
                    guideline_id: "19"
                },
                20: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "1.2.3",
                    name: "1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.3",
                    guideline_id: "20"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        flash: {
            id: "4",
            name: "flash",
            icon_name: "flash",
            title: "Flash",
            category: "Alerts",
            cat_code: "alert",
            summary: "Flash content is present.",
            purpose: "Flash content, if not authored to be accessible, will typically introduce significant accessibility issues.",
            actions: "If the Flash object does not present content, hide it from screen readers. If content is presented, provide an HTML alternative and/or make the Flash object natively accessible, including providing captions/transcripts when necessary and ensuring that the Flash object is keyboard-accessible.",
            details: 'An &lt;object&gt; element is present that has a classid attribute value of "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" or a type attribute value of "application/x-shockwave-flash", or an &lt;embed&gt; element is present that has a src attribute value of a .swf file or a type attribute value of "application/x-shockwave-flash".',
            resources: '<a href="https://webaim.org/techniques/flash/techniques#hiding">hide it from screen readers</a>',
            icon_order: "31",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                18: {
                    guideline_id: "18",
                    code: "1.2.1",
                    name: "1.2.1 Prerecorded Audio-only and Video-only (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.1"
                },
                19: {
                    guideline_id: "19",
                    code: "1.2.2",
                    name: "1.2.2 Captions (Prerecorded) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.2"
                },
                20: {
                    guideline_id: "20",
                    code: "1.2.3",
                    name: "1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.3"
                },
                22: {
                    guideline_id: "22",
                    code: "1.2.5",
                    name: "1.2.5 Audio Description (Prerecorded) (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.5"
                },
                40: {
                    guideline_id: "40",
                    code: "2.1.2",
                    name: "2.1.2 No Keyboard Trap (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.1.2"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        applet: {
            id: "74",
            name: "applet",
            icon_name: "applet",
            title: "Java applet",
            category: "Alerts",
            cat_code: "alert",
            summary: "A Java applet is present.",
            purpose: "Java applets will typically introduce significant accessibility issues.",
            actions: "Where possible, replace the Java content with a more accessible format. If Java is necessary, author the applet to support accessibility to the extent possible.",
            details: "An &lt;applet&gt; element is present.",
            resources: "",
            icon_order: "32",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: {}
        },
        plugin: {
            id: "76",
            name: "plugin",
            icon_name: "plugin",
            title: "Plugin",
            category: "Alerts",
            cat_code: "alert",
            summary: "An unidentified plugin is present.",
            purpose: "Plugins allow the introduction of non-HTML content, media players, etc. Because of limitations in non-HTML content, these often introduce accessibility issues.",
            actions: "Provide an HTML alternative or ensure the plugin content is accessible. Provide a link to download any required software.",
            details: "An &lt;object&gt; or &lt;embed&gt; element is present that is not identified as Flash, Quicktime, RealPlayer, or Windows Media Player.",
            resources: "",
            icon_order: "33",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: {}
        },
        noscript: {
            id: "72",
            name: "noscript",
            icon_name: "noscript",
            title: "Noscript element",
            category: "Alerts",
            cat_code: "alert",
            summary: "A &lt;noscript&gt; element is present.",
            purpose: "Content within &lt;noscript&gt; is presented if JavaScript is disabled. Because nearly all users (including users of screen readers and other assistive technologies) have JavaScript enabled, &lt;noscript&gt; cannot be used to provide an accessible version of inaccessible scripted content.",
            actions: "Ensure that scripted content is accessible. The &lt;noscript&gt; content will be presented to very few users, but must be accessible if used.",
            details: "A &lt;noscript&gt; element is present.",
            resources: "",
            icon_order: "34",
            position: "before",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: {}
        },
        event_handler: {
            id: "71",
            name: "event_handler",
            icon_name: "event_handler",
            title: "Device dependent event handler",
            category: "Alerts",
            cat_code: "alert",
            summary: "An event handler is present that may not be accessible.",
            purpose: "The JavaScript events in use do not appear to be accessible to both mouse and keyboard users. To be fully accessible, critical JavaScript interaction should be device independent.",
            actions: "Ensure that critical functionality and content is accessible by using a device independent event handler (which responds to both keyboard and mouse) or by using both a mouse dependent and a keyboard dependent event handler.",
            details: "One of the following is present:\r\n<ul>\r\n<li>an onmouseover event but not an onfocus event</li>\r\n<li>an onclick event on something other than a link, form control, or element with a tabindex value of 0</li>\r\n<li>ondblclick</li>\r\n</ul>",
            resources: "",
            icon_order: "35",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                39: {
                    guideline_id: "39",
                    code: "2.1.1",
                    name: "2.1.1 Keyboard (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        javascript_jumpmenu: {
            id: "52",
            name: "javascript_jumpmenu",
            icon_name: "javascript_jumpmenu",
            title: "JavaScript jump menu",
            category: "Alerts",
            cat_code: "alert",
            summary: "A JavaScript jump menu may be present.",
            purpose: "A JavaScript jump menu is a select element that triggers a new web page with the onchange event handler. When navigating with the keyboard, each change in the select menu triggers a page change in some web browsers, thus making navigation very difficult.",
            actions: "If the onchange event handler triggers a new web page, eliminate the JavaScript jump menu and allow the user to change the select menu, then activate an adjacent button to trigger the new page.",
            details: "The onchange attribute is present on a &lt;select&gt; element.",
            resources: "",
            icon_order: "36",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                39: {
                    guideline_id: "39",
                    code: "2.1.1",
                    name: "2.1.1 Keyboard (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.1.1"
                },
                66: {
                    guideline_id: "66",
                    code: "3.2.2",
                    name: "3.2.2 On Input (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc3.2.2"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        accesskey: {
            id: "67",
            name: "accesskey",
            icon_name: "accesskey",
            title: "Accesskey",
            category: "Alerts",
            cat_code: "alert",
            summary: "An accesskey attribute is present.",
            purpose: "Accesskey provides a way to define shortcut keys for web page elements. Accesskeys often conflict with user or assistive technology shortcut keys and should be avoided or implemented with care.",
            actions: "Remove the accesskey or be aware that the accesskey may conflict with user shortcut keys.",
            details: "An element has an accesskey attribute.",
            resources: "",
            icon_order: "37",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        tabindex: {
            id: "68",
            name: "tabindex",
            icon_name: "tabindex",
            title: "Tabindex",
            category: "Alerts",
            cat_code: "alert",
            summary: "A positive tabindex value is present.",
            purpose: "Tabindex values of 1 or greater specify an explicit tab/navigation order for page elements. Because it modifies the default tab order, cause confusion, and result in decreased keyboard accessibility, it should be avoided.",
            actions: "If the natural tab order is already logical, remove the tabindex. Otherwise, consider restructuring the page so that tabindex is not needed. If tabindex is maintained, ensure that the resulting navigation is logical and complete.",
            details: "A tabindex attribute is present and has a positive value.",
            resources: "",
            icon_order: "38",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                51: {
                    guideline_id: "51",
                    code: "2.4.3",
                    name: "2.4.3 Focus Order (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.3"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        text_small: {
            id: "65",
            name: "text_small",
            icon_name: "text_small",
            title: "Very small text",
            category: "Alerts",
            cat_code: "alert",
            summary: "Text is very small.",
            purpose: "Text which is very small is difficult to read, particularly for those with low vision.",
            actions: "Increase the text to a more readable size.",
            details: "Text is present that is sized 10 pixels or smaller.",
            resources: "",
            icon_order: "39",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: []
        },
        text_justified: {
            id: "1139",
            name: "text_justified",
            icon_name: "text_justified",
            title: "Justified text",
            category: "Alerts",
            cat_code: "alert",
            summary: "Fully justified text is present.",
            purpose: "Large blocks of justified text can negatively impact readability due to varying word/letter spacing and 'rivers of white' that flow through the text.",
            actions: "Remove the full justification from the text.",
            details: "A &lt;p&gt;, &lt;div&gt;, or &lt;td&gt; element has more than 500 characters and is styled with text-align:justify.",
            resources: "",
            icon_order: "40",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: []
        },
        underline: {
            id: "113",
            name: "underline",
            icon_name: "underline",
            title: "Underlined text",
            category: "Alerts",
            cat_code: "alert",
            summary: "Underlined text is present.",
            purpose: "Underlines almost universally indicates linked text. Consider removing the underline from the non-link text. Other styling (e.g., bold or italics) can be used to differentiate the text.",
            actions: "Unless there is a distinct need for the underlined text, remove the underline from it. ",
            details: "A &lt;u&gt; element is present.",
            resources: "",
            icon_order: "41",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: []
        },
        title_redundant: {
            id: "117",
            name: "title_redundant",
            icon_name: "title_redundant",
            title: "Redundant title text",
            category: "Alerts",
            cat_code: "alert",
            summary: "Title attribute text is the same as text or alternative text.",
            purpose: "The title attribute value is used to provide <i>advisory</i> information. It typically appears when the users hovers the mouse over an element. The advisory information presented should not be identical to or very similar to the element text or alternative text.",
            actions: "In most cases the title attribute can be removed, otherwise modify it to provide advisory, but not redundant information. Note that the title text may or may not be read by a screen reader and is typically inaccessible to sighted keyboard users. ",
            details: "A title attribute value is identical to element text or image alternative text.",
            resources: "",
            icon_order: "42",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: []
        },
        alt: {
            id: "26",
            name: "alt",
            icon_name: "alt",
            title: "Alternative text",
            category: "Features",
            cat_code: "feature",
            summary: "Image alternative text is present.",
            purpose: "Alternative text presents the content or function of an image to screen reader users or in other situations where images cannot be seen or are unavailable.",
            actions: "Ensure that the alternative text conveys the content and function of the image accurately and succinctly. The alt attribute should be equivalent, accurate, and succinct.",
            details: "A non-empty alt attribute is present on an image.",
            resources: "",
            icon_order: "1",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_null: {
            id: "37",
            name: "alt_null",
            icon_name: "alt_null",
            title: "Null or empty alternative text",
            category: "Features",
            cat_code: "feature",
            summary: 'Alternative text is null or empty (alt="").',
            purpose: 'If an image does not convey content or if the content of the image is conveyed elsewhere (such as in a caption or nearby text), the image should have empty/null alternative text (alt="") to ensure that it is ignored by a screen reader and is hidden when images are disabled or unavailable.',
            actions: "Ensure that the image does not convey content or that the content of the image is conveyed in nearby text (e.g., a caption).",
            details: 'An image has alt="".',
            resources: "",
            icon_order: "2",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_spacer: {
            id: "39",
            name: "alt_spacer",
            icon_name: "alt_spacer",
            title: "Null or empty alternative text on spacer",
            category: "Features",
            cat_code: "feature",
            summary: 'Alternative text is null or empty (alt="") on a spacer image.',
            purpose: 'Spacer images are used to control layout or positioning. Because they do not convey content, they should be given empty/null alternative text (alt="") to ensure that the content is not presented to screen reader users and is hidden when images are disabled or unavailable.',
            actions: "Ensure that the image is a spacer image and that it does not convey content. Consider using CSS instead of spacer images for better control of positioning and layout.",
            details: 'An images with width and/or height of 3 pixels or less or file name of spacer.*, space.*, or blank.* has empty/null alt attribute value (alt="").',
            resources: "",
            icon_order: "3",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_link: {
            id: "9",
            name: "alt_link",
            icon_name: "alt_link",
            title: "Linked image with alternative text",
            category: "Features",
            cat_code: "feature",
            summary: "Alternative text is present for an image that is within a link.",
            purpose: "Including appropriate alternative text on an image within a link ensures that the function and purpose of the link and the content of the image is available to screen reader users or when images are unavailable.",
            actions: 'Ensure that the alternative text presents the content of the image and/or the function of the link. If the full content and function of the link is presented in text within the link (an image and a text caption both within the same link, for example), then the image should generally be given empty/null alternative text (alt="") to avoid redundancy.',
            details: "An image element has non-empty alternative text, is within a link, and no other text (or images with alternative text) is present within the link.",
            resources: "",
            icon_order: "4",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                52: {
                    guideline_id: "52",
                    code: "2.4.4",
                    name: "2.4.4 Link Purpose (In Context) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.4"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_input: {
            id: "46",
            name: "alt_input",
            icon_name: "alt_input",
            title: "Image button with alternative text",
            category: "Features",
            cat_code: "feature",
            summary: "Alternative text is present for an image input element.",
            purpose: "Providing the functionality of image buttons in alternative text ensures that the button function is available to all users.",
            actions: "Ensure that the alt attribute value presents the content and function of the image input element. If the image presents text, typically this text should be provided in the alt attribute.",
            details: 'An &lt;input type="image"&gt; element has a non-empty alt attribute value.',
            resources: "",
            icon_order: "5",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                52: {
                    guideline_id: "52",
                    code: "2.4.4",
                    name: "2.4.4 Link Purpose (In Context) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.4"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_map: {
            id: "24",
            name: "alt_map",
            icon_name: "alt_map",
            title: "Image map with alternative text",
            category: "Features",
            cat_code: "feature",
            summary: "An alt attribute is present for an image that has hot spots.",
            purpose: "If an image that uses an image map provides content or a function that is not already available through the hot spots (and their respective alternative texts), that information must be in the image's alt attribute in order for it to be available to screen reader users or when images are disabled.",
            actions: 'Ensure that the alternative text for the image map image is appropriate. The alternative text is typically empty (alt=""), unless the image conveys content not conveyed in the hot spot areas (e.g., "Map of the United States").',
            details: "An &lt;img&gt; element has both usemap and alt attributes.",
            resources: "",
            icon_order: "6",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        alt_area: {
            id: "42",
            name: "alt_area",
            icon_name: "alt_area",
            title: "Image map area with alternative text",
            category: "Features",
            cat_code: "feature",
            summary: "Alternative text is present for an image map area (hot spot).",
            purpose: "Presenting the functionality of image map areas (hot spots) in the &lt;area&gt; element's alt attribute value ensures that this information is presented to screen reader users or when images are disabled or unavailable.",
            actions: "Ensure the alternative text for the area element describes the function of the image map hot spot. Additionally, ensure that the area elements are listed in the code in a logical, intuitive order (e.g., matching the visual order, alphabetically, etc.).",
            details: "An image uses an image map containing an area element with a non-empty alt attribute value.",
            resources: "",
            icon_order: "7",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                52: {
                    guideline_id: "52",
                    code: "2.4.4",
                    name: "2.4.4 Link Purpose (In Context) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.4"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        figure: {
            name: "figure",
            category: "Features",
            cat_code: "feature",
            title: "Figure",
            summary: "A figure is present.",
            purpose: "A &lt;figure&gt; represents self-contained content, potentially with an optional &lt;figcaption&gt;. Non-text content, if present, \nmust have alternative text.",
            actions: "Ensure the figure presents accessible content and, if appropriate, has a figcaption.",
            details: "A figure element is present.",
            resources: "",
            icon_order: "8",
            position: "last",
            page_rule: "0",
            icon_name: "figure",
            api_type: "WAVE", guidelines: {
                17: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1",
                    guideline_id: "17"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        label: {
            id: "53",
            name: "label",
            icon_name: "label",
            title: "Form label",
            category: "Features",
            cat_code: "feature",
            summary: "A form label is present and associated with a form control.",
            purpose: "A properly associated form label is presented to a screen reader user when the form control is accessed. Additionally, a label can be clicked with the mouse to set focus to the form control.",
            actions: "Ensure that the label is accurate, descriptive, succinct, and that it is associated with the correct form control element.",
            details: "A &lt;label&gt; element is present and properly associated to &lt;input&gt; (except types of image, submit, reset, button, or hidden), &lt;textarea&gt;, or &lt;select&gt; element.",
            resources: "",
            icon_order: "9",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        fieldset: {
            id: "54",
            name: "fieldset",
            icon_name: "fieldset",
            title: "Fieldset",
            category: "Features",
            cat_code: "feature",
            summary: "A fieldset is present.",
            purpose: "A fieldset provides a visual and structural grouping of related form elements. If present, a fieldset legend presents a description of the grouped form elements to screen reader users. A fieldset and legend are typically necessary for groups of check boxes or radio buttons.",
            actions: "Ensure that the fieldset encloses the proper form elements. Most fieldsets should have an accurate, descriptive, and succinct legend. Note that the legend is repeated to screen reader users for each form control within the fieldsets.",
            details: "A fieldset element is present.",
            resources: "",
            icon_order: "10",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        link_skip: {
            id: "78",
            name: "link_skip",
            icon_name: "link_skip",
            title: "Skip link",
            category: "Features",
            cat_code: "feature",
            summary: "A link is present which allows users to skip over navigation or other content.",
            purpose: "A link that provides functionality for the user to jump over navigation or other elements or jump to the main content of the page greatly assists keyboard users in navigating the web page.",
            actions: "Ensure that the link is functioning properly and that the link text adequately describes the link functionality. If the skip link is hidden from sighted users, it should be made visible within the page when it has keyboard focus and must be accessible via the keyboard (do not use CSS display:none or visibility:hidden).",
            details: 'An in-page link:\r\n<ul>\r\n<li>starts with the words "skip" or "jump"\r\n<li>has an href attribute value and that value matches the id value of another element within the page or the name attribute value of an anchor element within the page.\r\n<li>is NOT hidden with CSS display:none or visibility:hidden (this would result in a inaccessible "skip" link).\r\n</ul>',
            resources: "https://webaim.org/techniques/css/invisiblecontent/#skipnavlinks",
            icon_order: "11",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        link_skip_target: {
            id: "60",
            name: "link_skip_target",
            icon_name: "link_skip_target",
            title: "Skip link target",
            category: "Features",
            cat_code: "feature",
            summary: 'A target for a "skip" link is present.',
            purpose: 'A "skip" target identifies the location within the page where reading and navigation will resume after a "skip" link is activated.',
            actions: "Ensure that the element is at the appropriate place within the page.",
            details: 'An id value for any element or a name value for an anchor element matches the href value of a "skip" link within the page.',
            resources: "",
            icon_order: "12",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        lang: {
            id: "127",
            name: "lang",
            icon_name: "lang",
            title: "Language",
            category: "Features",
            cat_code: "feature",
            summary: "The language of the document or a page element is identified.",
            purpose: "Identifying the language of the page or portion of page (if different from the page itself) allows screen readers to read the content appropriately.",
            actions: 'Ensure the language is properly identified for the page (e.g., &lt;html lang="en"&gt;). If content within the page is in a language different than the page\'s language, identify it using a valid lang attribute value (e.g., &lt;p lang="fr"&gt;).',
            details: "A document or an element has a valid lang attribute value.",
            resources: "",
            icon_order: "13",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                60: {
                    guideline_id: "60",
                    code: "3.1.2",
                    name: "3.1.2 Language of Parts (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc3.1.2"
                }
            },
            levels: {
                2: "WCAG 2 AA"
            }
        },
        h1: {
            id: "91",
            name: "h1",
            icon_name: "h1",
            title: "Heading level 1",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A first level heading (&lt;h1&gt; element) is present.",
            purpose: "Headings facilitate page navigation for users of assistive technologies. They also provide semantic and visual meaning and structure to the document. First level headings should contain the most important heading(s) on the page (generally the document title).",
            actions: "Ensure that the text in question is truly a heading and that it is structured correctly in the page outline.",
            details: "An &lt;h1&gt; element is present.",
            resources: "",
            icon_order: "1",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        h2: {
            id: "96",
            name: "h2",
            icon_name: "h2",
            title: "Heading level 2",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A second level heading (&lt;h2&gt; element) is present.",
            purpose: "Headings facilitate page navigation for users of assistive technologies. They also provide semantic and visual meaning and structure to the document.",
            actions: "Ensure that the text in question is truly a heading and that it is structured correctly in the page outline.",
            details: "An &lt;h2&gt; element is present.",
            resources: "",
            icon_order: "2",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        h3: {
            id: "97",
            name: "h3",
            icon_name: "h3",
            title: "Heading level 3",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A third level heading (&lt;h3&gt; element) is present.",
            purpose: "Headings facilitate page navigation for users of assistive technologies. They also provide semantic and visual meaning and structure to the document.",
            actions: "Ensure that the text in question is truly a heading and that it is structured correctly in the page outline.",
            details: "An &lt;h3&gt; element is present.",
            resources: "",
            icon_order: "3",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        h4: {
            id: "98",
            name: "h4",
            icon_name: "h4",
            title: "Heading level 4",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A fourth level heading (&lt;h4&gt; element) is present.",
            purpose: "Headings facilitate page navigation for users of assistive technologies. They also provide semantic and visual meaning and structure to the document.",
            actions: "Ensure that the text in question is truly a heading and that it is structured correctly in the page outline.",
            details: "An &lt;h4&gt; element is present.",
            resources: "",
            icon_order: "4",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        h5: {
            id: "99",
            name: "h5",
            icon_name: "h5",
            title: "Heading level 5",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A fifth level heading (&lt;h5&gt; element) is present.",
            purpose: "Headings facilitate page navigation for users of assistive technologies. They also provide semantic and visual meaning and structure to the document.",
            actions: "Ensure that the text in question is truly a heading and that it is structured correctly in the page outline.",
            details: "An &lt;h5&gt; element is present.",
            resources: "",
            icon_order: "5",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        h6: {
            id: "100",
            name: "h6",
            icon_name: "h6",
            title: "Heading level 6",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A sixth level heading (&lt;h6&gt; element) is present.",
            purpose: "Headings facilitate page navigation for users of assistive technologies. They also provide semantic and visual meaning and structure to the document.",
            actions: "Ensure that the text in question is truly a heading and that it is structured correctly in the page outline.",
            details: "An &lt;h6&gt; element is present.",
            resources: "",
            icon_order: "6",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        ol: {
            id: "92",
            name: "ol",
            icon_name: "ol",
            title: "Ordered list",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "An ordered (numbered) list (&lt;ol&gt; element) is present.",
            purpose: "Ordered lists present a group of related sequential items. Users of assistive technologies can navigate by and within lists.",
            actions: "Ensure that an ordered (numbered) list is appropriate for the context. If list items are parallel or the order of the items is not important, an unordered list (&lt;ul&gt;) is likely more appropriate.",
            details: "An &lt;ol&gt; element is present.",
            resources: "",
            icon_order: "7",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        ul: {
            id: "93",
            name: "ul",
            icon_name: "ul",
            title: "Unordered list",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "An unordered (bulleted) list (&lt;ul&gt; element) is present.",
            purpose: "Ordered lists present a group of related, parallel items. Users of many assistive technologies can navigate by and within lists.",
            actions: "Ensure that an unordered (bulleted) list is appropriate for the context. If list items are sequential or numbered, an ordered list (&lt;ol&gt;) is likely more appropriate.",
            details: "A &lt;ul&gt; element is present.",
            resources: "",
            icon_order: "8",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        dl: {
            id: "94",
            name: "dl",
            icon_name: "dl",
            title: "Definition/description list",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A definition/description list (&lt;dl&gt; element) is present.",
            purpose: "Definition lists (called description lists in HTML5) present the descriptions for terms or name/value pairs. Users of many assistive technologies can navigate by and within lists.",
            actions: "Ensure that the list is appropriate for the context (it is used for definitions or name/value pairs) and that definition terms (&lt;dt&gt;) and descriptions (&lt;dd&gt;) are provided.",
            details: "A &lt;dl&gt; element is present. ",
            resources: "",
            icon_order: "9",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        header: {
            id: "108",
            name: "header",
            icon_name: "header",
            title: "Header",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A &lt;header&gt; element or banner landmark is present.",
            purpose: "Headers identify page introduction or navigation. They typically surrounds the site or page name, logo, top navigation, or other header content. Headers facilitate page semantics and navigation.",
            actions: "Ensure the header surrounds and defines page header content.",
            details: 'A &lt;header&gt; element or role="banner" is present.',
            resources: "",
            icon_order: "10",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        nav: {
            id: "107",
            name: "nav",
            icon_name: "nav",
            title: "Navigation",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A &lt;nav&gt; element or navigation landmark is present.",
            purpose: "The navigation identifies a section of navigation links and can facilitate page semantics and navigation.",
            actions: "Ensure the element defines page navigation. Multiple navigation elements on one page can be differentiated with ARIA labels.",
            details: 'A &lt;nav&gt; element or role="navigation" is present.',
            resources: "",
            icon_order: "11",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        search: {
            id: "131",
            name: "search",
            icon_name: "search",
            title: "Search",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "An ARIA search landmark is present.",
            purpose: "The search landmark identifies the search area within the page and facilitates keyboard navigation to the search area.",
            actions: "Ensure the search landmark is implemented properly and surrounds the search area of the page.",
            details: 'An element has role="search".',
            resources: "",
            icon_order: "12",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        main: {
            id: "128",
            name: "main",
            icon_name: "main",
            title: "Main content",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A &lt;main&gt; element or main landmark is present.",
            purpose: 'The &lt;main&gt; element or role="main" attribute identifies the main content for the page. This facilitate page semantics and navigation.',
            actions: "Ensure the element surrounds and defines page main content.",
            details: 'A &lt;main&gt; element or role="main"is present.',
            resources: "",
            icon_order: "13",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        aside: {
            id: "130",
            name: "aside",
            icon_name: "aside",
            title: "Aside",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "An &lt;aside&gt; element or complementary landmark is present.",
            purpose: "An aside identifies secondary, related, or complementary content. It is typically presented in a sidebar.",
            actions: "Ensure the aside surrounds and defines secondary, related, or complementary content.",
            details: 'An &lt;aside&gt; element or role="complementary" is present.',
            resources: "",
            icon_order: "14",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        footer: {
            id: "109",
            name: "footer",
            icon_name: "footer",
            title: "Footer",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A &lt;footer&gt; element or contentinfo landmark is present.",
            purpose: "Footers identify a footer for the page or a page section. It typically identifies authorship, related links, copyright date, or other footer content. Footers facilitate page semantics and navigation.",
            actions: "Ensure the element surrounds and defines page or page section footer content.",
            details: 'A &lt;footer&gt; element or role="contentinfo" is present.',
            resources: "",
            icon_order: "15",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        region: {
            name: "region",
            category: "Structural Elements",
            cat_code: "structure",
            title: "Generic region",
            summary: "An ARIA region is present",
            purpose: "Generic ARIA regions identify significant page areas that do not align to other region or ARIA landmark semantics - such as main, header, footer, etc. Regions support keyboard navigation and screen reader identification of page areas.",
            actions: "Ensure the region identifies a significant page area. If the semantics for another region or landmark type aligns with the content (e.g., &lt;nav&gt; or &lt;aside&gt;), use it instead. Ensure the region has a descriptive label using aria-labelledby (typically referencing a heading at the beginning of the region) or aria-label.",
            details: 'An element has role="region" and an aria-label or aria-labelledby attribute.',
            resources: "",
            icon_order: "16",
            position: "first",
            page_rule: "0",
            icon_name: "region",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                49: {
                    guideline_id: "49",
                    code: "2.4.1",
                    name: "2.4.1 Bypass Blocks (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        table_data: {
            id: "87",
            name: "table_data",
            icon_name: "table_data",
            title: "Data table",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A data table is present.",
            purpose: "Data tables present tabular data. Data tables should contain table header cells that identify the content of their respective row and/or columns. Tables with proper table headers provide additional information and navigation for screen reader users.",
            actions: "Ensure that the table contains tabular data and that it is not used merely for page layout. Ensure that all column and row headers are &lt;th&gt; elements and ensure the data cells are associated with their proper header cells (typically by assigning scope to the table headers). Where appropriate, associate a descriptive caption (&lt;caption&gt; element) to the table.",
            details: "A &lt;table&gt; element is present that contains at least one table header cell (&lt;th&gt;).",
            resources: "headers/id article.",
            icon_order: "17",
            position: "before",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        table_caption: {
            id: "115",
            name: "table_caption",
            icon_name: "table_caption",
            title: "Table caption",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A table caption is present.",
            purpose: "An associated table caption will be read by a screen reader with the table content.",
            actions: "Ensure the table caption is properly associated with the correct table (&lt;caption&gt; should be the first element within the &lt;table&gt;) and that it provides a succinct description of the table.",
            details: "A &lt;caption&gt; element is present.",
            resources: "",
            icon_order: "18",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        th: {
            id: "88",
            name: "th",
            icon_name: "th",
            title: "Table header cell",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "A table header cell (&lt;th&gt;) is present.",
            purpose: "Table headers describe the content of their respective row or column. They can be identified by screen readers when data cells are encountered.",
            actions: 'Ensure the cell is a table header, otherwise change it to a data cell (&lt;td&gt;). For complex tables (particularly when there are spanned cells), the relationship between header and data cells may need to be defined using scope (e.g., &lt;th scope="col"&gt; or &lt;th scope="row"&gt;) or headers and id attributes.',
            details: 'A &lt;th&gt; element is present that does not have a scope attribute value of "row" or "col".',
            resources: "",
            icon_order: "19",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        th_col: {
            id: "90",
            name: "th_col",
            icon_name: "th_col",
            title: "Column header cell",
            category: "Structural Elements",
            cat_code: "structure",
            summary: 'A table column header (&lt;th scope="col"&gt;) is present.',
            purpose: "Adding a column scope to a table header ensures the cells within that column will be programmatically associated to that header, particularly with complex tables. This facilitates screen reader navigation and orientation within the data table.",
            actions: "Ensure that the cell is actually a header cell for tabular data and that it is a column header.",
            details: 'A table header cell (&lt;th&gt;) is present that has a scope attribute value of "col".',
            resources: "",
            icon_order: "20",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        th_row: {
            id: "89",
            name: "th_row",
            icon_name: "th_row",
            title: "Row header cell",
            category: "Structural Elements",
            cat_code: "structure",
            summary: 'A table row header (&lt;th scope="row"&gt;) is present.',
            purpose: "Adding a row scope to a table header ensures the cells within that row will be programmatically associated to that header, particularly with complex tables. This facilitates screen reader navigation and orientation within the data table.",
            actions: "Ensure that the cell is actually a header cell for tabular data and that it is a row header.",
            details: 'A table header cell (&lt;th&gt;) is present that has a scope attribute value of "row".',
            resources: "",
            icon_order: "21",
            position: "first",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        iframe: {
            id: "40",
            name: "iframe",
            icon_name: "iframe",
            title: "Inline frame",
            category: "Structural Elements",
            cat_code: "structure",
            summary: "An inline frame (&lt;iframe&gt;) is present.",
            purpose: "The content of an inline frame is read as if it were part of the page that contains it. The content of the iframe must be accessible. A title attribute value for the iframe will generally be read by a screen reader when the iframe is encountered.",
            actions: "Ensure that the content within the iframe is accessible. Optionally, a title attribute value can be added to provide a brief, advisory description of the iframe.",
            details: "An &lt;iframe&gt; element is present.",
            resources: "",
            icon_order: "22",
            position: "after",
            page_rule: "0",
            api_type: "WAVE", guidelines: {},
            levels: {}
        },
        aria: {
            id: "80",
            name: "aria",
            icon_name: "aria",
            title: "ARIA",
            category: "ARIA",
            cat_code: "aria",
            summary: "An ARIA role, state, or property is present.",
            purpose: "ARIA provides enhanced semantics and accessibility for web content.",
            actions: "Ensure the ARIA role, state, or property is used correctly. Use standard HTML accessibility features when possible. Be aware that support for ARIA is limited in older browsers and assistive technologies.",
            details: "An ARIA role, state, or property is present, excluding landmark roles, aria-labelledby, or aria-describedby which are distinct WAVE items.",
            resources: "",
            icon_order: "1",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                77: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "4.1.2",
                    name: "4.1.2 Name, Role, Value (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc4.1.2",
                    guideline_id: "77"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        aria_label: {
            id: "105",
            name: "aria_label",
            icon_name: "aria_label",
            title: "ARIA label",
            category: "ARIA",
            cat_code: "aria",
            summary: "An aria-label or aria-labelledby attribute is present.",
            purpose: "ARIA labels define accessible names to be read by screen readers for interface elements. They may be used when HTML associations (label, alternative text, etc.) are not sufficient.",
            actions: "Ensure the aria-label value or element referenced by aria-labelledby provides a descriptive, accurate label. When possible, use standard HTML &lt;label&gt; or other markup to make the association.",
            details: "An aria-label or aria-labelledby attribute is present.",
            resources: "",
            icon_order: "2",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                },
                27: {
                    guideline_id: "27",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
                },
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                },
                77: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "4.1.2",
                    name: "4.1.2 Name, Role, Value (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc4.1.2",
                    guideline_id: "77"
                },
                90: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "2.5.3",
                    name: "2.5.3 Label in Name (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.5.3",
                    guideline_id: "90"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        aria_describedby: {
            name: "aria_describedby",
            category: "ARIA",
            cat_code: "aria",
            title: "ARIA description",
            summary: "An aria-describedby attribute is present.",
            purpose: "ARIA descriptions provide additional information about interface elements, primarily form controls.",
            actions: "Ensure the aria-describedby attribute references an element that provides a correct description.",
            details: "An aria-describedby attribute is present.",
            resources: "",
            icon_order: "3",
            position: "last",
            page_rule: "0",
            icon_name: "aria_describedby",
            api_type: "WAVE", guidelines: {
                27: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1",
                    guideline_id: "27"
                },
                77: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "4.1.2",
                    name: "4.1.2 Name, Role, Value (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc4.1.2",
                    guideline_id: "77"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        aria_live_region: {
            name: "aria_live_region",
            category: "ARIA",
            cat_code: "aria",
            title: "ARIA alert or live region",
            summary: "An ARIA alert role or live region is present.",
            purpose: "ARIA live regions and alerts can be used to dynamically inform screen reader users of content updates.",
            actions: "Ensure the live region is properly tested and presents important, succinct content updates. A live region should not be used if focus is set to the updated page element.",
            details: 'A role="alert", role="alertdialog", or aria-live attribute is present.',
            resources: "",
            icon_order: "4",
            position: "after",
            page_rule: "0",
            icon_name: "aria_live_region",
            api_type: "WAVE", guidelines: {
                70: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "3.3.1",
                    name: "3.3.1 Error Identification (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc3.3.1",
                    guideline_id: "70"
                },
                94: {
                    level_id: 2,
                    level_name: "WCAG 2 AA",
                    code: "4.1.3",
                    name: "4.1.3 Status Messages (Level AA)",
                    link: "https://webaim.org/standards/wcag/checklist#sc4.1.3",
                    guideline_id: "94"
                }
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        aria_menu: {
            name: "aria_menu",
            category: "ARIA",
            cat_code: "aria",
            title: "ARIA menu",
            summary: "An ARIA menu is present.",
            purpose: "ARIA menus are application menus (like those used in software menu) with a specific keyboard interactions. They are NOT for navigation links on a web site.",
            actions: "Ensure that the menu is an application menu and has the appropriate keyboard interactions (menu items are navigated via the arrow keys, not via the Tab key), otherwise remove the menu role.",
            details: 'An element with role="menu" or role="menubar" is present.',
            resources: "",
            icon_order: "5",
            position: "first",
            page_rule: "0",
            icon_name: "aria_menu",
            api_type: "WAVE", guidelines: {
                39: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "2.1.1",
                    name: "2.1.1 Keyboard (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.1.1",
                    guideline_id: "39"
                },
                77: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "4.1.2",
                    name: "4.1.2 Name, Role, Value (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc4.1.2",
                    guideline_id: "77"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        aria_button: {
            name: "aria_button",
            category: "ARIA",
            cat_code: "aria",
            title: "ARIA button",
            summary: 'An element with role="button" is present.',
            purpose: 'Elements with role="button" must function like native buttons. These should typically be replaced with true button elements.',
            actions: "Replace the element with a true button element, or ensure the element is keyboard navigable, can be activated with Enter or Space key presses (key detection is typically necessary), and provides a visible focus indicator.",
            details: 'An element (other than a button) has role="button".',
            resources: "",
            icon_order: "6",
            position: "after",
            page_rule: "0",
            icon_name: "aria_button",
            api_type: "WAVE", guidelines: {
                39: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "2.1.1",
                    name: "2.1.1 Keyboard (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.1.1",
                    guideline_id: "39"
                },
                77: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "4.1.2",
                    name: "4.1.2 Name, Role, Value (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc4.1.2",
                    guideline_id: "77"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        aria_expanded: {
            name: "aria_expanded",
            category: "ARIA",
            cat_code: "aria",
            title: "ARIA expanded",
            summary: "An aria-expanded attribute is present.",
            purpose: "The aria-expanded attribute indicates the status of content that can be expanded and collapsed.",
            actions: "Ensure that aria-expanded is used correctly (typically on a button that controls expandable content) and that the value (true or false) reflects the expansion state.",
            details: "An element with an aria-expanded attribute is present.",
            resources: "",
            icon_order: "7",
            position: "last",
            page_rule: "0",
            icon_name: "aria_expanded",
            api_type: "WAVE", guidelines: {
                77: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "4.1.2",
                    name: "4.1.2 Name, Role, Value (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc4.1.2",
                    guideline_id: "77"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        aria_haspopup: {
            name: "aria_haspopup",
            category: "ARIA",
            cat_code: "aria",
            title: "ARIA popup",
            summary: "An element triggers a popup menu, dialog, or other element.",
            purpose: "The aria-haspopup element, when applied to a button, indicates that triggering the element will open an ARIA menu, dialog, listbox, tree, or grid.",
            actions: "Ensure that the element triggers an ARIA menu, dialog, listbox, tree, or grid and that the aria-haspop attribute value aligns with the type of element that is opened.",
            details: "An aria-haspopup attribute is present.",
            resources: "",
            icon_order: "8",
            position: "last",
            page_rule: "0",
            icon_name: "aria_haspopup",
            api_type: "WAVE", guidelines: {
                77: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "4.1.2",
                    name: "4.1.2 Name, Role, Value (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc4.1.2",
                    guideline_id: "77"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        aria_tabindex: {
            id: "112",
            name: "aria_tabindex",
            icon_name: "aria_tabindex",
            title: "ARIA tabindex",
            category: "ARIA",
            cat_code: "aria",
            summary: "A tabindex value of 0 or less is present.",
            purpose: "Tabindex can facilitate keyboard navigation for interactive elements. A tabindex attribute value of 0 places an item into the keyboard navigation order (i.e., you can navigate to it using the Tab key). A value of less than 0 (typically -1) removes an element from the keyboard flow (you cannot Tab to it), but allows it to receive programmatic focus (e.g., via scripting). ",
            actions: "Ensure that tabindex is being used correctly by navigating and interacting with the elements using only the keyboard. Positive tabindex values specify a distinct tab order and should typically be avoided.",
            details: "A tabindex attribute is present and has a value of 0 or less.",
            resources: "",
            icon_order: "9",
            position: "last",
            page_rule: "0",
            api_type: "WAVE", guidelines: {
                39: {
                    guideline_id: "39",
                    code: "2.1.1",
                    name: "2.1.1 Keyboard (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        aria_hidden: {
            name: "aria_hidden",
            category: "ARIA",
            cat_code: "aria",
            title: "ARIA hidden",
            summary: "Content is hidden with ARIA.",
            purpose: 'Content hidden with aria-hidden="true" is not presented to screen reader users.',
            actions: "Ensure the content is intended to be hidden from screen reader users. The hidden content must not contain any navigable elements (such as links or form controls).",
            details: 'An element with aria-hidden="true" is present.',
            resources: "",
            icon_order: "10",
            position: "last",
            page_rule: "0",
            icon_name: "aria_hidden",
            api_type: "WAVE", guidelines: {
                77: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "4.1.2",
                    name: "4.1.2 Name, Role, Value (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc4.1.2",
                    guideline_id: "77"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        // 5 Crest Docs
        cr_heading_unrelated: {
            name: "cr_heading_unrelated",
            category: "HEADING",
            cat_code: "heading",
            title: "Heading unrelated",
            summary: "Possibly unrelated heading.",
            purpose: 'The content immediately following a heading identified by machine learning is possibly unrelated to the topic or purpose.',
            actions: "Provide clear and descriptive headings that accurately describe the immediatley following content.",
            details: 'Blind screen reader users rely on headings to navigate page content. When headings are misleading and do not reflect the topic or purpose, users can become disoriented and have difficulty navigating the page. Users with learning differences may also have difficulty understanding page content when headings are unrelated to content.',
            resources: "",
            icon_order: "10",
            position: "last",
            page_rule: "0",
            icon_name: "cr_heading_unrelated",
            api_type: "CREST", guidelines: {
                54: {
                    guideline_id: "54",
                    code: "2.4.6",
                    name: "2.4.6 Headings and Labels (Level AA)",
                    level_id: "2",
                    level_name: "WCAG 2 AA",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.6"
                },
                27: {
                    level_id: 1,
                    level_name: "WCAG 2 A",
                    code: "1.3.1",
                    name: "1.3.1 Info and Relationships (Level A)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.3.1",
                    guideline_id: "27"
                },
            },
            levels: {
                1: "WCAG 2 A",
                2: "WCAG 2 AA"
            }
        },
        cr_captions_missing: {
            name: "cr_captions_missing",
            category: "ARIA",
            cat_code: "aria",
            title: "Captions missing",
            summary: "Captions missing.",
            purpose: 'Synchronized captions are not provided for video or other multimedia content that contains audio.',
            actions: "Provide captions for all important audio information in video and multimedia content.",
            details: 'Users who are deaf or hard of hearing will not have access to important information conveyed in audio. Captions also provide an enhanced experience for users with cognitive differences such as ADHD or learning disabilities. Additionally, captions are useful in certain situations such as environments with loud background noise or situations where sound is not allowed (e.g. the library without headphones, or near a sleeping baby).',
            resources: "",
            icon_order: "10",
            position: "last",
            page_rule: "0",
            icon_name: "cr_captions_missing",
            api_type: "CREST", guidelines: {
                19: {
                    guideline_id: "19",
                    code: "1.2.2",
                    name: "1.2.2 Captions (Prerecorded) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.2"
                },
                43: {
                    guideline_id: "43",
                    code: "2.2.2",
                    name: "2.2.2 Pause, Stop, Hide (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.2.2"
                },
                17: {
                    guideline_id: "17",
                    code: "1.1.1",
                    name: "1.1.1 Non-text Content (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        },
        cr_focus_low: {
            name: "cr_focus_low",
            category: "KEYBOARD",
            cat_code: "keyboard",
            title: "Low contrast on Focus",
            summary: "Low contrast on Focus.",
            purpose: 'When active interface controls (buttons, links, forms, page tabs, etc.) receive keyboard focus, the visual focus indicator does not meet the required color contrast ratio of at least 3:1.',
            actions: "Ensure that the visual keyboard focus indicator provides a sufficient color contrast ratio of at least 3:1 with adjacent colors (background and/or the control colors). Possible solutions include: using the CSS outline property to provide an outline around the focused element, and inverting the foreground and background colors.",
            details: 'Low-vision users may have trouble seeing the visual keyboard focus indicator and may not be able to orient themselves on the page to effectively navigate content. Colorblind users may also be affected.',
            resources: "",
            icon_order: "10",
            position: "last",
            page_rule: "0",
            icon_name: "cr_focus_low",
            api_type: "CREST", guidelines: {
                1411: {
                    level_id: 1,
                    level_name: "WCAG 2 AA",
                    code: "1.4.11",
                    name: "1.4.11 Non-text Contrast (Level AA)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.4.11",
                    guideline_id: "1411"
                },
                247: {
                    level_id: 1,
                    level_name: "WCAG 2 AA",
                    code: "2.4.7",
                    name: "2.4.7 Focus Visible (Level AA)",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.7",
                    guideline_id: "247"
                }
            },
            levels: {
                1: "WCAG 2 AA"
            }
        },
        cr_focus_missing: {
            name: "cr_focus_missing",
            category: "KEYBOARD",
            cat_code: "keyboard",
            title: "Focus not visible",
            summary: "Focus not visible.",
            purpose: 'There is no visual keyboard focus indication when using TAB or SHIFT+TAB, and/or arrow keys (when applicable) to navigate through the controls (buttons, links, forms, page tabs, etc.) of the website.',
            actions: 'All interactive content must provide a visual indication of keyboard focus. Focus can be provided in a number of ways including change background, invert colors, border, outline, and other visual methods. Avoid the use of the "outline: none" CSS property.',
            details: 'Sighted keyboard-only users are not able to orient themselves on the page and will not be able to effectively navigate content.',
            resources: "",
            icon_order: "10",
            position: "last",
            page_rule: "0",
            icon_name: "cr_focus_missing",
            api_type: "CREST", guidelines: {
                1411: {
                    level_id: 1,
                    level_name: "WCAG 2 AA",
                    code: "1.4.11",
                    name: "1.4.11 Non-text Contrast (Level AA)",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.4.11",
                    guideline_id: "1411"
                },
                247: {
                    level_id: 1,
                    level_name: "WCAG 2 AA",
                    code: "2.4.7",
                    name: "2.4.7 Focus Visible (Level AA)",
                    link: "https://webaim.org/standards/wcag/checklist#sc2.4.7",
                    guideline_id: "247"
                }
            },
            levels: {
                1: "WCAG 2 AA"
            }
        },
        cr_podcast_transcript_missing: {
            name: "cr_podcast_transcript_missing",
            category: "TRANSCRIPT",
            cat_code: "transcript",
            title: "Podcast transcript missing",
            summary: "Podcast transcript missing.",
            purpose: 'Audio-only content such as podcasts and audio recordings of speeches and press conferences are not made available by transcript.',
            actions: "Provide a transcript for audio-only content.",
            details: 'When transcripts are provided for audio-only content, people who are deaf or deaf-blind will have access to the information visually or through the use of electronic braille.',
            resources: "",
            icon_order: "10",
            position: "last",
            page_rule: "0",
            icon_name: "cr_podcast_transcript_missing",
            api_type: "CREST", guidelines: {
                18: {
                    guideline_id: "18",
                    code: "1.2.1",
                    name: "1.2.1 Prerecorded Audio-only and Video-only (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.1"
                },
                20: {
                    guideline_id: "20",
                    code: "1.2.3",
                    name: "1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)",
                    level_id: "1",
                    level_name: "WCAG 2 A",
                    link: "https://webaim.org/standards/wcag/checklist#sc1.2.3"
                }
            },
            levels: {
                1: "WCAG 2 A"
            }
        }

    }
}