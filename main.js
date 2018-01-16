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

    /* set timeout is for testing. The API returns 0 assignments without it */
    // setTimeout(() => {

    /**********************************************
     * gets all assignments in course, and filters
     * them according to tests array
     **********************************************/
    canvas.getAssignments(course.info.canvasOU, (err, assignments) => {
        if (err) {
            course.throwErr('assignments-delete-unwanted', err);
            stepCallback(null, course);
            return;
        }
        console.log(`Assignments found: ${assignments.length}`);
        var assignmentsToDelete = assignments.filter((assignment) => {
            // console.log('assignment:', JSON.stringify(assignment, null, 2));
            /* This should be the same as the code below */
            return tests.some((regex) => {
                return regex.test(assignment.name);
            });
        });

        console.log(`Assignments to delete: ${assignmentsToDelete.length}`);
        asyncLib.each(assignmentsToDelete, deleteAssignment, (err) => {
            if (err) {
                course.throwErr('assignments-delete-unwanted', err);
            }
            stepCallback(null, course);
        });
    });
    // }, 15000);
};