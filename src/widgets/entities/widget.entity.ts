import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Check,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export type WidgetId = string;

@Entity('widget')
@Check('"preset" IS NULL OR "metrics" IS NULL')
export class Widget {
  @ApiProperty({
    description: "widget's uuid",
  })
  @PrimaryGeneratedColumn('uuid')
  id: WidgetId;

  @ApiProperty({
    description: "widget's user-given name",
  })
  @Column()
  name: string;

  @ApiProperty({
    description: "widget's user-selected category",
  })
  @Column('text')
  category: string;

  @ApiProperty({
    description: "widget's user-selected view",
    required: false,
  })
  @Column({ nullable: true })
  view?: string;

  @ApiProperty({
    description: "widget's view's user-selected parameters",
    required: false,
  })
  @Column({ type: 'json', nullable: true })
  viewParameters?: object;

  @ApiProperty({
    description: "widget's user-selected subcategories",
  })
  @Column('text', { array: true, default: [] })
  subcategories: string[];

  @ApiProperty({
    description:
      "widget's user-selected metrics. user can not specify both metrics & preset",
    required: false,
  })
  @Column('text', { array: true, nullable: true })
  metrics?: string[];

  @ApiProperty({
    description:
      "widget's user-selected preset. user can not specify both metrics & preset",
    required: false,
  })
  @Column('text', { nullable: true })
  preset?: string;

  @ManyToOne(() => User, { nullable: false })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: "widget's visibility",
  })
  @Column({ default: false })
  isPublic: boolean;

  @ApiProperty({
    description: 'if user is allowed to modify the widget',
  })
  canModify: boolean;

  @ApiProperty({
    description: 'if user is allowed to delete the widget',
  })
  canDelete: boolean;

  @ApiProperty({
    description: 'if user is allowed to execute the widget',
  })
  canExecute: boolean;
}
