import { ObjectType, Field } from '@nestjs/graphql';
import { ElementHandle } from 'puppeteer';

@ObjectType()
export class Crawler {
  @Field({ description: 'Title on the webpage', nullable: true })
  title: String;
  @Field(() => String, { description: 'Description on the webpage', nullable: true })
  description: any;
  @Field({ description: 'Largest Image name on the webpage', nullable: true })
  largestImageName: String;
  @Field(() => Number, { description: 'Largest Image size on the webpage', nullable: true })
  largestImageSize: Number;
}

export interface Image {
  largestImage: string,
  largestSize: number,
}

//[] == remote image urls 