import { Field, FieldError } from "./ui/field";

function FormField({
  field,
  children,
}: {
  field: any;
  children: (hasError: boolean) => React.ReactNode;
}) {
  const hasError = field.state.meta.errors.length > 0;
  return (
    <Field data-invalid={hasError}>
      {children(hasError)}

      {hasError && (
        <FieldError>{String(field.state.meta.errors[0]?.message)}</FieldError>
      )}
    </Field>
  );
}
export default FormField;
