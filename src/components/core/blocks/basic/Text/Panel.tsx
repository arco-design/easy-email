import React from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/UI/Stack';
import { TextDecoration } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/TextDecoration';
import { FontWeight } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontStyle } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { TextTransform } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/TextTransform';
import { FontFamily } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { Height } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { ContainerBackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { FontSize } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { Color } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { Align } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { LineHeight } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/LineHeight';
import { LetterSpacing } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/LetterSpacing';
import { RichTextField } from '@/components/core/Form';

import { useFocusIdx } from '@/hooks/useFocusIdx';
import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';
import { Collapse } from 'antd';

export function Panel() {
  const { focusIdx } = useFocusIdx();
  return (

    <AttributesPanelWrapper>

      <Collapse defaultActiveKey={['0', '1', '2']}>
        <Collapse.Panel key="0" header="Dimension">
          <Stack vertical spacing="tight">
            <div style={{ position: 'absolute' }}>
              <RichTextField
                idx={focusIdx}
                name={`${focusIdx}.data.value.content`}
                label=''
                labelHidden
              />
            </div>
            <Height />
            <Padding />
          </Stack>
        </Collapse.Panel>
        <Collapse.Panel key="1" header="Color">
          <Stack vertical spacing="tight">
            <Color />
            <ContainerBackgroundColor title="Background color" />
          </Stack>
        </Collapse.Panel>
        <Collapse.Panel key="2" header="Typography">
          <Stack vertical spacing="tight">
            <Stack wrap={false}>
              <FontFamily />
              <Stack.Item fill>
                <FontSize />
              </Stack.Item>
            </Stack>

            <Stack wrap={false}>
              <FontWeight />
              <Stack.Item fill>

                <LineHeight />
              </Stack.Item>
            </Stack>

            <Stack wrap={false}>
              <TextDecoration />
              <Stack.Item fill>
                <LetterSpacing />
              </Stack.Item>
            </Stack>

            <Align />

            <FontStyle />
          </Stack>
        </Collapse.Panel>

      </Collapse>

    </AttributesPanelWrapper>

  );
}
