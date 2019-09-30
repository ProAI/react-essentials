import React from 'react';
import styleResolver from 'react-native-web/dist/cjs/exports/StyleSheet/styleResolver';

export default function getStyleSheet() {
  return {
    getStyleTag() {
      const sheet = styleResolver.getStyleSheet();

      return `<style id="${sheet.id}">${sheet.textContent}</style>`;
    },
    getStyleElement() {
      const sheet = styleResolver.getStyleSheet();

      /* eslint-disable react/no-danger */
      return (
        <style
          dangerouslySetInnerHTML={{ __html: sheet.textContent }}
          id={sheet.id}
        />
      );
      /* eslint-enable */
    },
  };
}
