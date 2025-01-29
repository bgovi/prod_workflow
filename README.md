Simple workflow for building and maintaining codebase




# nginx_cicd

simple api for pythong, node and a postgres server.

Used to create template for full ci/cd pipeline for builds and service deployment


Push to release branch update version (major, minor, patch)
Push to release set new version (x.x.x)

# Pull request release branch (opened or synchronized)
## need naming convention
1. (optional) Update version files in root directory
    with sync use update version to increase version number when syncing
2. Run test cases
3. Run Builds
4. if version file updated. push changes to current release branch

# On Push to Main
Create tag
Create release draft with release drafter
    Make sure release branch code request has links to relavent issues via Fixes: #issue1, #issue2, etc.
Create pull request to dev and automatically merge if possible

Build and deploy backages to hosting sites
Possibly deploy code or docker to vm or web app?
Webhook?


# Create services for testing with docker postgres


# Release Drafter



# Milestone Link
pass as footer string

footer: |
  ### Milestone
  [View Milestone](https://github.com/${{ github.repository }}/milestone/${{ github.event.milestone.number }})


# Tools
## Test GitHub Actions
https://github.com/nektos/act
act

or fork code and run tests on cloned repo

or multistage docker or docker compose test.
exit on complete. how to track logs.

## Release Drafter

## how to autodeploy github pages

## dependabot