import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { useForm, FormProvider } from 'react-hook-form';
import FormSwitch from "./FormSwitch";

const Wrapper = (props: any) => {
  const formMethods = useForm();

  return (
    <FormProvider {...formMethods}>
      {props.children}
    </FormProvider>
  );
};

describe("FormSwitch Tests", () => {

  test("should trigger onChange and correctly check/uncheck", async () => {
    const onChange = jest.fn();

    const { getByRole } = render(
      <Wrapper>
        <FormSwitch
          name="ativo"
          label="Ativo"
          data-testid="ativo"
          onChange={onChange}
        />
      </Wrapper>
    );

    const inputSwitch = await waitFor(() => getByRole('switch'));
    // check action
    await act(async () => {
      fireEvent.click(inputSwitch);
      fireEvent.change(inputSwitch, { target: { checked: true } });
    });
    expect(inputSwitch).toBeChecked();

    // uncheck action
    await act(async () => {
      fireEvent.click(inputSwitch);
      fireEvent.change(inputSwitch, { target: { checked: false } });
    });
    expect(inputSwitch).not.toBeChecked();

    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
