"use client";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import InputForm from "../form/InputForm";
import ButtonForm from "../form/ButtonForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { zodSchema } from "@/lib/zodSchema";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { editSalesData, insertSalesData } from "@/lib/actions";
import { useRouter } from "next/navigation";
import useLoading from "@/hooks/useLoading";
import { useUserSession } from "@/context/UserContext";
import PopUpMessage from "../PopUpMessage";

const InputFormSales = ({ prevData, type, setRowEdit, setIsLoadingUpdate }) => {
  const { user } = useUserSession();
  const [isLoading, setIsLoading] = useLoading("4000");
  const [message, setMessage] = useState();
  const router = useRouter();
  const schema = zodSchema("inputData");
  const form = useForm({
    defaultValues: {
      package: prevData ? prevData.package.toString() : "",
      price: prevData ? prevData.price.toString() : "",
      quantity: prevData ? prevData.quantity.toString() : "",
    },
    resolver: zodResolver(schema),
  });
  const { formState } = form;

  const onSubmit = async (data) => {
    if (type === "insert") {
      const response = await insertSalesData(data, user);
      setMessage((prev) => (prev = response.message));
      setIsLoading(true);
      router.refresh();
    }
    if (type === "edit") {
      const response = await editSalesData({ ...data, id: prevData?.id });
      setIsLoadingUpdate(true);
      setRowEdit([]);
      router.refresh();
    }
  };

  return (
    <section className="px-2 w-full h-auto flex flex-col items-center justify-center">
      {message && isLoading && <PopUpMessage message={message} />}
      <h1 className="font-bold text-xl">
        {type
          .split(" ")
          .map((val) => val[0].toUpperCase() + val.slice(1).toLowerCase())
          .join(" ")}{" "}
        Data
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-1 p-2 rounded-lg flex flex-col items-center justify-center w-full"
        >
          <FormField
            control={form.control}
            name={"package"}
            render={({ field }) => (
              <FormItem className="space-y-3 bg-main-base w-full p-2 text-main-background rounded-md">
                <FormLabel>Package</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1 month" />
                      </FormControl>
                      <FormLabel className="font-normal">1 month</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="3 month" />
                      </FormControl>
                      <FormLabel className="font-normal">3 month</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="6 month" />
                      </FormControl>
                      <FormLabel className="font-normal">6 month</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="12 month" />
                      </FormControl>
                      <FormLabel className="font-normal">12 month</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormItem className="w-full">
            <InputForm
              form={form}
              type={"number"}
              name={"price"}
              label={"Price"}
              isError={!!formState.errors.price}
              errorMessage={formState.errors.price?.message}
              placeHolder={"e.g. 500000"}
            />
            <InputForm
              form={form}
              type={"number"}
              name={"quantity"}
              label={"Quantity"}
              isError={!!formState.errors.quantity}
              errorMessage={formState.errors.quantity?.message}
              placeHolder={"e.g. 1"}
            />
            <ButtonForm />
          </FormItem>
        </form>
      </Form>
    </section>
  );
};
export default InputFormSales;
