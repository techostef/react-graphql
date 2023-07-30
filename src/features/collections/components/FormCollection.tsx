import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { css, cx } from "@emotion/css";

import InputText from "../../shared/components/Form/Input";
import Button from "../../shared/components/Button";
import theme from "../../shared/config/theme";
import { useCollections } from "../contexts/CollectionsContext";
import { ICollection } from "../../shared/types/collections";
import { MediaScreen } from "../../shared/constants/MediaScreen";

interface IFormNewCollection {
  name: string;
}

interface IProps {
  item?: ICollection;
  onSuccessSubmit?: (name: string) => void;
}

function FormAddCollection({ onSuccessSubmit, item }: IProps) {
  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm<IFormNewCollection>();

  const { addCollection, editCollection } = useCollections();

  const isEdit = !!item;

  useEffect(() => {
    if (item) {
      setValue("name", item.name);
    }
  }, [isEdit, JSON.stringify(item)]);

  function onSubmit(data: IFormNewCollection) {
    try {
      if (isEdit) {
        editCollection(data.name, item);
      } else {
        addCollection(data.name);
      }
      setValue("name", "");
      onSuccessSubmit?.(data.name);
    } catch (e) {
      toast((e as Error)?.message || "Something error", {
        type: "error",
      });
      if ((e as Error)?.message) {
        setError("name", {
          message: (e as Error).message,
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: {
            message: "This field is required",
            value: true,
          },
          validate: (value) => {
            const formatSpecialChar =
              /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            return !formatSpecialChar.test(value) || "Cannot special chars";
          },
        }}
        render={({ fieldState, field }) => {
          const message = fieldState?.error?.message || "";
          const error = !!message;
          return (
            <InputText
              error={error}
              errorMessage={message}
              className={styles.input}
              label="Name Collections"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value);
              }}
              value={field.value}
            />
          );
        }}
      />
      <Button
        type="submit"
        className={cx(
          styles.button,
          errors?.name?.message && styles.buttonError
        )}
      >
        {isEdit ? "Edit" : "Create a new"}
      </Button>
    </form>
  );
}

const styles = {
  container: css({
    display: "flex",
    alignItems: "flex-end",
    height: "fit-content",
    [MediaScreen.mobile]: {
      flexDirection: 'column',
      marginLeft: theme.spacing.s,
      marginRight: theme.spacing.s,
    }
  }),
  input: css({
    width: "100%",
    marginRight: theme.spacing.s,
    [MediaScreen.mobile]: {
      marginRight: 0,
    }
  }),
  button: css({
    marginBottom: theme.spacing.xxs,
    textWrap: "nowrap",
  }),
  buttonError: css({
    marginBottom: 20,
  }),
};

export default FormAddCollection;
