import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

//Canvas Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//init Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,40);
camera.lookAt(0,0,0);

//Texture Loader
const textureLoader = new THREE.TextureLoader();
textureLoader.load('floorTexture.jpg', function (texture){
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10,10);
    //Plane Lantai 
    var planeGeo = new THREE.BoxGeometry(30,30,1, 5, 5); //w h d wS hS dS
    var planeMat = new THREE.MeshBasicMaterial({map : texture});
    var lantai = new THREE.Mesh(planeGeo, planeMat);
    lantai.rotation.x += 1.6;
    lantai.position.set(0,-5,0);
    scene.add(lantai);
});


//control camera
const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0,0,0);
controls.update();

//loop Animate
function animate(){
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);