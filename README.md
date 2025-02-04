Simple workflow for building and maintaining codebase

# Pull request release branch
## need naming convention release/major.minor.patch
## for mileston map to release notes release/major.minor.patch/milestone#
1. (optional) Update version files in root directory
    with sync use update version to increase version number when syncing
2. Run test cases
3. Run Builds
4. if version file updated. push changes to current release branch
5. release branch release/major.minor.patch. the version in branch name should match
  versions in package.json, VERSION and other files. Version modifications done manually.


# On Push to Main
1. Create tag
2. Create release draft with release drafter
    Make sure release branch code request has links to relavent issues via Fixes: #issue1, #issue2, etc.
3. Create pull request to dev and automatically merge if possible
4. Push packages/images to repositories with tag as new name
5. (Optional) Build and deploy backages to hosting sites. Possibly deploy code or docker to vm or web app? Webhook?
    release-drafter
6. (Optional add to 5 if Mileston number present) Milestone Link. Probably link manual or add or add to footer pass as footer string
    footer: |
      ### Milestone
      [View Milestone](https://github.com/${{ github.repository }}/milestone/${{ github.event.milestone.number }})

# Tools
## Test GitHub Actions
1. fork code and run tests on cloned repo for github actions

## For NGINX use envsubst to manage different enviornments
export APP_URL=production.example.com
envsubst < nginx.conf.template > nginx.conf

## Release Drafter
in github actions used to automatically create release from tagged issues

## dependabot