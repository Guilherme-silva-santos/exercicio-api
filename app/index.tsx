import { Text, View } from "@/components/Themed";
import { useBlogPosts } from "@/data/Posts";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CreatePostModal } from "@/components/CreatePostModal";
import { EditPostModal } from "@/components/EditPostModal";
import { GetPostResponse } from "@/model/get-post-response";

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [postsPerPage, setPostPerPage] = useState(5);
  const [visiblePosts, setVisiblePosts] = useState<GetPostResponse[]>([]);
  const [postSelected, setPostSelected] = useState<GetPostResponse | null>(
    null
  );
  const {
    getAllPosts,
    getAllPostsRequestStatus,
    posts,
    deletePostById,
    deletePostRequestStatus,
  } = useBlogPosts();
  const handleDeletePost = (item: GetPostResponse) => {
    console.log(item);

    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esse post?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            deletePostById(item.id);
            setPostSelected(null);
            console.log("post deleted", deletePostRequestStatus);
          },
        },
      ]
    );
  };

  const loadMorePosts = () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    const nextPage = page + 1;
    const start = (nextPage - 1) * postsPerPage;
    const end = start + postsPerPage;

    const newPosts = posts.slice(start, end);

    if (newPosts.length > 0) {
      setVisiblePosts((prev) => [...prev, ...newPosts]);
      setPage(nextPage);
    }

    setIsLoadingMore(false);
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0 && visiblePosts.length === 0) {
      const initialSlice = posts.slice(0, postsPerPage);
      setVisiblePosts(initialSlice);
      setPage(1);
    }
  }, [posts]);

  return (
    <View lightColor="#F2F4F7" style={styles.container}>
      <CreatePostModal setShowModal={setShowModal} showModal={showModal} />
      {postSelected && (
        <EditPostModal
          setShowModal={setShowEditModal}
          showModal={showEditModal}
          postId={postSelected.id}
          onClose={() => setPostSelected(null)}
        />
      )}
      {getAllPostsRequestStatus.status === "pending" ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F2F4F7",
            gap: 16,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Carregando Posts...
          </Text>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={visiblePosts}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.3}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7} style={styles.cardContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.body}</Text>
              <View style={styles.cardOptionContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.cardOptionButton}
                  onPress={() => {
                    setPostSelected(item);
                    setShowEditModal(true);
                  }}
                >
                  <MaterialIcons name="edit" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.cardOptionButton}
                  onPress={() => handleDeletePost(item)}
                >
                  <MaterialIcons name="delete" size={18} color={"#d42626"} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={() => setShowModal(true)}
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
    marginBottom: 16,
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
