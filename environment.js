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
character.position.set(30,0,10) // Position camera inside the character
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
  outerWallSideMat.color.set(0xece0c3);
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

// Pedestal
var geometry = new THREE.BoxGeometry(3,3,3);
var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
var pedestalHead = new THREE.Mesh(geometry, material);
spawnPedestal(pedestalHead,-35 , 10, -20);

var geometry = new THREE.BoxGeometry(3,3,3);
var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
var pedestalHead2 = new THREE.Mesh(geometry, material);
spawnPedestal(pedestalHead2,-35 , 40, -20);

// var geometry = new THREE.BoxGeometry(3,3,3);
// var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
// var pedestalHead3 = new THREE.Mesh(geometry, material);
// spawnPedestal(pedestalHead3,-35 , 70, -20);

var geometry = new THREE.BoxGeometry(3,3,3);
var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
var pedestalHead4 = new THREE.Mesh(geometry, material);
spawnPedestal(pedestalHead4,-35 , -20, -20);

// var geometry = new THREE.BoxGeometry(3,3,3);
// var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
// var pedestalHead5 = new THREE.Mesh(geometry, material);
// spawnPedestal(pedestalHead5,-35 , -50, -20);

var geometry = new THREE.BoxGeometry(3,3,3);
var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
var pedestalHead6 = new THREE.Mesh(geometry, material);
spawnPedestal(pedestalHead6,35 , 10, 20);

var geometry = new THREE.BoxGeometry(3,3,3);
var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
var pedestalHead7 = new THREE.Mesh(geometry, material);
spawnPedestal(pedestalHead7,35 , 40, 20);

// var geometry = new THREE.BoxGeometry(3,3,3);
// var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
// var pedestalHead8 = new THREE.Mesh(geometry, material);
// spawnPedestal(pedestalHead8,35 , 70, 20);

var geometry = new THREE.BoxGeometry(3,3,3);
var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
var pedestalHead9 = new THREE.Mesh(geometry, material);
spawnPedestal(pedestalHead9,35 , -20, 20);

