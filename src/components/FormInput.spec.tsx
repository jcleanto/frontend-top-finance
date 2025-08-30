import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from "./FormInput";

const Wrapper = (props: any) => {
  const formMethods = useForm();

  return (
    <FormProvider {...formMethods}>
      {props.children}
    </FormProvider>
  );
};

describe("FormInput Tests", () => {
  test("should have the correct name", async () => {
    render(
      <Wrapper>
        <FormInput
          name="nome"
          label="Nome"
          slotProps={{
            htmlInput: {
              'data-testid': 'nome',
            },
          }}
        />
      </Wrapper>
    );

    const input = await waitFor(() => screen.getByTestId("nome"));
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'nome');
    
  });

  test("should have the correct value", async () => {
    render(
      <Wrapper>
        <FormInput
          name="nome"
          label="Nome"
          slotProps={{
            htmlInput: {
              'data-testid': 'nome',
            },
          }}
        />
      </Wrapper>
    );

    const input = await waitFor(() => screen.getByTestId("nome"));
    expect(input).toBeInTheDocument();
    await userEvent.type(input, "José");
    expect(input).toHaveValue("José");
  });
});
