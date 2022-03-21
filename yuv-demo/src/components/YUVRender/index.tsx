import './index.styl';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import YUVRender from '@alife/yuv-render';

function YuvRender(props: any, ref: React.Ref<any>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const yuvRef = useRef<YUVRender>(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const yuvRender = new YUVRender(canvas);
    yuvRender.setDimension(768, 320);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    yuvRef.current = yuvRender;
  }, []);

  useImperativeHandle(ref, () => {
    return {
      start() {
        setWaiting(true);
        fetch('/frame.json')
          .then((res: Response) => res.json())
          .then((frameArray: ArrayBuffer) => {
            setWaiting(false);
            yuvRef.current?.render(new Uint8Array(frameArray));
          });
      }
    };
  });

  return (
    <div className={`yuv-view${waiting ? ' v-waiting' : ''}`}>
      <canvas ref={canvasRef} />
      <div className="v-loading-spinner" />
    </div>
  );
}

export default forwardRef(YuvRender);
