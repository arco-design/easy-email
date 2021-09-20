import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ShadowStyle } from './components/ShadowStyle';
import { MjmlDomRender } from './components/MjmlDomRender';
import { useDropBlock } from '@/hooks/useDropBlock';
import { HoverTooltip } from './components/HoverTooltip';
import { useActiveTab } from '@/hooks/useActiveTab';
import { ActiveTabKeys } from '@/components/Provider/BlocksProvider';
import { useDomScrollHeight } from '@/hooks/useDomScrollHeight';
import { FocusTooltip } from './components/FocusTooltip';
import { useHotKeys } from '@/hooks/useHotKeys';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';
import { useFocusIdx } from 'easy-email-editor';

export function EmailContent() {
  useHotKeys();
  const { activeTab } = useActiveTab();
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const { setRef } = useDropBlock();
  const { scrollHeight } = useDomScrollHeight();
  const { focusIdx } = useFocusIdx();

  const isActive = activeTab === ActiveTabKeys.EDIT;

  useEffect(() => {
    setRef(containerRef);
  }, [containerRef, setRef]);

  useEffect(() => {
    const container = containerRef;
    if (container) {
      container.scrollTo(0, scrollHeight.current);
    }
  }, [activeTab, containerRef, scrollHeight]);

  useEffect(() => {
    setTimeout(() => {
      const editBlock = findBlockNodeByIdx(focusIdx);
      editBlock?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }, 50);
  }, [focusIdx]);

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const target = event.target as HTMLDivElement;
      scrollHeight.current = target.scrollTop;
    },
    [scrollHeight]
  );

  return useMemo(() => {
    return (
      <>
        <ShadowStyle />
        <div
          onScroll={onScroll}
          className='shadow-container'
          style={{ height: '100%', overflowY: 'auto', zIndex: 10 }}
          ref={setContainerRef}
        >
          <MjmlDomRender />
        </div>

        {isActive && <HoverTooltip />}
        {isActive && <FocusTooltip />}
      </>
    );
  }, [isActive, onScroll]);
}
