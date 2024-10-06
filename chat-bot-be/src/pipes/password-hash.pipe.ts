import { Injectable, PipeTransform } from '@nestjs/common';
import { HashingService } from 'src/shares/services/hashing.service';

// Define an interface for objects containing a password field.
interface IPassword {
  password: string;
}

// This pipe class is responsible for hashing the password field in DTOs.
@Injectable()
export class PasswordHashPipe<T extends IPassword>
  implements PipeTransform<T, Promise<T>>
{
  constructor(private readonly hashService: HashingService) {}

  // Transform method that hashes the password field in the DTO.
  async transform(dto: T): Promise<T> {
    const { password } = dto;
    const hashedPassword = await this.hashService.hashPassword(password); // Hash the password using the HashingService.
    return { ...dto, password: hashedPassword }; // Return the DTO with the hashed password.
  }
}
