# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

accessibility_categories_error_mapping={
    'button_empty':{
        "issue_description":"Empty button",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'link_empty':{
        "issue_description":"Empty link",
        "api_type":"WAVE",
        'guideline':'2.4.4 Link Purpose (In Context)',
        'conformance_level':'A'
    },
    'label_empty':{
        "issue_description":"Empty form label",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'alt_area_missing':{
        "issue_description":"Image map area missing alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'alt_map_missing':{
        "issue_description":"Image map missing alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'language_missing':{
        "issue_description":"Document language missing",
        "api_type":"WAVE",
        'guideline':'3.1.1 Language of Page',
        'conformance_level':'A'
    },
    'title_invalid':{
        "issue_description":"Missing or uninformative page title",
        "api_type":"WAVE",
        'guideline':'2.4.2 Page Titled',
        'conformance_level':'A'
    },
    'alt_link_missing':{
        "issue_description":"Linked image missing alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'alt_missing':{
        "issue_description":"Missing alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'label_missing':{
        "issue_description":"Missing form label",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'aria_reference_broken':{
        "issue_description":"Broken ARIA reference",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'heading_empty':{
        "issue_description":"Empty heading",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'alt_input_missing':{
        "issue_description":"Image button missing alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'alt_spacer_missing':{
        "issue_description":"Spacer image missing alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'aria_menu_broken':{
        "issue_description":"Broken ARIA menu",
        "api_type":"WAVE",
        'guideline':'4.1.2 Name, Role, Value',
        'conformance_level':'A'
    },
    'blink':{
        "issue_description":"Blinking content",
        "api_type":"WAVE",
        'guideline':'2.2.2 Pause, Stop, Hide',
        'conformance_level':'A'
    },
    'label_multiple':{
        "issue_description":"Multiple form labels",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'link_skip_broken':{
        "issue_description":"MBroken skip link",
        "api_type":"WAVE",
        'guideline':'2.1.1 Keyboard',
        'conformance_level':'A'
    },
    'longdesc_invalid':{
        "issue_description":"Invalid longdesc",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'marquee':{
        "issue_description":"Marquee",
        "api_type":"WAVE",
        'guideline':'2.2.2 Pause, Stop, Hide',
        'conformance_level':'A'
    },
    'meta_refresh':{
        "issue_description":"Page refreshes or redirect",
        "api_type":"WAVE",
        'guideline':'2.2.1 Timing Adjustable',
        'conformance_level':'A'
    },
    'th_empty':{
        "issue_description":"Empty table header",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'focus_missing':{
        "issue_description":"Focus not visible",
        "api_type":"CREST",
        'guideline':'2.4.7 Focus Visible',
        'conformance_level':'AA'
    },
    'focus_low':{
        "issue_description":"Low contrast on focus",
        "api_type":"CREST",
        'guideline':'1.4.11 Non-text contrast',
        'conformance_level':'AA'
    },
    'captions_missing':{
        "issue_description":"Captions Missing",
        "api_type":"CREST",
        'guideline':'1.2.2 Captions (Prerecorded)',
        'conformance_level':'A'
    },
    'podcast_transcript_missing':{
        "issue_description":"Podcast transcript missing",
        "api_type":"CREST",
        'guideline':'1.2.1 Audio-only and Video-only',
        'conformance_level':'A'
    },
    'heading_unrelated':{
        "issue_description":"possibly unrelated heading",
        "api_type":"CREST",
        'guideline':'2.4.6 Headings and Labels',
        'conformance_level':'AA'
    },
    'cr_focus_missing':{
        "issue_description":"Visual keyboard focus missing",
        "api_type":"CREST",
        'guideline':'2.4.7 Focus Visible',
        'conformance_level':'AA'
    },
    'cr_focus_low':{
        "issue_description":"Low contrast on focus",
        "api_type":"CREST",
        'guideline':'1.4.11 Non-text contrast',
        'conformance_level':'AA'
    },
    'cr_captions_missing':{
        "issue_description":"Captions Missing",
        "api_type":"CREST",
        'guideline':'1.2.2 Captions (Prerecorded)',
        'conformance_level':'A'
    },
    'cr_transcript_missing':{
        "issue_description":"Transcript missing for audio only content",
        "api_type":"CREST",
        'guideline':'1.2.1 Prerecorded Audio-only and Video-only',
        'conformance_level':'A'
    }
}
accessibility_categories_contrast_mapping={
    'contrast':{
        "issue_description":"Very low contrast",
        "api_type":"WAVE",
        'guideline':'1.4.3 Contrast (Minimum)',
        'conformance_level':'AA'
    }
}
accessibility_categories_alert_mapping={
    'title_redundant':{
        "issue_description":"Redundant title text",
        "api_type":"WAVE",
        'guideline':'4.1.2 Name, Role, Value',
        'conformance_level':'A'
    },
    'link_suspicious':{
        "issue_description":"Suspicious link text",
        "api_type":"WAVE",
        'guideline':'2.4.4 Link Purpose (In Context)',
        'conformance_level':'A'
    },
    'table_layout':{
        "issue_description":"Layout table",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'alt_long':{
        "issue_description":"Long alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'heading_missing':{
        "issue_description":"No heading structure",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'text_justified':{
        "issue_description":"Justified text",
        "api_type":"WAVE",
        'guideline':'1.4.8 Visual Presentation',
        'conformance_level':'AAA'
    },
    'h1_missing':{
        "issue_description":"Missing first level heading",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'heading_skipped':{
        "issue_description":"Skipped heading level",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'link_redundant':{
        "issue_description":"Redundant link",
        "api_type":"WAVE",
        'guideline':'2.4.4 Link Purpose (In Context)',
        'conformance_level':'A'
    },
    'link_pdf':{
        "issue_description":"Link to PDF document",
        "api_type":"WAVE",
        'guideline':'2.4.4 Link Purpose (In Context)',
        'conformance_level':'A'
    },
    'underline':{
        "issue_description":"Underlined text",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'noscript':{
        "issue_description":"Noscript element",
        "api_type":"WAVE",
        'guideline':'3.3.2 Labels or Instructions',
        'conformance_level':'A'
    },
    'alt_duplicate':{
        "issue_description":"A nearby image has the same alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'alt_redundant':{
        "issue_description":"Redundant alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'link_internal_broken':{
        "issue_description":"Broken same-page link",
        "api_type":"WAVE",
        'guideline':'2.1.1 Keyboard',
        'conformance_level':'A'
    },
    'accesskey':{
        "issue_description":"Accesskey",
        "api_type":"WAVE",
        'guideline':'2.4.1 Bypass Blocks ',
        'conformance_level':'A'
    },
    'text_small':{
        "issue_description":"Very small text",
        "api_type":"WAVE",
        'guideline':'1.3.3 Sensory Characteristics',
        'conformance_level':'A'
    },
    'label_orphaned':{
        "issue_description":"Orphaned form label",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'heading_possible':{
        "issue_description":"Possible heading",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'fieldset_missing':{
        "issue_description":"Missing fieldset",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'alt_suspicious':{
        "issue_description":"Suspicious alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'legend_missing':{
        "issue_description":"Fieldset missing legend",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'applet':{
        "issue_description":"Java Applet",
        "api_type":"WAVE",
        'guideline':'2.4.5 Multiple Ways',
        'conformance_level':'AA'
    },
    'audio_video':{
        "issue_description":"Audio/Video",
        "api_type":"WAVE",
        'guideline':'1.2.1 Prerecorded Audio-only and Video-only',
        'conformance_level':'A'
    },
    'event_handler':{
        "issue_description":"Device dependent event handler",
        "api_type":"WAVE",
        'guideline':'2.1.1 Keyboard ',
        'conformance_level':'A'
    },
    'flash':{
        "issue_description":"Flash",
        "api_type":"WAVE",
        'guideline':'1.2.1 Prerecorded Audio-only and Video-only',
        'conformance_level':'A'
    },
    'html5_video_audio':{
        "issue_description":"HTML5 video or audio",
        "api_type":"WAVE",
        'guideline':'1.2.1 Prerecorded Audio-only and Video-only',
        'conformance_level':'A'
    },
    'javascript_jumpmenu':{
        "issue_description":"JavaScript jump menu",
        "api_type":"WAVE",
        'guideline':'2.1.1 Keyboard',
        'conformance_level':'A'
    },
    'label_title':{
        "issue_description":"Unlabeled form element with title",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'link_document':{
        "issue_description":"Link to document",
        "api_type":"WAVE",
        'guideline':'2.4.4 Link Purpose (In Context)',
        'conformance_level':'A'
    },
    'link_excel':{
        "issue_description":"Link to Excel spreadsheet",
        "api_type":"WAVE",
        'guideline':'2.4.4 Link Purpose (In Context)',
        'conformance_level':'A'
    },
    'link_powerpoint':{
        "issue_description":"Link to PowerPoint document",
        "api_type":"WAVE",
        'guideline':'2.4.4 Link Purpose (In Context)',
        'conformance_level':'A'
    },
    'link_word':{
        "issue_description":"Link to Word document",
        "api_type":"WAVE",
        'guideline':'2.4.4 Link Purpose (In Context)',
        'conformance_level':'A'
    },
    'longdesc':{
        "issue_description":"Long description",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'plugin':{
        "issue_description":"Plugin",
        "api_type":"WAVE",
        'guideline':'2.4.5 Multiple Ways',
        'conformance_level':'AA'
    },
    'region_missing':{
        "issue_description":"No page regions",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'tabindex':{
        "issue_description":"Tabindex",
        "api_type":"WAVE",
        'guideline':'2.4.3 Focus Order',
        'conformance_level':'A'
    },
    'table_caption_possible':{
        "issue_description":"Possible table caption",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'youtube_video':{
        "issue_description":"YouTube Video",
        "api_type":"WAVE",
        'guideline':'1.2.1 Prerecorded Audio-only and Video-only',
        'conformance_level':'A'
    },
    'list_possible':{
        "issue_description":"Possible List",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'select_missing_label':{
        "issue_description":"Select Missing Label",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'image_title':{
        "issue_description":"Image with Title",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'cr_heading_unrelated':{
        "issue_description":"possibly unrelated heading",
        "api_type":"CREST",
        'guideline':'2.4.6 Headings and Labels',
        'conformance_level':'AA'
    }
}
accessibility_categories_warning_mapping={
    'link_description_insufficient':{
        "issue_description":"Link description insufficient",
        "api_type":"CREST",
        'guideline':'2.4.4 Link Purpose',
        'conformance_level':'A'
    }
}
accessibility_categories_feature_mapping={
    'alt_null':{
        "issue_description":"Null or empty alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'alt_spacer':{
        "issue_description":"Null or empty alternative text on spacer",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'alt':{
        "issue_description":"Alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'alt_link':{
        "issue_description":"Linked image with alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'label':{
        "issue_description":"Form label",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'link_skip':{
        "issue_description":"Skip link",
        "api_type":"WAVE",
        'guideline':'2.4.1 Bypass Blocks',
        'conformance_level':'A'
    },
    'link_skip_target':{
        "issue_description":"Skip link target",
        "api_type":"WAVE",
        'guideline':'2.4.1 Bypass Blocks',
        'conformance_level':'A'
    },
    'lang':{
        "issue_description":"Element language",
        "api_type":"WAVE",
        'guideline':'3.1.2 Language of Parts',
        'conformance_level':'AA'
    },
    'alt_input':{
        "issue_description":"Image button with alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'alt_area':{
        "issue_description":"Image map area with alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'alt_map':{
        "issue_description":"Image map with alternative text",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'fieldset':{
        "issue_description":"Fieldset",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'figure':{
        "issue_description":"Figure",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    }
}
accessibility_categories_structure_mapping={
    'h1':{
        "issue_description":"Heading level 1",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'h2':{
        "issue_description":"Heading level 2",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'h3':{
        "issue_description":"Heading level 3",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'h4':{
        "issue_description":"Heading level 4",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'h5':{
        "issue_description":"Heading level 5",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'h6':{
        "issue_description":"Heading level 6",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'ul':{
        "issue_description":"Unordered list",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'iframe':{
        "issue_description":"Inline Frame",
        "api_type":"WAVE",
        'guideline':'2.4.2 Page Titled',
        'conformance_level':'A'
    },
    'ol':{
        "issue_description":"Ordered list",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'dl':{
        "issue_description":"Definition/description list",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'table_data':{
        "issue_description":"Data table",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'th':{
        "issue_description":"Table header cell",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'th_row':{
        "issue_description":"Row header cell",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'table_caption':{
        "issue_description":"Table caption",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'th_col':{
        "issue_description":"Column header cell",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'aside':{
        "issue_description":"Aside",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'header':{
        "issue_description":"Header",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'main':{
        "issue_description":"Main content",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'footer':{
        "issue_description":"Footer",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'nav':{
        "issue_description":"Navigation",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'search':{
        "issue_description":"Search",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'region':{
        "issue_description":"Generic Region",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    }
}
accessibility_categories_aria_mapping={
    'aria_search':{
        "issue_description":"",
        "api_type":"WAVE",
        'guideline':'',
        'conformance_level':'A'
    },
    'html5_header':{
        "issue_description":"",
        "api_type":"WAVE",
        'guideline':'',
        'conformance_level':'A'
    },
    'html5_nav':{
        "issue_description":"",
        "api_type":"WAVE",
        'guideline':'',
        'conformance_level':'A'
    },
    'html5_main':{
        "issue_description":"",
        "api_type":"WAVE",
        'guideline':'',
        'conformance_level':'A'
    },
    'html5_footer':{
        "issue_description":"",
        "api_type":"WAVE",
        'guideline':'',
        'conformance_level':'A'
    },
    'aria_label':{
        "issue_description":"ARIA label",
        "api_type":"WAVE",
        'guideline':'1.1.1 Non-text Content',
        'conformance_level':'A'
    },
    'aria':{
        "issue_description":"ARIA",
        "api_type":"WAVE",
        'guideline':'4.1.2 Name, Role, Value ',
        'conformance_level':'A'
    },
    'aria_tabindex':{
        "issue_description":"ARIA tabindex",
        "api_type":"WAVE",
        'guideline':'2.1.1 Keyboard',
        'conformance_level':'A'
    },
    'aria_live_region':{
        "issue_description":"ARIA alert or live region",
        "api_type":"WAVE",
        'guideline':'3.3.1 Error Identification',
        'conformance_level':'A'
    },
    'aria_hidden':{
        "issue_description":"ARIA hidden",
        "api_type":"WAVE",
        'guideline':'4.1.2 Name, Role, Value',
        'conformance_level':'A'
    },
    'aria_expanded':{
        "issue_description":"ARIA expanded",
        "api_type":"WAVE",
        'guideline':'4.1.2 Name, Role, Value',
        'conformance_level':'A'
    },
    'aria_haspopup':{
        "issue_description":"ARIA popup",
        "api_type":"WAVE",
        'guideline':'4.1.2 Name, Role, Value',
        'conformance_level':'A'
    },
    'aria_button':{
        "issue_description":"ARIA button",
        "api_type":"WAVE",
        'guideline':'2.1.1 Keyboard',
        'conformance_level':'A'
    },
    'aria_describedby':{
        "issue_description":"ARIA description",
        "api_type":"WAVE",
        'guideline':'1.3.1 Info and Relationships',
        'conformance_level':'A'
    },
    'aria_menu':{
        "issue_description":"ARIA menu",
        "api_type":"WAVE",
        'guideline':'2.1.1 Keyboard',
        'conformance_level':'A'
    }
}
accessibility_categories_html5_mapping=accessibility_categories_aria_mapping
accessibility_categories={
    'error':accessibility_categories_error_mapping,
    'contrast':accessibility_categories_contrast_mapping,
    'alert':accessibility_categories_alert_mapping,
    'feature':accessibility_categories_feature_mapping,
    'warning':accessibility_categories_warning_mapping,
    'structure':accessibility_categories_structure_mapping,
    'aria':accessibility_categories_aria_mapping,
    'html5':accessibility_categories_html5_mapping
}
accessibility_category_update_mapping={
    "alert":{
        "select_missing_label":"error",
        "image_title":"error",
        "alt_duplicate":"error",
        "alt_long":"error",
        "applet":"error",
        "fieldset_missing":"error",
        "h1_missing":"error",
        "heading_missing":"error",
        "heading_skipped":"error",
        "label_orphaned":"error",
        "label_title":"error",
        "link_internal_broken":"error",
        "link_redundant":"error",
        "longdesc":"error",
        "region_missing":"error",
        "text_justified":"error",
        "underline":"error"
    }
}