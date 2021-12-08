import { PopoverProps, Tooltip } from '@arco-design/web-react';
import { Button } from '@arco-design/web-react';
import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import { IconFont, Stack } from 'easy-email-editor';
import { SearchField, SwitchField } from '@extensions/components/Form';
import { ToolItem } from '../ToolItem';

export interface LinkParams {
  link: string;
  blank: boolean;
  underline: boolean;
  linkNode: HTMLAnchorElement | null;
}

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: (val: LinkParams) => void;
}

function getAnchorElement(
  node: Node,
  matchLength: number
): HTMLAnchorElement | null {
  if (!node || !node.parentNode) return null;
  const isMatchLength =
    Number(node.parentNode?.textContent?.length) === matchLength;

  if (isMatchLength) {
    if (node.parentNode instanceof HTMLAnchorElement) {
      return node.parentNode;
    } else {
      return getAnchorElement(node.parentNode, matchLength);
    }
  }
  return null;
}

function getLinkNode(
  currentRange: Range | null | undefined
): HTMLAnchorElement | null {
  let linkNode: HTMLAnchorElement | null = null;
  if (
    currentRange &&
    currentRange.startContainer === currentRange.endContainer
  ) {
    if (currentRange.startContainer instanceof HTMLAnchorElement) {
      linkNode = currentRange.startContainer;
    } else {
      if (currentRange.startContainer.nodeType === 3) {
        linkNode = getAnchorElement(
          currentRange.startContainer,
          currentRange.endOffset - currentRange.startOffset
        );
      }
    }
  }
  return linkNode;
}

export function Link(props: LinkProps) {
  const initialValues = useMemo((): LinkParams => {
    let link = '';
    let blank = true;
    let underline = true;
    let linkNode: HTMLAnchorElement | null = getLinkNode(props.currentRange);
    if (linkNode) {
      link = linkNode.href;
      blank = linkNode.getAttribute('target') === '_blank';
      underline = linkNode.style.textDecoration === 'underline';
    }
    return {
      link,
      blank,
      underline,
      linkNode,
    };
  }, [props.currentRange]);

  const onSubmit = useCallback(
    (values: LinkParams) => {
      props.onChange(values);
    },
    [props]
  );

  return (
    <Form
      key={initialValues.link}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <Tooltip
            {...props}
            trigger='click'
            color='#fff'
            position='tl'
            content={
              <div style={{ color: '#333' }}>
                <Stack vertical spacing='tight'>
                  <Stack.Item />
                  <SearchField
                    name='link'
                    label='Link'
                    labelHidden
                    searchButton='Apply'
                    placeholder='https://www.example.com'
                    onSearch={() => handleSubmit()}
                  />
                  <Stack>
                    <SwitchField
                      label='Target'
                      name='blank'
                      checkedText='blank'
                      uncheckedText='self'
                      inline
                    />
                    <SwitchField
                      label='Underline'
                      name='underline'
                      checkedText='off'
                      uncheckedText='on'
                      inline
                    />
                  </Stack>
                </Stack>
              </div>
            }
          >
            <ToolItem title='Link' icon={<IconFont iconName='icon-link' />} />
          </Tooltip>
        );
      }}
    </Form>
  );
}
