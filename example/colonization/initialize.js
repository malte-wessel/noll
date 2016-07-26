import times from 'lodash/times';
import Node from './Node';
import createQuadTree from '../lib/createQuadTree';

function getRandomPointsCircle(cx, cy, r, n) {
    return times(n, () => {
        const x = Math.random() * 2 * r - r;
        const ylim = Math.sqrt(r * r - x * x);
        const y = Math.random() * 2 * ylim - ylim;
        return [cx + x, cy + y];
    });
}

export default function initialize(canvas, values) {
    const { width, height } = canvas;
    const { rootsCount, seedsCount } = values;

    const cx = width / 2;
    const cy = height / 2;
    const r = width / 3;

    const seedsRaw = getRandomPointsCircle(cx, cy, r, seedsCount);
    const seeds = createQuadTree(seedsRaw);

    const roots = getRandomPointsCircle(cx, cy, r, rootsCount).map(p => new Node(p));
    const queue = [...roots];

    return { seeds, roots, queue };
}
