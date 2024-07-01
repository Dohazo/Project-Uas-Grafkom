import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
// ========== SETUP ==========
//Canvas Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//init Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,40);
camera.lookAt(0,0,0);
renderer.shadowMap.enabled = true;
//control camera
const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0,0,0);
controls.update();

// ========== OBJECT ==========
//Plane Lantai 
const lantaiGeo = new THREE.BoxGeometry(90,90,1, 5, 5); //w h d wS hS dS
const lantaiMat = new THREE.MeshBasicMaterial();
const lantaiPos = {x:0, y:-5, z:0};
const lantaiRot = {x:1.6, y:0, z:0};
const lantaiImg = 'assets/floor/floorTexture.jpg'
loadTexture(lantaiImg ,30, 30, lantaiGeo, lantaiMat, lantaiPos, lantaiRot, scene);

var geometry = new THREE.BoxGeometry(3,3,3);
// var material = new THREE.MeshBasicMaterial({color: 0xffff33});
var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.3});
var glass = new THREE.Mesh(geometry, material);
glass.position.set(-35,0.97,0);
scene.add(glass);

//Pillar - pedestal
new MTLLoader()
  .setPath('assets/pedestal/')
  .load('pedestal.mtl', function (materials) {
    materials.preload();
    new OBJLoader()
      .setMaterials(materials)
      .setPath('assets/pedestal/')
      .load('pedestal.obj', function (object) {
        scene.add(object);
        object.scale.set(0.05,0.05,0.05);
        // object.position.set(-35, -0.5, 0);
        object.position.set(-35, -0.5, 0);
        object.rotation.x += 1.57;
        object.recieveShadow = true;
        object.castShadow = true;
        // object.traverse( function ( child ) {
        //     if ( child.isMesh ) {
        //         child.castShadow = true;
        //         child.receiveShadow = true;
        //     }
        // })
      });
  });
camera.lookAt(glass.position.x, glass.position.y, glass.position.z);
controls.target.set(glass.position.x, glass.position.y, glass.position.z);

// ========== LIGHT ==========
var hemisphereLight = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 10); // color dari langit, color dari tanah, intensitas
hemisphereLight.position.set(0,0,0);
hemisphereLight.castShadow = true;
hemisphereLight.recieveShadow = true;
scene.add(hemisphereLight);

//Directional light
// var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 10);
// directionalLight.position.set(0,20,0);//posisi e dimana
// directionalLight.target.position.set(-35, -0.5, 0);
// var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// directionalLight.castShadow = true;
// scene.add(directionalLightHelper);//arah e kemana
// scene.add(directionalLight);
// scene.add(directionalLight.target);

// ========== ANIMATE ==========
//loop Animate
function animate(){
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// ========== METHODS ==========
//Texture Loader
function loadTexture(img, wrapHorizontal, wrapVertical, Geo, Mat, position, rotation, scene) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(img, function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(wrapHorizontal, wrapVertical);
        
        Mat.map = texture;  

        const obj = new THREE.Mesh(Geo, Mat);
        obj.position.set(position.x, position.y, position.z);
        obj.rotation.set(rotation.x, rotation.y, rotation.z);
        obj.recieveShadow = true;
        obj.castShadow = true;
        scene.add(obj);
    });
}

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