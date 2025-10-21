// b_path:: src/generate/clip-path/clip-path.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
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
		return generateErr("Invalid clip-path IR: missing 'kind' field", {
			suggestion: "Ensure IR was parsed correctly",
		});
	}

	// Dispatch based on kind
	switch (clipPath.kind) {
		case "clip-path-none":
			return generateOk(None.toCss(clipPath));

		case "clip-path-geometry-box":
			return generateOk(GeometryBox.toCss(clipPath));

		case "clip-path-inset":
			return generateOk(Inset.toCss(clipPath));

		case "clip-path-circle":
			return generateOk(Circle.toCss(clipPath));

		case "clip-path-ellipse":
			return generateOk(Ellipse.toCss(clipPath));

		case "clip-path-polygon":
			return generateOk(Polygon.toCss(clipPath));

		case "clip-path-rect":
			return generateOk(Rect.toCss(clipPath));

		case "clip-path-xywh":
			return generateOk(Xywh.toCss(clipPath));

		case "clip-path-path":
			return generateOk(Path.toCss(clipPath));

		case "url":
			return generateOk(Url.toCss(clipPath));

		default:
			return generateErr(`Unknown clip-path kind: ${(clipPath as { kind?: string }).kind}`, {
				suggestion: "Check that clip-path IR is valid",
			});
	}
}
