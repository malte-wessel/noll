import { quadtree } from 'd3-quadtree';
import { distance } from 'gl-vec2';

export default function createQuadTree(points) {
    const tree = quadtree(points).addAll(points);

    function preselect(x0, y0, x3, y3) {
        const candidates = [];
        tree.visit(({ data: point }, x1, y1, x2, y2) => {
            if (point) {
                const match = (point[0] >= x0) && (point[0] < x3) && (point[1] >= y0) && (point[1] < y3);
                if (match) candidates.push(point);
            }
            return x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0;
        });
        return candidates;
    }

    function nearest(point, d, k) {
        const candidates = preselect(
            point[0] - d, point[1] - d,
            point[0] + d, point[1] + d
        );
        return candidates
            .filter(c => d > distance(c, point))
            .sort((a, b) => distance(a, point) - distance(b, point))
            .slice(0, k);
    }

    function removeAll(...args) {
        tree.removeAll(...args);
    }

    function data() {
        return tree.data();
    }

    function visit(...args) {
        return tree.visit(...args);
    }

    return {
        nearest,
        removeAll,
        data,
        visit
    };
}
