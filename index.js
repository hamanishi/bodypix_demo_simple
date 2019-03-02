//
function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isMobile() {
  return isAndroid() || isiOS();
}

const guiState = {
  estimate: 'segmentation',
  camera: null,
  flipHorizontal: true,
  input: {
    mobileNetArchitecture: isMobile() ? '0.50' : '0.75',
    outputStride: 16
  },
  segmentation: {
    segmentationThreshold: 0.5,
    effect: 'mask',
    maskBackground: true,
    opacity: 0.7,
    backgroundBlurAmount: 3,
    maskBlurAmount: 0,
    edgeBlurAmount: 3
  },
  partMap: {
    colorScale: 'rainbow',
    segmentationThreshold: 0.5,
    applyPixelation: false,
    opacity: 0.9
  },
  showFps: !isMobile()
};

import * as bodyPix from '@tensorflow-models/body-pix';

const start = async function () {
  const imageElement = document.getElementById('image');
  console.log(imageElement);
  const outputStride = 16;
  const segmentationThreshold = 0.5;
  console.log(+guiState.input.mobileNetArchitecture);
  //const net = await bodyPix.load(+guiState.input.mobileNetArchitecture);
  const net = await bodyPix.load();
  console.log("load");

  const ps = await net.estimatePersonSegmentation(imageElement, outputStride, segmentationThreshold);

  console.log(ps);

  const maskBackground = false;
  const maskImage = bodyPix.toMaskImageData(ps, maskBackground);

  const opacity = 0.7;
  const flipHorizontal = true;
  const maskBlurAmount = 0;
  const canvas = document.getElementById('output');

  bodyPix.drawMask(
    canvas, imageElement, maskImage, opacity, maskBlurAmount,
    flipHorizontal);
}

start();