// DO NOT DELETE

import { Parse } from "@/index";

let css = `linear-gradient(45deg, rgba(255, 0, 0, 0.5), transparent 70%)`;
console.log(JSON.stringify(Parse.Gradient.Linear.parse(css), null, 2));

css = `radial-gradient(circle at top left, #00ff00, #0000ff 50%, rgba(0, 0, 255, 0))`;
console.log(JSON.stringify(Parse.Gradient.Radial.parse(css), null, 2));

css = `repeating-linear-gradient(-45deg, black, black 5px, white 5px, white 10px)`;
console.log(JSON.stringify(Parse.Gradient.Linear.parse(css), null, 2));

// css = `url("example.jpg") no-repeat center / cover`;
// console.log(JSON.stringify(Parse.Background.Image.parse(css), null, 2));
