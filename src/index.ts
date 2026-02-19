import dotenv from 'dotenv';
dotenv.config();
import Server from '@/server';

class SportsApplication {
  public run(): void {
    const server = new Server();
    server.start();
  }
}
const sportsApplication: SportsApplication = new SportsApplication();
sportsApplication.run();
