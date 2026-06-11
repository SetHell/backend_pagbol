import { Agente } from '../agentes/agente.entity';
import { Infraccion } from '../infracciones/infraccion.entity';
import { Vehiculo } from '../vehiculos/vehiculo.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('BOLETA')
export class Boleta {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  nro_boleta!: string;

  @Column({ type: 'date' })
  fecha!: string;

  @Column({ type: 'time' })
  hora!: string;

  @Column({ type: 'varchar', length: 20 })
  placa!: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  nro_lic?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  categ_lic?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  nom_conductor?: string;

  @Column({ type: 'varchar', length: 50 })
  tip_vehi!: string;

  @Column({ type: 'varchar', length: 50 })
  marca!: string;

  @Column({ type: 'varchar', length: 30 })
  color!: string;

  @Column({ type: 'varchar', length: 30 })
  art!: string;

  @Column({ type: 'varchar', length: 30 })
  nro_infr!: string;

  @Column({ type: 'varchar', length: 200 })
  lugar!: string;

  @Column({ type: 'varchar', length: 100 })
  zona!: string;

  @Column({ type: 'text', nullable: true })
  observ?: string;

  @Column({ type: 'varchar', length: 30 })
  nro_esclf!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fech_reg!: Date;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  fech_elim?: Date;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.boletas)
  @JoinColumn({ name: 'placa', referencedColumnName: 'placa' })
  vehiculo!: Vehiculo;

  @ManyToOne(() => Infraccion, (infraccion) => infraccion.boletas)
  @JoinColumn({ name: 'nro_infr', referencedColumnName: 'nro_infr' })
  infraccion!: Infraccion;

  @ManyToOne(() => Agente, (agente) => agente.boletas)
  @JoinColumn({ name: 'nro_esclf', referencedColumnName: 'nro_esclf' })
  agente!: Agente;
}
