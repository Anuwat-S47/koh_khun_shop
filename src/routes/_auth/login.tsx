import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { loginSchemas } from "@/schemas/user-schemas";
import Swal from "sweetalert2";
import { useLogin } from "@/hooks/userUser";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutateAsync: login, isPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginSchemas,
    },
    onSubmit: async ({ value }) => {
      const result = loginSchemas.safeParse(value);

      if (!result.success) {
        Swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ถูกต้อง",
          text: result.error.issues[0].message,
        });

        return;
      }

      try {
        const resultLogin = await login(result.data);

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
    <div className="flex justify-center">
      <div>
        <h1>Login Page</h1>{" "}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field name="email">
              {(field) => (
                <div>
                  <input
                    name="email"
                    placeholder="Email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p>{field.state.meta.errors[0]?.message}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="********"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p>{field.state.meta.errors[0]?.message}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              <button disabled={isPending}>
                {!isPending ? "Login" : "Loading..."}
              </button>
            </form.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
}
