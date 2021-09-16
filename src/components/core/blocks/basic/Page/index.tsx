import { Panel } from './Panel';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { createBlock } from '@/utils/createBlock';
import { Wrapper } from '../Wrapper';
import { merge } from 'lodash';

export type IPage = IBlockData<
  {
    'background-color'?: string;
    width: string;
  },
  {
    breakpoint?: string;
    headAttributes: string;
    fonts?: { name: string; href: string }[];
    headStyles?: {
      content?: string;
      inline?: 'inline';
    }[];
    responsive?: boolean;
    'font-family': string;
    'text-color': string;
    'user-style'?: {
      content?: string;
      inline?: 'inline';
    };
    'content-background-color'?: string;
  }
>;

export const Page: IBlock<IPage> = createBlock({
  name: 'Page',
  type: BasicType.PAGE,
  Panel,
  create: (payload) => {
    const defaultData: IPage = {
      type: BasicType.PAGE,
      data: {
        value: {
          breakpoint: '480px',
          headAttributes: '',
          headStyles: [],
          fonts: [],
          responsive: true,
          'font-family': 'lucida Grande,Verdana,Microsoft YaHei',
          'text-color': '#000000',
        },
      },
      attributes: {
        'background-color': '#efeeea',
        width: '600px',
      },
      children: [Wrapper.createInstance()],
    };
    return merge(defaultData, payload);
  },
  validParentType: [],
});
