import { sample } from 'effector';
import { $parsedFormJson, $isFormJsonValid, updateFields, $mainForm } from './ui/form-generator/model';
import { $resultFormData } from './ui/form/model';

export { updateFields, $mainForm };

sample({
    clock: updateFields,
    source: $parsedFormJson.map((state) =>
        state?.items
            ? state.items.reduce(
                  (acc, field) => ({
                      ...acc,
                      [field.name]: field.value,
                  }),
                  {},
              )
            : {},
    ),
    filter: $isFormJsonValid,
    target: $resultFormData,
});
