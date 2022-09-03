import { createCanvas, Image } from 'canvas';
import { JSDOM } from 'jsdom';
import fs from 'fs';

const demoHTMLString = `<html><body><svg><rect width=100 height=200 x=0 y=0 style='fill: red;'/><rect width=100 height=100 x=100 y=0 style='fill: black;'/></svg></body></html>`;
const dom = new JSDOM(demoHTMLString);

const svg = dom.window.document.querySelector('svg');
console.log('svg image: ' + svg.outerHTML);

const img = new Image();
const canvas = createCanvas(200,200);

// convert svg to base64
const svg64 = btoa(svg.outerHTML);
const base64Prefix = 'data:image/svg+xml;base64,';
const svgBase64 = base64Prefix + svg64;
console.log('svg base64: ' + svgBase64);

// draw svg base64 image on canvas (vector to raster)
const ctx = canvas.getContext('2d');
img.onload = () => ctx.drawImage(img, 0, 0);
img.src = svgBase64;

// save image to png file
const out = fs.createWriteStream('./test.png')
const stream = canvas.createPNGStream()
stream.pipe(out)

// save image to base64
console.log('png base64: ' + canvas.toDataURL());