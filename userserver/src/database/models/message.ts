import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Message extends Model {
  @Column
  userId: number;
}