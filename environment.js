import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
// ========== SETUP ==========
//Canvas Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
var creativeMode = false;
var objectCollider = [];
//init Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0,0,40);
// camera.lookAt(0,0,0);
//control camera
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0,0,0);
// controls.update();
const controls = new PointerLockControls(camera, document.body);
document.addEventListener('click', () => {
  controls.lock();
});

controls.addEventListener('lock', () => {
  console.log('Pointer locked');
});

controls.addEventListener('unlock', () => {
  console.log('Pointer unlocked');
});
// Variables for smooth movement


// Create character box and attach camera to it
const characterGeometry = new THREE.BoxGeometry(1, 2, 1);
const characterMaterial = new THREE.MeshBasicMaterial({ color: 0x112200 });
const character = new THREE.Mesh(characterGeometry, characterMaterial);
character.add(camera);

camera.position.set(0, 1, 0); 
character.position.set(30,0,20) // Position camera inside the character
character.scale.set(3,3,3) // Position camera inside the character
scene.add(character);

// ========== OBJECT ==========
//Plane Lantai 
const lantaiGeo = new THREE.BoxGeometry(90,180,1, 5, 5); //w h d wS hS dS
const lantaiMat = new THREE.MeshPhongMaterial();
lantaiMat.color.set(0xfff7eb);
const lantaiPos = {x:0, y:-5, z:0};
const lantaiRot = {x:1.575, y:0, z:0};
const lantaiImg = 'assets/floor/floor_tiles.jpeg'
const lantai = new THREE.Mesh(lantaiGeo, lantaiMat);
loadTexture(lantaiImg ,8, 13, lantaiGeo, lantaiMat, lantai, lantaiPos, lantaiRot, scene);

//Outer Wall
  //backside
  const outerWallGeo = new THREE.BoxGeometry(90,55,1, 5,5);
  const outerWallMat = new THREE.MeshPhongMaterial();
  outerWallMat.color.set(0xfff7eb);
  const outerWallPos = {x:0, y:-89.5, z:-27};
  const outerWallRot = {x:20.44, y:0, z:0};
  const outerWallImg = 'assets/wall/canvas_wall.jpg'
  const outerWall = new THREE.Mesh(outerWallGeo, outerWallMat);
  objectCollider.push(outerWall);
  loadTexture(outerWallImg ,10, 15, outerWallGeo, outerWallMat, outerWall, outerWallPos, outerWallRot, lantai);
  
  //leftside
  const outerWallSideGeo = new THREE.BoxGeometry(180,55,1, 5,5);
  const outerWallSideMat = new THREE.MeshPhongMaterial();
  outerWallSideMat.color.set(0xfff7eb);
  const outerWallLeftPos = {x:-44.5, y:0.4, z:-27};
  const outerWallLeftRot = {x:1.57, y:1.57, z:0};
  const outerWallLeft = new THREE.Mesh(outerWallSideGeo, outerWallSideMat);
  objectCollider.push(outerWallLeft);
  loadTexture(outerWallImg, 10, 15, outerWallSideGeo, outerWallSideMat, outerWallLeft, outerWallLeftPos, outerWallLeftRot, lantai);

  //rightside
  const outerWallRightPos = {x:44.6, y:0.4, z:-27};
  const outerWallRightRot = {x:1.57, y:1.57, z:0};
  const outerWallRight = new THREE.Mesh(outerWallSideGeo, outerWallSideMat);
  objectCollider.push(outerWallRight);
  loadTexture(outerWallImg, 10, 15, outerWallSideGeo, outerWallSideMat, outerWallRight, outerWallRightPos, outerWallRightRot, lantai);

//Roof
const roofGeo = new THREE.CylinderGeometry( 45, 45, 180, 39, 38, false, 0.628, 3.141); //rT rB h rad hSeg oE thetaS thetaL 
const roofMat = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent:true, opacity: 0.3} ); 
const roof = new THREE.Mesh( roofGeo, roofMat ); 
roof.rotation.set(0, 0.95 , 0);
roof.position.set(0, 0.5, -53);
lantai.add( roof );

