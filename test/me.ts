// b_path:: test/me.ts
// DO NOT DELETE

// import { expand } from "b_short";
// import { parse } from "@/index"; // TODO: Universal API not implemented yet

import { z } from "zod";
import * as Type from "@/core/types";
import { Parse } from "@/index";

// import * as Generator from "@/generate/animation/duration";
// ---
// Example usages:
// const input = "color(xyz 0.472 0.372 0.131)";
// const parsed = Parse.Color.ColorFunction.parse(input);

// const parsed = Parse.Color.Oklch.parse("oklch(65% 0.2 250 / 0.5)");
// console.log(Parse.Color.Oklch.parse("oklch(65% 0.2 250 / 0.5)").value);

// console.log(Parse.Animation.TimingFunction.parse("cubic-bezier(0, 0, 1.1, 1)"));

console.log(Parse.Animation.TimingFunction.parse("cubic-bezier(0.1,, 0.2, 0.3, 0.4)").value);

const input = {
	kind: "animation-duration",
	durations: [
		{
			type: "___time___",
			value: "___",
			unit: "___sss___",
		},
	],
};

console.log(z.safeParse(Type.animationDurationSchema, input));

// const result = Generate.Animation.Duration.generate(input);
// console.log(JSON.stringify(result));

// cubic-bezier(0.1,, 0.2, 0.3, 0.4)
// const expanded = expand('font: italic small-caps bold 1.2em/1.6 "Helvetica Neue", Arial, sans-serif;');
// console.log(expanded.result);

// console.log(parsed);
// console.log(Parse.Color.Oklch.parse("oklch(65% 0.2 250 / 0.5)"));

// let css = `
// animation:
//   slide-in 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0) 200ms backwards,
//   pulse 2s 1s ease-in-out infinite alternate,
//   fade-out 3s steps(5, end) forwards running;
// `;

// console.log("shorthand", css);

// const longhand = expand(css);

// console.log("longhand", longhand);

// const v = parseAll(longhand.result as string);
// console.log("values", JSON.stringify(v, null, 2));

// css = `linear-gradient(45deg, rgba(255, 0, 0, 0.5), transparent 70%)`;
// console.log(JSON.stringify(Parse.Gradient.Linear.parse(css), null, 2));

// css = `radial-gradient(circle at top left, #00ff00, #0000ff 50%, rgba(0, 0, 255, 0))`;
// console.log(JSON.stringify(Parse.Gradient.Radial.parse(css), null, 2));

// css = `repeating-linear-gradient(-45deg, black, black 5px, white 5px, white 10px)`;
// console.log(JSON.stringify(Parse.Gradient.Linear.parse(css), null, 2));

// css = `color: color(display-p3 0.928 0.322 0.203 / 0.8);`;
// console.log(JSON.stringify(Parse.Color.ColorFunction.parse(css), null, 2));

// css = `url("example.jpg") no-repeat center / cover`;
// console.log(JSON.stringify(Parse.Background.Image.parse(css), null, 2));

// ---

// const css = `
//   background:
//     radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.15) 30%, rgba(255,255,255,.3) 32%, rgba(255,255,255,0) 33%) 0 0,
//     radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%, rgba(255,255,255,.3) 13%, rgba(255,255,255,0) 14%) 0 0,
//     radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 17%, rgba(255,255,255,.43) 19%, rgba(255,255,255,0) 20%) 0 110px,
//     radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%, rgba(255,255,255,.4) 13%, rgba(255,255,255,0) 14%) -130px -170px,
//     radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%, rgba(255,255,255,.4) 13%, rgba(255,255,255,0) 14%) 130px 370px,
//     radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%, rgba(255,255,255,.2) 13%, rgba(255,255,255,0) 14%) 0 0,
//     linear-gradient(45deg, #343702 0%, #184500 20%, #187546 30%, #006782 40%, #0b1284 50%, #760ea1 60%, #83096e 70%, #840b2a 80%, #b13e12 90%, #e27412 100%);
//   background-size:
//     470px 470px,
//     970px 970px,
//     410px 410px,
//     610px 610px,
//     530px 530px,
//     730px 730px,
//     100% 100%;
//   background-color: #840b2a;
// `;

// const expanded = expand(css).result as string;

// console.log(expanded);

// TODO: Universal API not implemented yet
// console.log(JSON.stringify(parse(expanded), null, 2));
