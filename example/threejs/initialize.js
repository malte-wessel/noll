import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    AmbientLight,
    PointLight,
    TorusKnotGeometry,
    MeshStandardMaterial,
    Mesh
} from 'three';

export default function initialize(canvas) {
    const { width, height } = canvas;
    const renderer = new WebGLRenderer({ canvas, antialias: true });

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, width / height, 0.1, 50);
    camera.position.z = 30;

    const ambientLight = new AmbientLight(0x000000);
    scene.add(ambientLight);

    const lights = [];
    lights[0] = new PointLight(0xffffff, 1, 0);
    lights[1] = new PointLight(0xffffff, 1, 0);
    lights[2] = new PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    const geometry = new TorusKnotGeometry(5, 2, 256, 16);
    const material = new MeshStandardMaterial({
        color: 0x550000,
        roughness: 0.1,
        metalness: 0.5
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    function dispose() {
        geometry.dispose();
        material.dispose();
        renderer.dispose();
    }

    return {
        material,
        mesh,
        scene,
        camera,
        renderer,
        dispose
    };
}
