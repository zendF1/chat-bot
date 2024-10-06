import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession, Connection } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  // Executes the provided callback within a transaction
  // The callback receives a session object as a parameter and returns a Promise
  // This provide a way to execute multiple operations within a transaction so if one fails, all of them are rolled back
  async executeWithTransaction<T>(
    callback: (session: ClientSession) => Promise<T>,
  ): Promise<T> {
    // Start a new session
    const session = await this.connection.startSession();
    // Start a transaction within the session
    session.startTransaction();

    try {
      // Execute the provided callback, passing the session
      const result = await callback(session);
      // Commit the transaction if everything went well
      await session.commitTransaction();
      return result;
    } catch (error) {
      // If an error occurs, abort the transaction
      await session.abortTransaction();
      throw error;
    } finally {
      // Regardless of success or failure, end the session
      session.endSession();
    }
  }
}
