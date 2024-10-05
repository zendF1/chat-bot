import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
@Injectable()
export class ConfigService {
  private readonly config: any;
  constructor(private nestConfigService: NestConfigService) {
    const environment =
      this.nestConfigService.get<string>('NODE_ENV') || 'development';
    const yamlConfig = this.loadYamlConfig(environment);
    this.config = { ...yamlConfig, ...process.env };
  }

  private loadYamlConfig(env: string) {
    const yamlPath = path.resolve(__dirname, `../../config/config.${env}.yaml`);
    try {
      const fileContents = fs.readFileSync(yamlPath, 'utf8');
      return yaml.load(fileContents) as any;
    } catch (error) {
      console.error('Error loading YAML config:', error);
      return {};
    }
  }

  get(keys: string) {
    const keyArr = keys.split('.');
    let value = null;
    for (let i = 0; i < keyArr.length; i++) {
      if (value === null) value = this.config[keyArr[i]];
      else value = value[keyArr[i]];
    }
    return value;
  }

  getAppConfig() {
    return {
      host: this.get('app.host'),
      port: this.get('app.port'),
      name: this.get('app.name'),
    };
  }

  getDatabaseConfig() {
    return {
      host: this.get('database.host'),
      port: this.get('database.port'),
      name: this.get('database.name'),
    };
  }

  getRedisConfig() {
    return {
      host: this.get('redis.host'),
      port: this.get('redis.port'),
      password: this.get('redis.password'),
      authentication: this.get('redis.authentication'),
    };
  }
}
