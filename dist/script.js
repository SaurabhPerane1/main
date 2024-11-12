import * as THREE from '../three.js-master/build/three.module.js';
import { OrbitControls } from '../three.js-master/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from '../three.js-master/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from '../three.js-master/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, geometry, material, mesh, renderer;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.5;

scene.add(camera);

const canvas = document.querySelector('canvas');
renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize( 600, 300);
renderer.setClearColor(0xffffff, 1);
renderer.render( scene, camera );
const rgbeLoader = new RGBELoader();
rgbeLoader.load('wrestling_gym_1k.hdr', function (texture){
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
});
const loader = new GLTFLoader();
loader.load('dumbbell.glb', function (gltf) {
    const model = gltf.scene;
    scene.add(gltf.scene);
    model.position.x = 0;
    model.rotation.y = 1;
});
const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.autoRotate = true;
controls.autoRotateSpeed = 20;
window.addEventListener('resize', () => {
    renderer.setSize(600, 300);
    camera.aspect = 600 / 300;
    camera.updateProjectionMatrix();
});

function animate(){
    window.requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();