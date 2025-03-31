import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { z } from "zod";
import { BaseModal } from "./BaseModal";
import { View } from "./Themed";
import { useBlogPosts } from "@/data/Posts";

type modalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  postId: number;
  onClose: () => void;
};

export const EditPostModal: FC<modalProps> = ({
  setShowModal,
  showModal,
  postId,
  onClose,
}) => {
  const createPostSchema = z.object({
    title: z.string().optional(),
    body: z.string().optional(),
  });

  type CreatePostSchema = z.infer<typeof createPostSchema>;

  const { control, handleSubmit, getValues, reset } = useForm<CreatePostSchema>(
    {
      resolver: zodResolver(createPostSchema),
      defaultValues: {
        title: "",
        body: "",
      },
    }
  );

  const { patchPost, patchPostRequestStatus } = useBlogPosts();

  const handleEditPost = () => {
    if (!postId) return;
    console.log("edit post", patchPostRequestStatus);

    const { title, body } = getValues();
    patchPost(postId, { title, body });
    reset();
    setShowModal(false);
    onClose();
  };

  return (
    <BaseModal
      visible={showModal}
      onRequestClose={() => {
        reset();
        setShowModal(false);
        onClose();
      }}
    >
      <Text style={styles.title}>Editar Post</Text>
      <View style={styles.modalContainer}>
        <Controller
          control={control}
          name="title"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="Título"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {error && <Text>{error.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name="body"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="Descrição"
                style={styles.textArea}
                multiline
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {error && <Text>{error.message}</Text>}
            </>
          )}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={handleSubmit(handleEditPost)}
      >
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  addButtonText: {
    color: "#ffffff",
    fontSize: 28,
  },
  input: {
    padding: 12,
    borderRadius: 12,
    borderColor: "#c3c3c3",
    borderWidth: 1,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textArea: {
    padding: 12,
    borderRadius: 12,
    borderColor: "#c3c3c3",
    borderWidth: 1,
    width: "100%",
    height: 100,
    textAlignVertical: "top",
  },
  modalContainer: {
    gap: 16,
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
