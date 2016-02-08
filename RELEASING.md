# Release Tasks / Steps
The release tasks are are:

1. Code Review for all merges/commits:
  - Merge changes and test individually

2. When ready to release, do a clean run:
  - Validate code state 
    - Clean node_modules with rimraf
    - npm install
    - gulp
  - Gulp should pass with all tasks succeeding.

3. Update package.json to reflect new version:
  - Major if substantial breaking API changes
  - Minor if small-breaking/new features introduced.
  - Patch if no contradiction to published behaviours (i.e. fixes)

4. Check in new files to GitHub:
  - package.json
  - examples/****/*.*

5. Publish:
  - npm publish
  - Use the [ESDoc Publish](https://doc.esdoc.org/-/generate.html) site to update.

