import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useFetch } from "@/hooks";
import { fetchMovieDetails } from "@/services";
import { icons } from "@/constants/icons";

interface IMovieInfoProps {
  label: string;
  value: string;
}

const MovieInfo: FC<IMovieInfoProps> = ({ label, value }) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>
      <Text className="text-light-100 font-bold text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{data?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200">
              {data?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200">{data?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-px-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(data?.vote_average ?? 0)}
            </Text>
            <Text className="text-light-200 text-sm">
              ({data?.vote_count} votes){" "}
            </Text>
          </View>
          <MovieInfo label="Overview" value={data?.overview || "N/A"} />
          <MovieInfo
            label="Genres"
            value={data?.genres?.map((item) => item.name).join(" – ") || "N/A"}
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={
                data?.budget ? `$${data?.budget / 1_000_000} million` : "N/A"
              }
            />
            <MovieInfo
              label="Revenue"
              value={
                data?.revenue
                  ? `$${Math.round(data?.revenue / 1_000_000)}`
                  : "N/A"
              }
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              data?.production_companies
                ?.map((item) => item.name)
                .join(" – ") || "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={router.back}
        className="absolute bottom-5 left-0. right-0. mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
