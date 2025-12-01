// Face Mask with ML5 FaceMesh
// Based on: https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/facemesh

let video;
let faceMesh;
let faces = [];
let triangles;

let capturedImage = null; // Stores the captured photo
let capturedFace = null; // Stores the face keypoints at capture time
let useMask = false; // Toggle between live video and mask

function preload() {
  // Initialize FaceMesh model with a maximum of one face
  faceMesh = ml5.faceMesh({ maxFaces: 1 });
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(640, 480, WEBGL);
  video = createCapture(VIDEO);
  video.hide();

  // Start detecting faces
  faceMesh.detectStart(video, gotFaces);

  // Retrieve face mesh triangles for texture mapping
  triangles = faceMesh.getTriangles();
  textureMode(NORMAL);

  // Create UI buttons
  createButton('Capture Photo').mousePressed(capturePhoto);
  createButton('Toggle Mask').mousePressed(toggleMask);
  createButton('Clear Mask').mousePressed(clearMask);
}

// Capture current video frame as mask
function capturePhoto() {
  if (faces.length > 0) {
    // Create a graphics buffer to capture the current video frame
    let img = createGraphics(video.width, video.height);
    img.image(video, 0, 0);
    capturedImage = img;

    // Store the face data at capture time (deep copy)
    capturedFace = JSON.parse(JSON.stringify(faces[0]));

    useMask = true; // Automatically enable mask when captured
    console.log('Photo captured!');
  } else {
    console.log('No face detected! Try again.');
  }
}

// Toggle between live video and captured mask
function toggleMask() {
  if (capturedImage) {
    useMask = !useMask;
    console.log('Mask mode:', useMask ? 'ON' : 'OFF');
  } else {
    console.log('No mask captured yet! Click "Capture Photo" first.');
  }
}

// Clear the captured mask
function clearMask() {
  capturedImage = null;
  capturedFace = null;
  useMask = false;
  console.log('Mask cleared');
}

function draw() {
  translate(-width / 2, -height / 2);

  // Draw background based on mask mode
  if (useMask && capturedImage) {
    background(0); // Black background when using mask
  } else {
    image(video, 0, 0, width, height); // Live video background
  }

  // Only render mesh if face is detected
  if (faces.length === 0) return;

  let face = faces[0];

  // Choose texture and UV source based on mask mode
  let textureSource, uvSource;
  if (useMask && capturedImage && capturedFace) {
    textureSource = capturedImage;
    uvSource = capturedFace; // Use captured face keypoints for UV mapping
  } else {
    textureSource = video;
    uvSource = face; // Use live face keypoints for UV mapping
  }

  // Render face mesh with texture
  texture(textureSource);
  noStroke();
  beginShape(TRIANGLES);

  // Draw each triangle of the face mesh
  for (let i = 0; i < triangles.length; i++) {
    let [a, b, c] = triangles[i];

    // Current face position (for mesh geometry)
    let posA = face.keypoints[a];
    let posB = face.keypoints[b];
    let posC = face.keypoints[c];

    // UV coordinates (from captured or live face)
    let uvA = uvSource.keypoints[a];
    let uvB = uvSource.keypoints[b];
    let uvC = uvSource.keypoints[c];

    vertex(posA.x, posA.y, uvA.x / width, uvA.y / height);
    vertex(posB.x, posB.y, uvB.x / width, uvB.y / height);
    vertex(posC.x, posC.y, uvC.x / width, uvC.y / height);
  }

  endShape();
}
