import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Agente } from '../agentes/agente.entity';

@Entity('PERSONA')
export class Persona {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  CI!: string;

  @Column({ type: 'varchar', length: 100 })
  nombres!: string;

  @Column({ type: 'varchar', length: 100 })
  apellidos!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  direccion?: string;

  @OneToOne(() => Agente, (agente) => agente.persona)
  agente?: Agente;
}
