## Escalonamento de Processos

Com o surgimento da multiprogramação, foi possível que múltiplos processos pudessem competir pela CPU (Central Processing Unit) ao mesmo tempo. Essa situação ocorre sempre que dois ou mais deles encontram-se, simultaneamente, no estado pronto. Dessa maneira, é necessário uma metodologia para escolha de qual(is) processo(s) será(ão) executado(s) primeiro. O escalonador, parte do sistema operacional que realiza tal escolha. A maneira como os processos são distribuídos em um ou mais processadores é chama de escalonamento de processos. Neste trabalho, são explorados o funcionamento de dois algoritmos, sendo eles o Shortest Remaining Time (SRT) e o Shortest Proccess Next (SPN).

### Shortest Proccess Next (SPN)
É uma política de escalonamento não preemptiva que, dada uma lista de processos prontos, atribui ao processador aquele que possui o menor tempo de execução. Utiliza a não preempção como uma de suas características, ou seja, ao atribuir um processo ao processador, ele só será liberado na finalização deste ou quando houver operações de entrada e saída (I/O). SPN é ideal apenas quando todas as tarefas estão disponíveis simultaneamente. Um dos principais problemas desta política é a necessidade da estimativa do tempo de execução de todos os processos.

###Shortest Remaining Time (SRT)
Este algoritmo consiste em disponibilizar o processador à tarefa que possui o menor tempo total de execução da fila de tarefas prontas. Esta técnica proporciona os melhores tempos médios de espera das tarefas. É uma versão preemptiva da política SPN, ou seja, quando chegar um processo na fila de prontos com tempo de execução menor que o processo atual, ele tem preferência na execução. Dentre os problemas encontrados estão: estimar a priori a
duração de cada tarefa, antes de sua execução e a possibilidade de inanição das tarefas mais longas, uma vez que esta política prioriza as tarefas menores. No entanto, esses problemas podem ser contornados através de outras técnicas.

### A Plataforma

Este trabalho foi hospedado no ambiente de nuvem heroku em que é possível realizar testes com as políticas de escalonamento SPN e SRT, sendo elas configuráveis com parâmetros diversos. Para utização, basta realizar o envio de um arquivo CSV (Comma-Separated Values), em que cada linha do arquivo contenha uma especificação de um processo a ser simulado. Este simulador utiliza leva em consideração da existência de somente um processador.
Exemplo: 

Cada linha do arquivo CSV corresponde a um processo e os dados devem estar na seguinte ordem: Nome do Processo,	Tempo de Chegada,	Tempo de Execução,	Inicio da 1ª E/S,	Tempo de E/S, Inicio da 2ª E/S,	Tempo da 2ª E/S.

Dados de entrada: quantidade de processos (máximo = 10)
tempo de chegada (máximo = 50)
tempo de execução (máximo = 10)
tempo de entrada e saída para cada processo (cada processo pode fazer até
duas E/S ) (tempo de E/S máximo = 5)

### Tecnologia
O sistema foi desenvolvido utilizando framework web chamado angular e linguagem utilizada foi Typescript que é uma linguagem que adiciona algumas funcionalidades a mais ao javascript tais como orientação objeto e tipo as variavéis.


site: https://escalonamento-processos.herokuapp.com/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
