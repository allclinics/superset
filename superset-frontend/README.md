<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

# Configuration setup for local development

## superset-frontend setup

1. Install [Node.js](https://nodejs.org/en/download/) v16.20.2, exact version see in `.nvmrc` file.
2. Install dependencies by running `npm install`.

## docker setup

**Note**: This setup is set for folder docker

1. Add valid env variables to `.env` file. You can use `.env-non-dev` as a template, for additional env configuration consult other developers.
2. Create file `requirements-local.txt` with the following content:
    ```txt
    sqlalchemy-bigquery
    ```
3. Adjust file `pythonpath_dev/superset_config.py`.
   > Note! Those changes is used for local development and should not be used in production.
   1. Add the following lines:
      ```python
      FEATURE_FLAGS = {
        "DYNAMIC_PLUGINS": True,
        "ALERTS_ATTACH_REPORTS": True,
        "ALLOW_FULL_CSV_EXPORT": True,
        "DASHBOARD_RBAC": True,
        "EMBEDDABLE_CHARTS": True,
        "EMBEDDED_SUPERSET": True,
        "LISTVIEWS_DEFAULT_CARD_VIEW": True,
        "SCHEDULED_QUERIES": True,
        "SQL_VALIDATORS_BY_ENGINE": True,
        "ESTIMATE_QUERY_COST": True,
        "DRILL_TO_DETAIL": True,
        "HORIZONTAL_FILTER_BAR": True,
        "ENABLE_JAVASCRIPT_CONTROLS":True,
        "USE_ANALAGOUS_COLORS": True,
        "CHART_PLUGINS_EXPERIMENTAL": True,
        "RLS_IN_SQLLAB": True ,
        "ENABLE_TEMPLATE_PROCESSING" : True ,
        "GENERIC_CHART_AXES": True,
        }
      # Needed to display styles on the superset correctly
      HTML_SANITIZATION = False
      ```
   2. (optional) If you are using web app on local development add next lines to be able to run embedded dashboards:
      ```python
      # Needed for access rights, so you can display the dashboard in the web app
      GUEST_ROLE_NAME = "Gamma"
      # It seems there is an issue with CORS if Talisman is enabled, so we need to disable it
      TALISMAN_ENABLED = False
      ```
4. Run `docker-compose up`. Now you should have application running on `http://localhost:8088/`.
