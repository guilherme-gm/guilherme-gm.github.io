---
layout: post
title:  "Git: Rebase - Rewriting History"
date:   2019-06-12 23:21:00 +0000
tags: [git]
---

Hello everybody!

In this post I'll show you a bit about `git rebase`, this command allows you to rewrite a branch history by replaying all commits over another one ("the base one"). This allows you to change commits order, messsage and also to merge and drop commits.

If you want to follow my steps, clone the [Example Repository](example-repo). During the post I'll point you to run some scripts on its scripts folder to make commits to help you follow the steps.

# Rebase

When you rebase a branch you are touching the commits itself, this is a bit dangerous as messing it may make you lose some commits and have a lot of work to get them back, so **I recommend doing a copy/paste on your first few rebases** just to be sure, once you get confortable with it you can just use it without backups.

One thing that I find it is really important to understand before we dive into rebase it how to use `HEAD` keyword. `HEAD` points to the latest commit (the newest one) on your current branch. From it you are able to reference previous commits by using `~[N]`, for example, the 2nd newest commit would be `HEAD~1` and so on.

Now that you understand that, let's start with rebase. If you are reproducing the steps in this guide, make a branch and do a few commits to it (3 should be enough). If you are using my example repository, run `2-rebase.sh` script it will set you up with:
- a new branch (`rebase-ex`)
- 3 commits to this branch

Let's start rebasing the last 3 commits from our branch over the 4th one, to do that run:
```shell
$git rebase --interactive HEAD~3
```
**Remember:** `HEAD~3` means the 4th newest commit (yeah, the number 3 is a bit confusing, just think it starts on 0)

You'll get something like:

```git
pick a063065 refactor initJokes
pick f5a2c55 refactor tenjokes
pick a2a2021 change type
```

These are the latest 3 commits in our branch, from the oldest (a063065) to the newest (a2a2021). This is the rebase window. If you change the order of these lines and close the file, you are reordering the commits (note that in some cases this may cause a conflict).

Note the `pick` word at the beginning of each lines, this is the command that tells what should be done to the following commit when git is "replaying" it, you can change it to one of the following words:
- `pick`:  Keep commit as is
- `reword`: Keep this commit, but stop to change its message
- `edit`: Keep this commit, but stop so we can modify it (e.g. split it into multiple commits)
- `squash`: "merges" this commit into the previous one (the one above it), and **join** both messages (this is like the "squash and merge" option from github pull requests)
- `fixup`: "merges" this commit into the previous one (the one above it), but **discards** this commit message
- `drop` => Removes this commit forever
- `exec` => not being covered here...

So lets see each of these commands. I'll explain them in a order that we can do everything with only these 3 commits.

## reword

Let's start rewriting the message of the `a2a2021` commit. Edit the 3rd line changing `pick` to `reword`, like this:

```git
pick a063065 refactor initJokes
pick f5a2c55 refactor tenjokes
reword a2a2021 change type
```

And save and quit your editor.

Another window will show up with this commit message, we can write the new message here, e.g. "Type Change" and save and close the editor window.

Now if we run `git log` we can see the new message
```shell
$git log --oneline
	da723fa (HEAD -> rebase-ex) Type Change <------
	f5a2c55 refactor tenjokes
	a063065 refactor initJokes
	814c48b (master) Add changerepo script
	2dccfc7 Add jokester
```

## edit

Now lets go back to the rebase window:
```shell
$git rebase --interactive HEAD~3
```

And lets split commit `a063065` into 2 commits. Change it to `edit` and save/close your editor.

```git
edit a063065 refactor initJokes
pick f5a2c55 refactor tenjokes
pick da723fa Type Change
```

You'll see a message like that:

```shell
$git rebase --interactive HEAD~3
	Stopped at a063065...  refactor initJokes
	You can amend the commit now, with

	  git commit --amend 

	Once you are satisfied with your changes, run

	  git rebase --continue
```

It has stopped at this commit (but commited it) we may now make extra commits, append this commit, etc. Let's add some random changes and commit as a commit called "test":
```shell
$git commit -am "test"
	[detached HEAD 02e50b6] test
	1 file changed, 1 insertion(+), 1 deletion(-)

$git rebase --continue 
	Successfully rebased and updated refs/heads/rebase-ex.
```

After that, once we are ready, we can use:
```shell
$git rebase --continue
```

If we check our log now we have this new commit in the middle of it:
```
ac31d87 (HEAD -> rebase-ex) Type Change
ea05580 refactor tenjokes
02e50b6 test <------------
a063065 refactor initJokes
814c48b (master) Add changerepo script
```

## drop

Let's go back to rebase window (Let's use `HEAD~4` now):
```shell
$git rebase --interactive HEAD~4
```

Now let's say we didn't like that new commit we made, let's remove it, to do that let's change the new commit from `pick` to `drop`, like that:

```git
pick a063065 refactor initJokes
drop 02e50b6 test
pick ea05580 refactor tenjokes
pick ac31d87 Type Change
```

Then save/close your editor and the commit is gone.
```shell
$git log --oneline
	1cb5113 (HEAD -> rebase-ex) Type Change
	7cc48a7 refactor tenjokes
	a063065 refactor initJokes
	814c48b (master) Add changerepo script
```

## squash

Let's go back to rebase window (Let's use `HEAD~3` back again):
```shell
$git rebase --interactive HEAD~3
```

Now we are going to join both "refactor" commits, but keep both messages. So let's change the commit in the middle to `squash`, like that:

```git
pick a063065 refactor initJokes
squash 7cc48a7 refactor tenjokes
pick 1cb5113 Type Change
```

You'll get a window where you can edit the commit message, save/close it.

Then save/close your editor and the commit is gone.
```shell
$git log --oneline
	d185109 (HEAD -> rebase-ex) Type Change
	5a4e896 refactor initJokes
	814c48b (master) Add changerepo script
```

## fixup

Let's go back to rebase window (Let's use `HEAD~2` now):
```shell
$git rebase --interactive HEAD~2
```

Now we are going to join both commits into one, ignoring the message of the newest one. So let's change the commit last commit to `fixup`, like that:

```git
pick 5a4e896 refactor initJokes
fixup d185109 Type Change
```

Then save/close your editor and now you have only 1 commit.
```shell
$git log --oneline
	2b841dc (HEAD -> rebase-ex) refactor initJokes
	814c48b (master) Add changerepo script
```

# Pushing rebased branches and some important notes

If you rebase a branch that was already pushed to a remote, change its commits and after that try to push it again, you'll get an error. This happens because the remote notices that it has commits that you don't and vice-versa, so it assumes that something is wrong, maybe your local branch is out of date, etc. So in order to push this branch you must use the `--force` argument (be cautious!):
```shell
$git push origin rebase-ex --force
```

When you use `--force` it tells the remote to ignore whatever it currently has and push your branch as the true one. This means that if someone else commited to that branch and you don't have this commit, **they'll be gone**. So be cautious whenever you are doing that.

Rebasing pushed commits in branches where there are more more than one person working on it is most of the time a bad idea, so be cautious if you plan to do something like that. Also, **don't** rebase your master, there are only few exceptions to it when using a private repo, but most of the time you should not do it.

# Conclusion

I hope this brief tutorial could teach you a bit about using git **rebase** so you can now make cleaner branches and pull requests.

[example-repo]: https://github.com/guilherme-gm/git-tutorial
