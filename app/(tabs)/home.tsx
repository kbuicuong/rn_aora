import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../components/SearchInput";
import Trending from "../components/Trending";
import EmptyState from "../components/EmptyState";
import useAppwrite from "@/lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import VideoCard from "../components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";

const Home = () => {

  const { user } = useGlobalContext();

  const {data: posts, refetch} = useAppwrite(getAllPosts);
  const {data: latestPosts} = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between flex-row mb-6 items-start">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  className="w-9 h-10"
                  source={images.logoSmall}
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-1 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3 mt-5">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
