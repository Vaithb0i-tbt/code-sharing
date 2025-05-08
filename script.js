const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("game-container").appendChild(renderer.domElement);

// Add basic lighting
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

// Function to create a voxel cube
function createVoxel(x, y, z) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const voxel = new THREE.Mesh(geometry, material);
    voxel.position.set(x, y, z);
    scene.add(voxel);
}

// Generate a grid of voxels (simple 3x3x3 grid)
for (let x = -5; x < 5; x++) {
    for (let y = -5; y < 5; y++) {
        for (let z = -5; z < 5; z++) {
            createVoxel(x, y, z);
        }
    }
}

// Camera setup
camera.position.z = 20;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the scene for a better view
    scene.rotation.x += 0.01;
    scene.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

// Handle resizing the window
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
