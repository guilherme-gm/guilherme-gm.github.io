---
layout: post
title:  "Git: Patches and Diffs"
date:   2019-06-12 22:10:00 +0000
tags: [git]
---

Hello everybody!

In this post I'll explain a bit about the `patch` and `diff` git commands. Those commands can be used to generate files that contains changes made by one or more commits and may be used to reproduce the changes on other repositories, keep a quick backup and much more.

# Diffs and Patches

As said before, diffs and patches are files that describes changes. Both follows the exact same format and the biggest difference between them is, basically, that **patches stores commits** while **diffs stores changes only**. 

So if, for example, you turn 3 commits into a **patch**, you'll have a file that contains each of these commits, with their respective author, time and commit message, and current changes to the repository will not show up. In the other hand, a **diff** only provides a file with all those changes, without their authors or commit messages and includes current repository changes.

# Working with Diffs and Patches

## Creating

### Diff

In order to create a **diff** file, make some changes to your repository and them run:
```shell
$ git diff > [output.diff]
```

Where `[output.diff]` should be replace by the output file name. This will generate a file like that:

```Diff
diff --git a/src/store/actions.js b/src/store/actions.js
index fee7469..578946f 100644
--- a/src/store/actions.js
+++ b/src/store/actions.js
@@ -3,7 +3,7 @@
 import * as types from './mutation-types';
 
 export const initJokes = ({ commit }) => {
-  fetch('https://official-joke-api.appspot.com/jokes/ten', {
+  fetch('htes/ten', {
     method: 'GET'
   })
     .then(response => response.json())

```

You can also tell git to generate diff from older commits, by giving git the commit from where to start from. For example, to get a diff of the latest commit you can run:
```shell
$ git diff HEAD~1 > [output.diff]
```

### Patches

Patches works in a similar way to commits, but you should instead use:
```shell
$ git format-patch -[n]
```

where `[n]` means how many commits should be exported to patches. Doing it like that will generate one file for each patch, for example:

```Diff
From 814c48b3b41029009cb5e58f81203d1b25cc6759 Mon Sep 17 00:00:00 2001
From: Guilherme Menaldo <a@a.com>
Date: Wed, 12 Jun 2019 21:29:59 -0300
Subject: [PATCH] Add changerepo script

---
 scripts/1-changerepo.sh | 15 +++++++++++++++
 1 file changed, 15 insertions(+)
 create mode 100755 scripts/1-changerepo.sh

diff --git a/scripts/1-changerepo.sh b/scripts/1-changerepo.sh
new file mode 100755
index 0000000..0260aaf
--- /dev/null
+++ b/scripts/1-changerepo.sh
@@ -0,0 +1,15 @@
+#!/bin/bash
+
+# Changes this repository remote to the one given by argument
+
+if [$1 -eq ''] then
+  echo "You must give your new repo url. (e.g. ./1-changerepo.sh https://myrepo.com/ )"
+  return 0;
+fi
```

Note that in this case it also contains the author and commit message. You may also give a commit to tell git where to start from, like that:
```shell
$ git format-patch -2 5d2ec42acc578
```

Tells git to start by generating a patch for `5d2ec42acc578` and the parent (previous) commit of it.

But generating one file for each commit may be a problem, so we can also export multiple commits to one file by doing a small trick:

```shell
$ git format-patch HEAD~2..HEAD --stdout --ignore-all-space > patches.patch
```

In this case we tell git that we want to export commits from `HEAD~2` (2 previous commits) until current commit (`HEAD`) and output it to `stdout` and ignore space changes. This will generate one file with multiple commits and pipe the output to `patches.patch`.

## Applying

Once you have a diff or patch file you may apply them to a git repository so their changes are applied to your files.

### Diff

In order to apply a diff, you must run:
```shell
$ git apply [file.diff]
```

This will apply the changes described in the file and **not** commit them. If there are any conflicts when applying this diff git will rollback and do nothing. You may want to force git apply it and generate a *reject* file when it fails, so you can manually fixes those fails. To do so, run:
```shell
$ git apply [file.diff] --reject
```

The `--reject` argument tells git to generate `.rej` files when it fails to automatically apply the diff so you can open these files (that looks like diff files) and apply them manually.

### Patch

Patches are applied by using the following command:
```shell
$ git am [file.patch]
```

Running it will create all the commits contained in your patch file, preserving their author's and commit's messages.

Differently than `git apply`, when a commit conflicts the process gets paused and you are required to manually apply the commit and then use `git am --continue`.

# Conclusion

I hope this brief tutorial could teach you a bit about using **diffs** and **patches** on git so you can now generate them and also automatically apply them.