//GLASS
  var geometry = new THREE.BoxGeometry(3,3,3);
  var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
  var glass = new THREE.Mesh(geometry, material);
  glass.castShadow = true; 
  glass.position.set(-35,0.97,0);
  scene.add(glass);
  // Add collision helper for the glass
  // var glassHelper = new THREE.BoxHelper(glass, 0xff0000);
  // scene.add(glassHelper);

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
          objectCollider.push(object)
          // Add collision helper for the pedestal
          // var pedestalHelper = new THREE.BoxHelper(object, 0x00ff00);
          // scene.add(pedestalHelper);
        });
    });
  
  //Stairs 
  //tangga utama
  new MTLLoader()
  .setPath('assets/stair/')
  .load('stairs.mtl', function (materials) {
    materials.preload();
    new OBJLoader()
      .setMaterials(materials)
      .setPath('assets/stair/')
      .load('stairs.obj', function (object) {
        object.scale.set(6,5,6);
        object.position.set(0,-2.3,-55);
        // object.rotation.x += 1.2;
        object.rotation.y += 0.001;
        object.receiveShadow = true;
        object.castShadow = true;
        object.traverse( function ( child ) {
          if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.wireframe = false;
          }
        })
        scene.add(object);
        objectCollider.push(object);
      });
  });
  //box tangga
  const bawahTanggaGeo = new THREE.BoxGeometry(90 ,10,24); 
  const bawahTanggaMat = new THREE.MeshPhongMaterial({color: 0x00ff00});
  const bawahTangga = new THREE.Mesh(bawahTanggaGeo, bawahTanggaMat);
  bawahTangga.position.set(0,0,-78);
  scene.add(bawahTangga);
  //tangga kanan
  new MTLLoader()
  .setPath('assets/stair/')
  .load('stairs.mtl', function (materials) {
    materials.preload();
    new OBJLoader()
      .setMaterials(materials)
      .setPath('assets/stair/')
      .load('stairs.obj', function (object) {
        object.scale.set(7.6,7,5);
        object.position.set(15,8,-78);
        object.rotation.y -= 1.58;
        // object.rotation.x += 0.2;
        object.receiveShadow = true;
        object.castShadow = true;
        object.traverse( function ( child ) {
          if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.wireframe = false;
          }
        })
        scene.add(object);
        objectCollider.push(object);
      });
  });
  //box tangga kanan
  const kananTanggaGeo = new THREE.BoxGeometry(18,14,24); 
  const kananTangaMat = new THREE.MeshPhongMaterial({color: 0xffff00});
  const kananTangga = new THREE.Mesh(kananTanggaGeo, kananTangaMat);
  kananTangga.position.set(35,12,-78);
  scene.add(kananTangga);
  //tangga kiri
  new MTLLoader()
  .setPath('assets/stair/')
  .load('stairs.mtl', function (materials) {
    materials.preload();
    new OBJLoader()
      .setMaterials(materials)
      .setPath('assets/stair/')
      .load('stairs.obj', function (object) {
        object.scale.set(7.6,7,5);
        object.position.set(-15,8,-78);
        object.rotation.y += 1.58;
        // object.rotation.x += 0.2;
        object.receiveShadow = true;
        object.castShadow = true;
        object.traverse( function ( child ) {
          if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.wireframe = false;
          }
        })
        scene.add(object);
        objectCollider.push(object);
      });
  });
  //box tangga kiri
  const kiriTanggaGeo = new THREE.BoxGeometry(18,14,24); 
  const kiriTanggaMat = new THREE.MeshPhongMaterial({color: 0xffff00});
  const kiriTangga = new THREE.Mesh(kiriTanggaGeo, kiriTanggaMat);
  kiriTangga.position.set(-35,12,-78);
  scene.add(kiriTangga);

  //2nd Floor
    // const lantai2KiriGeo = new THREE.BoxGeometry(160,19,2, 5, 5); //w h d wS hS dS
    // const lantai2KiriMat = new THREE.MeshPhongMaterial();
    // lantai2KiriMat.color.set(0xfff7eb);
    // const lantai2KiriPos = {x:-35, y:17.6, z:10};
    // const lantai2KiriRot = {x:1.575, y:0, z:4.7};
    // const lantai2KiriImg = 'assets/floor/ceiling_texture.jpg'
    // const lantai2Kiri = new THREE.Mesh(lantai2KiriGeo, lantai2KiriMat);
    // loadTexture(lantai2KiriImg ,1, 1, lantai2KiriGeo, lantai2KiriMat, lantai2Kiri, lantai2KiriPos, lantai2KiriRot, scene);
    const lantai2KiriGeo = new THREE.BoxGeometry(160,19,2, 5, 5); //w h d wS hS dS
    const lantai2KiriMat = new THREE.MeshPhongMaterial({color: 0xff00ff});
    const lantai2Kiri = new THREE.Mesh(lantai2KiriGeo, lantai2KiriMat);
    lantai2Kiri.position.set(-35, 17.6, 10);
    lantai2Kiri.rotation.set(1.575, 0, 4.7);
    lantai2Kiri.receiveShadow = true;
    lantai2Kiri.castShadow= true;
    scene.add(lantai2Kiri);

  //setup camera  
  // camera.lookAt(glass.position.x, glass.position.y, glass.position.z);
  // controls.target.set(glass.position.x, glass.position.y, glass.position.z);
  // controls.target.set(0,0,0);
  // camera.position.set(0,0,100);

