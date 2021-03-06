// Copyright 2019-2022 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { actions as accounts } from './ducks/accounts';
import { actions as app } from './ducks/app';
import { actions as audioPlayer } from './ducks/audioPlayer';

import { actions as badges } from './ducks/badges';
import { actions as calling } from './ducks/calling';
import { actions as composer } from './ducks/composer';
import { actions as conversations } from './ducks/conversations';
import { actions as crashReports } from './ducks/crashReports';
import { actions as emojis } from './ducks/emojis';
import { actions as expiration } from './ducks/expiration';
import { actions as globalModals } from './ducks/globalModals';
import { actions as items } from './ducks/items';
import { actions as linkPreviews } from './ducks/linkPreviews';
import { actions as network } from './ducks/network';
import { actions as safetyNumber } from './ducks/safetyNumber';

import { actions as stickers } from './ducks/stickers';
import { actions as stories } from './ducks/stories';
import { actions as updates } from './ducks/updates';
import { actions as user } from './ducks/user';
import type { ReduxActions } from './types';

export const actionCreators: ReduxActions = {
  accounts,
  app,
  audioPlayer,
  
  badges,
  calling,
  composer,
  conversations,
  crashReports,
  emojis,
  expiration,
  globalModals,
  items,
  linkPreviews,
  network,
  safetyNumber,
  
  stickers,
  stories,
  updates,
  user,
};

export const mapDispatchToProps = {
  ...accounts,
  ...app,
  ...audioPlayer,
  
  ...badges,
  ...calling,
  ...composer,
  ...conversations,
  ...crashReports,
  ...emojis,
  ...expiration,
  ...globalModals,
  ...items,
  ...linkPreviews,
  ...network,
  ...safetyNumber,
  
  ...stickers,
  ...stories,
  ...updates,
  ...user,
};

