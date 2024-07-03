import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// ========== SETUP ==========
// Create a canvas element for the gradient texture
const gradientCanvas = document.createElement('canvas');
gradientCanvas.width = 512;
gradientCanvas.height = 512;
const ctx = gradientCanvas.getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, gradientCanvas.height);
gradient.addColorStop(0, '#171D20'); // Blue
gradient.addColorStop(1, '#171D20'); // LightBlue
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);

// Create a texture from the canvas
const gradientTexture = new THREE.CanvasTexture(gradientCanvas);

//Canvas Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
var creativeMode = false;
let rotate = false;
let roll = false;
var objectCollider = [];
//init Camera
const scene = new THREE.Scene();
scene.background = gradientTexture;
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
character.position.set(30,0,20) // Position camera inside the character
character.scale.set(3,3,3) // Position camera inside the character
scene.add(character);

// ========== OBJECT ==========
// dodoco

let dodoco_king;
const dodoco_king_loader = new GLTFLoader();
  dodoco_king_loader.load('/assets/items/dodoco_king_-_genshin_impact/scene.gltf',(glscene)=>{

    dodoco_king = glscene.scene;
    dodoco_king.scale.set(0.25,0.25,0.25)
    dodoco_king.receiveShadow = true;
    dodoco_king.castShadow = true;
    dodoco_king.traverse( function ( child ) {
      if ( child.isMesh ) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.wireframe = false;
      }
    })
    dodoco_king.rotation.set(0,Math.PI/2,0)
    dodoco_king.position.set(-35 , 1, -20)
    scene.add(dodoco_king);

  })
let sparkle_mask;
const sparkle_mask_loader = new GLTFLoader();
  sparkle_mask_loader.load('/assets/items/sparkle_mask/scene.gltf',(glscene)=>{
    sparkle_mask = glscene.scene;
    
    sparkle_mask.position.set(-35 , 1, 40)
    sparkle_mask.rotation.set(0,Math.PI/2,0)
    sparkle_mask.scale.set(0.2,0.2,0.2)
    sparkle_mask.traverse( function ( child ) {
      if ( child.isMesh ) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.wireframe = false;
      }
    })
    scene.add(sparkle_mask);
  })
let shiro_weapon;
const shiro_weapon_loader = new GLTFLoader();
  shiro_weapon_loader.load('/assets/items/blue_archive_shirokos_rifle/scene.gltf',(glscene)=>{
    shiro_weapon = glscene.scene;
    
    shiro_weapon.position.set(-35,1,10)
    shiro_weapon.rotation.set(Math.PI/4,Math.PI/4,0)
    shiro_weapon.scale.set(0.25,0.25,0.25)
    shiro_weapon.traverse( function ( child ) {
      if ( child.isMesh ) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.wireframe = false;
      }
    })
    scene.add(shiro_weapon);
  })


let amos_bow;
const amos_bow_loader = new GLTFLoader();
  amos_bow_loader.load('/assets/items/amos_bow_-_genshin_impact/scene.gltf',(glscene)=>{
    amos_bow = glscene.scene;
    
    // amos_bow.position.set(35,1,10)
    amos_bow.position.set(35,0,9)
    amos_bow.rotation.set(Math.PI/4,Math.PI/4,0)
    amos_bow.scale.set(0.5,0.5,0.5)
    amos_bow.traverse( function ( child ) {
      if ( child.isMesh ) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.wireframe = false;
      }
    })
    scene.add(amos_bow);
  })
let hina_weapon;
const hina_weapon_loader = new GLTFLoader();
  hina_weapon_loader.load('/assets/items/blue_archive_weapon_-_sorasaki_hina/scene.gltf',(glscene)=>{
    hina_weapon = glscene.scene;
    
    // hina_weapon.position.set(35,1,40)
    hina_weapon.position.set(35,1,40)
    hina_weapon.rotation.set(Math.PI/4,Math.PI/4,0)
    hina_weapon.scale.set(2.5,2.5,2.5)
    hina_weapon.traverse( function ( child ) {
      if ( child.isMesh ) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.wireframe = false;
      }
    })
    scene.add(hina_weapon);
  })
