import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

//setup Canvas Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Setup Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,5);
camera.lookAt(0,0,0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0,0,0);
controls.update();

//add sun
var geometry = new THREE.SphereGeometry(1,10,10);
// var material = new THREE.MeshBasicMaterial({color: 0xffff33});
var material = new THREE.MeshPhongMaterial({color: 0xffff33});
var sun = new THREE.Mesh(geometry, material);
scene.add(sun);

//earth
var eathGeo = new THREE.SphereGeometry(1, 10, 10);
// var earthMaterial = new THREE.MeshBasicMaterial({color: 0x3333ff});
var earthMaterial = new THREE.MeshPhongMaterial({color: 0x3333ff});
var earth = new THREE.Mesh(eathGeo, earthMaterial);
sun.add(earth);
earth.position.set(5,0,0);
earth.scale.set(0.5,0.5,0.5);
earth.rotation.x+=0.3;

//moon
var moonGeo = new THREE.SphereGeometry(1, 10, 10);
// var moonMaterial = new THREE.MeshBasicMaterial({color: 0x555555});
var moonMaterial = new THREE.MeshPhongMaterial({color: 0x555555});
var moon = new THREE.Mesh(moonGeo, moonMaterial);
earth.add(moon);
moon.position.set(5,0,0);
moon.scale.set(0.25,0.25,0.25);

//Ambient light
// var ambientLight = new THREE.AmbientLight(0xFF6666);
// scene.add(ambientLight);

//Hemisphere Light
var hemisphereLight = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 0.5); // color dari langit, color dari tanah, intensitas
scene.add(hemisphereLight);

//Directional light
var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 10);
directionalLight.position.set(3,3,3);//posisi e dimana
directionalLight.target.position.set(0,0,0);//arah e kemana
scene.add(directionalLight);
scene.add(directionalLight.target);

// buat ngasi liat light source dari mana kemana
var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);


//point light
var pointLight = new THREE.PointLight(0xFFFF11, 150);
sun.add(pointLight);

//spot Light
var spotlight = new THREE.SpotLight(0xFF1111, 200, 1000, 5, 10);// warna, intensitas, jarak, sudut, penumbra
moon.add(spotlight);
earth.add(spotlight.target);
moon.add(new THREE.SpotLightHelper(spotlight));

//Ambil objek dari asset
new MTLLoader()
			.setPath( 'bridge/' )
				.load( 'Door.mtl', function ( materials ) {

						materials.preload();

						new OBJLoader()
							.setMaterials( materials )
							.setPath( 'bridge/' )
							.load( 'Door.obj', function ( object ) {
								earth.add( object );
                                object.scale.set(0.1,0.1,0.1);
                                object.position.set(-3,0,0);

							}, );
                        } );

//loop Animate
function animate(){
    renderer.render(scene, camera);
    sun.rotation.y += 0.01;
    earth.rotation.y += 0.05
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);