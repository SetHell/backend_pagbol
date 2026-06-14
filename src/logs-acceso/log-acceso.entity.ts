import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('log_acceso')
export class LogAcceso {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ length: 30 })
  nro_esclf!: string;

  @Column({ length: 45 })
  ip!: string;

  @Column({ type: 'enum', enum: ['ingreso', 'salida'] })
  evento!: 'ingreso' | 'salida';

  @Column({ length: 200, nullable: true })
  browser!: string;

  @Index()
  @CreateDateColumn({ name: 'fecha_hora' })
  fecha_hora!: Date;
}
