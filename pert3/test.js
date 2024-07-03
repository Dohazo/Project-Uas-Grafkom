import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// Setup Canvas Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


let creativeMode = false;

// Setup Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 4, 5);  // Tinggi kamera dari tanah


// Create character box and attach camera to it
const characterGeometry = new THREE.BoxGeometry(1, 2, 1);
const characterMaterial = new THREE.MeshBasicMaterial({ color: 0x112200 });
const character = new THREE.Mesh(characterGeometry, characterMaterial);
character.add(camera);

camera.position.set(0, 0.1, 0); 
character.position.set(30,1,30) // Position camera inside the character
character.scale.set(3,3,3) // Position camera inside the character
scene.add(character);

// Tambahkan dasar plane
const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI / 2;
scene.add(plane);


// // add box
// const boxGeo = new THREE.BoxGeometry( 1, 1, 1 ); 
// const boxMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
// const cube = new THREE.Mesh( boxGeo, boxMaterial ); 
// camera.add(cube)
// Array untuk menyimpan semua objek collision box
const collisionBoxes = [];

// Fungsi untuk membuat collision box
function createCollisionBox(position) {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.7 });
    const collisionBox = new THREE.Mesh(boxGeometry, boxMaterial);
    collisionBox.position.copy(position); // Set posisi collision box
    collisionBox.scale.set(10, 10, 10); // Scale sesuai kebutuhan
    scene.add(collisionBox);
    collisionBoxes.push(collisionBox); // Tambahkan ke array collisionBoxes
       // Add BoxHelper to visualize the collision box
       const boxHelper = new THREE.BoxHelper(collisionBox, 0x0000ff);
       scene.add(boxHelper);
}

createCollisionBox(new THREE.Vector3(0, 1, 0));
createCollisionBox(new THREE.Vector3(10, 1, 10));
createCollisionBox(new THREE.Vector3(-10, 1, 10));
createCollisionBox(new THREE.Vector3(-20, 1, 10));
createCollisionBox(new THREE.Vector3(-10, 1, 20));
createCollisionBox(new THREE.Vector3(-20, 1, 30));

// // Add a collision box (cube) to the scene
// const boxGeometry = new THREE.BoxGeometry(1, 1, 1);  // Set dimensions as needed
// const boxMateriall = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.7 });
// const collisionBox = new THREE.Mesh(boxGeometry, boxMateriall);
// collisionBox.position.set(0, 1, 0);
// collisionBox.scale.set(10,10,10);// Position it above the ground plane
// scene.add(collisionBox);


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
const moveSpeed = 0.1;  // Adjust movement speed as needed

// Function to get the forward direction
function getForwardVector() {
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    return forward;
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



// Animation loop
function animate() {
    requestAnimationFrame(animate);


    // Calculate the move direction based on camera orientation
    if(!creativeMode){
         forwardVector = getForwardVector();
         rightVector = getRightVector();

    }
    else{
         forwardVector = getForwardVectorCreative();
         rightVector = getRightVectorCreative();
    }

    // controls.moveForward(moveDirection.z * moveSpeed);
    // controls.moveRight(moveDirection.x * moveSpeed);
 // Move character based on direction
 const direction = new THREE.Vector3();
 direction.addScaledVector(forwardVector, moveDirection.z);
 direction.addScaledVector(rightVector, moveDirection.x);

//  controls.getDirection(direction);

  // Calculate the move direction based on controls
//   character.moveForward(moveDirection.z * moveSpeed);
//     character.moveRight(moveDirection.x * moveSpeed);
    // moveDirection.x = direction.x;
    // moveDirection.z = direction.z;

    character.position.addScaledVector(direction, moveSpeed);

    // const cameraBB = new THREE.Box3().setFromObject(camera);

     // Collision detection
     const characterBB = new THREE.Box3().setFromObject(character);

    // const collisionBoxBB = new THREE.Box3().setFromObject(collisionBox);

     // Loop melalui semua collision boxes dan periksa tabrakan
     for (const collisionBox of collisionBoxes) {
        const collisionBoxBB = new THREE.Box3().setFromObject(collisionBox);
        if (collisionBoxBB.intersectsBox(characterBB)) {
            // controls.moveForward(-moveDirection.z * moveSpeed);
            // controls.moveRight(-moveDirection.x * moveSpeed);
            character.position.addScaledVector(direction, -moveSpeed);
            // character.position.addScaledVector(moveDirection, -moveSpeed);
        }
    }
//     // Check for collision and prevent passing through the collision box
//     if (collisionBoxBB.intersectsBox(cameraBB)) {
//         // Adjust camera position or prevent movement as needed
//            controls.moveForward(-moveDirection.z * moveSpeed);  // Example: move back if colliding with the box
//         controls.moveRight(-moveDirection.x * moveSpeed);  // Example: move back if colliding with the box
//  // Example: move back if colliding with the box // Example: move back if colliding with the box
//     }
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
    console.log(event)
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
            creativeMode = true
           }
           else{
            creativeMode = false
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
