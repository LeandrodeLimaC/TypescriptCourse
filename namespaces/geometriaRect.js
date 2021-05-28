"use strict";
var Geometria;
(function (Geometria) {
    let Area;
    (function (Area) {
        function retangulo(altura, largura) {
            return altura * largura;
        }
        Area.retangulo = retangulo;
    })(Area = Geometria.Area || (Geometria.Area = {}));
})(Geometria || (Geometria = {}));
//# sourceMappingURL=geometriaRect.js.map