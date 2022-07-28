import { sample } from 'effector';
import { $parsedFormJson, $isFormJsonValid, updateFields, $mainForm } from './ui/form-generator/model';
import { $resultFormData } from './ui/form/model';

export { updateFields, $mainForm };

sample({
    clock: updateFields,
    source: $parsedFormJson.map((state) =>
        state?.items?.reduce(
            (acc: Record<string, string>, curr: { name: string; value: string }) => ({
                ...acc,
                [curr.name]: curr.value,
            }),
            {},
        ),
    ),
    filter: $isFormJsonValid,
    target: $resultFormData,
});
