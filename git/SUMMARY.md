# GIT

## Git Basics

###  Git Basics 2.1 Getting a Git Repository

#### Initializing a Repository in an Existing Directory

`$ git init`
`$ touch SUMMARY.md`
`$ git add SUMMARY.md`
`$ git commit -m 'Initial project version'`

#### Cloning an Existing Repository

`$ git clone https://github.com/libgit2/libgit2`
That creates a directory named libgit2, initializes a .git directory inside it, pulls down all the data for that repository, and checks out a working copy of the latest version.

`$ git clone https://github.com/libgit2/libgit2 mylibgit`
clone the repository into a directory named something other than libgit2, you can specify the new directory name as an additional argument

### 2.2 Git Basics - Recording Changes to the Repository

Untracked          Unmodified          Modified          Staged
    |-----add file-----|------------------|--------------->|
    |                  |----edit file---->|                |
    |<---remove file---|                  |---stage file-->|
    |                  |<---------------commit-------------|

#### Checking the Status of Your Files

`$ git status`
see your untracked file

`$ git status -s` Short Status
 `M README` modified files but not yet staged
`MM Rakefile` modified, staged and then modified again
`A  lib/git.rb` new files that have been added to the staging area
`M  lib/simplegit.rb`  modified and staged
`?? LICENSE.txt` New files that aren’t tracked 

#### Tracking New Files

```bash
git add README
```

#### Staging Modified Files

```bash
git add CONTRIBUTING.md
```

#### Short Status

`$ git status -s` Short Status
 `M README` modified files but not yet staged
`MM Rakefile` modified, staged and then modified again
`A  lib/git.rb` new files that have been added to the staging area
`M  lib/simplegit.rb`  modified and staged
`?? LICENSE.txt` New files that aren’t tracked 

#### Ignoring Files

`$ cat .gitignore`
`*.[oa]`
`*~`

#### Viewing Your Staged and Unstaged Changes

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

#### 2.5 Git Basics - Working with Remotes

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

#### Renaming and Removing Remotes

`$ git remote rename pb paul`

`$ git remote remove paul`

### 2.6 Git Basics - Tagging

<https://git-scm.com/book/en/v2/Git-Basics-Tagging>

#### Listing Your Tags

```bash
git tag
```

only in looking at the 1.8.5 series,

```bash
git tag -l "v1.8.5*"
```

#### Creating Tags

```bash
git tag -a v1.4 -m "my version 1.4"
```

-m specifies a tagging message

see the tag data

```bash
git show v1.4
```

#### Lightweight Tags

````bash
git tag v1.4-lw # commit checksum stored in a file
````

#### Tagging Later

```bash
git tag -a v1.2 9fceb02 # tagging commit 9fceb02
```

#### Sharing Tags

By default, the git push command doesn’t transfer tags to remote servers. You will have to explicitly push tags to a shared server after you have created them. This process is just like sharing remote branches — you can run ```git push origin <tagname>```

```bash
git push origin v1.5
```

```bash
git push origin --tags # This will transfer all of your tags to the remote server that are not already there
```

#### Deleting Tags

```bash
git tag -d v1.4-lw
```

deleting a tag from a remote server:
first variation

```bash
git push origin :refs/tags/v1.4-lw
```

second (and more intuitive) way to delete a remote tag is with

```bash
git push origin --delete <tagname>
```

#### Checking out Tags

If you want to view the versions of files a tag is pointing to, you can do a git checkout of that tag, although this puts your repository in “detached HEAD” state, which has some ill side effects:

```bash
git checkout v2.0.0
```

In “detached HEAD” state, if you make changes and then create a commit, the tag will stay the same, but your new commit won’t belong to any branch and will be unreachable, except by the exact commit hash. Thus, if you need to make changes — say you’re fixing a bug on an older version, for instance — you will generally want to create a branch:

```bash
git checkout -b version2 v2.0.0
```

### 2.7 Git Basics - Git Aliases

<https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases>

## Git Branching

### 3.1 Git Branching - Branches in a Nutshell

#### Creating a New Branch

```bash
git branch testing
```

where the branch pointers are pointing. This option is called --decorate.

```bash
git log --oneline --decorate
f30ab (HEAD -> master, testing) Add feature #32 - ability to add new formats to the central interface
34ac2 Fix bug #1328 - stack overflow under certain conditions
98ca9 Initial commit
```

#### Switching Branches

```bash
git checkout testing # This moves HEAD to point to the testing branch.
vim test.rb
$ git commit -a -m 'Make a change' #  HEAD branch moves forward when a commit is mad
```

