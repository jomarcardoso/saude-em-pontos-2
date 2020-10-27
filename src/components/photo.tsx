import Webcam from 'webcam-easy';
import React, { useEffect, useRef, useState } from 'react';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import LoopIcon from '@material-ui/icons/Loop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  camera: {
    backgroundColor: '#000',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1101,
    display: 'flex',
    color: '#fff',
  },
  cameraButtonShot: {
    borderRadius: '50%',
    border: '1px solid #fff',
    width: '54px',
    height: '54px',
    fontSize: 0,
    display: 'inline-flex',
    padding: '3px',
    '&::before': {
      content: '""',
      backgroundColor: '#fff',
      flex: 1,
      borderRadius: '50%',
    },
  },
  cameraButtonFlip: {
    borderRadius: '50%',
    border: '1px solid #ffffffdd',
    width: '40px',
    height: '40px',
    display: 'inline-flex',
    padding: '5px',
  },
  cameraButtonFlipIcon: {
    width: '100%',
    height: 'auto',
  },
  cameraHud: {
    flex: 1,
    display: 'flex',
    padding: '30px',
    position: 'relative',
  },
  cameraHudBottom: {
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
  cameraVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

let sizeDimension = { x: 320, y: 480 };

const Photo: React.FC = () => {
  const classes = useStyles();
  const webcamEl = useRef(null);
  const canvasEl = useRef(null);
  const snapSoundEl = useRef(null);
  let webcam = null;
  const [shooted, setShooted] = useState(false);
  const [openedCamera, setOpenedCamera] = useState(false);

  function handleShot(event: Event) {
    event.preventDefault();
    if (!webcam) return;

    let picture = webcam.snap();

    document.querySelector('#download-photo').href = picture;
    setShooted(true);
  }

  function handleOpenCamera(event: Event) {
    event.preventDefault();

    sizeDimension = {
      x: window.outerWidth,
      y: window.outerHeight,
    };

    setOpenedCamera(true);
  }

  function handleFlip(event: Event) {
    event.preventDefault();

    if (!webcam) return;

    webcam.flip();
    webcam.start();
  }

  useEffect(() => {
    if (!openedCamera) return;

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
  }, [openedCamera]);

  return (
    <div>
      {openedCamera && (
        <div className={classes.camera}>
          <video
            id="webcam"
            ref={webcamEl}
            autoPlay
            playsInline
            width={sizeDimension.x}
            height={sizeDimension.y}
            // className={shooted ? 'cameraVideo d-none' : 'cameraVideo'}
            className={classes.cameraVideo}
          />
          <canvas
            id="canvas"
            ref={canvasEl}
            className={!shooted ? 'd-none' : ''}
          />
          <a id="download-photo"></a>
          <div className={classes.cameraHud}>
            <div className={classes.cameraHudBottom}>
              <a href="#load-image" className={classes.cameraButtonFlip}></a>
              <a
                onClick={handleShot}
                href="#shot-a-picture"
                className={classes.cameraButtonShot}
              >
                <span className="d-none">tirar foto</span>
              </a>
              <a
                onClick={handleFlip}
                href="#flip-camera"
                className={classes.cameraButtonFlip}
              >
                <LoopIcon
                  className={classes.cameraButtonFlipIcon}
                  color="inherit"
                />
              </a>
            </div>
          </div>
        </div>
      )}
      <a href="#open-camera" onClick={handleOpenCamera}>
        <PhotoCameraIcon />
      </a>
    </div>
  );
};

export default Photo;
