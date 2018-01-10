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

    /******************************
     * deletes a single assignment
     ******************************/
    function deleteAssignment(assignment, cb) {
        canvas.delete(`/api/v1/courses/${course.info.canvasOU}/assignments/${assignment.id}`, (err) => {
            if (err) {
                cb(err);
                return;
            }
            course.success('assignments-delete-unwanted', `assignments-delete-unwanted deleted ${assignment.name}`);
            cb(null);
        });
    }

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
        asyncLib.each(assignmentsToDelete, deleteAssignment, (err) => {
            if (err) {
                course.throwErr('assignments-delete-unwanted', err);
            }
            stepCallback(null, course);
        });
    });
};
