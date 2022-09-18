import { sample } from 'effector';
import { $parsedFormJson, $isFormJsonValid, fieldsUpdated, $mainForm } from './ui/form-generator/model';
import { $resultFormData } from './ui/form/model';

sample({
    clock: fieldsUpdated,
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

export { fieldsUpdated, $mainForm };
