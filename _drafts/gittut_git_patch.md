Download my jokester

make a new repo
commit all files

make a branch ex1
change const
commit

change const
diff --> Screenshot from 2019-06-11 21-22-05

diff > file.diff

Screenshot from 2019-06-11 21-23-51

git reset --hard

git apply changes.diff

git commit

git format-patch -<n>
	Gera arquivos de patch pros ultimos N commits.
	Screenshot from 2019-06-11 21-27-42

Screenshot from 2019-06-11 21-28-11

git format-patch -2 5d2ec42acc578

2 commits contando de 5d2ec42acc578 pra trás
	0001-Initial-commit.patch
	0002-refactor-initJokes.patch

git format-patch HEAD~2..HEAD --stdout --ignore-all-space > patches.patch

Screenshot from 2019-06-11 21-31-06

create new folder, copy files from master
/home/guilherme/Documents/dev/learn/git-tuts/patches.patch

git apply patches.patch
git diff

	aplicou tudo, sem marcar commits

Screenshot from 2019-06-11 21-34-43

git reset --hard

git am patches.patch
git log

Screenshot from 2019-06-11 21-40-14

aplicou os commits preservnado o autor

------------

# Conflitos

git reset HEAD~2
git reset --hard
	Resetamos os nós e voltamos o repo pra 2 commits atrás, os commits q aplicamos agora pouco desapareceram "pra sempre"

fazer mudança q conflita

Screenshot from 2019-06-11 21-43-45

git apply patches.patch
	- falhou
git am patches.patch também falha, mas precisa abortar com git am --abort

commit

git apply patches.patch
	- falha

git apply patches.patch --reject

Screenshot from 2019-06-11 21-49-55

aplicou os arquivos/commits que deu, os arquivos que falharam ele gerou um .rej

com git am é similar, mas os que falham vc precisa aplicar manualmente e dar continue.




