import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
//import { OrbitControls } from "../three.js-master/examples/jsm/controls/OrbitControls.js"
let crossOrigin = "Anonymous";

import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);

const scene = new THREE.Scene();
let Mesh = new THREE.Mesh;
let light;


function init() {
    scene.background = new THREE.Color("rgba(223, 223, 223, 0.915)");
    camera.position.set(-30, -10, 30);

    renderer.setSize(1200, 700);
    document.querySelector('.view').appendChild(renderer.domElement);
    let control = new OrbitControls(camera, renderer.domElement)
        //control.minDistance = 3;
        //control.maxDistance = 5;
        //control.enableZoom = false;
        //control.enableDamping = true;
        //control.dampingFactor = 0.5;
    control.enablePan = true;
    control.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN
    }
    control.update();


}

function setLight() {
    light = new THREE.AmbientLight(0xffffff, 0.8); // soft white light

    scene.add(light);
}

function loadGLTF() {
    console.log("prueba")
    var modelLoader = new GLTFLoader();
    modelLoader.crossOrigin = "";
    modelLoader.load('../3dmodels/electric_generator/gen.gltf', function(gltf) {
        var model = gltf.scene;
        model.scale.set(.25, .25, .25);
        scene.add(model);

        Mesh.position.x = 0;
        Mesh.position.y = 10;
        Mesh.position.z = 15;

    });
}

function animate() {
    requestAnimationFrame(animate);

    if (Mesh && Mesh.rotation) {
        Mesh.rotation.y -= 0.005;
    }
    renderer.render(scene, camera);
}

init();
setLight();
loadGLTF();
animate();