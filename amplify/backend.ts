import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { sleepAnalysis } from './functions/sleepAnalysisFunction/resource'

defineBackend({
  auth,
  data,
  storage,
  sleepAnalysis
});
