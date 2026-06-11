import { Boleta } from '../boletas/boleta.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('INFRACCION')
export class Infraccion {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  nro_infr!: string;

  @Column({ type: 'varchar', length: 30 })
  art!: string;

  @Column({ type: 'text', nullable: true })
  descr?: string;

  @Column({ type: 'text', nullable: true })
  obsv?: string;

  @OneToMany(() => Boleta, (boleta) => boleta.infraccion)
  boletas!: Boleta[];
}
