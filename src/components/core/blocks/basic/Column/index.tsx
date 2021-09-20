import { Panel } from './Panel';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';
import { createBlock } from '@/utils/createBlock';
import { merge } from 'lodash';
import React from 'react';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';

export type IColumn = IBlockData<
  {
    'background-color'?: string;
    border?: string;
    'border-radius'?: string;
    'inner-border'?: string;
    'inner-border-radius'?: string;
    padding?: string;
    'text-align'?: CSSProperties['textAlign'];
    'vertical-align'?: CSSProperties['verticalAlign'];
    width?: string;
  },
  {}
>;

export const Column = createBlock<IColumn>({
  name: 'Column',
  type: BasicType.COLUMN,
  description: (
    <Stack vertical spacing="none">
      <TextStyle>
        Columns enable you to horizontally organize the
        content within your sections. They must be located
        under "Section" block in order to be considered by the
        engine. To be responsive, columns are expressed in
        terms of percentage.
      </TextStyle>
      <TextStyle>
        Every single column has to contain something because
        they are responsive containers, and will be vertically
        stacked on a mobile view.
      </TextStyle>
    </Stack>
  ),
  Panel,
  create: (payload) => {
    const defaultData: IColumn = {
      type: BasicType.COLUMN,
      data: {
        value: {},
      },
      attributes: {
        padding: '0px 0px 0px 0px',
        border: 'none',
        'vertical-align': 'top',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.SECTION, BasicType.GROUP],
});
