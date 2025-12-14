// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', init);

let scene, camera, renderer, particles, sphere, torus;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {
    // Setup Three.js scene
    setupScene();
    setupCamera();
    setupRenderer();
    setupLights();
    createParticles();
    create3DObjects();
    
    // Add event listeners
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);
    
    // Setup smooth scroll
    setupSmoothScroll();
    
    // Start animation loop
    animate();
    
    // Hide loading screen after a short delay
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);
}

function setupScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0f172a, 1, 1000);
}

function setupCamera() {
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
}

function setupRenderer() {
    const canvas = document.getElementById('canvas3d');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function setupLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Point lights for dynamic lighting
    const pointLight1 = new THREE.PointLight(0x6366f1, 2, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xec4899, 2, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x14b8a6, 1.5, 100);
    pointLight3.position.set(0, 10, -10);
    scene.add(pointLight3);
}

function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
}

function create3DObjects() {
    // Create a glowing sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        emissive: 0x6366f1,
        emissiveIntensity: 0.5,
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-3, 0, -5);
    scene.add(sphere);
    
    // Create a glowing torus
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0xec4899,
        emissive: 0xec4899,
        emissiveIntensity: 0.5,
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });
    torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(3, 0, -5);
    scene.add(torus);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
    }
    
    // Rotate 3D objects
    if (sphere) {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
    }
    
    if (torus) {
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.02;
    }
    
    // Camera follows mouse with smooth interpolation
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    // Render the scene
    renderer.render(scene, camera);
}

function setupSmoothScroll() {
    // Smooth scroll for explore button
    const exploreBtn = document.getElementById('exploreBtn');
    const featuresSection = document.getElementById('features');
    
    if (exploreBtn && featuresSection) {
        exploreBtn.addEventListener('click', () => {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Add tilt effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card[data-tilt]');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Add scroll-based parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (camera) {
        camera.position.z = 5 + scrolled * 0.005;
    }
});
