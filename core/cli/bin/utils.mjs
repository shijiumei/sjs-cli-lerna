// module.exports = function() {
//     console.log('hello utils');
// }

import pathExists from "path-exists";

export function exists(p) {
    return pathExists.sync(p);
}