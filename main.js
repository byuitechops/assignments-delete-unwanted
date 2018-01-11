/*eslint-env node, es6*/

/* Module Description */

/* Put dependencies here */
const canvas = require('canvas-wrapper'),
    asyncLib = require('async');


module.exports = (course, stepCallback) => {
    /* array of regEx assignment types to delete */
    var tests = [
        /\[co~\d*\]/i
    ];

    course.addModuleReport('assignments-delete-unwanted');

    /**********************************************
     * gets all assignments in course, and filters
     * them according to tests array
     **********************************************/
    canvas.getAssignments(course.info.canvasOU, (err, assignments) => {
        var assignmentsToDelete = assignments.filter((assignment) => {
            var toDelete = false; //true to delete
            tests.forEach((test) => {
                if (test.test(assignment.name))
                    toDelete = true;
            });
            return toDelete;
        });
    });
};
