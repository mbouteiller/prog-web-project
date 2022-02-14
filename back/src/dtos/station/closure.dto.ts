export class ClosureDto {
  type: ClosureType;
  debut: string; //AAAA-MM-JJ HH:mm:ss
  fin: string; //AAAA-MM-JJ HH:mm:ss
}

export enum ClosureType {
  definitive = 'D',
  temporaire = 'T',
}
