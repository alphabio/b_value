// b_path:: src/generate/clip-path/clip-path.ts

import { type GenerateResult, generateErr } from "@/core/result";
import type * as Type from "@/core/types";
import * as Circle from "./circle";
import * as Ellipse from "./ellipse";
import * as GeometryBox from "./geometry-box";
import * as Inset from "./inset";
import * as None from "./none";
import * as Path from "./path";
import * as Polygon from "./polygon";
import * as Rect from "./rect";
import * as Url from "./url";
import * as Xywh from "./xywh";

/**
 * Generate CSS from clip-path IR with auto-detection.
 *
 * Automatically detects clip-path shape from IR.kind and generates appropriate CSS.
 * Supports all clip-path shapes and keywords.
 *
 * @param clipPath - ClipPath IR
 * @returns GenerateResult with CSS string or error
 *
 * @example
 * ```typescript
 * generate({ kind: "clip-path-circle", radius: { value: 50, unit: "%" } })
 * // → { ok: true, value: "circle(50%)", issues: [] }
 *
 * generate({ kind: "clip-path-none" })
 * // → { ok: true, value: "none", issues: [] }
 *
 * generate({ kind: "url", value: "#clip-shape" })
 * // → { ok: true, value: "url(#clip-shape)", issues: [] }
 * ```
 *
 * @public
 */
export function generate(clipPath: Type.ClipPathValue): GenerateResult {
	// Validate IR has 'kind' field
	if (!clipPath || typeof clipPath !== "object" || !("kind" in clipPath)) {
		return generateErr("missing-required-field", "Invalid clip-path IR: missing 'kind' field", {
			suggestion: "Ensure IR was parsed correctly",
		});
	}

	// Dispatch based on kind
	switch (clipPath.kind) {
		case "clip-path-none":
			return None.generate(clipPath);

		case "clip-path-geometry-box":
			return GeometryBox.generate(clipPath);

		case "clip-path-inset":
			return Inset.generate(clipPath);

		case "clip-path-circle":
			return Circle.generate(clipPath);

		case "clip-path-ellipse":
			return Ellipse.generate(clipPath);

		case "clip-path-polygon":
			return Polygon.generate(clipPath);

		case "clip-path-rect":
			return Rect.generate(clipPath);

		case "clip-path-xywh":
			return Xywh.generate(clipPath);

		case "clip-path-path":
			return Path.generate(clipPath);

		case "url":
			return Url.generate(clipPath);

		default:
			return generateErr("unsupported-kind", `Unknown clip-path kind: ${(clipPath as { kind?: string }).kind}`, {
				suggestion: "Check that clip-path IR is valid",
			});
	}
}
