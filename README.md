# Kong Manager Testing Framework

## Why choose Playwright over Cypress
* cross-browser compatibility
* concurrent execution efficiency
* Native API support
* stronger native TypeScript support

## Folder Structure

```
konghq-asgn/
├── .github/workflows/playwright.yml
├── configs/                       # Global Configurations
│   ├── common/
│   │   └── browsers.ts            # Browser Matrix
│   ├── kong-manager/              # Kong Manager specific
│   │   ├── projects.ts            # Config projects for multi-browsers
│   │   ├── env.ts
│   │   └── index.ts
│   ├── konnect/                   # Konnect specific
│   │   └── ...
│   └── index.ts
├── src/
│   ├── common/                    # Cross-project common components
│   │   ├── fixtures/              # Common Fixtures
│   │   └── helpers/               # Pure function tools
│   ├── kong-manager/              # Business domain(Kong Manager)
│   │   ├── api/                   # API test type
│   │   ├── e2e/
│   │   |   ├──page-object/        # POM
│   │   |   ├──test-cases/         # Business test cases
│   │   |   └──test-steps/         # atomic steps
│   │   ├── fixtures/
│   │   ├── helpers/
│   │   ├── hooks/                 # Business hooks (setup/teardown)   
│   │   ├── api-handler-factory.ts
│   │   └── ui-handler-factory.ts 
│   └── konnect/                   # Business domain(Konnect)
├── docker-compose.yml             # Kong Manager's
├── playwright.config.ts
└── package.json
```

## Test Strategy

* Trinity assertion of UI + Admin API + DB(Reserved but details not implemented)

* Kong gateway Proxy workflow assertion
  
  * Support protocols 'http https tcp udp ws grpc'

* Execute on multiple browsers & OS

* UI & API testing types can be mixed

## Quick Start

### Run tests
```shell
npm run test:head:manager:chrome
# cross-env PWDEBUG=console PRUDUCT=kong-manager TA_ENV=dev playwright test --headed --project=kmanager-chromium
# ##################################   
# PWDEBUG used by playwright
# PRUDUCT used by framework, choose dest product(Kong Manager / Konnect) to test
# TA_ENV used by framework, choose dest environment(dev / staging / prod) to test
# TEST_TYPE used by framework, choose dest test type(e2e / api) to test
# TEST_DATA_PREFIX plan to use, for tagging test data in case to crud.
# --headed used by playwright, means open browser in head mode
# --project used by playwright, choose which browser type to run
# ##################################
```

### Add new test(e2e for example)

* Overview

  * Split into a 3-layer model
    
    1. page-object: Like common POM design pattern, but without element actions

    2. test-steps: Based on page-object, create actions and assertions of elements via test.step
    
    3. test-cases: Based on test-steps, combined them to test business.

  * testcase [Example](./src/kong-manager/e2e/test-cases/routes.spec.ts)

    1. use a hook `useCreateServiceInWorkspace` to prepare a pre-state: a service must be existed
    2. use some steps to create a route entity through UI: via `workspaceSteps`, `routeSteps`
    3. UI assertions have done in steps, here api level assertion via `routesApi` and proxy level assertion via `getwayTraffic` are followed.
    4. TODO: db assertion
    5. TODO: data driven test for reduce hard code (via `test.each()`)
    6. TODO: @buondary and @exception scenarios

  * test-steps [Example](./src/kong-manager/e2e/test-steps/workspaces/routes-steps.ts)

    1. to explanation

  * page-objects [Example](./src/kong-manager/e2e/page-objects/workspaces/routes-page.ts)

    1. to explanation

## Trade-offs：

* to explanation

## Details

### configs for different projects

The project [configs/](./configs) follows a Matrix-driven approach. By decoupling browser settings (common) from environment specifics (manager-env), the framework can scale to support multiple product lines (Kong Manager, Konnect) and multiple environments (Dev, Staging) with zero code duplication in the core test logic.

* Test Distribution & Filtering Strategy:

    1. Tagging Convention: Implemented a @tag system within test titles to decouple test logic from execution scope.

    2. Project-level Filtering: Leveraged grep and grepInvert at the project level. This allows CI pipelines to execute fast-feedback loops without scanning the entire test suite.

    3. Inversion of Control: By using grepInvert, we ensure that unstable tests (tagged @flaky) are excluded from blocking the PR pipeline while still being available for manual debugging.

    4. Scale: The project matrix is programmatically generated, ensuring that adding a new environment or browser automatically creates the corresponding sanity and full test projects.

### common fixtures

1. Unlike standard UI frameworks, this architecture supports Data Plane validation across L4 (TCP/UDP) and L7 (HTTP/WS/gRPC), ensuring that Kong's core routing engine is functioning beyond just the Management UI.

2. Unified Fixture Lifecycle

```doc
By utilizing Playwright's Worker-scoped fixtures for data generation (uniqueStr) and Test-scoped fixtures for traffic verification, we achieve a balance between execution speed and environment isolation.
```

3. Defensive Polling

```doc
Incorporated an internal retry mechanism within the verifyTraffic fixture to handle Eventual Consistency issues inherent in distributed gateway configurations.
```

### common hooks

* to explanation

## Roadmaps

1. Data-driven design pattern, unified management of test data (functional / boundary / abnormal scenarios), realization of case reuse through TypeScript interface constraints + centralized data sets + Playwright, thorough reduction of hard coding, and ensuring full coverage of test scenarios.

2. More common prepare hooks

3. Customize Reporter: like integration with restrail, then testrail integrate with Jira

4. Performance test?
