export class Processo {
  nome: string;
  chegada: number;
  inicio?: number;
  termino?: number;
  tempoExecucao: number;
  tempoRestante: number;
  inicioEspera1?: number;
  esperando1?: number;
  esperando2?: number;
  inicioEspera2?: number;
  tempoEs1?: number;
  terminoEs1?: boolean;
  es1?: number;
  tempoEs2?: number;
  terminoEs2?: boolean;
  es2?: number;
  countUt?: number = 0;
}
