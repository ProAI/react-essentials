import React from 'react';
import BaseText from './components/BaseText';

export default function formatChildren(children, raw = false) {
  if (raw) {
    return children;
  }

  return (
    <BaseText className="" blockOnly>
      {children}
    </BaseText>
  );
}
