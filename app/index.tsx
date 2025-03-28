import { BaseModal } from "@/components/BaseModal";
import { Text, View } from "@/components/Themed";
import { useBlogPosts } from "@/data/Posts";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const {
    getAllPosts,
    posts,
    getAllPostsRequestStatus,
    createPost,
    createPostRequestStatus,
    patchPost,
    patchPostRequestStatus,
  } = useBlogPosts();

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleCreatePost = () => {
    console.log("create post", createPostRequestStatus);
    createPost({
      body: "não sei",
      title: "nao sei",
      userId: 1,
    });

    setShowModal(false);
  };

  const handlePatchPost = () => {
    console.log("patch post", patchPostRequestStatus);
    patchPost("1", {
      body: "não sei",
      title: "nao sei",
    });
  };

  return (
    <View lightColor="#F2F4F7" style={styles.container}>
      <BaseModal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <Text style={styles.title}>Adicionar Post</Text>
        <View style={styles.modalContainer}>
          <TextInput placeholder="Título" style={styles.input} />
          <TextInput
            placeholder="Descrição"
            style={styles.textArea}
            multiline
          />
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.button}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </BaseModal>
      <TouchableOpacity activeOpacity={0.7} style={styles.cardContainer}>
        <Text style={styles.title}>
          Non labore exercitation pariatur dolore deserunt.
        </Text>
        <Text style={styles.description}>
          Consequat Lorem irure elit proident dolor ex in minim cupidatat tempor
          in Lorem est aliquip. Enim eu incididunt non laborum nulla dolore amet
          commodo cillum do. Consectetur qui sit Lorem ut ut excepteur velit
          esse. Officia dolor proident deserunt culpa eiusmod incididunt non
          eiusmod ex elit. Cupidatat id dolore nulla culpa aliqua sunt ut nulla
          quis. Do ullamco anim qui officia occaecat deserunt deserunt nulla
          commodo commodo ea dolore veniam culpa. Dolor anim reprehenderit amet
          laboris amet non aliquip ex sint.
        </Text>
        <View style={styles.cardOptionContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cardOptionButton}
            onPress={() => setShowModal(true)}
          >
            <MaterialIcons name="edit" size={18} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.cardOptionButton}>
            <MaterialIcons name="delete" size={18} color={"#d42626"} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.cardContainer}>
        <Text style={styles.title}>
          Non labore exercitation pariatur dolore deserunt.
        </Text>
        <Text style={styles.description}>
          Consequat Lorem irure elit proident dolor ex in minim cupidatat tempor
          in Lorem est aliquip. Enim eu incididunt non laborum nulla dolore amet
          commodo cillum do. Consectetur qui sit Lorem ut ut excepteur velit
          esse. Officia dolor proident deserunt culpa eiusmod incididunt non
          eiusmod ex elit. Cupidatat id dolore nulla culpa aliqua sunt ut nulla
          quis. Do ullamco anim qui officia occaecat deserunt deserunt nulla
          commodo commodo ea dolore veniam culpa. Dolor anim reprehenderit amet
          laboris amet non aliquip ex sint.
        </Text>
        <View style={styles.cardOptionContainer}>
          <TouchableOpacity activeOpacity={0.7} style={styles.cardOptionButton}>
            <MaterialIcons name="edit" size={18} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.cardOptionButton}>
            <MaterialIcons name="delete" size={18} color={"#d42626"} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
        // onPress={() => setShowModal(true)}
        // onPress={handleCreatePost}
        onPress={handlePatchPost}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 18,
    gap: 16,
  },
  cardContainer: {
    width: "100%",
    padding: 16,
    gap: 8,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    fontWeight: "normal",
  },
  addButton: {
    backgroundColor: "#007AFF",
    position: "absolute",
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    bottom: 24,
    right: 24,
    elevation: 5,
  },
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
  cardOptionContainer: {
    flexDirection: "row",
    gap: 4,
    alignSelf: "flex-end",
  },
  cardOptionButton: {
    borderRadius: 4,
    alignSelf: "center",
    backgroundColor: "#e3e3e3",
    padding: 4,
  },
});
