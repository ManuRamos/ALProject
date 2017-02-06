/*
Flot plugin that adds some extra symbols for plotting points.

The symbols are accessed as strings through the standard symbol
choice:

  series: {
      points: {
          symbol: "square" // or "diamond", "triangle", "cross"
      }
  }

*/


(function ($) {
    function processRawData(plot, series, datapoints) {
        // we normalize the area of each symbol so it is approximately the
        // same as a circle of the given radius

        var handlers = {
            square: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = (2s)^2  =>  s = r * sqrt(pi)/2
                var size = radius * Math.sqrt(Math.PI) / 2;
                ctx.rect(x - size, y - size, size + size, size + size);
            },
            diamond: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = 2s^2  =>  s = r * sqrt(pi/2)
                var size = radius * Math.sqrt(Math.PI / 2);
                ctx.moveTo(x - size, y);
                ctx.lineTo(x, y - size);
                ctx.lineTo(x + size, y);
                ctx.lineTo(x, y + size);
                ctx.lineTo(x - size, y);
            },
            triangle: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = 1/2 * s^2 * sin (pi / 3)  =>  s = r * sqrt(2 * pi / sin(pi / 3))
                var size = radius * Math.sqrt(2 * Math.PI / Math.sin(Math.PI / 3));
                var height = size * Math.sin(Math.PI / 3);
                ctx.moveTo(x - size/2, y + height/2);
                ctx.lineTo(x + size/2, y + height/2);
                if (!shadow) {
                    ctx.lineTo(x, y - height/2);
                    ctx.lineTo(x - size/2, y + height/2);
                }
            },
            trianglePD: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = 1/2 * s^2 * sin (pi / 3)  =>  s = r * sqrt(2 * pi / sin(pi / 3))
                var size = radius * Math.sqrt(2 * Math.PI / Math.sin(Math.PI / 3));
                var height = size * Math.sin(Math.PI / 3);
                ctx.moveTo(x + height/2, y);
                ctx.lineTo(x - height/2, y - size/2);
                ctx.lineTo(x - height/2, y + size/2);
                ctx.lineTo(x + height/2, y);

            },
            trianglePI: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = 1/2 * s^2 * sin (pi / 3)  =>  s = r * sqrt(2 * pi / sin(pi / 3))
                var size = radius * Math.sqrt(2 * Math.PI / Math.sin(Math.PI / 3));
                var height = size * Math.sin(Math.PI / 3);
                ctx.moveTo(x - height/2, y);
                ctx.lineTo(x + height/2, y - size/2);
                ctx.lineTo(x + height/2, y + size/2 );
                /*ctx.lineTo(x - height/2, y - size/2);*/
            },trianglePAB: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = 1/2 * s^2 * sin (pi / 3)  =>  s = r * sqrt(2 * pi / sin(pi / 3))
                var size = radius * Math.sqrt(2 * Math.PI / Math.sin(Math.PI / 3));
                var height = size * Math.sin(Math.PI / 3);
                ctx.moveTo(x + size/2, y);
                ctx.lineTo(x - size/2, y);
                ctx.lineTo(x , y + height);
            },
            blade: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = (2s)^2  =>  s = r * sqrt(pi)/2
                var size = (radius * Math.sqrt(Math.PI) / 2)*2;
                ctx.moveTo(x - size, y - size);
                ctx.lineTo(x + size, y + size);
                ctx.moveTo(x - size, y + size);
                ctx.lineTo(x + size, y - size);
            },
            rectangleHO: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = (2s)^2  =>  s = r * sqrt(pi)/2
                var size = radius * Math.sqrt(Math.PI) / 2;
                var height = size * Math.sin(Math.PI / 3);
                var recta = size*2;
                ctx.moveTo(x - recta , y);
                ctx.lineTo(x + recta, y);
                ctx.lineTo(x + recta , y + recta);
                ctx.lineTo(x - recta , y + recta);
            },
            rectangleVER: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = (2s)^2  =>  s = r * sqrt(pi)/2
                var size = radius * Math.sqrt(Math.PI) / 2;
                var height = size * Math.sin(Math.PI / 3);
                var recta = size*2;
                ctx.moveTo(x  , y - recta);
                ctx.lineTo(x , y + recta);
                ctx.lineTo(x + recta , y + recta);
                ctx.lineTo(x + recta , y - recta);
            },
            cross: function (ctx, x, y, radius, shadow) {
                var size = (radius * Math.sqrt(Math.PI) / 2)*2;
                var prueba = size*1.5;
                ctx.moveTo(x - prueba, y);
                ctx.lineTo(x + prueba, y );
                ctx.moveTo(x - (prueba/40), y);
                ctx.lineTo(x, y-prueba);
                ctx.lineTo(x, y+prueba);
            }
            //Círculo implementado ref : "circle"
        }

        var s = series.points.symbol;
        if (handlers[s])
            series.points.symbol = handlers[s];
    }
    
    function init(plot) {
        plot.hooks.processDatapoints.push(processRawData);
    }
    
    $.plot.plugins.push({
        init: init,
        name: 'symbols',
        version: '1.0'
    });
})(jQuery);


