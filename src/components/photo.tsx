import React, { useState } from 'react';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import LoopIcon from '@material-ui/icons/Loop';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import Webcam from 'react-webcam';
import CloseIcon from '@material-ui/icons/Close';

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
    minHeight: '54px',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
  cameraHudTop: {
    alignSelf: 'flex-start',
  },
  cameraCloseButton: {
    width: '44px',
    height: 'auto',
  },
  cameraVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  cameraPicture: {
    flex: 1,
    alignSelf: 'center',
  },
});

const Photo: React.FC = ({ setPicture }) => {
  const classes = useStyles();
  const [openedCamera, setOpenedCamera] = useState(false);
  const [dataUri, setDataUri] = useState('');
  const [videoConstraints, setVideoConstraints] = useState({
    width: 320,
    height: 320,
    facingMode: 'environment',
  });

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    (event: Event) => {
      event.preventDefault();

      const dataUri = webcamRef.current.getScreenshot({
        width: 320,
        height: 320,
      });

      console.log(dataUri);

      setDataUri(dataUri);
    },
    [webcamRef],
  );

  function handleOpenCamera(event: Event) {
    event.preventDefault();

    setVideoConstraints({
      ...videoConstraints,
      height: window.innerHeight,
      width: window.innerWidth,
    });

    setOpenedCamera(true);
  }

  function handleFlip(event: Event) {
    event.preventDefault();

    let facingMode = 'environment';

    if (videoConstraints.facingMode === 'environment') {
      facingMode = 'user';
    }

    setVideoConstraints({
      ...videoConstraints,
      facingMode,
    });
  }

  function handleReject(event: Event) {
    event.preventDefault();

    setDataUri('');
  }

  function handleClose(event: Event) {
    event.preventDefault();

    setOpenedCamera(false);
  }

  function handleConfirm(event: Event) {
    event.preventDefault();

    setPicture(dataUri);
    setOpenedCamera(false);
  }

  return (
    <div>
      {openedCamera && (
        <div className={classes.camera}>
          {dataUri ? (
            <>
              <div className={classes.cameraVideo}>
                <img src={dataUri} className={classes.cameraPicture} alt="" />
              </div>
              <div className={classes.cameraHud}>
                <div className={classes.cameraHudBottom}>
                  <a
                    href="#reject-picutre"
                    className={classes.cameraButtonFlip}
                    onClick={handleReject}
                  >
                    <CloseIcon
                      className={classes.cameraButtonFlipIcon}
                      color="inherit"
                    />
                  </a>
                  <a
                    onClick={handleConfirm}
                    href="#confirm-picture"
                    className={classes.cameraButtonFlip}
                  >
                    <CheckIcon
                      className={classes.cameraButtonFlipIcon}
                      color="inherit"
                    />
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <Webcam
                className={classes.cameraVideo}
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotQuality={0.7}
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
              />
              <div className={classes.cameraHud}>
                <div className={classes.cameraHudTop}>
                  <a onClick={handleClose} href="#close-camera">
                    <CloseIcon
                      className={classes.cameraCloseButton}
                      color="inherit"
                    />
                  </a>
                </div>
                <div className={classes.cameraHudBottom}>
                  <a href="#load-image" className={classes.cameraButtonFlip} />
                  <a
                    onClick={capture}
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
            </>
          )}
        </div>
      )}
      <a href="#open-camera" onClick={handleOpenCamera}>
        <PhotoCameraIcon />
      </a>
    </div>
  );
};

export default Photo;
