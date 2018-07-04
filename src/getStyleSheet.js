import React from 'react';
import styleResolver from 'react-native-web/dist/cjs/exports/StyleSheet/styleResolver';

export default function getStyleSheet() {
  return {
    getStyleTag: () => {
      const sheet = styleResolver.getStyleSheet();
      return `<style id="${sheet.id}">${sheet.textContent}</style>`;
    },
    /* eslint-disable react/no-danger */
    getStyleElement: () => {
      const sheet = styleResolver.getStyleSheet();
      return <style dangerouslySetInnerHTML={{ __html: sheet.textContent }} id={sheet.id} />;
    },
    /* eslint-enable */
  };
}
