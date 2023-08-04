import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ClipPath, Ellipse, Image, Svg } from "react-native-svg";

const { height, width } = Dimensions.get("window");
export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  const imagePotion = useSharedValue(1);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePotion.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePotion.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePotion.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const registerAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePotion.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(interpolation, { duration: 1000 }),
      display: imagePotion.value === 1 ? "none" : "block",
      // transform: [
      //   { translateX: withTiming(interpolation, { duration: 1000 }) },
      // ],
    };
  });

  const loginHandler = () => {
    imagePotion.value = 0;
    setIsLogin(true);
  };
  const registerHandler = () => {
    imagePotion.value = 0;
    setIsLogin(false);
  };
  const closeHandler = () => {
    imagePotion.value = 1;
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height} width={width}>
          <ClipPath id="clipPathId ">
            <Ellipse cx={width} ry={height} rx={height} />
          </ClipPath>
          <Image
            href="https://images.unsplash.com/photo-1516900448138-898720b936c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
            width={width}
            height={height}
            preserveAspectRatio="xMidyMid slice"
            clipPath="#clipPathId"
          />
        </Svg>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonAnimatedStyle}>
          <TouchableOpacity onPress={loginHandler} style={styles.button}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={registerHandler} style={styles.button}>
            <Text style={styles.textButton}>Register</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      {/* <View> */}
      <Animated.View style={registerAnimatedStyle}>
        <TouchableOpacity
          onPress={closeHandler}
          style={styles.closeButtonContainer}
        >
          <Text style={{fontWeight:'900',fontSize:20,}}>X</Text>
        </TouchableOpacity>
        <View style={styles.form}>
          <TextInput placeholder="Email" style={styles.input} />
          {isLogin ? <></> : 
          <TextInput placeholder="Full Name" style={styles.input} />
          }
          <TextInput placeholder="Password" style={styles.input} />
        </View>
        <View style={styles.button}>
          <Text style={styles.textButton}>
            {isLogin ? "Login" : "Register"}
          </Text>
        </View>
      </Animated.View>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dedede",
    justifyContent: "flex-end",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(123,109,230,0.8)",
    height: 55,
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  textButton: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    letterSpacing: 1,
  },
  bottomContainer: {
    height: height / 3,
  },
  form: {
    //   alignItems: "center",
    //   justifyContent: "center",
  },
  input: {
    height: 55,
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 20,
  },
  closeButtonContainer: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top: -90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    elevation: 1,
  },
});