```bash
git checkout master
$ vim test.rb
$ git commit -a -m 'Make other changes'
# print out the history of your commits, showing where your branch pointers are and how your history has diverged
git log --oneline --decorate --graph --all
* c2b9e (HEAD, master) Make other changes
| * 87ab2 (testing) Make a change
|/
* f30ab Add feature #32 - ability to add new formats to the central interface
* 34ac2 Fix bug #1328 - stack overflow under certain conditions
* 98ca9 Initial commit of my project
```

`git checkout -b <newbranchname>` # Creating a new branch and switching to it at the same time

Switch to an existing branch: `git switch testing-branch`.

Create a new branch and switch to it: `git switch -c new-branch`. The -c flag stands for create, you can also use the full flag: --create.

Return to your previously checked out branch: `git switch -`.

### 3.2 Git Branching - Basic Branching and Merging

```bash
# First, let’s say you’re working on your project and have a couple of commits already on the master branch.

# You’ve decided that you’re going to work on issue #53 in whatever issue-tracking system your company uses. To create a new branch and switch to it at the same time, you can run the git checkout command with the -b switch:

git checkout -b iss53
Switched to a new branch "iss53"
```

This is shorthand for:

```bash
git branch iss53
git checkout iss53
```

```bash
# You work on your website and do some commits. Doing so moves the iss53 branch forward, because you have it checked out (that is, your HEAD is pointing to it):

$ vim index.html
$ git commit -a -m 'Create new footer [issue 53]'

# For now, let’s assume you’ve committed all your changes, so you can switch back to your master branch:

$ git checkout master
Switched to branch 'master'

# Next, you have a hotfix to make. Let’s create a hotfix branch on which to work until it’s completed:

$ git checkout -b hotfix
Switched to a new branch 'hotfix'
$ vim index.html
$ git commit -a -m 'Fix broken email address'
[hotfix 1fb7853] Fix broken email address
 1 file changed, 2 insertions(+)

# You can run your tests, make sure the hotfix is what you want, and finally merge the hotfix branch back into your master branch to deploy to production. You do this with the git merge command:

$ git checkout master
$ git merge hotfix
Updating f42c576..3a0874c
Fast-forward
 index.html | 2 ++
 1 file changed, 2 insertions(+)

# After your super-important fix is deployed, you’re ready to switch back to the work you were doing before you were interrupted. However, first you’ll delete the hotfix branch, because you no longer need it — the master branch points at the same place. You can delete it with the -d option to git branch:

$ git branch -d hotfix
Deleted branch hotfix (3a0874c).

# Now you can switch back to your work-in-progress branch on issue #53 and continue working on it.

$ git checkout iss53
Switched to branch "iss53"
$ vim index.html
$ git commit -a -m 'Finish the new footer [issue 53]'
[iss53 ad82d7a] Finish the new footer [issue 53]
1 file changed, 1 insertion(+)
```

#### Basic Merging

```bash
# Suppose you’ve decided that your issue #53 work is complete and ready to be merged into your master branch. In order to do that, you’ll merge your iss53 branch into master, much like you merged your hotfix branch earlier. All you have to do is check out the branch you wish to merge into and then run the git merge command:

$ git checkout master
Switched to branch 'master'
$ git merge iss53
Merge made by the 'recursive' strategy.
index.html |    1 +
1 file changed, 1 insertion(+)

# Now that your work is merged in, you have no further need for the iss53 branch. You can close the issue in your issue-tracking system, and delete the branch:

$ git branch -d iss53
```

#### Basic Merge Conflicts

```bash
# Occasionally, this process doesn’t go smoothly. If you changed the same part of the same file differently in the two branches you’re merging, Git won’t be able to merge them cleanly. If your fix for issue #53 modified the same part of a file as the hotfix branch, you’ll get a merge conflict that looks something like this:

$ git merge iss53
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.

# Git hasn’t automatically created a new merge commit. It has paused the process while you resolve the conflict. If you want to see which files are unmerged at any point after a merge conflict, you can run git status:

$ git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")

Unmerged paths:
  (use "git add <file>..." to mark resolution)

    both modified:      index.html

no changes added to commit (use "git add" and/or "git commit -a")
```

Anything that has merge conflicts and hasn’t been resolved is listed as unmerged. Git adds standard conflict-resolution markers to the files that have conflicts, so you can open them manually and resolve those conflicts. Your file contains a section that looks something like this:

```<<<<<<< HEAD:index.html
<div id="footer">contact : email.support@github.com</div>
=======
<div id="footer">
 please contact us at support@github.com
</div>
>>>>>>> iss53:index.html
```

This means the version in HEAD (your master branch, because that was what you had checked out when you ran your merge command) is the top part of that block (everything above the =======), while the version in your iss53 branch looks like everything in the bottom part. In order to resolve the conflict, you have to either choose one side or the other or merge the contents yourself. For instance, you might resolve this conflict by replacing the entire block with this:

```html
<div id="footer">
please contact us at email.support@github.com
</div>
```

