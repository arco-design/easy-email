import React from 'react';
import {
  ColorPickerField,
  SwitchField,
  TextAreaField,
  TextField,
} from '@extensions/components/Form';
import { Help } from '@extensions/AttributePanel/components/UI/Help';
import { AddFont } from '@extensions/components/Form/AddFont';
import { Collapse } from '@arco-design/web-react';
import { Stack, TextStyle, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { FontFamily } from '../../attributes/FontFamily';

export function Page() {
  const { focusIdx } = useFocusIdx();

  if (!focusIdx) return null;
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Stack.Item fill>
        <Collapse defaultActiveKey={['0', '1']}>
          <Collapse.Item name='0' header='Email Setting'>
            <Stack vertical spacing='tight'>
              <TextField label='Subject' name={'subject'} inline />
              <TextField label='SubTitle' name={'subTitle'} inline />
              <TextField
                label='Width'
                name={`${focusIdx}.attributes.width`}
                inline
              />
              <Stack alignment='center'>
                <TextField
                  label={
                    <Stack spacing='extraTight'>
                      <TextStyle>Breakpoint</TextStyle>
                      <Help title='Allows you to control on which breakpoint the layout should go desktop/mobile.' />
                    </Stack>
                  }
                  quickchange
                  name={`${focusIdx}.data.value.breakpoint`}
                  inline
                />
              </Stack>
              <SwitchField
                inline
                label='Responsive'
                name={`${focusIdx}.data.value.responsive`}
                checkedText='True'
                uncheckedText='False'
              />
            </Stack>
          </Collapse.Item>
          <Collapse.Item name='1' header='Theme Setting'>
            <Stack vertical spacing='tight'>
              <Stack wrap={false}>
                <Stack.Item fill>
                  <FontFamily />
                </Stack.Item>
                <Stack.Item fill>
                  <TextField
                    label='Font size'
                    quickchange
                    name={`${focusIdx}.data.value.font-size`}
                  />
                </Stack.Item>
              </Stack>
              <Stack wrap={false}>
                <Stack.Item fill>
                  <ColorPickerField
                    label='Text color'
                    name={`${focusIdx}.data.value.text-color`}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <TextField
                    label='Line height'
                    quickchange
                    name={`${focusIdx}.data.value.line-height`}
                  />
                </Stack.Item>
              </Stack>

              <Stack wrap={false}>
                <ColorPickerField
                  label='Background color'
                  name={`${focusIdx}.attributes.background-color`}
                />
                <ColorPickerField
                  label='Content background color'
                  name={`${focusIdx}.data.value.content-background-color`}
                />
              </Stack>
              <TextAreaField
                label='User style'
                name={`${focusIdx}.data.value.user-style.content`}
              />
              <AddFont />
            </Stack>
          </Collapse.Item>
        </Collapse>
      </Stack.Item>
    </AttributesPanelWrapper>
  );
}
