//const percents = [0,0.5,1];
const getGrad = (ctx, colors, radius) => colors.reduce((gr, color, index) => {
    gr.addColorStop((1/colors.length) * index, color);
    return gr;
}, ctx.createRadialGradient(0,0,radius, 0,0,0));