// ========== LIGHT ==========
var hemisphereLight = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 3); // color dari langit, color dari tanah, intensitas
hemisphereLight.position.set(0,0,0);
hemisphereLight.castShadow = true;
hemisphereLight.receiveShadow = true;
scene.add(hemisphereLight);

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
  // var shadowDir = new THREE.CameraHelper(directionalLight.shadow.camera);
  // scene.add(shadowDir)

// var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionalLightHelper);

//MOVEMENT
const moveDirection = new THREE.Vector3();  // Vector to store movement direction
const moveSpeed = 0.5;  
//Function to get the forward direction
function getForwardVector() {
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    return forward;
}

function getForwardVectorCreative() {
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  return forward;
}

// Function to get the right direction
function getRightVectorCreative() {
  const right = new THREE.Vector3();
  camera.getWorldDirection(right);
  right.cross(camera.up);
  return right;
}
// Function to get the right direction
function getRightVector() {
    const right = new THREE.Vector3();
    camera.getWorldDirection(right);
    right.cross(camera.up);
    right.y = 0;
    right.normalize();
    return right;
}

var forwardVector; 
    var rightVector ;

// ========== ANIMATE ==========
//loop Animate
function animate(){
  // controls.update();
  requestAnimationFrame(animate);
    
    if(!creativeMode){
      forwardVector = getForwardVector();
      rightVector = getRightVector();
    }
    else{
      forwardVector = getForwardVectorCreative();
      rightVector = getRightVectorCreative();
    }

    const direction = new THREE.Vector3();
    direction.addScaledVector(forwardVector, moveDirection.z);
    direction.addScaledVector(rightVector, moveDirection.x);
    character.position.addScaledVector(direction, moveSpeed);
    const characterBB = new THREE.Box3().setFromObject(character);
    for (const collisionBox of objectCollider) {
        const collisionBoxBB = new THREE.Box3().setFromObject(collisionBox);
        if (collisionBoxBB.intersectsBox(characterBB)) {
              // controls.moveForward(-moveDirection.z * moveSpeed);
              // controls.moveRight(-moveDirection.x * moveSpeed);
              character.position.addScaledVector(direction, -moveSpeed);
              // character.position.addScaledVector(moveDirection, -moveSpeed);
          }
        renderer.render(scene, camera);
  }
}
requestAnimationFrame(animate);

// ========== METHODS ==========
//Texture Loader
function loadTexture(img, wrapHorizontal, wrapVertical, Geo, Mat, obj, position, rotation, scene) {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(img, function(texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(wrapHorizontal, wrapVertical);
      
      Mat.map = texture;  
      Mat.needsUpdate = true;

      obj.position.set(position.x, position.y, position.z);
      obj.rotation.set(rotation.x, rotation.y, rotation.z);
      obj.receiveShadow = true;
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

 function  addTo(obj1, obj2){
  obj1.add(obj2);
 }
 document.addEventListener('keydown', (event) => {
  switch (event.key) {
      case 'w':
          moveDirection.z = 1;
          break;
      case 's':
          moveDirection.z = -1;
          break;
      case 'a':
          moveDirection.x = -1;
          break;
      case 'd':
          moveDirection.x = 1;
          break;
      case ' ':
          if(!creativeMode){
            creativeMode = true;
           }
           else{
            creativeMode = false;
            character.position.set(30,0,30);
           }
            break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.key) {
      case 'w':
      case 's':
          moveDirection.z = 0;
          break;
      case 'a':
      case 'd':
          moveDirection.x = 0;
          break;
  }
});
