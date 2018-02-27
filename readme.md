# Assignments Delete Unwanted
### *Package Name*: assignments-delete-unwanted
### *Child Type*: Post import
### *Platform*: online
### *Required*: Required

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose
This child module deletes unwanted assignments from the course. It uses an array of regular expressions to find all assignments which need to be removed and deletes them.

## How to Install

```
npm install assignments-delete-unwanted
```

## Run Requirements
This child module requires the following fields in the course.info object:
* `canvasOU`

## Options
None

## Outputs
None

## Process

Describe in steps how the module accomplishes its goals.

1. get all assignments
2. filter by assignment name
3. delete assignments

## Log Categories
Categories used in logging data in this module:
- Deleted Assignments

## Requirements
Delete assignments who's name contains [CO~#]. 