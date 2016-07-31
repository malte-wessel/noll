function circle(ctx, center, r = 10, color = 'black') {
    ctx.beginPath();
    ctx.arc(center[0], center[1], r, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

function line(ctx, p1, p2, width = 5, color = 'black', lineCap = 'round') {
    ctx.lineCap = lineCap;
    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function rect(ctx, p, width = 1, height = 1, color = 'black') {
    ctx.fillStyle = color;
    ctx.fillRect(p[0], p[1], width, height);
}

function renderTree(ctx, node, maxDepth, color) {
    const position = node.getPosition();
    const children = node.getChildren();
    // if (!children.length) circle(ctx, position, 3, 'black');
    children.forEach(child => {
        const childPosition = child.getPosition();
        const childDepth = child.getDepth();
        line(ctx, position, childPosition, 5 - (3 / maxDepth * childDepth), color);
        renderTree(ctx, child, maxDepth, color);
    });
}

function getMaxDepth(root) {
    let max = 0;
    function walk(node) {
        const depth = node.getDepth();
        const children = node.getChildren();
        if (depth > max) max = depth;
        children.forEach(walk);
    }
    walk(root);
    return max;
}

const palettes = {
    light: ['white', 'black'],
    dark: ['black', 'white']
};

export default function render(canvas, options) {
    const {
        palette,
        roots,
        seeds,
        showSeeds,
        radiusOfInfluence,
        showRadiusOfInfluence
    } = options;

    const colors = palettes[palette];
    const [background, foreground] = colors;

    const { width, height } = canvas;
    const ctx = canvas.getContext('2d');
    rect(ctx, [0, 0], width, height, background);
    roots.forEach(root => {
        const maxDepth = getMaxDepth(root);
        renderTree(ctx, root, maxDepth, foreground);
    });

    if (showRadiusOfInfluence) {
        seeds.visit(({ data: point }) => {
            if (!point) return;
            circle(ctx, point, radiusOfInfluence, 'rgba(0, 200, 150, 0.05)');
        });
    }
    if (showSeeds) {
        seeds.visit(({ data: point }) => {
            if (!point) return;
            rect(ctx, point, 1, 1, foreground);
        });
    }
}
