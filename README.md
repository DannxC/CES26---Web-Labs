# CES26---Web-Labs

Você pode verificar o projeto deployado aqui: [WebSite](https://dannxc.github.io/CES26---Web-Labs/)

## Listas

### 1a série de exercícios (individual)
Construa um conjunto de páginas web com informações sobre a tua
Escola do 2.o Grau.


1) As páginas devem estar estruturadas para atender 4 públicos
distintos: Alunos, Professores, Administração e Visitantes Externos. Para cada
público-alvo aplicar um estilo distinto.

2) Pesquise como tornar as páginas responsivas. Isto é, fazer
com que as páginas possam ser exibidas em desktops, tablets, ou smartphones de
forma agradável ao usuário,

Disponibilizar o resultado usando Github Pages.
A Documentação do exercício deverá ser
disponibilizada no Github. Incluir descrição do processo utilizado para a
elaboração do trabalho. Relatar dificuldades e soluções encontradas.



### 2a série de exercícios (individual)
Utilizando o elemento Canvas do HTML5 e Javascript, construa um programa que implemente a animação descrita abaixo:

1) Um avião acompanha o cursor do mouse
![airplane.png](./Lista%202/assets/airplane.png)

2) Um míssel fica apontando para a posião do avião
![missile.png](./Lista%202/assets/missile.png)

3) Ao apertar o botão direito do mouse, o míssil é disparado e vai atrás do avião.

4) Ao atingir o avião, este explode.

5) Inclua efeitos sonoros e comandos para habilitar e desabilitar os sons.

Disponibilize o resultado final no github pages.
O código fonte e documentação devem ser entregues através do github.



### 3a série de exercícios (individual)
Usando JQuery, faça um programa editor de uma árvore DOM.

1) Com o Mouse é possível selecionar um elemento. O elemento selecionado deve muda de cor.
   
2) O usuário poderá remover, mudar propriedades do elemento, ou inserir um novo elemento como filho do elemento selecionado.
   
3) Se o elemento removido for pai de outros elementos, todo o ramo de elementos também terá de ser removido.



### 4a série de exercícios (individual)
Utilizando Node e o módulo Express, desenvolva uma aplicação no servidor que atenda os seguintes requisitos: 

1) Permite a exibição de arquivos estáticos. 

2) Permite a realização de upload de arquivo enviado através do comando POST. 

3) Processa dados de um formulário enviados via comando GET. 

4) Suporta uma aplicação AJAX, que ao click de ouse em um botão, acessa um conjunto de dados em JSON e os exibe no lugar de um parágrafo em uma página HTML.



### 5a série de exercícios (individual) - 2023
Utilizando React, Node e o módulo Express, desenvolva uma aplicação com os seguintes requisitos:

1) A página principal exibe uma lista com nome de cidades.
   
2) O usuário pode selecionar com o mouse uma cidade da lista.

3) Ao selecionar a cidade, a posição da cidade na tabela se expande e aparece uma foto e um texto com dados da cidade.
   
4) O usuário pode com o mouse fechar as informações da cidade.
   
5) Os dados da cidade são armazenados no servidor Node como dados JSON e carregados somente quando o usuário fazer a seleção na tela.



### 6a série de exercícios (individual) - 2023
Utilizando React e Redux (obrigatoriamente), implemente uma calculadora com as quatro operações aritméticas básicas.  



### 7a série de exercícios (individual) - 2023
Crie um exemplo que demonstre o funcionamento do mecanismo de roteamento e o uso de componentes Forms do Angular. O exemplo deve usar um servidor Node para armazenar dados coletados.
Faça uma comparação da solução construída com uma solução em React.




## Projeto - Travel Planner
1) Conteúdo
- **Frontend**: Criou-se uma SPA (Single Page App) que usa React e possui componentes que usam gráficos e animações em Javascript e HTML 5.
- **Backend**: Criou-se uma aplicação usando servidor NodeJs. Utilizou-se de um módulo que acessa recursos de um site externo (no caso, o ChatGPT).

2) Explicação
O projeto "Travel Planner" consiste em um site single page em que a pessoa pode digitar uma cidade em um chat. Essa cidade será interpretada pelo ChatGPT, que retornará um template sobre um planejamento de viagem para aquela cidade, com horário, local e breve descrição dos locais selecionados.