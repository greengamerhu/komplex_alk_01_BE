import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { tarhelyDto } from './tarhelyDto.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/tarhely')
  async getTarhely() {
    const [rows] = await db.execute("SELECT * FROM tarhelycsomagok ")
    return {rows : rows};
  }
  @Post('/api/tarhely')
  async postTarhely(@Body() tarhelyData : tarhelyDto) {
      await db.execute("INSERT INTO tarhelycsomagok (nev, meret, ar) VALUES(?,?,?)", [tarhelyData.nev, tarhelyData.meret, tarhelyData.ar])
  };

  @Delete('/api/tarhely/:id')
  async deleteUserApi(@Param('id') id: number) {
    await db.execute('DELETE FROM `tarhelycsomagok` WHERE `id` = ?', [id])
  }
}
