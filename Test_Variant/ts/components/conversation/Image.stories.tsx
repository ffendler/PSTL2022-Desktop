// Copyright 2020-2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { pngUrl } from '../../storybook/Fixtures';
import type { Props } from './Image';
import { CurveType, Image } from './Image';
import { IMAGE_PNG } from '../../types/MIME';
import type { ThemeType } from '../../types/Util';
import { setupI18n } from '../../util/setupI18n';
import enMessages from '../../../_locales/en/messages.json';
import { StorybookThemeContext } from '../../../.storybook/StorybookThemeContext';

import { fakeAttachment } from '../../test-both/helpers/fakeAttachment';

const i18n = setupI18n('en', enMessages);

const story = storiesOf('Components/Conversation/Image', module);

const createProps = (overrideProps: Partial<Props> = {}): Props => ({
  alt: text('alt', overrideProps.alt || ''),
  attachment:
    overrideProps.attachment ||
    fakeAttachment({
      contentType: IMAGE_PNG,
      fileName: 'sax.png',
      url: pngUrl,
    }),
  blurHash: text('blurHash', overrideProps.blurHash || ''),
  bottomOverlay: boolean('bottomOverlay', overrideProps.bottomOverlay || false),
  closeButton: boolean('closeButton', overrideProps.closeButton || false),
  curveBottomLeft: number(
    'curveBottomLeft',
    overrideProps.curveBottomLeft || CurveType.None
  ),
  curveBottomRight: number(
    'curveBottomRight',
    overrideProps.curveBottomRight || CurveType.None
  ),
  curveTopLeft: number(
    'curveTopLeft',
    overrideProps.curveTopLeft || CurveType.None
  ),
  curveTopRight: number(
    'curveTopRight',
    overrideProps.curveTopRight || CurveType.None
  ),
  darkOverlay: boolean('darkOverlay', overrideProps.darkOverlay || false),
  height: number('height', overrideProps.height || 100),
  i18n,
  noBackground: boolean('noBackground', overrideProps.noBackground || false),
  noBorder: boolean('noBorder', overrideProps.noBorder || false),
  onClick: action('onClick'),
  onClickClose: action('onClickClose'),
  onError: action('onError'),
  overlayText: text('overlayText', overrideProps.overlayText || ''),
  playIconOverlay: boolean(
    'playIconOverlay',
    overrideProps.playIconOverlay || false
  ),
  tabIndex: number('tabIndex', overrideProps.tabIndex || 0),
  theme: text('theme', overrideProps.theme || 'light') as ThemeType,
  url: text('url', 'url' in overrideProps ? overrideProps.url || null : pngUrl),
  width: number('width', overrideProps.width || 100),
});

story.add('URL with Height/Width', () => {
  const props = createProps();

  return <Image {...props} />;
});

story.add('Caption', () => {
  const defaultProps = createProps();
  const props = {
    ...defaultProps,
    attachment: {
      ...defaultProps.attachment,
      caption: '<Saxophone Pun>',
    },
  };

  return <Image {...props} />;
});

story.add('Play Icon', () => {
  const props = createProps({
    playIconOverlay: true,
  });

  return <Image {...props} />;
});

story.add('Close Button', () => {
  const props = createProps({
    closeButton: true,
  });

  return <Image {...props} />;
});

story.add('No Border or Background', () => {
  const props = createProps({
    attachment: fakeAttachment({
      contentType: IMAGE_PNG,
      fileName: 'sax.png',
      url: pngUrl,
    }),
    noBackground: true,
    noBorder: true,
    url: pngUrl,
  });

  return (
    <div style={{ backgroundColor: '#999' }}>
      <Image {...props} />
    </div>
  );
});

story.add('Pending', () => {
  const props = createProps();
  props.attachment.pending = true;

  return <Image {...props} />;
});

story.add('Pending w/blurhash', () => {
  const props = createProps();
  props.attachment.pending = true;

  return (
    <Image
      {...props}
      blurHash="LDA,FDBnm+I=p{tkIUI;~UkpELV]"
      width={300}
      height={400}
    />
  );
});

story.add('Curved Corners', () => {
  const props = createProps({
    curveBottomLeft: CurveType.Normal,
    curveBottomRight: CurveType.Normal,
    curveTopLeft: CurveType.Normal,
    curveTopRight: CurveType.Normal,
  });

  return <Image {...props} />;
});

story.add('Small Curve Top Left', () => {
  const props = createProps({
    curveTopLeft: CurveType.Small,
  });

  return <Image {...props} />;
});

story.add('Soft Corners', () => {
  const props = createProps({
    curveBottomLeft: CurveType.Tiny,
    curveBottomRight: CurveType.Tiny,
    curveTopLeft: CurveType.Tiny,
    curveTopRight: CurveType.Tiny,
  });

  return <Image {...props} />;
});

story.add('Bottom Overlay', () => {
  const props = createProps({
    bottomOverlay: true,
  });

  return <Image {...props} />;
});

story.add('Full Overlay with Text', () => {
  const props = createProps({
    darkOverlay: true,
    overlayText: 'Honk!',
  });

  return <Image {...props} />;
});

story.add('Blurhash', () => {
  const defaultProps = createProps();
  const props = {
    ...defaultProps,
    blurHash: 'thisisafakeblurhashthatwasmadeup',
  };

  return <Image {...props} />;
});

story.add('undefined blurHash', () => {
  const Wrapper = () => {
    const theme = React.useContext(StorybookThemeContext);
    const props = createProps({
      blurHash: undefined,
      theme,
      url: undefined,
    });

    return <Image {...props} />;
  };

  return <Wrapper />;
});

story.add('Missing Image', () => {
  const defaultProps = createProps();
  const props = {
    ...defaultProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attachment: undefined as any,
  };

  return <Image {...props} />;
});
