import React from 'react';
import styleResolver from 'react-native-web/dist/exports/StyleSheet/styleResolver';

export default function getStyleSheet() {
  const sheet = styleResolver.getStyleSheet();

  return {
    getStyleTags: () => `<style id="${sheet.id}">${sheet.textContent}</style>`,
    /* eslint-disable react/no-danger */
    getStyleElement: () => (
      <style dangerouslySetInnerHTML={{ __html: sheet.textContent }} id={sheet.id} />
    ),
    /* eslint-enable */
  };
}
