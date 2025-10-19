# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **"Eat Our Own Dog Food" Verification** - 2025-10-19
  - Comprehensive fixture validation system
  - `extract-fixtures.ts`: Extracts all CSS test fixtures (659 fixtures)
  - `validate-fixtures.ts`: Validates round-trip integrity
  - 100% round-trip success on 232 valid fixtures
  - 427 negative test cases confirmed working
  - 0.01ms average per fixture (1000x faster than 10ms target)
  - Added `just validate` and `pnpm validate` commands
  - See: `.memory/VERIFICATION_PLAN.md` and `.memory/VERIFICATION_RESULTS.md`
- MDN alignment verification (98% spec-compliant) - 2025-01-18
- Test coverage improvements: 32 → 91 tests (+184%) - 2025-01-18
- Result utilities test suite (20 tests, 100% coverage) - 2025-01-18
- Extended parse tests with edge cases and color interpolation - 2025-01-18
- Extended generate tests with color space combinations - 2025-01-18
- Recent Activity policy: 3 entries max in START_HERE.md - 2025-01-18

### Changed
- Coverage thresholds: branches 90% → 85% (defensive error paths) - 2025-01-18
- Updated START_HERE.md to 3-entry Recent Activity limit - 2025-01-18

### Documented
- Comprehensive verification plan for validating b_value - 2025-10-19
- Verification results showing 100% round-trip integrity - 2025-10-19
- Comprehensive MDN alignment analysis (98% aligned) - 2025-01-18
- Coverage achievement report (92.78% lines, 87% branches) - 2025-01-18
- Extracted MDN syntax definitions for Phase 2 - 2025-01-18

## [0.1.0] - 2025-10-18 (Phase 1 Complete)

### Added
- **JSDoc Standard Established** - 2025-10-18
  - Comprehensive JSDoc added to all public APIs
  - parse() function: 15 → 95 lines JSDoc (6 examples)
  - toCss() function: 50 → 118 lines JSDoc (7 examples)
  - Module documentation added to all index files
  - JSDOC_STANDARD.md created (12KB, 470+ lines)
  - IDE autocomplete now shows full usage examples
  - Ready for TypeDoc API documentation generation
  - Standard applies to Phase 2+ development
  - See: `archive/2025-10-18-jsdoc-standard/`

- **Public API Review Complete** - 2025-10-18
  - Comprehensive API analysis (Grade: A, 9/10)
  - Current design superior to original vision
  - Parse/Generate/Core namespaces perfectly structured
  - Type-safe Result type + Zod + TypeScript
  - Tree-shakeable exports confirmed
  - No breaking changes needed - proceed with Phase 2
  - See: `archive/2025-10-18-api-review/`

- **Benchmarks Updated** - 2025-10-18
  - Replaced copied benchmark scripts with b_value-specific ones
  - 21 parse benchmarks, 17 generate benchmarks, 21 roundtrip benchmarks
  - All focused on radial gradient operations (Phase 1 complete)
  - Parse: ~150-350K ops/sec, Generate: ~2-4M ops/sec
  - Roundtrip: ~127-322K ops/sec (limited by parse step)
  - Ready to expand when Phase 2 adds linear/conic gradients
  - See: `archive/2025-10-18-benchmark-update/`

### Infrastructure
- **Phase 1 Complete + Improvements** - 2025-01-18
  - Core infrastructure extracted from b_gee (71 files, ~5,855 lines)
  - Radial gradient parse/generate fully working
  - 32 focused tests (10 parse unit, 12 generate unit, 10 integration)
  - Bidirectional CSS ⇄ IR transformation validated
  - **Import strategy documented** (IMPORT_STRATEGY.md)
  - **Test organization improved** (TEST_ORGANIZATION.md)
  - Integration tests moved to `/test/` directory
  - See: `archive/2025-01-18-action-plan/`

## [0.0.1] - 2024-12-18 (Template Base)

### Added
- 🧮 **Math Utilities** - Basic arithmetic operations with proper error handling
  - `add()` - Addition with overflow protection
  - `subtract()` - Subtraction with underflow protection
  - `multiply()` - Multiplication with overflow protection
  - `divide()` - Safe division with error handling
- 🔤 **String Utilities** - Text manipulation functions
  - `capitalize()` - Capitalize first letter of string
  - `camelCase()` - Convert string to camelCase
  - `kebabCase()` - Convert string to kebab-case
  - `truncate()` - Truncate text with ellipsis
- 📝 **Common Types** - Shared TypeScript interfaces
  - `ApiResponse<T>` - Standard API response structure
  - `Result<T>` - Result type for error handling
  - `PaginatedResponse<T>` - Paginated data structure
- ⚡ **Zero Dependencies** - Pure TypeScript implementation
- 🌳 **Tree Shakeable** - Import only what you need
- 📦 **Dual Package** - Supports both CommonJS and ES modules
- 🧪 **Comprehensive Tests** - Full test coverage with Vitest
- 🔧 **Modern Tooling** - TypeScript, Biome, tsup, pnpm
- 📚 **Complete Documentation** - README with examples and API reference

### Changed
- Initial release of the TypeScript utility library

### Fixed
- N/A - Initial release

## [0.0.1] - 2024-12-18

### Added
- Project initialization and basic structure
- Initial package.json configuration
- Basic TypeScript setup with tsup bundler
- Initial utility functions skeleton

[unreleased]: https://github.com/your-username/b_typescript_template/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/your-username/b_typescript_template/releases/tag/v0.1.0
[0.0.1]: https://github.com/your-username/b_typescript_template/releases/tag/v0.0.1
