# CSS Shorthand Expand - Build Commands
set shell := ["bash", "-cu"]

# Default task
default: check test

# ------------- Build & Test -------------
build:
    pnpm run build

test:
    pnpm test

coverage:
    pnpm run test:coverage

watch:
    pnpm run test:watch

# ------------- Quality Gates -------------
typecheck:
    pnpm run typecheck

lint:
    biome check .

format:
    biome format --write .

fix:
    biome check --write .

check: format fix typecheck

# ------------- Benchmark -------------

bench:
    pnpm run bench

bench_parse:
    pnpm run bench:parse

bench_generate:
    pnpm run bench:generate

bench_roundtrip:
    pnpm run bench:roundtrip

# ------------- Validation -------------

# Extract all CSS fixtures from test files
validate_extract:
    pnpm tsx scripts/extract-fixtures.ts

# Validate round-trip integrity on all fixtures
validate_fixtures:
    pnpm tsx scripts/validate-fixtures.ts

# Run full validation suite (extract + validate)
validate: validate_extract validate_fixtures
    @echo "✅ All fixtures validated successfully!"

# Complete quality gate with validation
validate_all: check test validate
    @echo "✅ All quality checks and validation passed!"

# ------------- Development -------------
dev: build test

clean:
    rm -rf lib node_modules pnpm-lock.yaml

# ------------- Setup -------------
bootstrap:
    pnpm install

install:
    pnpm install

# ------------- llm -------------

llm_map:
    git ls-files --full-name src > docs.llm/llm_map.txt

# Generate text from LLM
llm_txt:
    b_llm_txt src --recursive > docs.llm/llm_src.txt

llm_hello:
    b_llm_hello

# Add path comment header to files
path_helper:
    b_path_helper --execute --relative

llm: path_helper llm_map llm_txt llm_hello
