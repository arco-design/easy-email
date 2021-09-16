import { Panel } from './Panel';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { createBlock } from '@/utils/createBlock';
import { merge } from 'lodash';

export type INavbar = IBlockData<
  {
    align?: string;
    hamburger?: string;
    'ico-align'?: string;
    'ico-color'?: string;
    'ico-font-size'?: string;
    'ico-line-height'?: string;
    'ico-padding'?: string;
    'ico-text-decoration'?: string;
    'ico-text-transform'?: string;
  },
  {
    links: Array<{
      content: string;
      color?: string;
      href?: string;
      'font-family'?: string;
      'font-size'?: string;
      'font-style'?: string;
      'font-weight'?: string;
      'line-height'?: string;
      'text-decoration'?: string;
      target?: string;
      padding?: string;
    }>;
  }
>;

export const Navbar: IBlock<INavbar> = createBlock({
  name: 'Navbar',
  type: BasicType.NAVBAR,
  Panel,
  create: (payload) => {
    const defaultData: INavbar = {
      type: BasicType.NAVBAR,
      data: {
        value: {
          links: [
            {
              href: '/gettings-started-onboard',
              content: 'Getting started',
              color: '#1890ff',
              'font-size': '13px',
              target: '_blank',
            },
            {
              href: '/try-it-live',
              content: 'Try it live',
              color: '#1890ff',
              'font-size': '13px',
              target: '_blank',
            },
            {
              href: '/templates',
              content: 'Templates',
              color: '#1890ff',
              'font-size': '13px',
              target: '_blank',
            },
            {
              href: '/components',
              content: 'Components',
              color: '#1890ff',
              'font-size': '13px',
              target: '_blank',
            },
          ],
        },
      },
      attributes: {
        hamburger: 'hamburger',
        align: 'center',
        'ico-align': 'center',
        'ico-color': '#1890ff',
        'ico-font-size': '30px',
        'ico-line-height': '30px',
        'ico-padding': '10px 10px 10px 10px',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
});
