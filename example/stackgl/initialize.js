import createCamera from 'turntable-camera';
import createContext from 'webgl-context';
import createGeometry from 'gl-geometry';
import createShader from 'gl-shader';
import mat4 from 'gl-mat4';
import wire from 'gl-wireframe';
import bunny from 'bunny';

import vert from './shaders/bunny.vert';
import frag from './shaders/bunny.frag';

export default function initialize(canvas) {
    const { width, height } = canvas;
    const gl = createContext({ canvas, width, height, antialias: true });

    const camera = createCamera();
    camera.center[1] = 0;
    camera.downwards = Math.PI * 0.25 * Math.sin(Date.now() * 0.001);

    const geometry = createGeometry(gl);
    const { positions, cells } = bunny;
    geometry.attr('position', positions);
    geometry.faces(wire(cells));

    // Create the base matrices to be used when rendering the bunny
    const projection = mat4.create();
    const view = mat4.create();

    // Pulls up our shader code
    const shader = createShader(gl, vert, frag);

    return { gl, geometry, camera, projection, view, shader };
}
