import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { FC } from "react";
import { Link } from "expo-router";

import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

type ITrendingCardProps = TrendingMovie & { index: number };

export const TrendingCard: FC<ITrendingCardProps> = ({
  movie_id,
  poster_url,
  title,
  index,
}) => (
  <Link href={`/movies/${movie_id}`} asChild>
    <TouchableOpacity className="w-32 relative pl-5">
      <Image
        source={{ uri: poster_url }}
        className="w-32 h-48 rounded-lg"
        resizeMode="cover"
      />
      <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
        <MaskedView
          maskElement={
            <Text className="font-bold font-white text-6xl">{index + 1}</Text>
          }
        >
          <Image
            source={images.rankingGradient}
            className="size-14"
            resizeMode="cover"
          />
        </MaskedView>
      </View>
      <Text className="text-sm font-bold text-light-200 mt-2" numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  </Link>
);
