import { Boleta } from '../boletas/boleta.entity';
import { Persona } from '../personas/persona.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('AGENTE')
export class Agente {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  nro_esclf!: string;

  @Column({ type: 'varchar', length: 20 })
  CI!: string;

  @Column({ type: 'varchar', length: 50 })
  grado!: string;

  @Column({
    type: 'char',
    length: 60,
    nullable: true,
    select: false,
  })
  password?: string | null;

  @OneToOne(() => Persona, (persona) => persona.agente)
  @JoinColumn({ name: 'CI', referencedColumnName: 'CI' })
  persona!: Persona;

  @OneToMany(() => Boleta, (boleta) => boleta.agente)
  boletas!: Boleta[];
}
