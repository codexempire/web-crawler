import { Injectable } from '@nestjs/common';
import { Crawler, Image } from './entities/crawler.entity';
import type { Browser, ElementHandle } from 'puppeteer';
import { InjectBrowser } from 'nest-puppeteer';

@Injectable()
export class CrawlerService {
  constructor(
    @InjectBrowser() private readonly browser: Browser,
  ) {}

  async parseUrl(url:string): Promise<Crawler|string> {
    try {
      // Craw the page and get the data
      const page = await this.browser.newPage();
      await page.goto(url);
      const title: string = await page.title();
      const description: ElementHandle<Element> = await page.$eval("head > meta[name='description']", (element: any) => element.content);
      const image: Image = await page.evaluate(() => {
        const largest = [...document.getElementsByTagName('img')].sort((a, b) => b.naturalWidth * b.naturalHeight - a.naturalWidth * a.naturalHeight)[0];
        return {
          largestImage: largest.src,
          largestSize: largest.naturalWidth * largest.naturalHeight
        };
      });

      const data: Crawler = {
        title, description, largestImageName: image.largestImage, largestImageSize: image.largestSize
      }

      // set to cache
      return data;
    } catch (error) {
      return error.message;
    }
  }

  findAllParsedData(): [Crawler] {
    return [new Crawler()]
  }
}
