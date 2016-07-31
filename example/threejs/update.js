import { Color } from 'three';

export default function update(canvas, data, values) {
    const { color, bgcolor } = values;
    const { material, mesh, scene, camera, renderer } = data;
    material.color.setHex(color.replace('#', '0x'));
    renderer.setClearColor(new Color().setHex(bgcolor.replace('#', '0x')));
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera);
}
