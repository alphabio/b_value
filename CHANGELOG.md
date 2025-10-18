# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2024-12-19

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
