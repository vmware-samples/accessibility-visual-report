<!-- Copyright 2022 VMware, Inc.
SPDX-License-Identifier: MIT -->

# Accessibility Visual Report

- [Accessibility Visual Report](#accessibility-visual-report)
  - [Overview](#overview)
  - [Getting Started](#getting-started)
    - [Obtain source code](#obtain-source-code)
    - [Install requirements*](#install-requirements)
    - [Update settings to your environment](#update-settings-to-your-environment)
      - [Backend by Django](#backend-by-django)
      - [Backend by Angular](#backend-by-angular)
  - [Try it out](#try-it-out)
    - [Start Backend](#start-backend)
    - [Start Frontend](#start-frontend)
    - [Run and View first Accessibility Visual Report](#run-and-view-first-accessibility-visual-report)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

**Accessibility Visual Report** for HTML web page, which provides a way to evaluate accessibility results and provides Visualized Report, related code viewer and bug fix helper.

Features that will be reviewed on this call include:
* Visualized Automatic Accessibility Report via Specific URLs
* Visualized results with icon tags
* Visualized code snippet
* AI/ML to provide fix suggestion (in future)
* Run comparison to view delta only against last run (in future)


## Getting Started
*Accessibility Visual Report assumes below dependencies installed:*
* Python 3.9.2+
* Django 4.0.1+
* Node 12.22.9+
* Angular 11.2.4+

*Accessibility Visual Report also depends on Accessibility Evaluation API:*
* [Crest - Open Source Software](https://github.com/vmware/crest)
* [WAVE - Commercial-ware](https://wave.webaim.org/api/SAdocs)

### Obtain source code
* `git clone git@github.com:vmware-samples/accessibility-visual-report.git`

Your Directory structure will look like this:*
```
accessibility-visual-report
├── backend
├── frontend
├──
```

### Install requirements*
*within accessibility-visual-report/backend directory*

* `pip install -r requirements.txt`

*within accessibility-visual-report/frontend directory*

* `npm install`

### Update settings to your environment
*Accessibility Visual Report has both backend and frontend*
#### Backend by Django
* **(Required)** Edit 'backend/accessibility/setting/config.py' per Accessibility Evaluation API in use:
  * WAVE_SERVER
  * WAVE_API_KEY
  * CREST_SERVER
  * A11Y_SERVERS

#### Backend by Angular
* *(Optional)* Update self-signed certification in 'frontend/ssl/ui.*':
  * ui.crt
  * ui.key

## Try it out
### Start Backend
*within accessibility-visual-report/backend directory*
* `python manage.py runserver`

*By default, it runs at http://localhost:8000*

### Start Frontend
*within accessibility-visual-report/frontend directory*
* `npm run start`

*By default, it runs at https://localhost*

### Run and View first Accessibility Visual Report

* Open https://localhost
* Enter URL(s):
* Click Refresh button and wait for page reload

## Contributing

The accessibility-visual-report project team welcomes contributions from the community. Before you start working with accessibility-visual-report, please
read our [Developer Certificate of Origin](https://cla.vmware.com/dco). All contributions to this repository must be
signed as described on that page. Your signature certifies that you wrote the patch or have the right to pass it on
as an open-source patch. For more detailed information, refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## License
Accessibility Visual Report is comprised of many open source software components, each of which has its own license that is located in the source code of the respective component as well as documented in the [LICENSE](LICENSE.txt) open source license file</a> accompanying the distribution.
