import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

//setup Canvas Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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
let song_of_broken_pines; //gbs
let sparkle_mask;
let mist_splitter;
let verdix_axe; //gbs
let honkai_star_rail_bella;
let wolfs_gravestone; 
let elf_sword; // gbs
let dodoco_king;
let jade_greatsword;//gbs
let amos_bow;
let shirokos_rifle;
let sorasaki_hina_weapon;
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
// new MTLLoader()
//   .setPath("assets/")
//   .load("InteriorTest.mtl", function (materials) {
//     materials.preload();

//     new OBJLoader()
//       .setMaterials(materials)
//       .setPath("assets/")
//       .load("InteriorTest.obj", function (object) {
//         scene.add(object);
//         object.scale.set(10, 10, 10);
//         object.position.set(-3, 0, 0);
//         // object.rotation.x += -1;
//       });
//   });
// sparkle Mask
  const sparkle_mask_loader = new GLTFLoader();
  sparkle_mask_loader.load('/assets/sparkle_mask/scene.gltf',(glscene)=>{
    sparkle_mask = glscene.scene;
    scene.add(sparkle_mask);
    sparkle_mask.position.set(5,0,0)
  })



// 
  const song_of_broken_pines_loader = new GLTFLoader();
  song_of_broken_pines_loader.load('/assets/song_of_broken_pines_sword_free/scene.gltf',(glscene)=>{
    song_of_broken_pines = glscene.scene;
    scene.add(song_of_broken_pines);
    song_of_broken_pines.scale.set(100,100,100)
    song_of_broken_pines.position.set(1,0,0)
  })

  const mist_splitter_loader = new GLTFLoader();
  mist_splitter_loader.load('/assets/mist_splitter_-_genshin_impact/scene.gltf',(glscene)=>{
    mist_splitter = glscene.scene;
    scene.add(mist_splitter);
    mist_splitter.scale.set(5,5,5)
    mist_splitter.position.set(2,8,5)
  })
  const verdix_axe_loader = new GLTFLoader();
  verdix_axe_loader.load('/assets/verdict_axe_free/scene.gltf',(glscene)=>{
    verdix_axe = glscene.scene;
    scene.add(verdix_axe);
  })
  const honkai_star_rail_bella_loader = new GLTFLoader();
  honkai_star_rail_bella_loader.load('/assets/honkai_star_rail_bella/scene.gltf',(glscene)=>{
    honkai_star_rail_bella = glscene.scene;
    scene.add(honkai_star_rail_bella);
    honkai_star_rail_bella.scale.set(7,7,7)
    honkai_star_rail_bella.position.set(18,0,0)
  })
  const wolfs_gravestone_loader = new GLTFLoader();
  wolfs_gravestone_loader.load('/assets/genshin_impact_wolfs_gravestone/scene.gltf',(glscene)=>{
    wolfs_gravestone = glscene.scene;
    scene.add(wolfs_gravestone);
    wolfs_gravestone.scale.set(0.1,0.1,0.1)
    wolfs_gravestone.position.set(6,0,0)
    
  })
  const elf_sword_loader = new GLTFLoader();
  elf_sword_loader.load('/assets/elf_sword_and_scabbard_free/scene.gltf',(glscene)=>{
    elf_sword = glscene.scene;
    scene.add(elf_sword);
    elf_sword.scale.set(1000,1000,1000)
    elf_sword.position.set(8,0,0)

  })
  const dodoco_king_loader = new GLTFLoader();
  dodoco_king_loader.load('/assets/dodoco_king_-_genshin_impact/scene.gltf',(glscene)=>{

    dodoco_king = glscene.scene;
    scene.add(dodoco_king);
    // elf_sword.scale.set(0.1,0.1,0.1)
    dodoco_king.position.set(10,0,0)

  })
  const jade_greatsword_loader = new GLTFLoader();
  jade_greatsword_loader.load('/assets/claymore_primallal_jade_greatsword_free/scene.gltf',(glscene)=>{

    jade_greatsword = glscene.scene;
    scene.add(jade_greatsword);
    jade_greatsword.scale.set(150,150,150)
    jade_greatsword.position.set(13,0,0)

  })
  const amos_bow_loader = new GLTFLoader();
  amos_bow_loader.load('/assets/amos_bow_-_genshin_impact/scene.gltf',(glscene)=>{

    amos_bow = glscene.scene;
    scene.add(amos_bow);
    amos_bow.scale.set(3,3,3)
    amos_bow.position.set(15,0,0)

  })
  const sorasaki_hina_weapon_loader = new GLTFLoader();
  sorasaki_hina_weapon_loader.load('/assets/blue_archive_weapon_-_sorasaki_hina/scene.gltf',(glscene)=>{

    sorasaki_hina_weapon = glscene.scene;
    scene.add(sorasaki_hina_weapon_loader);
    sorasaki_hina_weapon_loader.scale.set(1000,1000,1000)
    sorasaki_hina_weapon_loader.position.set(20,0,0)

  })
  const shirokos_rifle_loader = new GLTFLoader();
  shirokos_rifle_loader.load('/assets/blue_archive_shirokos_rifle/scene.gltf',(glscene)=>{

    shirokos_rifle = glscene.scene;
    scene.add(shirokos_rifle);
    // shirokos_rifle.scale.set(3,3,3)
    shirokos_rifle.position.set(25,0,0)

  })
  
//   position


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
// Animation variables
let clock = new THREE.Clock()
//loop Animate

// Floating Function
function float(dummy, tooo){
    dummy.rotation.y +=0.01;
    dummy.position.y = 0.5 + 0.5 * Math.sin(tooo * 2);
}
function animate() {
  renderer.render(scene, camera);
  const elapsedTime = clock.getElapsedTime();

  if(sparkle_mask){
    float(sparkle_mask, elapsedTime);

  }
  if(song_of_broken_pines){
    float(song_of_broken_pines, elapsedTime);
  }
  if(mist_splitter){
    float(mist_splitter, elapsedTime);
  }
  if(verdix_axe){
    float(verdix_axe, elapsedTime);
    
  }
  if(honkai_star_rail_bella){
    float(honkai_star_rail_bella, elapsedTime);
    
  }
  if(wolfs_gravestone){
    float(wolfs_gravestone, elapsedTime);
    
  }
  if(elf_sword){
    float(elf_sword, elapsedTime);
    
  }
  if(dodoco_king){
    float(dodoco_king, elapsedTime);
    
  }
  if(jade_greatsword){
    float(jade_greatsword, elapsedTime);
    
  }
  if(amos_bow){
    float(amos_bow, elapsedTime);
    
  }
  if(sorasaki_hina_weapon){
    float(sorasaki_hina_weapon, elapsedTime);
    
  }
  if(shirokos_rifle){
    float(shirokos_rifle, elapsedTime);
    
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
