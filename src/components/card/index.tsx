import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type CardProps = {
  imageSrc: ImageSourcePropType;
  title: string;
  description: string;
  price: string;
};

const Card = ({ imageSrc, title, description, price }: CardProps) => {
  return (
    <View style={styles.card}>
      {/* Container fixo para a imagem */}
      <View style={styles.imageWrapper}>
        <Image source={imageSrc} style={styles.image} resizeMode="cover" />
      </View>

      {/* Container para o conteúdo */}
      <View style={styles.content}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 371,
    height: 86,
    backgroundColor: "#CF7E2C",
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  imageWrapper: {
    width: 100, // espaço fixo para a imagem
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  description: {
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: 4,
  },
  priceWrapper: {
    width: 60, // espaço fixo para garantir o alinhamento do preço
    alignItems: "flex-end",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default Card;
