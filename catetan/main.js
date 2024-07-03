import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

//setup Canvas Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
//Setup Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 5);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 10, 0);
controls.update();

// ========== OBJECT ==========
//Plane
// var planeGeo = new THREE.PlaneGeometry(40, 40);
// var planeMat = new THREE.MeshPhongMaterial({
//   color: 0x555555,
//   side: THREE.DoubleSide,
// });
// var plane = new THREE.Mesh(planeGeo, planeMat);
// scene.add(plane);
// plane.rotation.x += 20;

//Ambil objek dari asset
new MTLLoader()
  .setPath("assets/")
  .load("InteriorTest.mtl", function (materials) {
    materials.preload();

    new OBJLoader()
      .setMaterials(materials)
      .setPath("assets/")
      .load("InteriorTest.obj", function (object) {
        scene.add(object);
        object.scale.set(10, 10, 10);
        object.position.set(-3, 0, 0);
        // object.rotation.x += -1;
      });
  });

// ========== LIGHTING ==========
//Hemisphere Light
var hemisphereLight = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 0.5); // color dari langit, color dari tanah, intensitas
scene.add(hemisphereLight);

//Directional light
// var directionalLight = new THREE.DirectionalLight(0xffffff, 10);
// directionalLight.position.set(3, 15, 3); //posisi e dimana
// directionalLight.target.position.set(0, 0, 0); //arah e kemana
// scene.add(directionalLight);
// scene.add(directionalLight.target);

//loop Animate
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
