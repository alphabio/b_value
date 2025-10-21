// b_path:: test/me.ts
// DO NOT DELETE

import { expand } from "b_short";
import { Parse } from "@/index";

const css = `
animation:
  slide-in 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0) 200ms backwards,
  pulse 2s 1s ease-in-out infinite alternate,
  fade-out 3s steps(5, end) forwards running;
`;

const longhand = expand(css);

console.log(longhand);

console.log(Parse.Animation.Name.parse("animation-name: slide-in, pulse, fade-out;"));

// let css = `linear-gradient(45deg, rgba(255, 0, 0, 0.5), transparent 70%)`;
// console.log(JSON.stringify(Parse.Gradient.Linear.parse(css), null, 2));

// css = `radial-gradient(circle at top left, #00ff00, #0000ff 50%, rgba(0, 0, 255, 0))`;
// console.log(JSON.stringify(Parse.Gradient.Radial.parse(css), null, 2));

// css = `repeating-linear-gradient(-45deg, black, black 5px, white 5px, white 10px)`;
// console.log(JSON.stringify(Parse.Gradient.Linear.parse(css), null, 2));

// css = `color: color(display-p3 0.928 0.322 0.203 / 0.8);`;
// console.log(JSON.stringify(Parse.Color.ColorFunction.parse(css), null, 2));

// css = `url("example.jpg") no-repeat center / cover`;
// console.log(JSON.stringify(Parse.Background.Image.parse(css), null, 2));
