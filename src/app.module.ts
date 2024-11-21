import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),  // MongoDB connection
    UserPreferencesModule,  // Import user preferences module
  ],
})
export class AppModule {}
