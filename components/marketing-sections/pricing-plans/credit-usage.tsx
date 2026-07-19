import { Container } from "@/components/shared-components/container";
import { Subheading } from "@/components/shared-components/subheading";
import { Text } from "@/components/shared-components/text";
import { CREDIT_ACTIONS } from "@/data/pricing-data";

export const CreditUsage = () => {
  return (
    <Container as="section" className="mx-auto w-full my-15">
      <Subheading className="mb-8">What credits are spent on</Subheading>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-100 border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left">
                <Text size="xs" weight="semibold" color="muted" className="uppercase tracking-widest">
                  Action
                </Text>
              </th>
              <th className="px-6 py-4 text-right">
                <Text size="xs" weight="semibold" color="muted" className="uppercase tracking-widest">
                  Cost
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {CREDIT_ACTIONS.map((action) => (
              <tr key={action.id} className="border-t border-border">
                <td className="px-6 py-4">
                  <Text size="sm">{action.label}</Text>
                </td>
                <td className="px-6 py-4 text-right">
                  <Text size="sm" weight="medium">
                    {action.credits} credit{action.credits > 1 ? "s" : ""}
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};
