import * as th from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const cw = 600;
const ch = 600;
const canvasContainer = document.querySelector("header#top .right");

const sc = new th.Scene();
const cam = new th.PerspectiveCamera(
    75, // fov
    cw / ch, // aspect ratio (decrease for perf.)
    0.1, // near plane
    1000 // far plane (TODO: decrese this later)
);

const penis = new th.WebGLRenderer({antialias: true, alpha: true});
penis.setSize(cw, ch);
canvasContainer.appendChild(penis.domElement);

// const geo = new th.BoxGeometry(1,1,1);
// const material = new th.MeshBasicMaterial({color : "#888888"});
// const cube = new th.Mesh(geo, material);
// sc.add(cube);


const loader = new GLTFLoader();
loader.load("assets/scene.gltf", (gltf) => {
    sc.add(gltf.scene);
}, undefined, (e) => {
    console.error(e);
});

cam.position.z = 6;
cam.position.y = 3;
cam.position.x = 3;

cam.lookAt(0, 0, 0);

const light = new th.DirectionalLight(0xffffff, 3);
light.position.set(-1, 2, 4);
sc.add(light);

// mouse coords

function cum(time) {
    time *= 0.001;

    // sc.rotation.y += (mx);

    sc.rotateY(Math.sin(time) * 0.002);

    penis.render(sc, cam);
}
penis.setAnimationLoop(cum);

function cap(val, cap) {
    return val > cap ? cap : val;
}

window.addEventListener("mousemove", e => {
    const mx = (e.movementX) / window.innerWidth;
    const my = (-e.movementY) / window.innerHeight;

    sc.rotateY(mx * 0.5);
    sc.rotateX(-my * 0.5);
});