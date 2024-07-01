import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// Setup Canvas Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setup Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);  // Tinggi kamera dari tanah

// Tambahkan dasar plane
const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI / 2;
scene.add(plane);


// add box
const boxGeo = new THREE.BoxGeometry( 1, 1, 1 ); 
const boxMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( boxGeo, boxMaterial ); 
camera.add(cube)



// Add a collision box (cube) to the scene
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);  // Set dimensions as needed
const boxMateriall = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.7 });
const collisionBox = new THREE.Mesh(boxGeometry, boxMateriall);
collisionBox.position.set(0, 1, 0);
collisionBox.scale.set(10,10,10);// Position it above the ground plane
scene.add(collisionBox);


// Pointer Lock Controls
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
const moveDirection = new THREE.Vector3();  // Vector to store movement direction
const moveSpeed = 0.5;  // Adjust movement speed as needed

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.moveForward(moveDirection.z * moveSpeed);
    controls.moveRight(moveDirection.x * moveSpeed);
 

    const cameraBB = new THREE.Box3().setFromObject(camera);
    const collisionBoxBB = new THREE.Box3().setFromObject(collisionBox);

    // Check for collision and prevent passing through the collision box
    if (collisionBoxBB.intersectsBox(cameraBB)) {
        // Adjust camera position or prevent movement as needed
           controls.moveForward(-moveDirection.z * moveSpeed);  // Example: move back if colliding with the box
        controls.moveRight(-moveDirection.x * moveSpeed);  // Example: move back if colliding with the box
 // Example: move back if colliding with the box // Example: move back if colliding with the box
    }
    renderer.render(scene, camera);
}

animate();


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// Basic movement

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
