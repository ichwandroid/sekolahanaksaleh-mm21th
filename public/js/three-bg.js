/**
 * Three.js Background Animation
 * Adds a premium floating particle/shape effect to the background.
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initThreeBackground();
});

function initThreeBackground() {
    const container = document.createElement('div');
    container.id = 'three-bg-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '0'; // Behind content but visible on bg
    container.style.pointerEvents = 'none'; // Allow clicks to pass through
    container.style.overflow = 'hidden';
    document.body.prepend(container);

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Check for dark mode to adjust colors
    const isDarkMode = document.documentElement.classList.contains('dark');
    const primaryColor = 0xed845e; // #ed845e
    const secondaryColor = isDarkMode ? 0xffffff : 0xed845e;

    // Objects
    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.5,
        metalness: 0.1,
        transparent: true,
        opacity: 0.6,
        flatShading: true
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: secondaryColor,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });

    const particles = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
        mesh.add(wireframe);

        // Random position
        mesh.position.x = (Math.random() - 0.5) * 40;
        mesh.position.y = (Math.random() - 0.5) * 40;
        mesh.position.z = (Math.random() - 0.5) * 20;

        // Random rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        // Random scale
        const scale = Math.random() * 2 + 0.5;
        mesh.scale.set(scale, scale, scale);

        // Custom velocity properties
        mesh.userData = {
            velX: (Math.random() - 0.5) * 0.02,
            velY: (Math.random() - 0.5) * 0.02,
            rotVelX: (Math.random() - 0.5) * 0.01,
            rotVelY: (Math.random() - 0.5) * 0.01
        };

        group.add(mesh);
        particles.push(mesh);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(primaryColor, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-10, 10, 5);
    scene.add(directionalLight);

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        particles.forEach(mesh => {
            mesh.position.x += mesh.userData.velX;
            mesh.position.y += mesh.userData.velY;
            mesh.rotation.x += mesh.userData.rotVelX;
            mesh.rotation.y += mesh.userData.rotVelY;

            // Boundaries check to loop particles
            if (mesh.position.y > 25) mesh.position.y = -25;
            if (mesh.position.y < -25) mesh.position.y = 25;
            if (mesh.position.x > 35) mesh.position.x = -35;
            if (mesh.position.x < -35) mesh.position.x = 35;
        });

        // Gentle camera sway
        const time = Date.now() * 0.0005;
        camera.position.x = Math.sin(time) * 2;
        camera.position.y = Math.cos(time * 0.8) * 2;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
