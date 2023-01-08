import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  
  @Column({ unique: true})
  startDate!: Date;

  @Column({ unique: true})
  endDate!: Date;

  @Column({ unique: true })
  projectId!: string;

  @Column({ unique: true })
  userId!: string;
}