let bella;
const bella_loader = new GLTFLoader();
  bella_loader.load('/assets/items/honkai_star_rail_bella/scene.gltf',(glscene)=>{
    bella = glscene.scene;
    
    // bella.position.set(35,1,40)
    bella.position.set(35,0,-20)
    bella.rotation.set(0,-Math.PI/2,0)
    bella.scale.set(1.5,1.5,1.5)
    bella.traverse( function ( child ) {
      if ( child.isMesh ) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.wireframe = false;
      }
    })
    scene.add(bella);
  })



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
  
  //frontside
  const outerWallFrontGeo = new THREE.BoxGeometry(90,55,1, 5,5);
  const outerWallFrontMat = new THREE.MeshPhongMaterial();
  outerWallFrontMat.color.set(0xfff7eb);
  const outerWallFrontPos= {x:0, y:89.5, z:-27};
  const outerWallFrontRot = {x:20.44, y:0, z:0};
  // const outerWallFrontImg = 'assets/wall/canvas_wall.jpg'
  const outerWallFront = new THREE.Mesh(outerWallGeo, outerWallMat);
  objectCollider.push(outerWallFront);
  loadTexture(outerWallImg ,10, 15, outerWallFrontGeo, outerWallFrontMat, outerWallFront, outerWallFrontPos, outerWallFrontRot, lantai);
  
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
const roofMat = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent:true, opacity: 0.3} ); 
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

var geometry = new THREE.BoxGeometry(3,3,3);
var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
var pedestalHead3 = new THREE.Mesh(geometry, material);
spawnPedestal(pedestalHead3,-35 , 70, -20);

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

var geometry = new THREE.BoxGeometry(3,3,3);
var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
var pedestalHead8 = new THREE.Mesh(geometry, material);
spawnPedestal(pedestalHead8,35 , 70, 20);

var geometry = new THREE.BoxGeometry(3,3,3);
var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
var pedestalHead9 = new THREE.Mesh(geometry, material);
spawnPedestal(pedestalHead9,35 , -20, 20);

// var geometry = new THREE.BoxGeometry(3,3,3);
// var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.2});
// var pedestalHead10 = new THREE.Mesh(geometry, material);
// spawnPedestal(pedestalHead10,35 , -50, 20);

