import { CacheModule, Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CrawlerResolver } from './crawler.resolver';
import { PuppeteerModule } from 'nest-puppeteer';

@Module({
  imports: [PuppeteerModule.forRoot(), CacheModule.register({
    ttl: 600,
  }),],
  providers: [CrawlerResolver, CrawlerService]
})
export class CrawlerModule {}