// var geometry = new THREE.BoxGeometry(3,3,3);
// var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
// var pedestalHead10 = new THREE.Mesh(geometry, material);
// spawnPedestal(pedestalHead10,35 , -50, 20);

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
    const lantai2KiriGeo = new THREE.BoxGeometry(160,23,2, 5, 5); //w h d wS hS dS
    const lantai2KiriMat = new THREE.MeshPhongMaterial();
    lantai2KiriMat.color.set(0xfff7eb);
    const lantai2KiriPos = {x:-33, y:17.6, z:10};
    const lantai2KiriRot = {x:1.575, y:0, z:4.7};
    const lantai2KiriImg = 'assets/floor/ceiling_texture.jpg'
    const lantai2Kiri = new THREE.Mesh(lantai2KiriGeo, lantai2KiriMat);
    loadTexture(lantai2KiriImg ,8, 2, lantai2KiriGeo, lantai2KiriMat, lantai2Kiri, lantai2KiriPos, lantai2KiriRot, scene);
    // const lantai2KiriGeo = new THREE.BoxGeometry(160,19,2, 5, 5); //w h d wS hS dS
    // const lantai2KiriMat = new THREE.MeshPhongMaterial({color: 0xff00ff});
    // const lantai2Kiri = new THREE.Mesh(lantai2KiriGeo, lantai2KiriMat);
    // lantai2Kiri.position.set(-35, 17.6, 10);
    // lantai2Kiri.rotation.set(1.575, 0, 4.7);
    // lantai2Kiri.receiveShadow = true;
    // lantai2Kiri.castShadow= true;
    // scene.add(lantai2Kiri);

  //Display wall
   //kiri
   new MTLLoader()
   .setPath('assets/wall/')
   .load('display_wall.mtl', function (materials) {
     materials.preload();
     new OBJLoader()
       .setMaterials(materials)
       .setPath('assets/wall/')
       .load('display_wall.obj', function (object) {
         object.scale.set(12,7,8);
         object.position.set(-44,10,0);
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
   //kanan
   new MTLLoader()
   .setPath('assets/wall/')
   .load('display_wall.mtl', function (materials) {
     materials.preload();
     new OBJLoader()
       .setMaterials(materials)
       .setPath('assets/wall/')
       .load('display_wall.obj', function (object) {
         object.scale.set(12,7,8);
         object.position.set(-20,10,0);
         object.rotation.y += 1.58;
        //  object.rotation.x += 0.2;
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

   let table;
   let table2;
   let streetLight;
   let artefact = new THREE.Group()
 //Center Object
   new MTLLoader()
 .setPath('assets/center/')
 .load('table_cloth.mtl', function (materials) {
   materials.preload();
   new OBJLoader()
     .setMaterials(materials)
     .setPath('assets/center/')
     .load('table_cloth.obj', function (object) {
       table = object;
       table.scale.set(20,7,35);
       table.position.set(0,5,0);
       
       table.rotation.y += Math.PI/6;
       table.rotation.x += Math.PI/10;
       table.rotation.z += -Math.PI/9;
       
       // table.rotation.x += 0.2;
       table.receiveShadow = true;
       table.castShadow = true;
       table.traverse( function ( child ) {
         if ( child.isMesh ) {
           child.material.side = THREE.DoubleSide;
           child.castShadow = true;
           child.receiveShadow = true;
           child.material.wireframe = false;
         }
       })
      //  scene.add(table);
       artefact.add(table);
       objectCollider.push(table);
     });
 });
 //Center Object
   new MTLLoader()
 .setPath('assets/center/')
 .load('table_cloth.mtl', function (materials) {
   materials.preload();
   new OBJLoader()
     .setMaterials(materials)
     .setPath('assets/center/')
     .load('table_cloth.obj', function (object) {
       table2 = object;
       table2.scale.set(20,15,35);
       table2.position.set(10,10,-15);
       
       table2.rotation.y += Math.PI/9;
       table2.rotation.x += Math.PI/12;
       table2.rotation.z += Math.PI/9;
       
       // table2.rotation.x += 0.2;
       table2.receiveShadow = true;
       table2.castShadow = true;
       table2.traverse( function ( child ) {
         if ( child.isMesh ) {
           child.material.side = THREE.DoubleSide;
           child.castShadow = true;
           child.receiveShadow = true;
           child.material.wireframe = false;
         }
       })
      //  scene.add(table2);
      artefact.position.y += 2
       artefact.add(table2);
       objectCollider.push(table2);
     });
 });
 //Center Object
   new MTLLoader()
 .setPath('assets/center/')
 .load('streelLamp.mtl', function (materials) {
   materials.preload();
   new OBJLoader()
     .setMaterials(materials)
     .setPath('assets/center/')
     .load('streetLamp.obj', function (object) {
       streetLight = object;
       streetLight.scale.set(20,15,35);
       streetLight.position.set(20,10,-15);
       
       streetLight.rotation.y += Math.PI/9;
       streetLight.rotation.x += Math.PI/12;
       streetLight.rotation.z += Math.PI/9;
       
       // streetLight.rotation.x += 0.2;
       streetLight.receiveShadow = true;
       streetLight.castShadow = true;
       streetLight.traverse( function ( child ) {
         if ( child.isMesh ) {
           child.material.side = THREE.DoubleSide;
           child.castShadow = true;
           child.receiveShadow = true;
           child.material.wireframe = false;
         }
       })
      //  scene.add(streetLight);
       artefact.add(streetLight);
       objectCollider.push(table2);
     });
 });
 artefact.position.set(-5,0,-10)
 scene.add(artefact);


// ========== LIGHT ==========
scene.fog = new THREE.FogExp2(0x000000, 0.02);
var pointLight = new THREE.PointLight(0xcfe2f3, 100, 1000); // color dari langit, color dari tanah, intensitas
pointLight.position.set(0,30,10);
scene.add(pointLight);

const light = new THREE.AmbientLight( 0xcfe2f3, 0.1 ); // soft white light
scene.add( light );

// var hemisphereLight = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 0.17); // color dari langit, color dari tanah, intensitas
// scene.add(hemisphereLight);

// ========== LIGHT HELPER ==========
// var shadowDir = new THREE.PointLightHelper(pointLight);

// ========== Movement ==========
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

    const clock = new THREE.Clock();
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();
// ========== ANIMATE ==========
//loop Animate
function animate(){
  // controls.update();
  requestAnimationFrame(animate);
     // table2 floating animation
   if (table) {
    table.position.y = Math.sin(clock.getElapsedTime()) * 0.5 - 1.2;
}
   if (table2) {
    table2.position.y = Math.sin(clock.getElapsedTime()) * 0.5 - 1;
}
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
function spawnSpotlight(posx, posz, face){
  new MTLLoader()
    .setPath('assets/spotlight/')
    .load('spotlight.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/spotlight/')
        .load('spotlight.obj', function (object) {
          object.scale.set(0.17,0.17,0.17);
          // object.position.set(-35, -0.5, 0);
          object.position.set(posx,-2,posz); //x, y, z
          object.rotation.x += 3.1;
          object.rotation.y += face;

          scene.add(object);
          objectCollider.push(object)
 
        });
    });
}

//Spawn pedestal
function spawnPedestal(poi,posx , posz, posxs){
  //GLASS
  var glass = poi
  glass.position.set(posx,0.97,posz);
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
          // object.position.set(posx, -0.5, 0);
          object.position.set(posx, -0.5, posz);
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

    var spotLight = new THREE.SpotLight(0xffec8e, 20,50);
    // spotLight.position.set(-10,10,0);//posisi e dimana
    spotLight.position.set(posxs,-4,posz);//posisi e dimana
    spotLight.target.position.set(glass.position.x, glass.position.y, glass.position.z);//arah e kemana
    spotLight.castShadow = true;
    spotLight.angle = Math.PI / 9;
    scene.add(spotLight);
    scene.add(spotLight.target);

    if(posxs == -20){
      spawnSpotlight(posxs, posz, -1.6);
    } else if (posxs == 20){
      spawnSpotlight(posxs, posz, 1.6);
    }
    // var shadowDir = new THREE.SpotLightHelper(spotLight);
    // scene.add(shadowDir)
    // var shadowDir = new THREE.SpotLightHelper(spotLight);
    // scene.add(shadowDir)
}

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
