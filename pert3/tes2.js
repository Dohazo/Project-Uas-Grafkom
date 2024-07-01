import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

// Setup Canvas Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setup Scene
const scene = new THREE.Scene();

// Create a group to hold camera and cube
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Setup Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 0); // Tinggi kamera dari tanah
cameraGroup.add(camera);

// Tambahkan dasar plane
const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Create a box (character)
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 1, 0); // Set initial position of the box (character)
cameraGroup.add(box);

// Create a collision box
const collisionBoxGeometry = new THREE.BoxGeometry(1, 2, 1); // Customize as needed
const collisionBoxMaterial = new THREE.MeshBasicMaterial({ visible: false }); // Invisible for visualization
const collisionBox = new THREE.Mesh(collisionBoxGeometry, collisionBoxMaterial);
collisionBox.position.copy(box.position); // Set initial position same as box
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
const moveDirection = new THREE.Vector3(); // Vector to store movement direction
const moveSpeed = 0.1; // Adjust movement speed as needed

// Store previous box position
const previousPosition = new THREE.Vector3();

// Function to check collision between box and collision box
function checkCollision() {
    const boxBB = new THREE.Box3().setFromObject(box);
    const collisionBoxBB = new THREE.Box3().setFromObject(collisionBox);

    return collisionBoxBB.intersectsBox(boxBB);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Store previous position
    previousPosition.copy(box.position);

    // Move the box (character) based on controls
    controls.moveForward(moveDirection.z * moveSpeed);
    controls.moveRight(moveDirection.x * moveSpeed);

    // Check for collision and prevent passing through the collision box
    if (checkCollision()) {
        // Revert to previous position if colliding
        box.position.copy(previousPosition);
    } else {
        // Update collision box position to match box position
        collisionBox.position.copy(box.position);
    }

    renderer.render(scene, camera);
}

animate();

// Handle window resize
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
