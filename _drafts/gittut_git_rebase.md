** nao façam **
o q acontece qnd commit, push, pr, merge, pull

Screenshot from 2019-06-11 22-04-04
****

voltando pra branch ex1

git log
Screenshot from 2019-06-11 22-05-42

git rebase ==> reescrever a história!

git rebase --interactive HEAD~<N>

HEAD = commit atual
HEAD~<N> voltar até o commit N+1 mais antigo (N não incluso)

git rebase --interactive HEAD~3

Screenshot from 2019-06-11 22-08-22

Cuidado: Reescrever é perigoso

Opções:
- pick => manter o commit como está
- reword => manter o commit mas vamos mudar a mensagem
- edit => manter o commit, mas vamos modificar ele (ex: qeubrar em vários commits)
- squash => n tenho ctz, ahco q é igual q o github faz, ele junta os commits em 1 só e concatena as mensagens
- fixup => junta esse commit com o de cima, mas some com essa mensagem
- exec => não sei
- drop => remove o commit

vc tbm pode reordenar os commits aqui. Cuidado: isso pode gerar conflitos.

vamos reescrever a msg do change type para Update type name

trocar para reword
Screenshot from 2019-06-11 22-15-18

:Wq

Screenshot from 2019-06-11 22-15-33

editar a mensagem e :wq

Screenshot from 2019-06-11 22-15-56

git log

Screenshot from 2019-06-11 22-16-10

git rebase --interactive HEAD~3

vamos editar o initJokes pra fazer 2 commits
Screenshot from 2019-06-11 22-17-09
Screenshot from 2019-06-11 22-17-20

O commit já foi aplicado, mas vamos desfazer a mudança no initJokes
git add / commit --ammend

refazemos a mudança no initJokes

git commit

git rebase --continue

git log

Screenshot from 2019-06-11 22-22-35

git rebase --interactive HEAD~4

Screenshot from 2019-06-11 22-24-01

Não gostie de ter 1 commit pro tenjokes e um pro init jokes, vamos juntar os dois mas manter as msgs. trocamos refactor tenjokes pra squash

Podemos mexer na mensagem:
Screenshot from 2019-06-11 22-24-19

:wq

Screenshot from 2019-06-11 22-24-36

vamos agora juntar os 3 "refactors" (2 já estão juntados)

git rebase --interactive HEAD~3

e vamos trocar o pick da 2a mudança pra fixup

Screenshot from 2019-06-11 22-25-34

:wq

Screenshot from 2019-06-11 22-25-51

agr só temos 2 commits.

mas n parece fazer mto sentido a mudança do type, vamos removelo.

git rebase --interactive HEAD~2

Screenshot from 2019-06-11 22-26-40

trca pra drop e :wq

git log

Screenshot from 2019-06-11 22-26-55

Vamos pushar pro remote agora

git push origin ex1

erro:
	Screenshot from 2019-06-11 22-28-55

pq?
o github viu lá 3 commits, com determinadas hashes que partiram do 1o commit (initial commit), a partir daí os seus commits não batem com os que ele já tem, então pra ele a sua branch é diferente do que ele tem, talvez eteja desatualziada etc. o que fazer? forçar = ignorar o que tem no remote e forçar a sua em cima.

git push origin ex1 --force

