import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { checkAdmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/_admin")({
  beforeLoad: async () => {
    try {
      const { isAdmin } = await checkAdmin();
      if (!isAdmin) throw redirect({ to: "/" });
    } catch (e) {
      if ((e as any)?.isRedirect) throw e;
      throw redirect({ to: "/" });
    }
  },
  component: () => <Outlet />,
});
