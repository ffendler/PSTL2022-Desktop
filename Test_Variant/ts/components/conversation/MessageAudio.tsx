// Copyright 2021-2022 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import React, {
  useRef,
  useEffect,
  useState,
  useReducer,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { noop } from 'lodash';

import { assert } from '../../util/assert';
import type { LocalizerType } from '../../types/Util';
import type { AttachmentType } from '../../types/Attachment';
import { isDownloaded } from '../../types/Attachment';
import { missingCaseError } from '../../util/missingCaseError';
import type { DirectionType, MessageStatusType } from './Message';

import type { ComputePeaksResult } from '../GlobalAudioContext';
import { MessageMetadata } from './MessageMetadata';
import * as log from '../../logging/log';

export type Props = {
  renderingContext: string;
  i18n: LocalizerType;
  attachment: AttachmentType;
  collapseMetadata: boolean;
  withContentAbove: boolean;
  withContentBelow: boolean;

  // Message properties. Many are needed for rendering metadata
  direction: DirectionType;
  expirationLength?: number;
  expirationTimestamp?: number;
  id: string;
  played: boolean;
  showMessageDetail: (id: string) => void;
  status?: MessageStatusType;
  textPending?: boolean;
  timestamp: number;

  // See: GlobalAudioContext.tsx
  audio: HTMLAudioElement;

  buttonRef: React.RefObject<HTMLButtonElement>;
  kickOffAttachmentDownload(): void;
  onCorrupted(): void;
  onFirstPlayed(): void;

  computePeaks(url: string, barCount: number): Promise<ComputePeaksResult>;
  activeAudioID: string | undefined;
  activeAudioContext: string | undefined;
  setActiveAudioID: (id: string | undefined, context: string) => void;
};

type ButtonProps = {
  i18n: LocalizerType;
  buttonRef: React.RefObject<HTMLButtonElement>;

  mod: string;
  label: string;
  onClick: () => void;
};

enum State {
  NotDownloaded = 'NotDownloaded',
  Pending = 'Pending',
  Computing = 'Computing',
  Normal = 'Normal',
}

// Constants

const CSS_BASE = 'module-message__audio-attachment';
const BAR_COUNT = 47;
const BAR_NOT_DOWNLOADED_HEIGHT = 2;
const BAR_MIN_HEIGHT = 4;
const BAR_MAX_HEIGHT = 20;

const REWIND_BAR_COUNT = 2;

// Increments for keyboard audio seek (in seconds)
const SMALL_INCREMENT = 1;
const BIG_INCREMENT = 5;

// Utils

const timeToText = (time: number): string => {
  const hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60).toString();
  let seconds = Math.floor(time % 60).toString();

  if (hours !== 0 && minutes.length < 2) {
    minutes = `0${minutes}`;
  }

  if (seconds.length < 2) {
    seconds = `0${seconds}`;
  }

  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};

const Button: React.FC<ButtonProps> = props => {
  const { i18n, buttonRef, mod, label, onClick } = props;
  // Clicking button toggle playback
  const onButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    onClick();
  };

  // Keyboard playback toggle
  const onButtonKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== 'Space') {
      return;
    }
    event.stopPropagation();
    event.preventDefault();

    onClick();
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      className={classNames(
        `${CSS_BASE}__button`,
        `${CSS_BASE}__button--${mod}`
      )}
      onClick={onButtonClick}
      onKeyDown={onButtonKeyDown}
      tabIndex={0}
      aria-label={i18n(label)}
    />
  );
};

type StateType = Readonly<{
  isPlaying: boolean;
  currentTime: number;
  lastAriaTime: number;
}>;

type ActionType = Readonly<
  | {
      type: 'SET_IS_PLAYING';
      value: boolean;
    }
  | {
      type: 'SET_CURRENT_TIME';
      value: number;
    }
>;

function reducer(state: StateType, action: ActionType): StateType {
  if (action.type === 'SET_IS_PLAYING') {
    return {
      ...state,
      isPlaying: action.value,
      lastAriaTime: state.currentTime,
    };
  }
  if (action.type === 'SET_CURRENT_TIME') {
    return { ...state, currentTime: action.value };
  }
  throw missingCaseError(action);
}

/**
 * Display message audio attachment along with its waveform, duration, and
 * toggle Play/Pause button.
 *
 * A global audio player is used for playback and access is managed by the
 * `activeAudioID` and `activeAudioContext` properties. Whenever both
 * `activeAudioID` and `activeAudioContext` are equal to `id` and `context`
 * respectively the instance of the `MessageAudio` assumes the ownership of the
 * `Audio` instance and fully manages it.
 *
 * `context` is required for displaying separate MessageAudio instances in
 * MessageDetails and Message React components.
 */







































































































































































































































































































































































































































































