# GIT

## Git Basics

### Getting a Git Repository

`$ git init`
`$ touch SUMMARY.md`
`$ git add SUMMARY.md`
`$ git commit -m 'Initial project version'`

### Cloning an Existing Repository

`$ git clone https://github.com/libgit2/libgit2`
That creates a directory named libgit2, initializes a .git directory inside it, pulls down all the data for that repository, and checks out a working copy of the latest version.

`$ git clone https://github.com/libgit2/libgit2 mylibgit`
clone the repository into a directory named something other than libgit2, you can specify the new directory name as an additional argument

`$ git status`
see your untracked file 

`$ git status -s` Short Status
 `M README` modified files but not yet staged
`MM Rakefile` modified, staged and then modified again
`A  lib/git.rb` new files that have been added to the staging area
`M  lib/simplegit.rb`  modified and staged
`?? LICENSE.txt` New files that aren’t tracked 

### Ignoring Files

`$ cat .gitignore`
`*.[oa]`
`*~`

### Viewing Your Staged and Unstaged Changes

`git diff` compares what is in your working directory with what is in your staging area
`$ git diff --staged` `git diff --cached` are synonyms
compares your staged changes to your last commit

#### Committing Your Changes

`git commit`
`$ git commit -m "Story 182: fix benchmarks for speed"`

#### Skipping the Staging Area

`$ git commit -a -m 'Add new benchmarks'`

#### Removing Files

`$ rm PROJECTS.md`
`$ git rm PROJECTS.md`
`$ git rm log/\*.log`
`$ git rm \*~` removes all files whose names end with a ~

`$ git rm --cached README`
keep the file in your working tree but remove it from your staging area

#### Moving Files

`$ git mv README.md README`
this is equivalent to:
`$ mv README.md README`
`$ git rm README.md`
`$ git add README`

### 2.3 Git Basics - Viewing the Commit History

`$ git log`

`$ git log -p -2`
-p or --patch shows the difference (the patch output) introduced in each commit, -2 limit the number of log entries displayed, show only the last two entries.

`$ git log --stat`
abbreviated stats for each commit

`$ git log --pretty=oneline`
--pretty - changes the log output to formats other than the default. A few prebuilt option values are available for you to use. The oneline value for this option prints each commit on a single line, which is useful if you’re looking at a lot of commits. In addition, the short, full, and fuller values show the output in roughly the same format but with less or more information

#### Limiting Log Output

`$ git log --since=2.weeks`

`$ git log --pretty="%h - %s" --author='Junio C Hamano --since="2008-10-01" --before="2008-11-01" --no-merges -- t/`

### 2.4 Git Basics - Undoing Things

#### Undoing Things

`$ git commit -m 'Initial commit'`
`$ git add forgotten_file`
`$ git commit --amend`

#### Unstaging a Staged File

`$ git add *`
`$ git reset HEAD CONTRIBUTING.md` unstage the CONTRIBUTING.md file

#### Unmodifying a Modified File

CONTRIBUTING.md - modified
`$ git checkout -- CONTRIBUTING.md`
or
`$ git restore CONTRIBUTING.md`
CONTRIBUTING.md - not modified

#### Unstaging a Staged File with git restore

CONTRIBUTING.md - staged
`$ git restore --staged CONTRIBUTING.md`
CONTRIBUTING.md - modified

#### Git Basics - Working with Remotes

##### Showing Your Remotes

`$ git clone https://github.com/schacon/ticgit`
`$ cd ticgit`
`$ git remote`
`origin`

`$ git remote -v` - verbose

##### Adding Remote Repositories

`$ git remote add pb https://github.com/paulboone/ticgit`

`$ git fetch pb`
fetch all the information that Paul has but that you don’t yet have in your repository

#### Fetching and Pulling from Your Remotes

`$ git fetch origin`

If you clone a repository, the command automatically adds that remote repository under the name “origin”. So, git fetch origin fetches any new work that has been pushed to that server since you cloned (or last fetched from) it. It’s important to note that the git fetch command only downloads the data to your local repository — it doesn’t automatically merge it with any of your work or modify what you’re currently working on. You have to merge it manually into your work when you’re ready.

If your current branch is set up to track a remote branch, you can use the `git pull` command to automatically fetch and then merge that remote branch into your current branch. This may be an easier or more comfortable workflow for you; and by default, the git clone command automatically sets up your local master branch to track the remote master branch (or whatever the default branch is called) on the server you cloned from. Running `git pull` generally fetches data from the server you originally cloned from and automatically tries to merge it into the code you’re currently working on.

#### Pushing to Your Remotes

`$ git push origin master`

#### Inspecting a Remote

`$ git remote show origin`

