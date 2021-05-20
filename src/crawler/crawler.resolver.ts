import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CrawlerService } from './crawler.service';
import { Crawler } from './entities/crawler.entity';
import { Cache } from 'cache-manager';

@Resolver(() => Crawler)
export class CrawlerResolver {
  constructor(
    private readonly crawlerService: CrawlerService,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  @Mutation(() => Crawler)
  async parseUrl(@Args('url') url: string): Promise<Crawler|string> {
    const data: string|undefined = await this.cache.get(url);
    if(data) {
      return JSON.parse(data);
    }
    // Implement parsing url
    const result: Crawler|string = await this.crawlerService.parseUrl(url);
    if(typeof result != 'string')
      await this.cache.set(url, JSON.stringify(result));
    return result;
  }

  @Query(() => [Crawler])
  getSavedUrlDatas() {
    return this.crawlerService.findAllParsedData();
  }
}
