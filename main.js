/*eslint-env node, es6*/

/* Module Description */

/* Put dependencies here */
 const canvas = require('canvas-wrapper');


module.exports = (course, stepCallback) => {
    course.addModuleReport('assignments-remove-unwanted');

    
    
    
    
    // course.success('assignments-remove-unwanted', 'assignments-remove-unwanted successfully ...');

    // course.throwErr('assignments-remove-unwanted', e);


    stepCallback(null, course);
};
