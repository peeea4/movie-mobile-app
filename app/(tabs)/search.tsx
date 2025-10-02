import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/images";
import { useFetch } from "@/hooks";
import { fetchMovies, updateSearchCount } from "@/services";
import { MovieCard, SearchBar } from "@/components";
import { icons } from "@/constants/icons";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    isLoading,
    error,
    refetch: refetchMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const id = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetchMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(id);
  }, [searchQuery]);

  useEffect(() => {
    const id = setTimeout(async () => {
      if (data?.length && data?.[0]) {
        await updateSearchCount(searchQuery, data?.[0]);
      }
    }, 500);

    return () => clearTimeout(id);
  }, [data, searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="px-5"
        ListHeaderComponent={
          <>
            <View className="w-full flex-grow justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                value={searchQuery}
                onChange={(value) => setSearchQuery(value)}
                placeholder="Search movies..."
              />
            </View>

            {isLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3 ">
                Error: {error.message}
              </Text>
            )}

            {!isLoading && !error && searchQuery.trim() && !!data?.length && (
              <Text className="text-xl text-white font-bold">
                Search results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !isLoading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Type movie name"}
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Search;
