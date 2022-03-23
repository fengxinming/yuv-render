# yuv-view

[![npm package](https://nodei.co/npm/yuv-view.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/yuv-view)

> Render YUV image data to HTML5 canvas.

[![NPM version](https://img.shields.io/npm/v/yuv-view.svg?style=flat)](https://npmjs.org/package/yuv-view)
[![NPM Downloads](https://img.shields.io/npm/dm/yuv-view.svg?style=flat)](https://npmjs.org/package/yuv-view)

## [Live Demo](https://fengxinming.github.io/yuv-view/)

## [Example](examples/yuv-demo)

## Installation

```bash
npm install yuv-view --save
```

## Usage

```js
import YUV from 'yuv-view';

const yuv = new YUV(document.getElementById('canvas'));
yuv.setDimension(width, height);
yuv.render(buf);
```

## API

* setDimension(width: number, height: number): void
* render(data: Uint8Array): void
* clear(): void
* dispose(): void