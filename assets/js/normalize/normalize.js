/* jshint maxcomplexity: 100 */

(function (window, undefined) {
    'use strict';

    var normalizeForSearch = function (s) {

        function filter(c) {
            switch (c) {
            case 'æ':
            case 'ä':
                return 'a';

            case 'å':
                return 'aa';

            case 'á':
            case 'à':
            case 'ã':
            case 'â':
                return 'a';

            case 'ç':
            case 'č':
                return 'c';

            case 'é':
            case 'ê':
            case 'è':
            case 'ë':
                return 'e';

            case 'î':
            case 'ï':
            case 'í':
                return 'i';

            case 'œ':
            case 'ö':
                return 'o';

            case 'ó':
            case 'õ':
            case 'ô':
                return 'o';

            case 'ś':
            case 'š':
                return 's';

            case 'ü':
                return 'u';

            case 'ù':
            case 'ú':
                return 'u';

            case 'ß':
                return 'ss';

            case 'ё':
                return 'е';

            case 'ñ':
                return 'n';

            default:
                return c;
            }
        }

        var normalized = '', i, l;
        s = s.toLowerCase();
        for (i = 0, l = s.length; i < l; i = i + 1) {
            normalized = normalized + filter(s.charAt(i));
        }
        return normalized;
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = normalizeForSearch;
    }
    else {
        window.normalizeForSearch = normalizeForSearch;
    }
}(this));
