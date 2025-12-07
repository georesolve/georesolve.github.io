# Contributing to GeoResolve Website & Dashboard

Thank you for your interest in contributing to GeoResolve Website & Dashboard! This document provides guidelines and standards for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Versioning](#versioning)

## Code of Conduct

Please be respectful and constructive in all interactions. We are committed to providing a welcoming and inclusive environment for everyone.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch following our [branch naming convention](#branch-naming-convention)
4. Make your changes
5. Commit your changes following our [commit message guidelines](#commit-message-guidelines)
6. Push to your fork
7. Open a Pull Request

## Branch Naming Convention

This project follows the [Conventional Branch](https://conventional-branch.github.io/) specification. Branch names should follow this pattern:

```text
<type>/<description>
```

### Branch Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Changes that do not affect the meaning of the code (formatting, etc.) |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `perf` | A code change that improves performance |
| `test` | Adding missing tests or correcting existing tests |
| `build` | Changes that affect the build system or external dependencies |
| `ci` | Changes to CI configuration files and scripts |
| `chore` | Other changes that don't modify src or test files |
| `revert` | Reverts a previous commit |

### Branch Examples

```text
feat/user-authentication
fix/geocoding-timeout
docs/api-endpoints
refactor/database-queries
```

## Commit Message Guidelines

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. This leads to more readable messages that are easy to follow when looking through the project history and enables automatic changelog generation.

### Commit Message Format

Each commit message consists of a **header**, an optional **body**, and an optional **footer**:

```text
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Header

The header is mandatory and must conform to the following format:

- **type**: Describes the kind of change (see types below)
- **scope**: Optional, describes what is affected (e.g., `api`, `auth`, `geocode`)
- **subject**: A short description of the change
  - Use the imperative, present tense: "add" not "added" nor "adds"
  - Don't capitalize the first letter
  - No period (.) at the end

### Commit Types

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | A new feature | Minor |
| `fix` | A bug fix | Patch |
| `docs` | Documentation only changes | - |
| `style` | Code style changes (formatting, semicolons, etc.) | - |
| `refactor` | Code change that neither fixes a bug nor adds a feature | - |
| `perf` | A code change that improves performance | Patch |
| `test` | Adding or updating tests | - |
| `build` | Changes to build system or dependencies | - |
| `ci` | Changes to CI configuration | - |
| `chore` | Other changes that don't modify src or test files | - |
| `revert` | Reverts a previous commit | - |

### Breaking Changes

Breaking changes must be indicated by:

1. Adding `!` after the type/scope: `feat(api)!: remove deprecated endpoints`
2. Adding `BREAKING CHANGE:` in the footer

Breaking changes trigger a **major** version bump.

### Commit Examples

```text
feat(geocode): add reverse geocoding endpoint

fix(auth): resolve token expiration issue

docs: update API documentation

feat(api)!: change response format for location endpoint

BREAKING CHANGE: The location endpoint now returns coordinates as an object instead of an array.

refactor(database): optimize query performance

chore: update dependencies
```

## Pull Request Process

1. Ensure your code follows the project's coding standards
2. Update documentation if needed
3. Add or update tests as appropriate
4. Ensure all tests pass
5. Update the CHANGELOG.md if applicable
6. Request review from maintainers
7. Address any feedback from code review

### PR Title

Pull request titles should follow the same format as commit messages:

```text
<type>(<scope>): <description>
```

## Versioning

This project follows [Semantic Versioning](https://semver.org/) (SemVer). Version numbers are formatted as:

```text
MAJOR.MINOR.PATCH
```

### Version Increment Rules

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Breaking changes | MAJOR | 1.0.0 → 2.0.0 |
| New features (backward compatible) | MINOR | 1.0.0 → 1.1.0 |
| Bug fixes (backward compatible) | PATCH | 1.0.0 → 1.0.1 |

### Pre-release Versions

Pre-release versions may be denoted by appending a hyphen and identifiers:

```text
1.0.0-alpha.1
1.0.0-beta.2
1.0.0-rc.1
```

---

Thank you for contributing to GeoResolve Website & Dashboard! 🌍
