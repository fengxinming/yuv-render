# yuv-render

[![npm package](https://nodei.co/npm/yuv-render.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/yuv-render)

> Render YUV image data to HTML5 canvas.

[![NPM version](https://img.shields.io/npm/v/yuv-render.svg?style=flat)](https://npmjs.org/package/yuv-render)
[![NPM Downloads](https://img.shields.io/npm/dm/yuv-render.svg?style=flat)](https://npmjs.org/package/yuv-render)

## [Live Demo](https://fengxinming.github.io/yuv-render/)

## [Example](examples/yuv-demo)

## Installation

```bash
npm install yuv-render --save
```

## Usage

```js
import YUVRender from 'yuv-render';

const yuv = new YUVRender(document.getElementById('canvas'));
yuv.setDimension(width, height);
// Uint8Array data
yuv.render(data);
```

## API

* setDimension(width: number, height: number): void
* render(data: Uint8Array): void
* clear(): void
* dispose(): void