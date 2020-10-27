import Webcam from 'webcam-easy';
import React, { useEffect, useRef, useState } from 'react';

const Photo: React.FC = () => {
  const webcamEl = useRef(null);
  const canvasEl = useRef(null);
  const snapSoundEl = useRef(null);
  let webcam = null;
  const [shooted, setShooted] = useState(false);

  function handleShot() {
    console.log('a');
    if (!webcam) return;

    let picture = webcam.snap();

    document.querySelector('#download-photo').href = picture;
    setShooted(true);
  }

  useEffect(() => {
    webcam = new Webcam(
      webcamEl.current,
      'user',
      canvasEl.current,
      snapSoundEl.current
    );

    webcam
      .start()
      .then((result) => {
        console.log('webcam started');
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      <div>
        <video
          id="webcam"
          ref={webcamEl}
          autoPlay
          playsInline
          width="640"
          height="480"
          className={shooted ? 'd-none' : ''}
        />
        <canvas
          id="canvas"
          ref={canvasEl}
          className={!shooted ? 'd-none' : ''}
        />
      </div>
      <a id="download-photo"></a>
      <button onClick={handleShot} type="button">
        tirar foto
      </button>
    </div>
  );
};

export default Photo;
