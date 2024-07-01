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
        scene.add(obj);
    });
}

//MTL Loader
function loadMTL(path, mtl, targetObj, scale, position){
new MTLLoader()
    .setPath( path )
        .load( mtl , function ( materials ) {

                materials.preload();

                new OBJLoader()
                    .setMaterials( materials )
                    .setPath( path )
                    .load( mtl, function ( object ) {
                        targetObj.add( object );
                        object.scale.set(scale.x, scale.y, scale.z);
                        object.position.set(position.x, position.y, position.z);

                    }, );
                } );
}

//Plane Lantai 
const lantaiGeo = new THREE.BoxGeometry(30,30,1, 5, 5); //w h d wS hS dS
const lantaiMat = new THREE.MeshBasicMaterial();
const lantaiPos = {x:0, y:-5, z:0};
const lantaiRot = {x:1.6, y:0, z:0};
const lantaiImg = 'floorTexture.jpg'
loadTexture(lantaiImg ,10, 10, lantaiGeo, lantaiMat, lantaiPos, lantaiRot, scene);

//import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
// let sparkle_mask;
// const sparkle_mask_loader = new GLTFLoader();
// sparkle_mask_loader.load('/assets/sparkle_mask/scene.gltf',(glscene)=>{
//   sparkle_mask = glscene.scene;
//   scene.add(sparkle_mask);
//   sparkle_mask.position.set(5,0,0)
// })


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