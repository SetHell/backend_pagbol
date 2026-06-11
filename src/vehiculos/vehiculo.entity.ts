import { Boleta } from '../boletas/boleta.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('VEHICULO')
export class Vehiculo {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  placa!: string;

  @Column({ type: 'varchar', length: 50 })
  marca!: string;

  @Column({ type: 'varchar', length: 50 })
  tip_vehi!: string;

  @Column({ type: 'varchar', length: 30 })
  color!: string;

  @OneToMany(() => Boleta, (boleta) => boleta.vehiculo)
  boletas!: Boleta[];
}
