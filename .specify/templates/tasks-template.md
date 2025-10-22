---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are MANDATORY per constitution (Test-Driven Development principle). All user stories must include unit, integration, and appropriate end-to-end tests with >80% coverage.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure linting and formatting tools

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Setup database schema and migrations framework
- [ ] T005 [P] Implement authentication/authorization framework
- [ ] T006 [P] Setup API routing and middleware structure
- [ ] T007 Create base models/entities that all stories depend on
- [ ] T008 Configure error handling and logging infrastructure
- [ ] T009 Setup environment configuration management

### Constitutional Foundation Tasks (MANDATORY)

- [ ] T010 [P] Setup automated quality gates (linting, formatting, type checking, security scanning)
- [ ] T011 [P] Configure performance monitoring and alerting infrastructure
- [ ] T012 [P] Implement structured logging framework with metrics collection
- [ ] T013 [P] Setup accessibility testing tools and design system compliance
- [ ] T014 [P] Configure test framework with coverage reporting (target >80%)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (MANDATORY per Constitution) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation (TDD principle)**

- [ ] T015 [P] [US1] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T016 [P] [US1] Integration test for [user journey] in tests/integration/test_[name].py
- [ ] T017 [P] [US1] Unit tests for business logic with >80% coverage
- [ ] T018 [P] [US1] Performance tests to verify constitutional benchmarks
- [ ] T019 [P] [US1] Accessibility tests for UI components (WCAG 2.1 AA)

### Implementation for User Story 1

- [ ] T020 [P] [US1] Create [Entity1] model in src/models/[entity1].py
- [ ] T021 [P] [US1] Create [Entity2] model in src/models/[entity2].py
- [ ] T022 [US1] Implement [Service] in src/services/[service].py (depends on T020, T021)
- [ ] T023 [US1] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T024 [US1] Add validation and error handling with structured logging
- [ ] T025 [US1] Add metrics collection and monitoring for user story operations
- [ ] T026 [US1] Implement accessibility features per design system requirements

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (MANDATORY per Constitution) ⚠️

- [ ] T030 [P] [US2] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T031 [P] [US2] Integration test for [user journey] in tests/integration/test_[name].py
- [ ] T032 [P] [US2] Unit tests for business logic with >80% coverage
- [ ] T033 [P] [US2] Performance tests to verify constitutional benchmarks

### Implementation for User Story 2

- [ ] T035 [P] [US2] Create [Entity] model in src/models/[entity].py
- [ ] T036 [US2] Implement [Service] in src/services/[service].py
- [ ] T037 [US2] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T038 [US2] Integrate with User Story 1 components (if needed)
- [ ] T039 [US2] Add structured logging and metrics collection

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (MANDATORY per Constitution) ⚠️

- [ ] T045 [P] [US3] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T046 [P] [US3] Integration test for [user journey] in tests/integration/test_[name].py
- [ ] T047 [P] [US3] Unit tests for business logic with >80% coverage

### Implementation for User Story 3

- [ ] T050 [P] [US3] Create [Entity] model in src/models/[entity].py
- [ ] T051 [US3] Implement [Service] in src/services/[service].py
- [ ] T052 [US3] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T053 [US3] Add constitutional compliance (logging, metrics, performance)

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final constitutional compliance validation and system-wide improvements

- [ ] T060 [P] Documentation updates in docs/
- [ ] T061 Code cleanup and refactoring to meet quality standards
- [ ] T062 Performance optimization to meet constitutional benchmarks
- [ ] T063 [P] Constitutional compliance audit (all quality gates, performance, accessibility)
- [ ] T064 Security hardening and vulnerability assessment
- [ ] T065 Final test coverage validation (>80% requirement)
- [ ] T066 Observability dashboard and alerting verification
- [ ] T067 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
