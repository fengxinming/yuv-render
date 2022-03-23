import './index.styl';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import YUV from 'yuv-view';

function YuvRender(props: any, ref: React.Ref<any>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const yuvRef = useRef<YUV>(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const yuv = new YUV(canvas);
    yuv.setDimension(768, 320);
    yuvRef.current = yuv;
  }, []);

  useImperativeHandle(ref, () => {
    return {
      start() {
        setWaiting(true);
        fetch(`${import.meta.env.BASE_URL}frame.json`)
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
