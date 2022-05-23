// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { assert } from 'chai';
import sinon from 'sinon';

import type {
  ConversationType,
  MessageType,
} from '../../../state/ducks/conversations';
import { getEmptyState as getEmptyConversationState } from '../../../state/ducks/conversations';
import { noopAction } from '../../../state/ducks/noop';








import { makeLookup } from '../../../util/makeLookup';
import { UUID } from '../../../types/UUID';
import {
  getDefaultConversation,
  getDefaultConversationWithUuid,
} from '../../helpers/getDefaultConversation';
import { ReadStatus } from '../../../messages/MessageReadStatus';

import type { StateType } from '../../../state/reducer';
import { reducer as rootReducer } from '../../../state/reducer';

describe('both/state/selectors/search', () => {
  const NOW = 1_000_000;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let clock: any;

  beforeEach(() => {
    clock = sinon.useFakeTimers({
      now: NOW,
    });
  });

  afterEach(() => {
    clock.restore();
  });

  const getEmptyRootState = (): StateType => {
    return rootReducer(undefined, noopAction());
  };

  function getDefaultMessage(id: string): MessageType {
    return {
      attachments: [],
      conversationId: 'conversationId',
      id,
      received_at: NOW,
      sent_at: NOW,
      source: 'source',
      sourceUuid: UUID.generate().toString(),
      timestamp: NOW,
      type: 'incoming' as const,
      readStatus: ReadStatus.Read,
    };
  }

  








  




















  


































































































































































































































  











































































});