//Stairs 
  //pigura
    //box tangga
    const pigguraGeo = new THREE.BoxGeometry(12 ,14, 0.3); 
    const piguraMat = new THREE.MeshPhongMaterial({side : THREE.FrontSide});//({color: 0x00ff00});
    const pigura = new THREE.Mesh(pigguraGeo, piguraMat);
    const piguraPos = {x: 0, y :25, z:-88};
    const piguraRot = {x: 0, y :0, z: 8};
    const piguraImg = 'assets/wall/fucuan1.jpg'
    loadTexture(piguraImg, 1, 1, pigguraGeo, piguraMat, pigura, piguraPos, piguraPos, scene);
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
  const bawahTanggaMat = new THREE.MeshPhongMaterial({
    color: 0x6D6D6D, 
    specular: 0x808080, 
    shininess: 225, 
    side: THREE.DoubleSide
  });
  const bawahTangga = new THREE.Mesh(bawahTanggaGeo, bawahTanggaMat);
  bawahTangga.position.set(0,0,-78);
  scene.add(bawahTangga);
  bawahTangga.receiveShadow = true;
  bawahTangga.castShadow = true;
  objectCollider.push(bawahTangga);
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
  const kananTangaMat = new THREE.MeshPhongMaterial({
    color: 0x6D6D6D, 
    specular: 0x808080, 
    shininess: 225, 
    side: THREE.DoubleSide
  });
  const kananTangga = new THREE.Mesh(kananTanggaGeo, kananTangaMat);
  kananTangga.position.set(35,12,-78);
  scene.add(kananTangga);
  bawahTangga.receiveShadow = true;
  bawahTangga.castShadow = true;
  objectCollider.push(bawahTangga);
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
  const kiriTanggaMat = new THREE.MeshPhongMaterial({
    color: 0x6D6D6D, 
    specular: 0x808080, 
    shininess: 225, 
    side: THREE.DoubleSide
  });
  const kiriTangga = new THREE.Mesh(kiriTanggaGeo, kiriTanggaMat);
  kiriTangga.position.set(-35,12,-78);
  scene.add(kiriTangga);
  bawahTangga.receiveShadow = true;
  bawahTangga.castShadow = true;
  objectCollider.push(bawahTangga);

  //2nd Floor
    const lantai2KiriGeo = new THREE.BoxGeometry(160,23,2, 5, 5); //w h d wS hS dS
    const lantai2KiriMat = new THREE.MeshPhongMaterial();
    lantai2KiriMat.color.set(0xfff7eb);
    const lantai2KiriPos = {x:-33, y:17.6, z:10};
    const lantai2KiriRot = {x:1.575, y:0, z:4.7};
    const lantai2KiriImg = 'assets/floor/ceiling_texture.jpg'
    const lantai2Kiri = new THREE.Mesh(lantai2KiriGeo, lantai2KiriMat);
    loadTexture(lantai2KiriImg ,8, 2, lantai2KiriGeo, lantai2KiriMat, lantai2Kiri, lantai2KiriPos, lantai2KiriRot, scene);
    
    const lantai2KananGeo = new THREE.BoxGeometry(160,23,2, 5, 5); //w h d wS hS dS
    const lantai2KananMat = new THREE.MeshPhongMaterial();
    lantai2KananMat.color.set(0xfff7eb);
    const lantai2KananPos = {x:33, y:17.6, z:10};
    const lantai2KananRot = {x:1.575, y:0, z:4.7};
    const lantai2KananImg = 'assets/floor/ceiling_texture.jpg'
    const lantai2Kanan = new THREE.Mesh(lantai2KananGeo, lantai2KananMat);
    loadTexture(lantai2KananImg ,8, 2, lantai2KiriGeo, lantai2KananMat, lantai2Kanan, lantai2KananPos, lantai2KananRot, scene);
    
    const Lantai2BlkgGeo = new THREE.BoxGeometry(46,23,2, 5, 5); //w h d wS hS dS
    const Lantai2BlkgMat = new THREE.MeshPhongMaterial();
    Lantai2BlkgMat.color.set(0xfff7eb);
    const lantai2BlkgPos = {x:2, y:17.4, z:78.5};
    const lantai2BlkgRot = {x:1.575, y:0, z:0};
    const lantai2BlkgImg = 'assets/floor/ceiling_texture.jpg'
    const lantai2Blkg = new THREE.Mesh(Lantai2BlkgGeo, Lantai2BlkgMat);
    loadTexture(lantai2BlkgImg ,8, 2, lantai2KiriGeo, lantai2KananMat, lantai2Blkg, lantai2BlkgPos, lantai2BlkgRot, scene);

    //Railing
    //kanan dari z -55 dst
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8,6,6);
          object.position.set(24,13,-55);
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
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8,6,6);
          object.position.set(24,13,-33);
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
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8,6,6);
          object.position.set(24,13,-11);
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
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8,6,6);
          object.position.set(24,13,11);
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
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8,6,6);
          object.position.set(24,13,33);
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
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8,6,6);
          object.position.set(24,13,55);
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
    //KANANNNNNNN
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8,6,6);
          object.position.set(-24,13,-55);
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
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8,6,6);
          object.position.set(-24,13,-33);
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
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8,6,6);
          object.position.set(-24,13,-11);
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
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8,6,6);
          object.position.set(-24,13,11);
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
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8,6,6);
          object.position.set(-24,13,33);
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
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8,6,6);
          object.position.set(-24,13,55);
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
    //Belakangg
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8.5,6,6);
          object.position.set(-11,13,68.5);
          // object.rotation.y -= 0.01;
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
    new MTLLoader()
    .setPath('assets/railing/')
    .load('Balustrade.mtl', function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath('assets/railing/')
        .load('Balustrade.obj', function (object) {
          object.scale.set(8.5,6,6);
          object.position.set(13,13,68.5);
          // object.rotation.y -= 0.01;
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
        //  objectCollider.push(object);
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
        //  objectCollider.push(object);
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
       table.position.set(0,10,8);
       
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
       table2.position.set(8,25,-15);
       table2.position.y += 10;
       
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
       streetLight.scale.set(20,20,20);
       streetLight.position.set(20,10,-14);
       
       streetLight.rotation.y += Math.PI/3.5;
       streetLight.rotation.x += Math.PI/5.6;
       streetLight.rotation.z += Math.PI/5.3;
       
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
 artefact.position.set(-10,0,-10)
 scene.add(artefact);


// ========== LIGHT ==========
scene.fog = new THREE.FogExp2(0x000000, 0.02);
var pointLight = new THREE.PointLight(0xcfe2f3, 100, 1000); // color dari langit, color dari tanah, intensitas
pointLight.position.set(0,30,10);
pointLight.castShadow = true;
scene.add(pointLight);

const light = new THREE.AmbientLight( 0xcfe2f3, 0.1 ); // soft white light
scene.add( light );

//upstair spotlight
var redLight = new THREE.SpotLight(0xff5b5b, 90,50);
// spotLight.position.set(-10,10,0);//posisi e dimana
redLight.position.set(30, 55, -70);//posisi e dimana
redLight.target.position.set(0, 25, -88);//arah e kemana
redLight.castShadow = true;
redLight.angle = Math.PI / 9;
scene.add(redLight);
scene.add(redLight.target);

var blueLight = new THREE.SpotLight(0x58E6FF, 90,50);
// spotLight.position.set(-10,10,0);//posisi e dimana
blueLight.position.set(-30, 55, -70);//posisi e dimana
blueLight.target.position.set(0, 25, -88);//arah e kemana
blueLight.castShadow = true;
blueLight.angle = Math.PI / 9;
scene.add(blueLight);
scene.add(blueLight.target);

// var hemisphereLight = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 0.17); // color dari langit, color dari tanah, intensitas
// scene.add(hemisphereLight);

// ========== LIGHT HELPER ==========
var shadowDir = new THREE.SpotLightHelper(redLight);
scene.add(shadowDir);

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
    // Define variables for orbit animation
let orbitRadius = 10; // Radius of orbit circle
let orbitSpeed = 0.001; 
let walkSpeed = 0.001; 
var temp = new THREE.Vector3();// Speed of rotation around the object
let centerObject = artefact; // Replace 'table' with the object you want to orbit around

character.position.set(0,0,80);
character.castShadow = true;
// ========== ANIMATE ==========

function float(dummy, tooo, y){
  dummy.rotation.y +=0.01;
  dummy.position.y = y+0.25  * Math.sin(tooo * 2);
}
//loop Animate
function animate(){
    // controls.update();
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
  if(dodoco_king){
    float(dodoco_king, elapsedTime, 0.75);
  }
  if(sparkle_mask){
    float(sparkle_mask, elapsedTime, 0.2);
  }
  if(shiro_weapon){
    float(shiro_weapon, elapsedTime, 1);
  }
  if(amos_bow){
    float(amos_bow, elapsedTime, -0.2);
  }
  if(hina_weapon){
    float(hina_weapon, elapsedTime, 1);
  }
  if(bella){
    float(bella, elapsedTime, 0);
  }
    if (roll) {
      let time = performance.now() * 0.5;
      let camX = centerObject.position.x;
      let camZ = centerObject.position.z + walkSpeed * time;
      // camera.position.set(camX, camera.position.y, -camZ);
      let direction = new THREE.Vector3();
      direction.addScaledVector(forwardVector, 0.5);
      direction.addScaledVector(rightVector, moveDirection.x);
      character.position.addScaledVector(direction, moveSpeed);
      const chara = new THREE.Box3().setFromObject(character);
      for (const collisionBox of objectCollider) {
        const collisionBoxBB = new THREE.Box3().setFromObject(collisionBox);
        if (collisionBoxBB.intersectsBox(chara)) {
              // controls.moveForward(-moveDirection.z * moveSpeed);
              // controls.moveRight(-moveDirection.x * moveSpeed);
              character.position.addScaledVector(direction, -moveSpeed);
              // character.position.addScaledVector(moveDirection, -moveSpeed);
          }
        }
      
      // Roll the camera around the z-axis
      // camera.rotation.z += 0.01; // Adjust the value as needed to control the roll speed
      camera.rotation.z += THREE.MathUtils.degToRad(1); // Roll: 10 degrees
      // camera.lookAt(bawahTangga.position);
    }
    if(rotate){
    // Update orbit angle
    let time = performance.now() * 0.5;
    let angle = orbitSpeed * time;

    // Calculate new camera position based on orbit
    let camX = centerObject.position.x + orbitRadius * Math.sin(angle);
    let camZ = centerObject.position.z + orbitRadius * Math.cos(angle);
    camera.position.set(camX, camera.position.y, camZ);


    // Point the camera towards the center of the object
    camera.lookAt(centerObject.position);
  }
     // table2 floating animation
   if (table) {
    table.position.y = Math.sin(clock.getElapsedTime()) * 0.5 + 10;
}
   if (table2) {
    table2.position.y = Math.sin(clock.getElapsedTime()) * 0.5 + 10;
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
    const chara = new THREE.Box3().setFromObject(character);
    for (const collisionBox of objectCollider) {
        const collisionBoxBB = new THREE.Box3().setFromObject(collisionBox);
        if (collisionBoxBB.intersectsBox(chara)) {
              // controls.moveForward(-moveDirection.z * moveSpeed);
              // controls.moveRight(-moveDirection.x * moveSpeed);
              character.position.addScaledVector(direction, -moveSpeed);
              // character.position.addScaledVector(moveDirection, -moveSpeed);
          }
        }
        renderer.render(scene, camera);
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
      case 'q':
          if(!rotate){
            rotate = true;
            // camera.position.y += 20;
            character.position.set(30,0,30);
            camera.position.set(0,20,0);
            // Rotasi kamera ke atas (misalnya, rotasi sebesar 45 derajat ke atas)
            let rotationAmount = THREE.MathUtils.degToRad(45); // Ubah derajat ke radian
            camera.rotation.x += rotationAmount;
           }
           else{
            rotate = false;
            resetCamera()
           }
            break;

      case 'e':
          if(!roll){
            roll = true;
            character.position.set(0,0,80);
            // camera.position.set(0,0,0);
            camera.lookAt(bawahTangga.position);

           }
           else{
            roll = false;
            resetCamera()
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
let initialCameraPosition = new THREE.Vector3();
let initialCameraRotation = new THREE.Euler();

// Simpan posisi dan orientasi kamera awal
initialCameraPosition.copy(camera.position);
initialCameraRotation.copy(camera.rotation);

// Fungsi untuk kembali ke POV awal
function resetCamera() {
    camera.position.copy(initialCameraPosition);
    camera.rotation.copy(initialCameraRotation);
}
// ========== CAMERA ANIMATION ==========
// Fungsi untuk animasi rotasi kamera
// function rotateCameraAroundObject(object, duration) {
//   gsap.to(camera.position, {
//       duration: duration,
//       x: object.position.x,
//       z: object.position.z + 5,
//       onUpdate: () => {
//           camera.lookAt(object.position);
//       },
//       onComplete: () => {
//           document.addEventListener('keydown', onKeyPress);
//       }
//   });
// }

// // Panggil fungsi untuk mulai animasi rotasi saat aplikasi dimuat
//  // Contoh durasi animasi 6 detik

// // Fungsi untuk menangani input tombol 'Q'
// function onKeyPress(event) {
//   if (event.key === 'q') {
//     rotateCameraAroundObject(table, 6);
//       gsap.killTweensOf(camera.position); // Hentikan animasi jika tombol 'Q' ditekan
//       document.removeEventListener('keydown', onKeyPress); // Hapus event listener setelah animasi berhenti
//   }
// }
