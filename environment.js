import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
// ========== SETUP ==========
//Canvas Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//init Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,40);
camera.lookAt(0,0,0);
//control camera
const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0,0,0);
controls.update();

// ========== OBJECT ==========

// Plane Lantai
const lantaiGeo = new THREE.BoxGeometry(90, 90, 1);
const lantaiMat = new THREE.MeshPhongMaterial();
const lantai = new THREE.Mesh(lantaiGeo, lantaiMat);
lantai.receiveShadow = true;
lantai.position.set(0, -5, 0);
lantai.rotation.set(Math.PI / 2, 0, 0);
scene.add(lantai);

// Load texture for lantai
const textureLoader = new THREE.TextureLoader();
textureLoader.load('assets/floor/floorTexture.jpg', function(texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(30, 30);
    lantaiMat.map = texture;
    lantaiMat.needsUpdate = true;
});






// //Plane Lantai 
// // const lantaiGeo = new THREE.BoxGeometry(90,90,1, 5, 5); //w h d wS hS dS
// // const lantaiMat = new THREE.MeshPhongMaterial();
// // const lantai = new THREE.Mesh(lantaiGeo,lantaiMat);
// // // lantai.receiveShadow = true;
// // // lantai.castShadow = true;
// const lantaiPos = {x:0, y:-5, z:0};
// const lantaiRot = {x:1.6, y:0, z:0};
// const lantaiImg = 'assets/floor/floorTexture.jpg'
// // // lantai.position.set(lantaiPos);
// // // lantai.rotation.set(lantaiRot);


// // lantai.position.set(0, -5, 0);
// // lantai.rotation.set(1.6, 0, 0);
// // scene.add(lantai);
// loadTexture(lantaiImg ,30, 30, lantaiGeo, lantaiMat, lantaiPos, lantaiRot, scene);

var geometry = new THREE.BoxGeometry(3,3,3);
// var material = new THREE.MeshBasicMaterial({color: 0xffff33});
var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.3});
var glass = new THREE.Mesh(geometry, material);
glass.castShadow = true; 
glass.position.set(-35,0.97,0);
scene.add(glass);
// Add collision helper for the glass
var glassHelper = new THREE.BoxHelper(glass, 0xff0000);
scene.add(glassHelper);

//Pillar - pedestal
new MTLLoader()
  .setPath('assets/pedestal/')
  .load('pedestal.mtl', function (materials) {
    materials.preload();
    new OBJLoader()
      .setMaterials(materials)
      .setPath('assets/pedestal/')
      .load('pedestal.obj', function (object) {
        object.scale.set(0.05,0.05,0.05);
        // object.position.set(-35, -0.5, 0);
        object.position.set(-35, -0.5, 0);
        object.rotation.x += 1.57;
        object.receiveShadow = true;
        object.castShadow = true;
        object.traverse( function ( child ) {
          if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        })
        // let collision_helper = new THREE.BoxHelper(obj,0x111ff);
        // scene.add(collision_helper)
        scene.add(object);
        // Add collision helper for the pedestal
        var pedestalHelper = new THREE.BoxHelper(object, 0x00ff00);
        scene.add(pedestalHelper);
      });
  });
camera.lookAt(glass.position.x, glass.position.y, glass.position.z);
controls.target.set(glass.position.x, glass.position.y, glass.position.z);

// ========== LIGHT ==========
var hemisphereLight = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 10); // color dari langit, color dari tanah, intensitas
// hemisphereLight.position.set(0,0,0);
// hemisphereLight.castShadow = true;
// hemisphereLight.recieveShadow = true;
// scene.add(hemisphereLight);

//Directional light
var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
directionalLight.position.set(0,20,0);//posisi e dimana
directionalLight.target.position.set(-20, 0, 0);//arah e kemana
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024; // Shadow map resolution
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5; // Near plane
directionalLight.shadow.camera.far = 50; // Far plane
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -50; // Far plane
scene.add(directionalLight);
scene.add(directionalLight.target);
var shadowDir = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(shadowDir)

var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

// ========== ANIMATE ==========
//loop Animate
function animate(){
  controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// ========== METHODS ==========
//Texture Loader
// function loadTexture(img, wrapHorizontal, wrapVertical, Geo, Mat, position, rotation, scene) {
//   const textureLoader = new THREE.TextureLoader();
//   textureLoader.load(img, function(texture) {
//       texture.wrapS = THREE.RepeatWrapping;
//       texture.wrapT = THREE.RepeatWrapping;
//       texture.repeat.set(wrapHorizontal, wrapVertical);
      
//       Mat.map = texture;  
//       Mat.needsUpdate = true;

//       const obj = new THREE.Mesh(Geo, Mat);
//       obj.position.set(position.x, position.y, position.z);
//       obj.rotation.set(rotation.x, rotation.y, rotation.z);
//       obj.receiveShadow = true;
    
//       scene.add(obj);
//   });
// }
//MTL Loader
// function loadMTL(path, mtl, targetObj, scale, position){
// new MTLLoader()
//     .setPath( path )
//         .load( mtl , function ( materials ) {

//                 materials.preload();

//                 new OBJLoader()
//                     .setMaterials( materials )
//                     .setPath( path )
//                     .load( mtl, function ( object ) {
//                         targetObj.add( object );
//                         object.scale.set(scale.x, scale.y, scale.z);
//                         object.position.set(position.x, position.y, position.z);

//                     }, );
//                 } );
// }