export default function update(canvas, data) {
    const { mesh, scene, camera, renderer } = data;
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera);
}
