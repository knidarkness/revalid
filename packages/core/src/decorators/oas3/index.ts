import { Oas3Decorator } from '../../visitors';
import { RegistryDependencies } from '../common/registry-dependencies';
import { OperationDescriptionOverride } from '../common/operation-description-override';
import { TagDescriptionOverride } from '../common/tag-description-override';
import { InfoDescriptionOverride } from '../common/info-description-override';
import { RemoveXInternal } from '../common/remove-x-internal';
import { FilterIn } from '../common/filters/filter-in';
import { FilterOut } from '../common/filters/filter-out';

export const decorators = {
  'registry-dependencies': RegistryDependencies as Oas3Decorator,
  'operation-description-override': OperationDescriptionOverride as Oas3Decorator,
  'tag-description-override': TagDescriptionOverride as Oas3Decorator,
  'info-description-override': InfoDescriptionOverride as Oas3Decorator,
  'remove-x-internal': RemoveXInternal as Oas3Decorator,
  'filter-in': FilterIn as Oas3Decorator,
  'filter-out': FilterOut as Oas3Decorator,
};
