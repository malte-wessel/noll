import mat4 from 'gl-mat4';

export default function update(canvas, data) {
    const { width, height } = canvas;
    const { gl, geometry, camera, projection, view, shader } = data;

    // Updates our camera view matrix.
    camera.rotation = Date.now() * 0.0004;
    camera.downwards = Math.PI * 0.25 * Math.sin(Date.now() * 0.001);
    camera.view(view);

    // Update our projection matrix. This is the bit that's
    // responsible for taking 3D coordinates and projecting
    // them into 2D screen space.
    const aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    const fieldOfView = Math.PI / 4;
    const near = 0.01;
    const far = 100;
    mat4.perspective(projection, fieldOfView, aspectRatio, near, far);

    // Sets the viewport, i.e. tells WebGL to draw the
    // scene across the full canvas.
    gl.viewport(0, 0, width, height);

    geometry.bind(shader);
    shader.uniforms.proj = projection;
    shader.uniforms.view = view;
    geometry.draw(gl.LINES);
}
