import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { useBlock } from '@/hooks/useBlock';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { findBlockByType, getValueByIdx } from '@/utils/block';
import { Card } from 'antd';
import React from 'react';
import { useMemo } from 'react';

export function AttributesManager() {
  const { values } = useBlock();
  const { focusIdx } = useFocusIdx();

  const value = getValueByIdx(values, focusIdx);

  const block = value && (findBlockByType(value.type) as any);

  const content = useMemo(() => {
    if (!block) return null;
    return (
      <Stack vertical>
        <Stack.Item fill>
          <Stack vertical>
            <Stack.Item fill> {<block.Panel />}</Stack.Item>
            <Stack.Item />
          </Stack>
        </Stack.Item>
      </Stack>
    );
  }, [block]);

  if (!value) return null;
  return content;
}
