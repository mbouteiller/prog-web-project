
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DroneAssignedDto {
  /**
   * The drone identifier.
   */
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  public droneId: number;

  /**
   * The delivery identifier.
   */
  @IsNotEmpty()
  @IsString()
  public deliveryId: string;

  /**
   * The destination address.
   */
  @IsNotEmpty()
  @IsString()
  public destination: string;

  /**
   * The departure date of the drone.
   */
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  public date: Date;
}
