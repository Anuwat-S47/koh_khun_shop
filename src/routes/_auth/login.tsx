import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { loginSchemas } from "@/schemas/user-schemas";
import Swal from "sweetalert2";
import { useLogin } from "@/hooks/userUser";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import FormField from "@/components/FormField";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutateAsync: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchemas,
    },
    onSubmit: async ({ value }) => {
      try {
        const resultLogin = await login(value);

        await Swal.fire({
          icon: "success",
          title: resultLogin.message,
          timer: 1500,
          showConfirmButton: false,
        });

        navigate({
          to: "/",
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Login ไม่สำเร็จ",
          text:
            error.response?.data?.message ?? "Email หรือ Password ไม่ถูกต้อง",
        });
      }
    },
  });

  return (
    <div className="flex justify-center text-center my-10">
      <div className="w-full max-w-md border-2 p-4 rounded-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Login Page</FieldLegend>

              <FieldGroup>
                <form.Field name="email">
                  {(field) => (
                    <FormField field={field}>
                      {(hasError) => (
                        <>
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            type="email"
                            placeholder="You@example.com"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={hasError}
                          />
                        </>
                      )}
                    </FormField>
                  )}
                </form.Field>

                <form.Field name="password">
                  {(field) => (
                    <FormField field={field}>
                      {(hasError) => (
                        <>
                          <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                          <InputGroup>
                            <InputGroupInput
                              id={field.name}
                              name={field.name}
                              type={showPassword ? "text" : "password"}
                              placeholder="********"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={hasError}
                            />

                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={
                                  showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"
                                }
                              >
                                {showPassword ? <EyeOff /> : <Eye />}
                              </InputGroupButton>
                            </InputGroupAddon>
                          </InputGroup>
                        </>
                      )}
                    </FormField>
                  )}
                </form.Field>
              </FieldGroup>

              <form.Subscribe selector={(state) => state.canSubmit}>
                {(canSubmit) => (
                  <Button type="submit" disabled={!canSubmit || isPending}>
                    {isPending ? "Loading..." : "Login"}
                  </Button>
                )}
              </form.Subscribe>
            </FieldSet>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
