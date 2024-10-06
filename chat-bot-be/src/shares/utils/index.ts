import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as _ from 'lodash'; // Import the lodash library for utility functions
import * as moment from 'moment-timezone'; // Import the moment-timezone library for working with dates and timezones
import { memoryStorage } from 'multer';
import * as otpGenerator from 'otp-generator';

export enum Timezone {
  UTC = 'UTC',
  VIETNAM = 'Asia/Ho_Chi_Minh',
}

export enum UTC_TIME {
  UTC_0 = 'Etc/GMT0',
  UTC_1 = 'Etc/GMT-1',
  UTC_2 = 'Etc/GMT-2',
  UTC_3 = 'Etc/GMT-3',
  UTC_4 = 'Etc/GMT-4',
  UTC_5 = 'Etc/GMT-5',
  UTC_6 = 'Etc/GMT-6',
  UTC_7 = 'Etc/GMT-7',
  UTC_8 = 'Etc/GMT-8',
  UTC_9 = 'Etc/GMT-9',
  UTC_10 = 'Etc/GMT-10',
  UTC_11 = 'Etc/GMT-11',
  UTC_12 = 'Etc/GMT-12',
  UTC_13 = 'Etc/GMT-13',
  UTC_14 = 'Etc/GMT-14',
  UTC_MINUS_1 = 'Etc/GMT+1',
  UTC_MINUS_2 = 'Etc/GMT+2',
  UTC_MINUS_3 = 'Etc/GMT+3',
  UTC_MINUS_4 = 'Etc/GMT+4',
  UTC_MINUS_5 = 'Etc/GMT+5',
  UTC_MINUS_6 = 'Etc/GMT+6',
  UTC_MINUS_7 = 'Etc/GMT+7',
  UTC_MINUS_8 = 'Etc/GMT+8',
  UTC_MINUS_9 = 'Etc/GMT+9',
  UTC_MINUS_10 = 'Etc/GMT+10',
  UTC_MINUS_11 = 'Etc/GMT+11',
  UTC_MINUS_12 = 'Etc/GMT+12',
}

export enum UTC_TO_TIMEZONE {
  UTC_0 = 'GMT',
  UTC_1 = 'GMT+1',
  UTC_2 = 'GMT+2',
  UTC_3 = 'GMT+3',
  UTC_4 = 'GMT+4',
  UTC_5 = 'GMT+5',
  UTC_6 = 'GMT+6',
  UTC_7 = 'GMT+7',
  UTC_8 = 'GMT+8',
  UTC_9 = 'GMT+9',
  UTC_10 = 'GMT+10',
  UTC_11 = 'GMT+11',
  UTC_12 = 'GMT+12',
  UTC_13 = 'GMT+13',
  UTC_14 = 'GMT+14',
  UTC_MINUS_1 = 'GMT-1',
  UTC_MINUS_2 = 'GMT-2',
  UTC_MINUS_3 = 'GMT-3',
  UTC_MINUS_4 = 'GMT-4',
  UTC_MINUS_5 = 'GMT-5',
  UTC_MINUS_6 = 'GMT-6',
  UTC_MINUS_7 = 'GMT-7',
  UTC_MINUS_8 = 'GMT-8',
  UTC_MINUS_9 = 'GMT-9',
  UTC_MINUS_10 = 'GMT-10',
  UTC_MINUS_11 = 'GMT-11',
  UTC_MINUS_12 = 'GMT-12',
}

const logger = new Logger('SharedUtils');
export class SharedUtils {
  // Define a regular expression for a strong password pattern
  static passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+{}|[\]\\:'";<>,.?/~`]).{8,}$/; // Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character

  static pick<T>(obj: T, keys: (keyof T)[]) {
    return _.pick(obj, keys);
  }

  static randomEnumValue(enumeration: any) {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
  }

  // Format a date with a specified timezone
  static formatDateWithTimeZone(
    date: Date | string,
    timezone = Timezone.VIETNAM, // Default timezone is Asia/Ho_Chi_Minh
  ): string {
    return moment(date).tz(timezone).format('YYYY-MM-DD'); // Format the date in the specified timezone
  }

