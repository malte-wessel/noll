import Node from './Node';
import { add, subtract, scale, normalize, distance } from 'gl-vec2';
import render from './render';

export default function update(canvas, data, values) {
    const { roots, seeds, queue } = data;
    const {
        palette,
        radiusOfInfluence,
        showSeeds,
        showRadiusOfInfluence,
        nodeLength,
        maxDepth,
        maxChilds,
        minSiblingDistance,
        killDistance,
        iterationsPerFrame
    } = values;

    for (let i = 0; queue.length && i < iterationsPerFrame; i++) {
        const node = queue[0];
        const point = node.getPosition();
        const depth = node.getDepth();
        const children = node.getChildren();
        const neighbours = seeds.nearest(point, radiusOfInfluence);

        if (!neighbours.length || children.length > maxChilds || depth > maxDepth) {
            queue.splice(0, 1);
            continue;
        }

        // Normalized vectors to each seed that influences the node
        const directions = neighbours.map(n => normalize([], subtract([], n, point)));
        // These vectors are added and their sum is normalized again
        const sum = directions.reduce((acc, d) => add(acc, acc, d), [0, 0]);
        const average = normalize([], sum);
        const position = add([], point, scale([], average, nodeLength));

        const twins = children.filter(child => distance(position, child.getPosition()) <= minSiblingDistance);
        if (twins.length) {
            queue.splice(0, 1);
            continue;
        }

        const child = new Node(position, depth + 1);
        const childNeighbours = seeds.nearest(position, radiusOfInfluence * killDistance);
        seeds.removeAll(childNeighbours);
        queue.push(child);
        node.addChild(child);
    }

    console.info('Nodes in queue', queue.length);

    render(canvas, {
        palette,
        roots,
        seeds,
        showSeeds,
        radiusOfInfluence,
        showRadiusOfInfluence
    });

    if (!queue.length) return false;
}
