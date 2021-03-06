// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { ThunkAction } from 'redux-thunk';

import * as log from '../../logging/log';
import type { InMemoryAttachmentDraftType } from '../../types/Attachment';
import { SignalService as Proto } from '../../protobuf';
import type { StateType as RootStateType } from '../reducer';
import { fileToBytes } from '../../util/fileToBytes';
import { recorder } from '../../services/audioRecorder';
import { stringToMIMEType } from '../../types/MIME';
import { useBoundActions } from '../../hooks/useBoundActions';














































































































































































































































