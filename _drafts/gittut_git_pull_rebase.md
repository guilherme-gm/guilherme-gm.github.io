git branch commit1
git branch commit2
git branch commit3

git checkout commit1
git am patches.patch
git push origin commit1

mergeia o pr

git checkout master
git pull origin master

nós vamos ter a estrutura:
Screenshot from 2019-06-11 22-50-47

agora vamos no branch commit2, que ainda está no initial commit
vamos alterar o fetch do initJokes pra conflitar
	conflict_commit2.patch

git push origin commit2
vamos no github
- Screenshot from 2019-06-11 22-54-58
- Screenshot from 2019-06-11 22-55-13
- Screenshot from 2019-06-11 22-55-20

ok temos que resolver, pull master?

vamos ver:
git pull origin master
-- resolver o conflito  aceitando o atual --
git commit
-- escrever o merge : Screenshot from 2019-06-11 22-56-39 --
git log
Screenshot from 2019-06-11 22-57-12

Observe:
- agora temos um commit novo já no nosso branch, o de merge da master

olha como ficou o grafo de ligações das branches: 
Screenshot from 2019-06-11 22-58-01

mas ok, 
git push origin commit2

vamos ver no github
- tem um commit de merge, nesse caso n aconteceu, mas as vezes ele inclui mudanças de arquivos tbm, se vc for checar por commit, vc já tem uma baguncinha pq alguns commits vão depender dele. Se não me engano as vezes os arquivos vão parar no files changed tbm (n tenho ctz)

o jeito certo:
git pull origin master --rebase

ele irá pegar a master e fazer um replay dos seus commits por cima.

git checkout commit3
git apply conflic_commit2.patch
git commit -am "changes commit3"
git push origin commit3

abrir PR no github

git pull origin master --rebase

vai conflitar:
- Screenshot from 2019-06-11 23-04-50
- Screenshot from 2019-06-11 23-05-24

Note que: HEAD agora tem a mudança que já foi mergeada (ela é a nossa base do repositório) e o que está entrando são as mudanças do commit que vc quer dar o PR. isso é regra pro rebase, seu commit está sofrendo um replay sobre o repositório.

Vamos aprovar a incoming change

git add src/
git rebase --continue
git log

Screenshot from 2019-06-11 23-07-26

da pra ver que agora o topo é só o commit3 e nada mais. n tem um commit de merge.

vamos dar um force push

github: Screenshot from 2019-06-11 23-08-51

só 1 commit.

aceitar o pr e baixar a master

grafo: Screenshot from 2019-06-11 23-11-26
log : Screenshot from 2019-06-11 23-11-42