  static formatDateTimeWithTimeZone(
    date: Date | string,
    timezone = Timezone.VIETNAM, // Default timezone is Asia/Ho_Chi_Minh
  ) {
    return moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss'); // Format the date in the specified timezone}
  }
  // 09 May 24 at 23:59:59
  static formatDateTimeWithUtcTime(date: Date, utcTime: UTC_TIME): string {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: utcTime,
      year: '2-digit',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  }

  // Get duration between two dates
  static getDurationBetweenDates(
    startDate: Date | string,
    endDate: Date | string,
  ): moment.Duration {
    return moment.duration(moment(endDate).diff(moment(startDate))); // Calculate the duration between two dates in minutes
  }

  // Extracts the domain part from an email address.
  static extractDomainPartByEmail(email: string) {
    // Use optional chaining to safely split the email and get the domain part
    // If email is null or undefined, return an empty string
    return email?.split('@')[1]?.toLowerCase() || '';
  }

  static extractNamePartByEmail(email: string) {
    return email.split('@')[0];
  }

  // Parses a JSON string into a JSON object.
  static extractJSONString(str: any) {
    try {
      // Attempt to parse the input string as JSON
      return JSON.parse(str);
    } catch (error) {
      logger.error(error);
      // If parsing fails, return an empty object
      return {};
    }
  }

  static objectToBase64(obj: Record<string, any> | Record<string, any>[]) {
    try {
      const json = JSON.stringify(obj);
      const base64 = btoa(json);
      return base64;
    } catch (error) {
      console.error('Error encoding object to Base64:', error);
      return null;
    }
  }

  static base64ToObject<T>(base64: string): T | null {
    try {
      const json = atob(base64);
      const obj = JSON.parse(json);
      return obj;
    } catch (error) {
      console.error('Error decoding Base64 to object:', error);
      return null;
    }
  }

  static makeid(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  static convertToSnakeCase(input: string): string {
    const snakeCase = input.replace(/\s+/g, '_').toLowerCase();
    return snakeCase;
  }

  static removeTags(str: string) {
    if (str === null || str === '') return '';
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
  }

  static daysToMilliseconds(days: number): number {
    return days * 24 * 60 * 60 * 1000;
  }

  static hoursToMilliseconds(hours: number): number {
    return hours * 60 * 60 * 1000;
  }

  static minutesToMilliseconds(minutes: number): number {
    return minutes * 60 * 1000;
  }

  static secondsToMilliseconds(seconds: number): number {
    return seconds * 1000;
  }

  static generateOTP(): string {
    return otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
  }

  static checkIsDate(year: number, month: number, day: number): boolean {
    const date = new Date(year, month, day);
    if (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    ) {
      return true;
    } else {
      return false;
    }
  }

  static mbToBytes(mb: number): number {
    return mb * 1024 * 1024;
  }

  static kbToBytes(kb: number): number {
    return kb * 1024;
  }

  static validateImageUpload(fileSizeLimit: number) {
    return FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(
            new HttpException(
              'Only image files are allowed!',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        callback(null, true);
      },
      limits: { fileSize: fileSizeLimit }, // Use the input file size limit
    });
  }

  static renderContentEmail(paragraphs: string[]): string {
    const result = paragraphs.map((paragraph) => {
      return `
      <div style="font-family: Helvetica, Arial, sans-serif;">
        ${paragraph}
      </div>
      <br/>`;
    });
    return result.join('');
  }

  static splitArrayIntoChunks(array: any[], chunkSize: number): any[][] {
    const result: any[] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      if (chunk.length === chunkSize || i + chunkSize >= array.length) {
        result.push(chunk);
      }
    }
    return result;
  }

  static createLogFormatForFrontend = (
    func: string,
    user: string,
    message: string,
  ) => {
    const now = new Date();
    const currentNowWithVN = this.formatDateTimeWithTimeZone(now);
    return `
Time: ${currentNowWithVN}
Function: ${func}
User: ${user}

${message}`;
  };

  static createLogFormatForBackend = (
    func: string,
    message: string,
    input?: string[],
  ) => {
    const now = new Date();
    const currentNowWithVN = this.formatDateTimeWithTimeZone(now);
    return `
Time: ${currentNowWithVN}
function: ${func}
input: ${input?.join('\n  ')}

${this.codeBlock(message)}`;
  };

  static codeBlock(text: string): string {
    return '```' + text + '```';
  }
}