This resolution has a little of each section, and the <<<<<<<, =======, and >>>>>>> lines have been completely removed. After you’ve resolved each of these sections in each conflicted file, run git add on each file to mark it as resolved. Staging the file marks it as resolved in Git.

### 3.3 Git Branching - Branch Management



The git branch command does more than just create and delete branches. If you run it with no arguments, you get a simple listing of your current branches:

```bash
$ git branch
  iss53
* master
  testing
```

To see the last commit on each branch, you can run git branch -v:

```bash
$ git branch -v
  iss53   93b412c Fix javascript issue
* master  7a98805 Merge branch 'iss53'
  testing 782fd34 Add scott to the author list in the readme
```

The useful --merged and --no-merged options can filter this list to branches that you have or have not yet merged into the branch you’re currently on. To see which branches are already merged into the branch you’re on, you can run git branch --merged:

```bash
$ git branch --merged
  iss53
* master
```

To see all the branches that contain work you haven’t yet merged in, you can run git branch --no-merged:

```bash
$ git branch --no-merged
  testing
```

This shows your other branch. Because it contains work that isn’t merged in yet, trying to delete it with git branch -d will fail:

```bash
$ git branch -d testing
error: The branch 'testing' is not fully merged.
If you are sure you want to delete it, run 'git branch -D testing'.
```

#### Changing a branch name

Rename the branch locally with the git branch --move command:

```bash
$ git branch --move bad-branch-name corrected-branch-name
```

This replaces your bad-branch-name with corrected-branch-name, but this change is only local for now. To let others see the corrected branch on the remote, push it:

```bash
$ git push --set-upstream origin corrected-branch-name
```

Now we’ll take a brief look at where we are now:

```bash
$ git branch --all
* corrected-branch-name
  main
  remotes/origin/bad-branch-name
  remotes/origin/corrected-branch-name
  remotes/origin/main
```

Notice that you’re on the branch corrected-branch-name and it’s available on the remote. However, the branch with the bad name is also still present there but you can delete it by executing the following command:

```bash
$ git push origin --delete bad-branch-name
```

#### Changing the master branch name

Rename your local master branch into main with the following command:

```bash
$ git branch --move master main
```

There’s no local master branch anymore, because it’s renamed to the main branch.

To let others see the new main branch, you need to push it to the remote. This makes the renamed branch available on the remote.

```bash
$ git push --set-upstream origin main
```

Now we end up with the following state:

```bash
$ git branch --all
* main
  remotes/origin/HEAD -> origin/master
  remotes/origin/main
  remotes/origin/master
```

Now you have a few more tasks in front of you to complete the transition:

- Any projects that depend on this one will need to update their code and/or configuration.

- Update any test-runner configuration files.

- Adjust build and release scripts.

- Redirect settings on your repo host for things like the repo’s default branch, merge rules, and other things that match branch names.

- Update references to the old branch in documentation.

- Close or merge any pull requests that target the old branch.

After you’ve done all these tasks, and are certain the main branch performs just as the master branch, you can delete the master branch:

```bash
$ git push origin --delete master
```

### 3.4 Git Branching - Branching Workflows

<https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows>

### 3.5 Git Branching - Remote Branches

Remote references are references (pointers) in your remote repositories, including branches, tags, and so on. You can get a full list of remote references explicitly with

`git ls-remote <remote>`

, or

`git remote show <remote>`

for remote branches as well as more information

To synchronize your work with a given remote, you run a

`git fetch <remote>`

let’s assume you have another internal Git server that is used only for development by one of your sprint teams. This server is at git.team1.ourcompany.com. You can add it as a new remote reference to the project you’re currently working on by running the 

`git remote add teamone git://git.team1.ourcompany.com`

Now, you can run

`git fetch teamone`

 to fetch everything the remote `teamone` server has that you don’t have yet. Because that server has a subset of the data your origin server has right now, Git fetches no data but sets a remote-tracking branch called `teamone/master` to point to the commit that `teamone` has as its master branch.

####  Pushing

If you have a branch named `serverfix` that you want to work on with others, you can push it up the same way you pushed your first branch. Run `git push <remote> <branch>`:

```bash
$ git push origin serverfix
Counting objects: 24, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (15/15), done.
Writing objects: 100% (24/24), 1.91 KiB | 0 bytes/s, done.
Total 24 (delta 2), reused 0 (delta 0)
To https://github.com/schacon/simplegit
 * [new branch]      serverfix -> serverfix
```

The next time one of your collaborators fetches from the server, they will get a reference to where the server’s version of serverfix is under the remote branch `origin/serverfix`:

```bash
$ git fetch origin
remote: Counting objects: 7, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 3 (delta 0)
Unpacking objects: 100% (3/3), done.
From https://github.com/schacon/simplegit
 * [new branch]      serverfix    -> origin/serverfix
```

<https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches>
