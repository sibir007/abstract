# Fork git repos



```sh
## Fork originl repos on github

##  Cloning your forked repository
$ git clone https://github.com/YOUR-USERNAME/Spoon-Knife
$ git remote -v
> origin  https://github.com/YOUR-USERNAME/YOUR-FORK.git (fetch)
> origin  https://github.com/YOUR-USERNAME/YOUR-FORK.git (push)


## Configuring Git to sync your fork with the upstream repository
$ git remote add upstream https://github.com/ORIGINAL-OWNER/Spoon-Knife.git

$ git remote -v
> origin    https://github.com/YOUR-USERNAME/YOUR-FORK.git (fetch)
> origin    https://github.com/YOUR-USERNAME/YOUR-FORK.git (push)
> upstream  https://github.com/ORIGINAL-OWNER/ORIGINAL-REPOSITORY.git (fetch)
> upstream  https://github.com/ORIGINAL-OWNER/ORIGINAL-REPOSITORY.git (push)


## Syncing a fork branch from the command line
$ git fetch upstream
> remote: Counting objects: 75, done.
> remote: Compressing objects: 100% (53/53), done.
> remote: Total 62 (delta 27), reused 44 (delta 9)
> Unpacking objects: 100% (62/62), done.
> From https://github.com/ORIGINAL-OWNER/ORIGINAL-REPOSITORY
>  * [new branch]      main     -> upstream/main

$ git checkout main
> Switched to branch 'main'

$ git merge upstream/main
> Updating a422352..5fdff0f
> Fast-forward
>  README                    |    9 -------
>  README.md                 |    7 ++++++
>  2 files changed, 7 insertions(+), 9 deletions(-)
>  delete mode 100644 README
>  create mode 100644 README.md
#If your local branch didn't have any unique commits, Git will perform a fast-forward. For more information, see Basic Branching and Merging in the Git documentation.

$ git merge upstream/main
> Updating 34e91da..16c56ad
> Fast-forward
>  README.md                 |    5 +++--
>  1 file changed, 3 insertions(+), 2 deletions(-)