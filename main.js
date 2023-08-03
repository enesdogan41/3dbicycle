import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

// Create a scene
const scene = new THREE.Scene();
//const gridHelper = new THREE.GridHelper(10, 10);
//scene.add(gridHelper);
scene.background = new THREE.Color(0x7a7a7a);
//const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);


// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.x = 4;
camera.position.y = 1;
camera.lookAt(scene.position);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a light
const ambientLight = new THREE.AmbientLight(0xffffff, 5); // White light, 50% intensity
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 7); // White light, full intensity
directionalLight.position.set(5, 5, 5); // Position the light
scene.add(directionalLight);

// Create controls
const controls = new OrbitControls(camera, renderer.domElement);

// Load the 3D model
const loader = new GLTFLoader();
loader.load('./assets/bmx/scene.gltf', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.scale.set(0.01, 0.01, 0.01); // Adjust the scale as needed
    model.position.set(0, 0, 0);
    // Adjust the position as needed
    console.log("Model loaded");
}, undefined, (error) => {
    console.error(error);
});

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
};
animate();
